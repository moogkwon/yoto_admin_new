import immutablePersistenceTransform from '../services/ImmutablePersistenceTransform'
import storage from 'redux-persist/lib/storage'

// More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1.0',
  storeConfig: {
    key: 'primary',
    storage: storage,
    // blacklist: [], // reducer keys that you do NOT want stored to persistence here
    whitelist: ['auth'], // Optionally, just specify the keys you DO want stored to
    // persistence. An empty array means 'don't store any reducers' -> infinitered/ignite#409
    transforms: [immutablePersistenceTransform]
  }
}

export default REDUX_PERSIST
