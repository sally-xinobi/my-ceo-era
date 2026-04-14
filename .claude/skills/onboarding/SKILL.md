---
name: onboarding
description: Initialize this project template with your project-specific values
user-invocable: true
---

# Project Onboarding

You are initializing a new project from the Next.js project template. Ask the user for the following values interactively, one at a time. Show the default/current value and let them confirm or override.

## Step 1: Collect inputs

Collect each value one at a time. Use `AskUserQuestion` where specified (it requires 2-4 options; "Other" is provided automatically for custom input). Otherwise, use plain text output and wait for the user's reply.

1. **Project name** (kebab-case, e.g. `my-cool-frontend`)
   - Derive a suggested default from the git remote repo name (`git remote get-url origin`, extract the repo name part). If no remote exists, fall back to the current directory name.
   - Print the suggestion via text output and ask the user to confirm or type a different name.
   - Used for: K8s resource names, domains, package.json name, docker-compose service name

2. **Docker image name** (`project/component` format, without registry prefix or tag)
   - Use `AskUserQuestion` with these options (derive values from the project name chosen in step 1):
     - `{project}/{component}` — standard convention for project-specific repos (e.g. `pensieve/web`, `pensieve/admin`)
     - `xinobi-ai/{project-name}` — for repos not belonging to a specific project (e.g. `xinobi-ai/slack-bot-web`)
   - The user can also choose "Other" (automatically provided) to type a custom value.

3. **AWS region** (for ECR registry)
   - Use the `AskUserQuestion` tool with these options:
     - `Tokyo (ap-northeast-1)` (Recommended)
     - `Oregon (us-west-2)`
   - ECR registry is fixed: `913524933722.dkr.ecr.{aws-region}.amazonaws.com`
   - Used for: k8s/base/deployment.yaml

4. **How will this service receive traffic?**
   - Use the `AskUserQuestion` tool with options:
     - `In-cluster only` — description: "No external access. Called by other services within the cluster via Kubernetes Service DNS."
     - `ALB (public)` — description: "Internet-facing ALB. For public APIs, webhooks, or user-facing endpoints."
     - `ALB (private)` — description: "Accessible from peered VPCs (e.g. cross-region) but not the public internet."
   - If `In-cluster only`: no further questions for this step.
   - If `ALB (public)`: ask for **base domain** via text output (free-text input, current: `xinobi.net`)
   - If `ALB (private)`: ask for **base domain** via text output (same as public), then insert `internal.` before it (e.g. `xinobi.net` → `internal.xinobi.net`)

## Step 2: Confirm before applying

Show a summary table of all values and what will change. Wait for user confirmation.

## Step 3: Apply replacements

Perform these replacements across the entire project (exclude `.git/`, `node_modules/`, `.next/`, `package-lock.json`):

### Project name replacements
- `project-template-next-react` → `{project-name}` (K8s manifests, domains, docker-compose, package.json name, README.md, CLAUDE.md)

### Docker image replacement
- `913524933722.dkr.ecr.ap-northeast-1.amazonaws.com/xinobi-ai/project-template-next-react` → `913524933722.dkr.ecr.{aws-region}.amazonaws.com/{docker-image-name}`

### If ALB (public) or ALB (private)
- `dev-project-template-next-react.xinobi.net` → `dev-{project-name}.{base-domain}`
- `project-template-next-react.xinobi.net` → `{project-name}.{base-domain}`

### If ALB (private) — additional changes
- Change `ingressClassName` to `alb-private` in ingress.yaml
- Remove the `alb.ingress.kubernetes.io/ssl-redirect: "443"` annotation from ingress.yaml

### If In-cluster only
- In `k8s/base/kustomization.yaml`: remove `- ingress.yaml` and `- virtualservice.yaml`
- In `k8s/overlays/dev/kustomization.yaml`: remove `- path: ingress-patch.yaml` and `- path: virtualservice-patch.yaml`
- In `k8s/overlays/prod/kustomization.yaml`: remove `- path: ingress-patch.yaml` and `- path: virtualservice-patch.yaml`
- Do NOT delete the actual ingress/virtualservice YAML files (keep them for future use)

## Step 4: Post-setup

After applying changes:
1. Run `npm install` to update the lock file with the new project name
2. Delete this skill directory: `.claude/skills/onboarding/`
3. If `.claude/skills/` is now empty, also remove `.claude/` from `.gitignore`
4. Stage all changes and create a single commit:
   ```
   chore: initialize project from template ({project-name})
   ```
5. Show a checklist of remaining manual steps:
   - [ ] Copy `.env.example` to `.env` and fill in values
   - [ ] Run `npm install` to install dependencies
   - [ ] Run `pre-commit install` to set up git hooks
   - [ ] Update `REPLACE_WITH_DEV_SENTRY_DSN` and `REPLACE_WITH_PROD_SENTRY_DSN` in overlay deployment patches
   - [ ] Deploy secret manually: `kubectl apply -n {dev|prod} -f k8s/base/secret.yaml`, then edit values in Freelens
