import { handleActions } from 'redux-actions'
import { createAction } from 'redux-actions'
import produce from 'immer'

export const setLoadingStateAction = 'general/setLoadingState'
export const setLoadingState = createAction(setLoadingStateAction)



const initialState = {
    loadingState: false
};



export default handleActions(
  {
    [setLoadingStateAction]: (state, { payload }) =>
      produce(state, draft => {
        return {
          ...draft,
          loadingState: payload,
        }
      })
  },
  initialState,
)
