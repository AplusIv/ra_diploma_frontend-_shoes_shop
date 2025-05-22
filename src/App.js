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
import Product, { productLoader } from "./pages/Product";
import Order from "./pages/Order";

// loaders
// import {productLoader} from ".pages/Product";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<BannerLayout />}>
        <Route index element={<Main />} />
        <Route path="about" element={<About />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="cart" element={<Cart />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="catalog/:id" element={<Product />} />

        {/* не используется */}
        <Route path="order" element={<Order />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
