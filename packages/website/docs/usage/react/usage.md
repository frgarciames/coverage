---
sidebar_position: 2
---

# Usage - custom hook

Import _useCoverage_ that has coverage previously initialized and _state_ object with coverage data.

```ts
import { useCoverage } from '@finetwork/coverage-react'

function YourComponent() {
  const {
    state: { installationAddress },
  } = useCoverage()
  return <h3>Your address: {installationAddress.label} !</h3>
}
```
