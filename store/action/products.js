import Products from "../../models/products";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const FETCH_PRODUCT = "FETCH_PRODUCT";

export const fetchProduct = () => {
    return async(dispatch, getState) => {
        const userId = getState().auth.userId;

        try {
            const products = await fetch(
                "https://r-company.firebaseio.com/products.json", {
                    method: "GET",
                }
            );

            if (!products.ok) {
                throw "Something went wrong!";
            }

            const prods = await products.json();

            const prodList = [];
            for (const key in prods) {
                prodList.push(
                    new Products(
                        key,
                        prods[key].userId,
                        prods[key].title,
                        prods[key].imageUrl,
                        prods[key].description,
                        prods[key].price
                    )
                );
            }

            dispatch({
                type: FETCH_PRODUCT,
                products: prodList,
                userProducts: prodList.filter((product) => (product.userId = userId)),
            });
        } catch (err) {
            throw err;
        }
    };
};

export const deleteProduct = (id) => {
    return async(dispatch, getState) => {
        const token = getState().auth.token;
        await fetch(
            `https://r-company.firebaseio.com/products/${id}.json?auth=${token}`, {
                method: "DELETE",
            }
        );
        dispatch({ type: DELETE_PRODUCT, dataId: id });
    };
};

export const editProduct = (data) => {
    const { title, imageUrl, id, description } = data;
    return async(dispatch, getState) => {
        const token = getState().auth.token;

        await fetch(
            `https://r-company.firebaseio.com/products/${id}.json/auth=${token}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    imageUrl,
                    description,
                }),
            }
        );
        dispatch({ type: EDIT_PRODUCT, data: data });
    };
};

export const createProduct = (data) => {
    const { title, imageUrl, price, description } = data;
    return async(dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(
            `https://r-company.firebaseio.com/products.json?auth=${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    imageUrl,
                    price,
                    description,
                }),
            }
        );

        const res = await response.json();

        const items = {
            id: res.name,
            userId: userId,
            title,
            imageUrl,
            price,
            description,
        };

        dispatch({ type: CREATE_PRODUCT, data: items });
    };
};