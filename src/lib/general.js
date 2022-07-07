import { env } from '../common'
import { toast } from 'react-toastify'
import {
    store, api, token
} from '../util'
import { setLoadingState } from '../reducers/general'

export const setLoading = async (title) => {
    store.dispatch(setLoadingState(title))
}
