import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { cartReducer } from "./reducers/cart";

import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

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
const store = createStore(cartReducer, loadFromLocalStorage());

// Выведем в консоль начальное состояние
console.log(store.getState());
console.log(store.getState().products);
// Каждый раз при обновлении состояния - выводим его
// store.subscribe() возвращает функцию для отмены регистрации слушателя unsubscribe
const unsubscribe = store.subscribe(() => {
  saveToLocalStorage(store.getState()); // запись в сторадж
  console.log({ store: store.getState() });
});

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
