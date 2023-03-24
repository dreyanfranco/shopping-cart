import { createContext, useReducer } from "react";

// Context (cart, addToCart, removeCart)
// Provider -> gives react app access to all the things in the context

const cartKey = 'cart-items';

const initialState = {
    items: localStorage.getItem(cartKey) ? JSON.parse(localStorage.getItem(cartKey)) : [],
}

// provides the info (state) from cart. I'm passing initialState because values will be provided by whatever is in localStorage

export const CartContext = createContext(initialState);

// provides the function that lets components dispatch actions 

export const CartDispatchContext = createContext(null);

function getItemQuantity(id, state) {

    // the ? checks if id of item exists, otherwise it would return 0
    const quantity = state.items.find(item => item.id === id)?.quantity;

    if (quantity === undefined) {
        return 0;
    }
    return quantity;
}

function addOneToCart(product, state) {
    fetch('https://itx-frontend-test.onrender.com/api/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: product.id,
            colorCode: product.options.color,
            storageCode: product.options.storage
        })
    })
        .catch(error => {
            console.log(error);
        });

    return updateCartState(product, state);
}

function updateCartState(product, state) {
    const quantity = getItemQuantity(product.id, state);
    let cartItems = [];

    if (quantity === 0) { // item is not in cart
        cartItems = [
            ...state.items,
            {
                ...product,
                quantity: 1
            }
        ]
    } else {    // product is in cart
        // [ { id: 1, quantity: 3}, { id: 2, quantity: 1 + 1 }]

        cartItems = state.items.map(
            item =>
                (item.id === product.id)
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
        )
    }

    localStorage.setItem(cartKey, JSON.stringify(cartItems));

    return cartItems;
}

function removeOneFromCart(id, state) {
    const quantity = getItemQuantity(id, state);
    let cartItems = [];

    if (quantity == 1) {
        cartItems = deleteFromCart(id, state);
    } else {
        cartItems = state.items.map(
            item =>
                (item.id === id)
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
        )
    };

    localStorage.setItem(cartKey, JSON.stringify(cartItems));

    return cartItems;
}

function deleteFromCart(id, state) {
    // [] if an object meets a condition, add the object to array
    // [item1, item2, item3]
    // [item1, item3]

    const cartItems = state.items.filter(currentItem => {
        return currentItem.id != id;
    });

    localStorage.setItem(cartKey, JSON.stringify(cartItems));

    return cartItems;
}

function reducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case 'addOneToCart':
            return {
                ...state,
                items: addOneToCart(payload, state),
            }
        case 'removeOneFromCart':
            return {
                ...state,
                items: removeOneFromCart(payload, state),
            }
        case 'deleteFromCart':
            return {
                ...state,
                items: deleteFromCart(payload, state),
            }

    }
}

// Here I'm importing both contexts CartContext and CartDispatchContext. Then I pass the state (items?) and dispatch (functions logic?) as value to them.

function CartProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <CartContext.Provider value={state}>
            <CartDispatchContext.Provider value={dispatch}>
                {children}
            </CartDispatchContext.Provider>
        </CartContext.Provider>
    )
}

export default CartProvider;