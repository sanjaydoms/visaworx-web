# Visaworx Production Rollback Plan

## Overview
This document outlines zero-downtime rollback procedures in the event of an unforeseen production incident.

## 1. Instant Deployment Rollback (Vercel CLI / Dashboard)
```bash
# Roll back production deployment to previous stable deployment ID
vercel rollback <previous-deployment-id> --prod
```

## 2. Git Release Tag Rollback
```bash
# Revert to previous release tag on main branch
git checkout main
git revert HEAD --no-edit
git push origin main
```

## 3. Post-Rollback Verification
1. Verify `/` homepage renders with 200 OK.
2. Confirm consultation form endpoint `/api/consultation` is accepting requests.
3. Notify the Klar Travels operations team.
