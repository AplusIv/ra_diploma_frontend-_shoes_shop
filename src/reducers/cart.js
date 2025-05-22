import {
  ADD_TO_CART,
  CANCEL_PROMO,
  CLEAR_PRODUCTS,
  DELETE_FROM_CART,
  USE_PROMO,
} from "../constants/actions";
import promoCodes from "../constants/promocodes";

const initialState = {
  products: [
    // {
    //   id: 71,
    //   size: "12 US",
    //   quantity: 2,
    //   price: 900,
    //   title: "Вьетнамки с ремешками",
    // },
  ],
  promoCode: { value: "", discount: 0, status: null },
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      console.log(action);
      if (
        state.products.find(
          (product) => product.id === action.id && product.size === action.size
        )
      ) {
        return {
          ...state,
          products: state.products.map((product) => {
            if (product.id === action.id && product.size === action.size) {
              return {
                id: product.id,
                size: product.size,
                quantity: (product.quantity += action.quantity),
                price: product.price,
                title: product.title,
              };
            } else {
              return {
                id: product.id,
                size: product.size,
                quantity: product.quantity,
                price: product.price,
                title: product.title,
              };
            }
          }),
        };
      } else {
        return {
          ...state,
          products: [
            ...state.products,
            {
              id: action.id,
              size: action.size,
              quantity: action.quantity,
              price: action.price,
              title: action.title,
            },
          ],
        };
      }
    case DELETE_FROM_CART:
      const filtredProducts = state.products.filter((product, index) => {
        console.log(
          index,
          !(product.id === action.id && product.size === action.size)
        );
        return !(product.id === action.id && product.size === action.size); // включить в массив, если условие обратное
      });
      return { ...state, products: filtredProducts };

    // clear_products
    case CLEAR_PRODUCTS:
      return {
        ...state,
        products: [],
        promoCode: { value: "", discount: 0, status: null },
      };
    case USE_PROMO:
      if (Object.keys(promoCodes).includes(action.promoCode)) {
        return {
          ...state,
          promoCode: {
            value: action.promoCode,
            discount: promoCodes[action.promoCode],
            status: "accepted",
          },
        };
      } else {
        return {
          ...state,
          promoCode: {
            value: action.promoCode,
            discount: 0,
            status: "failed",
          },
        };
      }

    case CANCEL_PROMO:
      return { ...state, promoCode: { value: "", discount: 0, status: null } };

    default:
      return state;
  }
};
