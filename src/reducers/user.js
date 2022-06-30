import { handleActions } from 'redux-actions'
import { createAction } from 'redux-actions'
import produce from 'immer'
import fromExponential from 'from-exponential'

import { endSession } from '../lib/user'
export const setUserAction = 'user/setUser'
export const setUser = createAction(setUserAction)
export const updateMatchPromoAction = 'user/updateMatchPromo'
export const updateMatchPromo = createAction(updateMatchPromoAction)
export const logoutAction = 'user/logout'
export const logout = createAction(logoutAction)
export const addNotificationAction = 'user/addNotification'
export const addNotification = createAction(addNotificationAction)
export const markNotificationsReadAction = 'user/readNotifications'
export const markNotificationsRead = createAction(markNotificationsReadAction)
export const changeUserSettingAction = 'user/changeUserSetting'
export const changeUserSetting = createAction(changeUserSettingAction)

export const updateBalanceAction = 'user/updateBalance'
export const updateBalance = createAction(updateBalanceAction)

export const setSelectedAssetCodeCodeAction = 'user/setSelectedAssetCode'
export const setSelectedAssetCode = createAction(setSelectedAssetCodeCodeAction)




const initialState = null

function normalizeUser(user) {
  /*for (const b of BalanceFields) {
    if (user[b.balanceField]) {
      user[b.balanceField] = parseFloat(
        fromExponential(user[b.balanceField]).substring(0, 8),
      )
    }
  }*/

  return user
}

export default handleActions(
  {
    [setSelectedAssetCodeCodeAction]: (state, { payload }) =>
      produce(state, draft => {
        localStorage.setItem('selectedAssetCode',payload.assetCode);
        draft.selectedAssetCode = payload.assetCode;
      }),

    [updateBalanceAction]: (state, { payload }) =>
      produce(state, draft => {
        draft.balances = Object.keys(draft.balances).map(k => {
          const b = draft.balances[k]
          if (b.code === payload.assetCode) {
            b.balance = payload.balance;
          }
          return b;
        })
      }),

    [setUserAction]: (state, { payload }) =>
      produce(state, draft => {
        const newUser = {
          ...draft,
          ...payload,
          selectedAssetCode: localStorage.getItem('selectedAssetCode') || 'btc',
        }

        if (!newUser.id) {
          return state
        }

        return normalizeUser(newUser)
      }),
    [logoutAction]: (state, { payload }) =>
      produce(state, draft => {
        // endSession()
        return null
      }),
    [changeUserSettingAction]: (state, { payload }) =>
      produce(state, draft => {
        draft.systemSettings[payload.systemName][payload.settingName] =
          payload.value
      }),
  },
  initialState,
)
