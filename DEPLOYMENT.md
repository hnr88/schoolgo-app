# Deployment — Coolify Tag-Based Deploys

## How it works

| Trigger | Environment |
|---|---|
| `git push origin main` | Nothing deployed |
| `git tag v*.*.*-staging.* && git push origin <tag>` | Staging |
| `git tag v*.*.* && git push origin <tag>` | Production |

Pushes to `main` do nothing. Only explicit tags trigger deploys.

## Deploy commands

```bash
# Deploy to staging
git tag v1.0.0-staging.1
git push origin v1.0.0-staging.1

# Deploy to production
git tag v1.0.0
git push origin v1.0.0
```

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
   NEXT_PUBLIC_API_URL=https://api.schoolgo.au
   NEXT_PUBLIC_SITE_URL=https://schoolgo.au
   NEXT_PUBLIC_BASE_DOMAIN=schoolgo.au
   ```
5. **Settings → General → Domains**: set production domain
6. **Settings → Webhooks**:
   - **Auto Deploy on Push**: OFF
   - **Deploy Tag**: ON
   - Tag pattern: `v*.*.*`

### 3. Create Staging resource

1. Same project → **+ New Resource** → same repo, branch `main`
2. Build Pack: **Dockerfile**
3. **Build Args**:
   ```
   NEXT_PUBLIC_API_URL=https://api.staging.schoolgo.au
   NEXT_PUBLIC_SITE_URL=https://staging.schoolgo.au
   NEXT_PUBLIC_BASE_DOMAIN=staging.schoolgo.au
   ```
4. **Domains**: set staging domain
5. **Webhooks**:
   - **Auto Deploy on Push**: OFF
   - **Deploy Tag**: ON
   - Tag pattern: `v*.*.*-staging.*`

## Tag convention

- **Production**: `v<major>.<minor>.<patch>` — e.g. `v1.0.0`, `v1.2.3`
- **Staging**: `v<major>.<minor>.<patch>-staging.<n>` — e.g. `v1.0.0-staging.1`, `v1.0.0-staging.2`

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
