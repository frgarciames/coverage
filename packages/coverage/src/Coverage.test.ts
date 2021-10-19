import { Coverage } from './Coverage'
import { testInstallationAddress } from './utils'

describe('Coverage class', () => {
  let coverage: Coverage
  beforeEach(() => {
    coverage = new Coverage({
      urls: {
        locator: '',
        normalizer: '',
        visibility: '',
      },
    })
  })
  it('should be a Coverage instance', () => {
    expect(coverage instanceof Coverage).toBeTruthy()
  })
  it('should get installation address', () => {
    coverage.addInstallationAddress(testInstallationAddress)
    expect(coverage.installationAddress).toEqual(testInstallationAddress)
  })
  it('should get history address', () => {
    expect(coverage.addressHistory).toBeTruthy()
  })
  it('should update installation address', () => {
    const label = 'calle piruleta'
    coverage.addInstallationAddress(testInstallationAddress)
    coverage.updateInstallationAddress({
      label,
    })
    expect(coverage.installationAddress.label).toEqual(label)
  })
  it('should update history address when installation address is added', () => {
    coverage.addInstallationAddress(testInstallationAddress)
    expect(coverage.addressHistory).toHaveLength(1)
    coverage.addInstallationAddress(testInstallationAddress)
    expect(coverage.addressHistory).toHaveLength(2)
  })
  it('should be history an empty array when init', () => {
    expect(coverage.addressHistory).toHaveLength(0)
  })
  it('should add address to history', () => {
    coverage.addAddressToHistory(testInstallationAddress)
    expect(coverage.addressHistory).toHaveLength(1)
  })
  it('should remove address from history', () => {
    const lenghtArr = 3
    const expectedArrLength = 2
    const indexToRemove = 1
    new Array(lenghtArr).fill('').forEach((a) => {
      coverage.addAddressToHistory(testInstallationAddress)
    })
    coverage.removeAddressFromHistory(indexToRemove)
    expect(coverage.addressHistory).toHaveLength(expectedArrLength)
  })
})
