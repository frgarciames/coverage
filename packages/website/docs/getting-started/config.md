---
sidebar_position: 2
---

# Configuration

Import Coverage passing your favorite storage (or none), urls (normalizer, locator and visibility) and prefix

```ts
import { Coverage } from '@finetwork/coverage'

export const coverage = new Coverage({
  urls: {
    normalizer: 'https://api.com/normalizer',
    locator: 'https://api.com/locator',
    visibility: 'https://api.com/visibility',
  }
  //sessionStorage or undefined,
  storage: localStorage,
  //defaults to fi
  prefix: 'myshop',
})
```
