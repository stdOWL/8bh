import { api, store, notify } from '../util'

export const getRecentBetHistory = async () => {
  const response = await api.get('/bet/getRecentBetHistory');
  return response
}
