import Order from "../../models/order"

export const ORDER = 'ORDER'
export const FETCH_ORDER = 'FETCH_ORDER'

export const fetchOrder = () => {
    try {
        return async(dispatch, getState) => {
            const userId = getState().auth.userId
            const token = getState().auth.token
            const orders = await fetch(`https://r-company.firebaseio.com/orders/${userId}.json?auth=${token}`, {
                method: 'GET'
            })

            if (!orders.ok) {
                throw new Error('Something went wrong!')
            }

            const order = await orders.json()

            const ords = []
            for (const key in order) {
                ords.push(
                    new Order(key, order[key].totalPrice, order[key].items, order[key].date)
                )
            }

            dispatch({ type: FETCH_ORDER, data: ords })
        }
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const order = (items, totalPrice) => {
    const date = new Date()
    return async(dispatch, getState) => {
        const token = getState().auth.token
        const userId = getState().auth.userId
        try {
            const orders = await fetch(`https://r-company.firebaseio.com/orders/${userId}.json?auth=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    items,
                    totalPrice,
                    date
                })
            })

            if (!orders.ok) {
                throw ('Something went wrong!')
            }

            const ordersId = await orders.json()

            console.log(ordersId)
            await dispatch({ type: ORDER, data: { ordersId, items, totalPrice, date } })

        } catch (err) {
            throw (err)
        }
    }
}