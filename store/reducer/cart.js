import { ADD_TO_CART, DELETE_FROM_CART } from "../action/cart"
import CartItem from '../../models/cart'
import { ORDER } from '../action/order'

const initialState = {
    products: {},
    totalAmount: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            console.log('in')
            var itemId = action.product.id
            var product = state.products[itemId]
            console.log(product)
            let updatedProduct
            if (product) {
                updatedProduct = new CartItem(+product.quantity + 1, +product.productPrice,
                    product.title, +product.sum + +product.productPrice
                )
            } else {
                updatedProduct = new CartItem(
                    1, +action.product.price,
                    action.product.title, +action.product.price,
                )
            }
            return {
                ...state,
                totalAmount: (+state.totalAmount) + (+action.product.price),
                products: {
                    ...state.products,
                    [itemId]: updatedProduct,
                }
            }
        case DELETE_FROM_CART:
            itemId = action.product.id
            product = state.products[itemId]
            const totalPrice = state.totalAmount - product.productPrice
            if (product.quantity > 1) {
                updatedProduct = new CartItem(
                    quantity = +product.quantity - 1,
                    productPrice = +product.productPrice,
                    title = product.title,
                    sum = +product.sum - +product.productPrice
                )
                return {
                    ...state,
                    totalAmount: +totalPrice,
                    products: {
                        ...state.products,
                        [itemId]: updatedProduct
                    }
                }
            } else {
                const prod = state.products
                delete prod[itemId]
                return {
                    ...state,
                    products: prod,
                    totalAmount: +totalPrice
                }
            }
        case ORDER:
            return initialState
        default:
            return state
    }
}