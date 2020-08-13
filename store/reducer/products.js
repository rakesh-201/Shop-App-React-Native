import PRODUCTS from "../../assets/dummy-data";
import { DELETE_PRODUCT, CREATE_PRODUCT, EDIT_PRODUCT, FETCH_PRODUCT } from '../action/products'
import Products from "../../models/products";

const initialState = {
    availableProducts: [],
    userProducts: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCT:
            console.log('one')
            return {
                ...state,
                availableProducts: action.products,
                userProducts: action.userProducts
            }

        case DELETE_PRODUCT:
            var index = state.userProducts
            index = index.findIndex(product => product.id === action.dataId)
            var updatedUserProducts = state.userProducts
            if (index >= 0) {
                updatedUserProducts.splice(index, 1)
            }
            index = state.availableProducts
            index = index.findIndex(product => product.id === action.dataId)
            var updatedAvailableProducts = state.availableProducts
            if (index >= 0) {
                updatedAvailableProducts.splice(index, 1)
            }
            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            }
        case CREATE_PRODUCT:
            const newProduct = new Products(action.data.id, action.data.userId, action.data.title, action.data.imageUrl, action.data.description, action.data.price)
            return {
                ...state,
                userProducts: state.userProducts.concat(newProduct),
                availableProducts: state.availableProducts.concat(newProduct)
            }

        case EDIT_PRODUCT:
            const index1 = state.availableProducts.findIndex(item => item.id === action.data.id)
            const index2 = state.userProducts.findIndex(item => item.id === action.data.id)
            const editedProduct = new Products(action.data.id, 'u1', action.data.title, action.data.imageUrl, action.data.description, state.availableProducts[index1].price)
            var items1 = state.availableProducts
            var items2 = state.userProducts
            items1[index1] = editedProduct
            items2[index2] = editedProduct

            return {
                ...state,
                userProducts: items2,
                availableProducts: items1,
            }
        default:
            return state
    }
}