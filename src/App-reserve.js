import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// layouts
import RootLayout from "./layouts/RootLayout";
import BannerLayout from "./layouts/BannerLayout";

// pages
import Main from "./pages/Main";
import Catalog from "./pages/Catalog";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Product, { productLoader } from "./pages/Product";
import Order from "./pages/Order";

// loaders
// import {productLoader} from ".pages/Product";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Main />} />
      {/* <Route path="catalog" element={<Catalog />} /> */}
      <Route path="about" element={<About />} />
      <Route path="contacts" element={<Contacts />} />
      <Route path="cart" element={<Cart />} />

      {/* <Route path="products" element={<Products />} /> */}
      {/* <Route path="catalog" element={<Catalog />}>
        <Route path="product" element={<Product />} />
      </Route> */}

      <Route path="catalog" element={<BannerLayout />}>
        <Route index element={<Catalog />} />
        {/* <Route path="product" element={<Product />} /> */}
        {/* <Route path=":id" element={<Product />} loader={productLoader}/> */}
        <Route path=":id" element={<Product />} />
      </Route>
      {/* <Route path="order" element={<Order />} /> */}
      <Route path="order" element={<BannerLayout />}>
        <Route index element={<Order />} />
      </Route>

      {/* <Route path="product" element={<Product />} /> */}

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return (
    <RouterProvider router={router} />

    // <div className="App">
    //   <h1>Hello CodeSandbox</h1>
    //   <h2>Start editing to see some magic happen!</h2>
    // </div>
  );
}
