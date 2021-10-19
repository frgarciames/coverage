---
sidebar_position: 2
---

# Installation address

Import coverage previously initialized, and manipulate installation address.

## Add installation address

```ts
import { coverage } from './lib'

coverage.addInstallationAddress({
  cp: 'test',
  label: 'test',
  number: 'test',
  province: 'test',
  provinceId: 'test',
  street: 'test',
  streetId: 1,
  town: 'test',
  townId: 'test',
  type: 'test',
})
```

## Update installation address

```ts
import { coverage } from './lib'

coverage.updateInstallationAddress({
  label: 'piruleta',
})
```
