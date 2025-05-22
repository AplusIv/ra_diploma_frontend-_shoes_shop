import { Col, Row, Button } from "react-bootstrap";
import TopSales from "../components/TopSales";

// заглушки
import productsJson from "../../data/products.json";
import categoriesJson from "../../data/categories.json";
//
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";

const Main = () => {
  // all products
  const products = JSON.parse(JSON.stringify(productsJson));
  // all categories
  const categories = JSON.parse(JSON.stringify(categoriesJson));

  // top-sales ids
  const topSaleIds = [66, 65, 73];

  // хиты продаж
  const topSales = products.filter((product) =>
    topSaleIds.includes(product.id)
  );

  // offset (сколько показывать и сколько загружать дополнительно)
  const offset = 6;
  // const moreCount = 6; // вместо запросов

  // Для запросов по выбранной категории (или категория "все")
  const [productsArray, setProductsArray] = useState(products);

  // Pagination
  const [page, setPage] = useState(1);

  const [end, setEnd] = useState(6);

  const [productsArrayPage, setProductsArrayPage] = useState(
    // products.slice(0, offset)
    []
  );

  // categories states
  const [activeKey, setActiveKey] = useState("all");
  const handleSelect = (eventKey, e) => {
    setActiveKey(eventKey);
    console.log(eventKey);
    console.log(e.target);

    if (eventKey === "all") {
      console.log(`get request: http://localhost:7070/api/items`);
      setPage(1);
      setEnd(offset);
      setProductsArray([...products]);
      setProductsArrayPage([...products].slice(0, offset));
    } else {
      console.log(
        `get request: http://localhost:7070/api/items?categoryId=${eventKey}`
      );
      const productsByCategory = products.filter(
        (product) => product.category === Number(eventKey)
      );
      setPage(1);
      setEnd(offset);
      setProductsArray(productsByCategory);
      setProductsArrayPage(productsByCategory.slice(0, offset));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      // setEnd(end + 6);
      setProductsArrayPage(productsArray.slice(0, end));
    }, 500);
  }, [page]);

  return (
    <main className="container">
      <Row>
        <Col>
          <TopSales products={topSales} />

          <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            <Categories
              categories={categories}
              activeKey={activeKey}
              handleSelect={handleSelect}
            />
            <Row className="row">
              {productsArrayPage.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  cardClassName="catalog-item-card"
                  basePath="catalog/"
                />
              ))}
            </Row>
            {productsArray.length - productsArrayPage.length > offset &&
              productsArrayPage.length > 0 && (
                <div className="text-center">
                  <Button
                    variant="outline-primary"
                    className="btn-outline-primary"
                    onClick={() => {
                      setPage(page + 1);
                      setEnd(end + 6);
                    }}
                  >
                    Загрузить ещё
                  </Button>
                </div>
              )}
          </section>
        </Col>
      </Row>
    </main>
  );
};

export default Main;

// server

// const [topSalesData, setTopSalesData] = useState(undefined);
// useEffect(() => {
// console.log('TopSales loading...')
//   async () => {
//     try {
//       const res = await fetch("http://localhost:7070/api/top-sales");
//       const data = await res.json();
//       setTopSalesData([...data]);
// // возможно добавить дата лоадед в redux
//     } catch (error) {
//       console.log(error);
// // возможно добавить data failed в redux
//     }
//   };
// }, []);

// const [categoriesData, setCategoriesData] = useState(undefined);
// const [productsData, setProductsData] = useState(undefined);
// // При смене категории делается новый запрос, предыдущие загруженные данные удаляются.
// useEffect(() => {
//   console.log("Categories loading...");
//   console.log("Products by active category loading...");
//   async () => {
//     try {
//       const res = await fetch("http://localhost:7070/api/categories");
//       const data = await res.json();
//       setCategoriesData([...data]);
//       // возможно добавить дата лоадед в redux

//       if (activeKey === "all") {
//         const res = await fetch("http://localhost:7070/api/items");
//         const data = await res.json();
//         setProductsData([...data]);
//         // возможно добавить дата лоадед в redux
//       } else {
//         const res = await fetch(
//           `http://localhost:7070/api/items?categoryId=${activeKey}`
//         );
//         const data = await res.json();
//         setProductsData([...data]);
//         // возможно добавить дата лоадед в redux
//       }
//     } catch (error) {
//       console.log(error);
//       // возможно добавить data failed в redux
//     }
//   };
// }, [activeKey]);

// useEffect(() => {
//   console.log('More Products loading...')
//     async () => {
//       try {
//         if (activeKey === "all") {
//           const res = await fetch(`http://localhost:7070/api/items?offset=${offset}`);
//           const data = await res.json();
//           setProductsData([...productsData, ...data]); // увеличить массив на оффсет, загрузив новые данные
//     // возможно добавить дата лоадед в redux
//         } else {
//           const res = await fetch(`http://localhost:7070/api/items?categoryId=${activeKey}&offset=${offset}`);
//           const data = await res.json();
//           setProductsData([...productsData, ...data]); // увеличить массив на оффсет, загрузив новые данные
//     // возможно добавить дата лоадед в redux
//         }
//       } catch (error) {
//         console.log(error);
//   // возможно добавить data failed в redux
//       }
// }, [page]);

// http://localhost:7070/api/items?categoryId=X&offset=6
