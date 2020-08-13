import { AsyncStorage } from "react-native"

export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

let timer;

export const tryAuth = (token, userId, expirationTime = 0) => {
    return (dispatch) => {
        if (expirationTime) {
            dispatch(setLogoutTimer(expirationTime))
        }
        dispatch({
            type: AUTHENTICATE,
            token,
            userId
        })
    }
}

export const addUser = (email, password) => {
    return async dispatch => {
        try {
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKjEygeSS2oCeQmRaSChHA6p-YbUNsE_g', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true
                })
            })
            if (!res.ok) {
                const errData = await JSON.parse(res)
                console.log(errData)
                throw new Error('Something Went Wrong!')
            }

            const resData = await JSON.parse(res)

            const expirationDate = new Date(
                new Date().getTime() + parseInt(resData.expiresIn) * 1000
            )

            storeDataToStorage(resData.idToken, resData.localId)

            dispatch(tryAuth(resData.idToken, resData.localId))
        } catch (err) {
            throw (err)
        }
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDKjEygeSS2oCeQmRaSChHA6p-YbUNsE_g', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true
                })
            })


            if (!res.ok) {
                throw new Error('Something Went Wrong!')
            }

            const resData = await res.json()

            const expirationDate = new Date(
                new Date().getTime() + parseInt(resData.expiresIn) * 1000
            )

            storeDataToStorage(resData.idToken, resData.localId, expirationDate)

            dispatch(tryAuth(resData.idToken, resData.localId, expirationDate))
        } catch (err) {
            throw (err)
        }
    }
}

export const logout = () => {
    clearLogoutTimer()
    return { type: LOGOUT }
}

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer)
    }
    AsyncStorage.removeItem("UserData")
}

const setLogoutTimer = (expirationTime) => {
    timer = setTimeout(() => {
        logout()
    }, expirationTime.getTime() * 1000)
}

const storeDataToStorage = (idToken, localId, expirationDate) => {
    AsyncStorage.setItem('UserData', JSON.stringify({
        idToken,
        localId,
        expirationDate: expirationDate.toISOString()
    }))
}