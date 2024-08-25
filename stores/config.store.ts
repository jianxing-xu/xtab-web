import { StoreKey } from '@/utils/constants'
import { createPersistStore } from '@/utils/store'

const DEFAULT_CONFIG = {}

export const useAppConfig = createPersistStore(
  { ...DEFAULT_CONFIG },
  set => ({
    reset() {
      set(() => ({ ...DEFAULT_CONFIG }))
    },

    allModels() {},
  }),
  {
    name: StoreKey.Config,
    version: 3.9,
    migrate() {},
  },
)
