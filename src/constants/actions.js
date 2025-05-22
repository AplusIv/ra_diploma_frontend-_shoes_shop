// cart actions
export const INCREASE_ITEM = "INCREASE_ITEM";
export const DECREASE_ITEM = "DECREASE_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";

export const ADD_TO_CART = "ADD_TO_CART";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const CLEAR_PRODUCTS = "CLEAR_PRODUCTS";

// export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS";

export const USE_PROMO = "USE_PROMO";
export const CANCEL_PROMO = "CANCEL_PROMO";

export const MAKE_ORDER = "MAKE_ORDER";
export const CLEAR_ORDER = "CLEAR_ORDER";

// search
export const CHANGE_SEARCHFIELD = "CHANGE_SEARCHFIELD";

// export const CHANGE_SEARCHFIELD = "CHANGE_SEARCHFIELD";

export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";

export const TOGGLE_VISIBILITY = "TOGGLE_VISIBILITY";

// cart action generators (создание экшенов)
export const IncreaseItem = (text) => {
  return { type: INCREASE_ITEM, text };
};

// export const AddToCart = (id, title, price, size, quantity) => {
//   return { type: ADD_TO_CART, id, title, price, size, quantity };
// };

// export const DeleteFromCart = (id, size) => {
//   return { type: DELETE_FROM_CART, id, size };
// };

export const DeleteItem = (index) => {
  return { type: DELETE_ITEM, index };
};

// actions
// samples
export const addTodo = (id, text) => ({
  type: ADD_TODO,
  text,
  id,
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id,
});

// cart actions
export const AddToCart = ({ id, title, price, size, quantity }) => {
  return {
    type: ADD_TO_CART,
    id,
    title,
    price,
    size,
    quantity,
  };
};

export const deleteFromCart = (id, size) => {
  return {
    type: DELETE_FROM_CART,
    id,
    size,
  };
};

export const clearProducts = () => {
  return { type: CLEAR_PRODUCTS };
};

// Promo actions
export const usePromo = (promoCode) => {
  return { type: USE_PROMO, promoCode };
};

export const cancelPromo = () => {
  return { type: CANCEL_PROMO };
};

// Order actions
export const makeOrder = (owner, products, promoCode) => {
  return { type: MAKE_ORDER, owner, products, promoCode };
};
566;

export const clearOrder = () => {
  return { type: CLEAR_ORDER };
};

// Searching actions
export const changeSearchField = (text) => {
  return { type: CHANGE_SEARCHFIELD, text };
};

export const toggleVisibility = () => {
  return { type: TOGGLE_VISIBILITY };
};
