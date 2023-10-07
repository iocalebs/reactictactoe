![CI Badge](https://github.com/castdin/reactic-tac-toe/actions/workflows/ci.yaml/badge.svg)
[![codecov](https://codecov.io/gh/castdin/reactic-tac-toe/graph/badge.svg?token=H0N7I73Y32)](https://codecov.io/gh/castdin/reactic-tac-toe)

Run tests with `prefers-reduced-motion: no-preference` in slo-mo on a single browser:

```
 SLOWMO=true WITH_MOTION=true bunx playwright test gameplay --debug --project chromium
```

## What I learned from this exercise

- Playwright is easier to set up than Cypress
- Aiming for 100% unit test code coverage makes very little sense for React projects
- Always make sure to set dependencies in `useEffect`, or set dependencies as `[]` to make code run only once
- Dark mode toggles are generally more trouble than they're worth
