#!/usr/bin/env bash
# Parent-run watchdog v2: keeps Strapi API (:1337) AND the Next FE (:3000) alive.
# Checks ~every 90s; restarts whichever is down (API detached w/ e2e env; FE via pnpm dev → reads .env.local=:1337).
API_DIR=/Users/hunor.nagy/Code/schoolgo-api
FE_DIR=/Users/hunor.nagy/Code/schoolgo-app
LOG=/tmp/parent-run/api.log
FELOG=/tmp/parent-run/fe.log
WLOG=/tmp/parent-run/watchdog.log
mkdir -p /tmp/parent-run
echo "[$(date '+%F %T')] watchdog v2 started (pid $$)" >> "$WLOG"
while true; do
  # --- API :1337 ---
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 6 http://localhost:1337/_health 2>/dev/null)
  if [ "$code" != "204" ] && [ "$code" != "200" ]; then
    echo "[$(date '+%F %T')] API DOWN (health=$code) — restarting" >> "$WLOG"
    pid=$(lsof -nP -tiTCP:1337 -sTCP:LISTEN 2>/dev/null); [ -n "$pid" ] && kill "$pid" 2>/dev/null
    pkill -f 'strapi start' 2>/dev/null; sleep 2
    ( cd "$API_DIR" && set -a && . ./.env.e2e && set +a && nohup pnpm strapi start >> "$LOG" 2>&1 & disown )
    for i in $(seq 1 30); do c=$(curl -s -o /dev/null -w '%{http_code}' --max-time 5 http://localhost:1337/_health 2>/dev/null); [ "$c" = "204" ] && { echo "[$(date '+%F %T')] API back up ~$((i*3))s" >> "$WLOG"; break; }; sleep 3; done
  fi
  # --- FE :3000 ---
  fcode=$(curl -s -o /dev/null -w '%{http_code}' --max-time 6 http://localhost:3000 2>/dev/null)
  if [ "$fcode" = "000" ]; then
    echo "[$(date '+%F %T')] FE DOWN — restarting" >> "$WLOG"
    pid=$(lsof -nP -tiTCP:3000 -sTCP:LISTEN 2>/dev/null); [ -n "$pid" ] && kill "$pid" 2>/dev/null; sleep 2
    ( cd "$FE_DIR" && nohup pnpm dev >> "$FELOG" 2>&1 & disown )
  fi
  sleep 90
done
