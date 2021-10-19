import { Context } from './Context'
import { CoverageState } from './State'
import { useContext } from 'react'

export const useCoverage = (): CoverageState => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('useCoverage must be use within CoverageProvider')
  }
  return context
}
