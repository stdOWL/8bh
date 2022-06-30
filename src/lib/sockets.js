import io from 'socket.io-client'
import { env } from '../common'
import { store } from '../util'
import { setUser, updateBalance } from '../reducers/user'

export class Sockets {
  constructor() {
    this.socketToken = null
    this._dcStartTimer = null
    this._dcTimer = null
    this._reloadOnConnect = null

    this._socket = io(env.STREAM_URL, {
      forceNew: true,
      'force new connection': true,
      transports: ['websocket'],
      reconnectionDelay: 250,
      reconnectionDelayMax: 250,
    })

    window.socketio = this._socket

    this._socket.on('connect', () => {
      clearTimeout(this.dcTimer)
      clearTimeout(this.dcStartTimer)
     // store.dispatch(setSettings({ disconnected: false }))
    })

    

    this._socket.on('balance_update', (balanceInfo) => {
      store.dispatch(updateBalance(balanceInfo))
    })

    this._socket.on('refreshRequired', () => {
    //  store.dispatch(setSettings({ update: true }))
    })

    this._socket.on('forceRefresh', () => {
      window.location.reload()
    })

    this._socket.on('securityInfoChange', payload => {
      store.dispatch(setUser({ security: payload.new_val }))
    })

    var updateInterval
    var toUpdate = {}
    window.canAddBalance = true


   
  
    this._socket.on('disconnect', () => {
      clearTimeout(this.dcTimer)
      clearTimeout(this.dcStartTimer)
      this.dcStartTimer = setTimeout(() => {
      //  store.dispatch(setSettings({ disconnected: true }))
        this.dcTimer = setTimeout(() => {
          this.reloadOnConnect = true
        }, 10000)
      }, 5000)
    })

    this._socket.on('reconnect', () => {
    //  store.dispatch(setSettings({ disconnected: false }))
      if (this.reloadOnConnect || window.reloadOnConnect) {
        return window.location.reload()
      }

      const { user } = store.getState()

      if (user) {
    //    store.dispatch(setSocketUser(user.id))
      }

      clearTimeout(this.dcTimer)
      clearTimeout(this.dcStartTimer)
    })
  }

  subscribeUser(stream_token){
    this._socket.emit('subscribe',`user:${stream_token}`);
  }
  unsubscribeUser(stream_token){
    this._socket.emit('unsubscribe',`user:${stream_token}`);
  }

  setToken(token) {
    this.socketToken = token
  }
}

export const defaultSocket = new Sockets()
