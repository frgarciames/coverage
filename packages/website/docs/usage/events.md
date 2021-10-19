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
  Coverage.events.on('installationAddressChange', onCoverageChange)
  Coverage.events.on('addressHistoryChange', onCoverageChange)
  return () => {
    // unsubscribe
    Coverage.events.off('installationAddressChange', onCoverageChange)
    Coverage.events.off('addressHistoryChange', onCoverageChange)
  }
}, [])
```
