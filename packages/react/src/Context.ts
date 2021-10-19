import { CoverageState, initialState } from './State'

import { createContext } from 'react'

export const Context = createContext<CoverageState>({
  state: initialState,
  coverage: null,
})
