import { Coverage } from '@finetwork/coverage'

export const coverage = new Coverage({
  storage: typeof window !== 'undefined' ? localStorage : null,
  urls: {
    normalizer: process.env.URL_NORMALIZER,
    locator: process.env.URL_LOCATOR,
    visibility: process.env.URL_VISIBILITY,
  },
})
