import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { cartReducer } from "./reducers/cart";
import { orderReducer } from "./reducers/order";

import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import { searchReducer } from "./reducers/search";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// const commonStore = combineReducers({ cartReducer, orderReducer });

// sessionStorage синхронизация со стором

// запись в localStorage
const saveToLocalStorage = (state) => {
  try {
    const serialisedState = JSON.stringify(state);
    sessionStorage.setItem("cartState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
};

// чтение из localStorage: вернутся данные либо undefined
// invalid output must be undefined
const loadFromLocalStorage = () => {
  try {
    const serialisedState = sessionStorage.getItem("cartState");
    console.log({ serialisedState });
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

// Инициализация стора с помощью корневого редьюсера
const commonReducer = combineReducers({
  cart: cartReducer,
  order: orderReducer,
  search: searchReducer,
});

const commonStore = createStore(commonReducer, loadFromLocalStorage());

// Выведем в консоль начальное состояние
console.log(commonStore.getState());

// Каждый раз при обновлении состояния - выводим его
// commonStore.subscribe() возвращает функцию для отмены регистрации слушателя unsubscribe
const unsubscribe = commonStore.subscribe(() => {
  saveToLocalStorage(commonStore.getState()); // запись в сторадж
  console.log({ commonStore: commonStore.getState() });
});

root.render(
  <StrictMode>
    <Provider store={commonStore}>
      {/* <Provider store={store}> */}
      <App />
    </Provider>
  </StrictMode>
);
