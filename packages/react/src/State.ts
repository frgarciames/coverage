import { Address, Coverage } from '@finetwork/coverage'

export type State = {
  installationAddress: Address
  addressHistory: Address[]
}

export type CoverageState = {
  state: State
  coverage: Coverage
}

export const initialState: State = {
  installationAddress: null,
  addressHistory: [],
}
