---
sidebar_position: 2
---

# Address history

Import coverage previously initialized, and manipulate address history

## Add address to history

```ts
import { coverage } from './lib'

coverage.addAddressToHistory({
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

## Remove address from history

```ts
import { coverage } from './lib'

const index = 1
console.log(coverage.addressHistory.length) // 3
coverage.removeAddressFromHistory(index)
console.log(coverage.addressHistory.length) // 2
```
