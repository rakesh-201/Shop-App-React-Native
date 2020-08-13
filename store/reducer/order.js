import { ORDER, FETCH_ORDER } from "../action/order"
import Order from '../../models/order'

const initialState = {
    products: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDER:
            return {
                ...state,
                products: action.data
            }
        case ORDER:
            const item = new Order(action.data.ordersId.name, action.data.totalPrice, action.data.items, action.data.date)
            const updatedProducts = state.products.concat(item)
            return {
                ...state,
                products: updatedProducts
            }
        default:
            return state
    }
}