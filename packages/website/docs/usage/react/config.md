---
sidebar_position: 2
---

# Configuration

You will need the CoverageProvider in order to inject coverage data into your application.

```ts
import { CoverageProvider } from '@finetwork/coverage-react'
import { coverage } from './lib' // coverage previously initialized

function App() {
  return (
    <CoverageProvider coverage={coverage}>
      <YourApp />
    </CoverageProvider>
  )
}
```
