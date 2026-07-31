# Visaworx Production Smoke Tests

Execute these commands and manual steps immediately after production deployment:

## 1. Automated Test Suite Execution
```bash
# Run master launch test suite
npx tsx features/launch/launch.test.ts

# Run production static build verification
npm run build
```

## 2. Manual Smoke Test Verification
- [ ] Visit `https://www.klartravels.com/visaworx` and confirm hero CTA buttons work.
- [ ] Visit `https://www.klartravels.com/visaworx/countries/canada` and test `Check My Readiness` button.
- [ ] Complete a 5-step consultation at `https://www.klartravels.com/visaworx/consultation` and verify redirect to `/success`.
- [ ] Open AI Assistant launcher and type: "What documents are needed for student visa?". Confirm response and source links.
