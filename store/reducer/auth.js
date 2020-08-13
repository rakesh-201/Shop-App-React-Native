import { AUTHENTICATE, LOGOUT } from '../action/auth'
const initialState = {
    token: null,
    userId: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
            return {
                token: null,
                userId: null
            }
        case AUTHENTICATE:
            return {
                token: action.token,
                userId: action.userId
            }
        default:
            return state
    }
}