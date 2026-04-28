# Deployment — Coolify Branch-Based Deploys

## How it works

| Trigger | Environment |
|---|---|
| `git push origin staging` | Staging |
| `git push origin main` | Production |

Pushes to the respective branch trigger automatic deploys via Coolify webhooks.

## Coolify setup

### 1. Connect GitHub repo

1. Coolify dashboard → **Sources** → **Add New Source**
2. Select **GitHub App** → OAuth flow to connect your GitHub account
3. Grant access to the `schoolgo-app` repo

### 2. Create Production resource

1. **Projects** → select or create project (e.g. "SchoolGo")
2. **+ New Resource** → select `schoolgo-app` repo, branch `main`
3. Build Pack: **Dockerfile** (auto-detected at repo root)
4. **Settings → Build → Docker Build Args**:
   ```
   NEXT_PUBLIC_API_URL=https://api.schoolgo.com.au
   NEXT_PUBLIC_SITE_URL=https://schoolgo.com.au
   NEXT_PUBLIC_BASE_DOMAIN=schoolgo.com.au
   ```
5. **Settings → General → Domains**: set production domain
6. **Settings → Webhooks**:
   - **Auto Deploy on Push**: ON
   - Branch: `main`

### 3. Create Staging resource

1. Same project → **+ New Resource** → same repo, branch `staging`
2. Build Pack: **Dockerfile**
3. **Build Args**:
   ```
   NEXT_PUBLIC_API_URL=https://staging-api.schoolgo.com.au
   NEXT_PUBLIC_SITE_URL=https://staging.schoolgo.com.au
   NEXT_PUBLIC_BASE_DOMAIN=staging.schoolgo.com.au
   ```
4. **Domains**: set staging domain
5. **Webhooks**:
   - **Auto Deploy on Push**: ON
   - Branch: `staging`

## Docker

The `Dockerfile` uses a multi-stage build:

1. **deps** — installs node_modules with pnpm
2. **build** — builds Next.js with standalone output (env vars injected as build args)
3. **runner** — minimal production image, runs as non-root user on port 3000

## Environment variables

Set these as **Docker Build Args** in each Coolify resource:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |
| `NEXT_PUBLIC_SITE_URL` | Frontend public URL |
| `NEXT_PUBLIC_BASE_DOMAIN` | Base domain for subdomain routing |

## DNS Records

### schoolgo.com.au

#### Production (46.225.221.109)

| Subdomain | Full URL | IP | Proxied |
|---|---|---|---|
| *(root)* | schoolgo.com.au | 46.225.221.109 | Yes |
| agent | agent.schoolgo.com.au | 46.225.221.109 | Yes |
| api | api.schoolgo.com.au | 46.225.221.109 | Yes |
| parent | parent.schoolgo.com.au | 46.225.221.109 | Yes |
| school | school.schoolgo.com.au | 46.225.221.109 | Yes |

#### Staging (5.13.233.49)

| Subdomain | Full URL | IP | Proxied |
|---|---|---|---|
| staging | staging.schoolgo.com.au | 5.13.233.49 | Yes |
| staging-agent | staging-agent.schoolgo.com.au | 5.13.233.49 | Yes |
| staging-api | staging-api.schoolgo.com.au | 5.13.233.49 | Yes |
| staging-parent | staging-parent.schoolgo.com.au | 5.13.233.49 | Yes |
| staging-school | staging-school.schoolgo.com.au | 5.13.233.49 | Yes |

---

### diagnostiq.com.au

#### Production (46.225.221.109)

| Subdomain | Full URL | IP | Proxied |
|---|---|---|---|
| *(root)* | diagnostiq.com.au | 46.225.221.109 | Yes |
| agent | agent.diagnostiq.com.au | 46.225.221.109 | Yes |
| api | api.diagnostiq.com.au | 46.225.221.109 | Yes |
| panel | panel.diagnostiq.com.au | 46.225.221.109 | Yes |
| parent | parent.diagnostiq.com.au | 46.225.221.109 | Yes |
| pipelines | pipelines.diagnostiq.com.au | 46.225.221.109 | Yes |
| school | school.diagnostiq.com.au | 46.225.221.109 | Yes |
| test | test.diagnostiq.com.au | 46.225.221.109 | Yes |
| tracker | tracker.diagnostiq.com.au | 46.225.221.109 | Yes |

#### Staging (5.13.233.49)

| Subdomain | Full URL | IP | Proxied |
|---|---|---|---|
| staging | staging.diagnostiq.com.au | 5.13.233.49 | Yes |
| staging-agent | staging-agent.diagnostiq.com.au | 5.13.233.49 | Yes |
| staging-api | staging-api.diagnostiq.com.au | 5.13.233.49 | Yes |
| staging-parent | staging-parent.diagnostiq.com.au | 5.13.233.49 | Yes |
| staging-school | staging-school.diagnostiq.com.au | 5.13.233.49 | Yes |
| staging-test | staging-test.diagnostiq.com.au | 5.13.233.49 | Yes |
