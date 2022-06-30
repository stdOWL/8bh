import { api, store, notify } from '../util'

export const getLatestMessages = async () => {
  const response = await api.get('/chat/latest');
  return response
}

export const sendMessage = async message => {
  try {
    const response = await api.post('/chat/message', {
      message
    })
    return response
  } catch (err) {
    notify.error(err.response.data)
  }
}

export const deleteMessage = async id => {
  try {
    const response = await api.post('/chat/delete', {
      id,
    })
    return response
  } catch (err) {
    throw err.response.data
  }
}

export const setLocale = async locale => {
  try {
    const response = await api.post('/chat/setLocale', {
      locale,
    })
    // store.dispatch(chatGenericUpdate({
    //   locale: locale
    // }))
    return response
  } catch (err) {
    throw err.response.data
  }
}
