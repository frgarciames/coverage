---
sidebar_position: 1
---

# Events

In order to get the latest data, you can subscribe to events in _Coverage_, and it will fire when data will change.

```ts
import { Coverage } from '@finetwork/coverage'

useEffect(() => {
  const onCoverageChange = (data) => {
    console.log(data)
  }
  Coverage.events.on('installationAddressChange', onCheckoutChange)
  Coverage.events.on('addressHistoryChange', onCheckoutChange)
  return () => {
    // unsubscribe
    Coverage.events.off('installationAddressChange', onCheckoutChange)
    Coverage.events.off('addressHistoryChange', onCheckoutChange)
  }
}, [])
```
