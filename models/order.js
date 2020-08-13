class Order {
    constructor(
        id,
        totalAmount,
        items,
        date
    ) {
        this.id = id
        this.totalAmount = totalAmount
        this.items = items
        this.date = date
    }
}

export default Order