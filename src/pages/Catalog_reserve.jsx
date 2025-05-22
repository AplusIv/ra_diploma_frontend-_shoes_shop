import { useEffect, useState } from "react";
import { Row, Col, Card, Form, Nav, Button } from "react-bootstrap";

// заглушки
import productsJson from "../../data/products.json";
import categoriesJson from "../../data/categories.json";
//
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import Banner from "../components/Banner";

const Catalog = () => {
  // all products
  const products = JSON.parse(JSON.stringify(productsJson));
  // all categories
  const categories = JSON.parse(JSON.stringify(categoriesJson));

  // offset (сколько показывать и сколько загружать дополнительно)
  const offset = 6;
  // const moreCount = 6; // вместо запросов

  // Pagination
  const [page, setPage] = useState(1);

  const [end, setEnd] = useState(6);

  // Для запросов по выбранной категории (или категория "все")
  const [productsArray, setProductsArray] = useState(products);

  const [productsArrayPage, setProductsArrayPage] = useState(
    // products.slice(0, offset)
    []
  );

  // searching field
  const [searchField, setSearchField] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productsArray);

  // categories states
  const [activeKey, setActiveKey] = useState("all");
  const handleSelect = (eventKey, e) => {
    setActiveKey(eventKey);
    console.log(eventKey);
    console.log(e.target);

    if (eventKey === "all") {
      console.log(`get request: http://localhost:7070/api/items`);

      // если введены данные в строку поиска
      let filtredProductsByAll;
      if (searchField) {
        filtredProductsByAll = products.filter(
          (product) =>
            product.title.toLowerCase().includes(searchField.toLowerCase()) ||
            product.color.toLowerCase().includes(searchField.toLowerCase())
        );
      }

      setPage(1);
      setEnd(offset);
      searchField == false
        ? setProductsArray([...products])
        : setProductsArray(filtredProductsByAll);
      searchField == false
        ? setProductsArrayPage([...products].slice(0, offset))
        : setProductsArrayPage(filtredProductsByAll.slice(0, offset));
    } else {
      console.log(
        `get request: http://localhost:7070/api/items?categoryId=${eventKey}`
      );
      const productsByCategory = products.filter(
        (product) => product.category === Number(eventKey)
      );

      // если введены данные в строку поиска
      let filtredProductsByCategory;
      if (searchField) {
        filtredProductsByCategory = productsByCategory.filter(
          (product) =>
            product.title.toLowerCase().includes(searchField.toLowerCase()) ||
            product.color.toLowerCase().includes(searchField.toLowerCase())
        );
      }
      setPage(1);
      setEnd(offset);
      searchField == false
        ? setProductsArray(productsByCategory)
        : setProductsArray(filtredProductsByCategory);
      searchField == false
        ? setProductsArrayPage(productsByCategory.slice(0, offset))
        : setProductsArrayPage(filtredProductsByCategory.slice(0, offset));
    }
  };
  console.log({ productsArray });

  // searching
  const handleInputChange = (e) => {
    console.log("handleInputChange");
    console.log(e.target.value);
    console.log(e);

    setSearchField(e.target.value.trim());

    if (e.target.value !== "") {
      // filter the items using the apiUsers state
      const filteredItems = products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchField.toLowerCase()) ||
          product.color.toLowerCase().includes(searchField.toLowerCase())
      );
      setFilteredProducts(filteredItems);
    } else {
      setFilteredProducts(products);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("onSubmit");

    // setProductsArrayPage(filteredProducts);
    setPage(1);
    setEnd(offset);
    setProductsArray([...filteredProducts]);
    setProductsArrayPage([...filteredProducts].slice(0, offset));
  };

  useEffect(() => {
    setTimeout(() => {
      console.log(end, page);
      // setEnd(end + 6);

      // доработать вариант
      setProductsArrayPage(productsArray.slice(0, end));
      // searchField == false
      //   ? setProductsArrayPage(productsArray.slice(0, end))
      //   : setProductsArrayPage(filteredProducts.slice(0, end));
    }, 500);
  }, [page]);

  return (
    <main class="container">
      <Row>
        <Col>
          <Banner
            src="https://raw.githubusercontent.com/netology-code/ra16-diploma/refs/heads/master/html/img/banner.jpg"
            text="К весне готовы!"
          />
          <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            {/* <form className="catalog-search-form form-inline">
              <input className="form-control" placeholder="Поиск" />
            </form> */}
            <Form
              onSubmit={onSubmit}
              className="catalog-search-form form-inline"
            >
              <Form.Control
                value={searchField}
                onChange={handleInputChange}
                onBlur={onSubmit}
                type="search"
                placeholder="Поиск"
              />
            </Form>
            <Categories
              categories={categories}
              activeKey={activeKey}
              handleSelect={handleSelect}
            />
            <Row className="row">
              {productsArrayPage.length > 0 ? (
                productsArrayPage.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    cardClassName="catalog-item-card"
                  />
                ))
              ) : (
                <p className="text-center">
                  Повторите поиск, товары не найдены
                </p>
              )}
            </Row>
            {productsArray.length - productsArrayPage.length >= offset &&
              productsArrayPage.length > 0 && (
                <div className="text-center">
                  <Button
                    variant="outline-primary"
                    className="btn-outline-primary"
                    onClick={() => {
                      setPage(page + 1);
                      setEnd(end + offset);
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

export default Catalog;
