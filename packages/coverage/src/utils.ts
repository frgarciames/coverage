import { Address, Offer } from './types'

export const cloneMap = (map: Map<string, any>) => new Map(map)
export const offersArrToMap = (arr: Offer[]) =>
  new Map(arr.map((i) => [i.uniqueId, i]))
export const isServer = () => typeof window === 'undefined'

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

type SetFn = (target: any, name: string | symbol, value) => boolean | void

export const getCoverageProxy = (
  coverage,
  Coverage,
  { set }: { set?: SetFn }
) => {
  return new Proxy(coverage, {
    set: (target, name, value) => {
      target[name] = value
      if (target.storage) {
        let valueToStore
        let keyToStore
        switch (name) {
          case 'installationAddress':
            valueToStore = JSON.stringify(value)
            keyToStore = coverage.COVERAGE_INSTALLATION_ADDRESS_KEY
            Coverage.events.emit(
              'installationAddressChange',
              target._installationAddress
            )
            break
          case 'addressHistory':
            valueToStore = JSON.stringify(value)
            keyToStore = coverage.COVERAGE_INSTALLATION_ADDRESS_KEY
            Coverage.events.emit('addressHistoryChange', target._addressHistory)
            break
          default:
            break
        }
        if (keyToStore && valueToStore) {
          target.storage.setItem(keyToStore, valueToStore)
        }
      }
      set && set(target, name, value)
      return true
    },
  })
}
