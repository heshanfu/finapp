import firebase from 'firebase/app'
import localforage from 'localforage'
import moment from 'moment'

import { db } from '@/firebase'
import debugUid from '@/debug'

export default {
  initUser ({ dispatch }, userParams) {
    let uid
    if (debugUid && userParams.email === 'ilya.komichev@gmail.com') {
      uid = debugUid
    } else {
      uid = userParams.uid
    }

    const user = {
      displayName: userParams.displayName,
      email: userParams.email,
      uid: uid
    }

    dispatch('setUser', user)
    dispatch('saveUserInfo', user)
    dispatch('saveLastLoginDate', user)

    if (!debugUid) {
      dispatch('saveUserInfo', user)
      dispatch('saveLastLoginDate', user)
    }
  },

  setUser ({ commit }, user) {
    commit('setUser', user)
    localforage.setItem('next.user', user)
  },

  async signOut ({ rootState, commit, dispatch }) {
    commit('setAppStatus', 'login')
    dispatch('unsubcribeCategories')
    dispatch('unsubcribeTrns')
    dispatch('unsubcribeWallets')
    dispatch('clearUserData')
    firebase.auth().signOut()
  },

  saveUserInfo ({ rootState }) {
    const user = rootState.user.user
    db.ref(`users/${user.uid}/user`).set(user)
    db.ref(`users/${user.uid}/displayName`).set(user.displayName)
  },

  saveLastLoginDate ({ rootState }) {
    const user = rootState.user.user
    const lastLoginDate = moment().format('YYYY-MM-DD:HH:mm')
    db.ref(`users/${user.uid}/lastLoginDate`).set(lastLoginDate)
  }
}