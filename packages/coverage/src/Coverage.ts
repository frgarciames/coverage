import { Address, Offer } from './types'
import { getCoverageProxy, isServer } from './utils'
import mitt, { MittEmitter } from './mitt'

export const coverageEvents = [
  'installationAddressChange',
  'addressHistoryChange',
] as const
export type CoverageEvent = typeof coverageEvents[number]
type CoverageBase = {
  coverage: Coverage | null
  readyCallbacks: Array<() => any>
  ready(cb: () => any): void
}

const singletonCoverage: CoverageBase = {
  coverage: null,
  readyCallbacks: [],
  ready(cb: () => void) {
    if (this.coverage) return cb()
    if (typeof window !== 'undefined') {
      this.readyCallbacks.push(cb)
    }
  },
}

coverageEvents.forEach((event) => {
  singletonCoverage.ready(() => {
    Coverage.events.on(event, (...args) => {
      const eventField = `on${event.charAt(0).toUpperCase()}${event.substring(
        1
      )}`
      const _singletonCoverage = singletonCoverage as any
      if (_singletonCoverage[eventField]) {
        try {
          _singletonCoverage[eventField](...args)
        } catch (err) {
          console.error(`Error when running the Coverage event: ${eventField}`)
        }
      }
    })
  })
})

type CoverageUrls = {
  normalizer: string
  locator: string
  visibility: string
}

type CoverageArgs = {
  storage?: Storage
  urls: CoverageUrls
  prefix?: string
}

export class Coverage {
  private _addressHistory: Address[]
  private _installationAddress: Address
  private _storage: Storage
  private _urls: CoverageUrls

  COVERAGE_INSTALLATION_ADDRESS_KEY = '_coverage_installation'
  COVERAGE_ADDRESS_HISTORY_KEY = '_coverage_address_history'

  events: MittEmitter<CoverageEvent>
  static events: MittEmitter<CoverageEvent> = mitt()

  constructor({ storage, urls, prefix = 'fi' }: CoverageArgs) {
    this.COVERAGE_INSTALLATION_ADDRESS_KEY =
      prefix + this.COVERAGE_INSTALLATION_ADDRESS_KEY
    this.COVERAGE_ADDRESS_HISTORY_KEY =
      prefix + this.COVERAGE_ADDRESS_HISTORY_KEY
    let installationAddress
    let addressHistory
    if (storage && storage instanceof Storage) {
      installationAddress = storage.getItem(
        this.COVERAGE_INSTALLATION_ADDRESS_KEY
      )
      addressHistory = storage.getItem(this.COVERAGE_ADDRESS_HISTORY_KEY)
    }
    this._addressHistory = addressHistory ?? []
    this._installationAddress = installationAddress ?? null

    return getCoverageProxy(this, Coverage, {})
  }

  get addressHistory() {
    return this._addressHistory
  }

  set addressHistory(address: Address[]) {
    this._addressHistory = address
  }

  get installationAddress() {
    return this._installationAddress
  }

  set installationAddress(address: Address) {
    this._installationAddress = address
  }

  get storage(): Storage {
    return this._storage
  }

  addInstallationAddress(address: Address) {
    this._installationAddress = address
    this.addAddressToHistory(address)
  }

  updateInstallationAddress(address: Partial<Address>) {
    this.installationAddress = {
      ...this.installationAddress,
      ...address,
    }
  }

  addAddressToHistory(address: Address) {
    this.addressHistory = [address, ...this._addressHistory]
  }

  removeAddressFromHistory(index: number) {
    const addresses = [...this._addressHistory]
    addresses.splice(index, 1)
    this.addressHistory = addresses
  }

  async getNormalizedAddressByInput(
    queryKey: string = 'address',
    address: string
  ): Promise<Address> {
    if (isServer()) {
      throw new Error('Server side not allowed. Use SDK in client environment.')
    }
    try {
      const addressNormalized: Address = await (
        await fetch(`${this._urls.normalizer}?${queryKey}=${address}`, {
          method: 'GET',
        })
      ).json()
      return addressNormalized
    } catch (error) {
      throw new Error(`Error getting address. Error: ${error}`)
    }
  }

  async getLocationsByAddress(address: Address) {
    if (isServer()) {
      throw new Error('Server side not allowed. Use SDK in client environment.')
    }
    try {
      const locations: Address[] = await (
        await fetch(`${this._urls.locator}`, {
          method: 'POST',
          body: JSON.stringify(address),
        })
      ).json()
      return locations
    } catch (error) {
      throw new Error(`Error getting locations. Error: ${error}`)
    }
  }

  async getOffersByParams(params: any[]): Promise<Offer[]> {
    if (isServer()) {
      throw new Error('Server side not allowed. Use SDK in client environment.')
    }
    try {
      const paramsEntries = Object.entries(params)
      const offers: Offer[] = await (
        await fetch(
          `${this._urls.visibility}?
      ${paramsEntries.map(
        (param, index) => `${index >= 0 ? '&' : ''}${param[0]}=${param[1]}`
      )}`,
          {
            method: 'GET',
          }
        )
      ).json()
      return offers
    } catch (error) {
      throw new Error(
        `Error getting offers for location ${JSON.stringify(
          params
        )}. Error: ${error}`
      )
    }
  }
}
