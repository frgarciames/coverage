---
sidebar_position: 2
---

# Get coverage

Import coverage previously initialized, and get coverage for your address

## Get normalized address from input string

```ts
import { coverage } from './lib'

const inputString = 'calle piruleta'
const address = await coverage.getNormalizedAddressByInput(inputString)
```

## Get locations by address

```ts
import { coverage } from './lib'

export const testInstallationAddress: Address = {
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
}

const address = await coverage.getLocationsByAddress(testInstallationAddress) // Location[]
```

## Get offers by location

```ts
import { coverage } from './lib'

const address = await coverage.getOffersByLocation({ number: '', ...rest }) // Offer[]
```
