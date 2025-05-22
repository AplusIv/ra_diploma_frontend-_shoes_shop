import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { Row, Col, Card, Form, Nav, Button } from "react-bootstrap";

// заглушки
import productsJson from "../../data/products.json";
import categoriesJson from "../../data/categories.json";
//
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import Banner from "../components/Banner";

import { changeSearchField } from "../constants/actions";

const Catalog = () => {
  // redux
  const { searchField } = useSelector((state) => state.search);
  const dispatch = useDispatch();

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

  // Проверка использован ли поиск
  let initialProductsArray;

  if (searchField) {
    initialProductsArray = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchField.toLowerCase()) ||
        product.color.toLowerCase().includes(searchField.toLowerCase())
    );
  } else {
    initialProductsArray = [...products];
  }

  // Для запросов по выбранной категории (или категория "все")
  // const [productsArray, setProductsArray] = useState(products);
  const [productsArray, setProductsArray] = useState(initialProductsArray);

  const [productsArrayPage, setProductsArrayPage] = useState(
    // products.slice(0, offset)
    []
  );

  // searching field
  // const [searchField, setSearchField] = useState("");
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
        ? setProductsArrayPage([...products].slice(0, end))
        : setProductsArrayPage(filtredProductsByAll.slice(0, end));
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
        ? setProductsArrayPage(productsByCategory.slice(0, end))
        : setProductsArrayPage(filtredProductsByCategory.slice(0, end));
    }
  };
  console.log({ productsArray });

  // searching
  const handleInputChange = (e) => {
    console.log("handleInputChange");
    console.log(e.target.value);
    console.log(e);
    const { value } = e.target;

    dispatch(changeSearchField(value.trim()));
    // changeSearchField(value.trim());
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("onSubmit");

    if (searchField) {
      if (activeKey === "all") {
        const filteredItems = products.filter(
          (product) =>
            product.title.toLowerCase().includes(searchField.toLowerCase()) ||
            product.color.toLowerCase().includes(searchField.toLowerCase())
        );
        setFilteredProducts(filteredItems);

        setPage(1);
        setEnd(offset);
        setProductsArray(filteredItems);
        setProductsArrayPage(filteredItems.slice(0, end));
      } else {
        const productsByCategory = products.filter(
          (product) => product.category === Number(activeKey)
        );

        const filteredItems = productsByCategory.filter(
          (product) =>
            product.title.toLowerCase().includes(searchField.toLowerCase()) ||
            product.color.toLowerCase().includes(searchField.toLowerCase())
        );
        setFilteredProducts(filteredItems);

        setPage(1);
        setEnd(offset);
        setProductsArray(filteredItems);
        setProductsArrayPage(filteredItems.slice(0, end));
      }
    } else {
      console.log("форма поиска пуста");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      console.log(end, page);
      // setEnd(end + 6);

      // доработать вариант
      // const filteredItems = productsArray.filter(
      //   (product) =>
      //     product.title.toLowerCase().includes(searchField.toLowerCase()) ||
      //     product.color.toLowerCase().includes(searchField.toLowerCase())
      // );

      // searchField
      //   ? setProductsArrayPage(filteredItems.slice(0, end))
      //   : setProductsArrayPage(productsArray.slice(0, end));

      setProductsArrayPage(productsArray.slice(0, end));
      // searchField == false
      //   ? setProductsArrayPage(productsArray.slice(0, end))
      //   : setProductsArrayPage(filteredProducts.slice(0, end));
    }, 500);
  }, [page]);

  return (
    <main className="container">
      <Row>
        <Col>
          {/* <Banner
            src="https://raw.githubusercontent.com/netology-code/ra16-diploma/refs/heads/master/html/img/banner.jpg"
            text="К весне готовы!"
          /> */}
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
            <Row>
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
            {productsArray.length - end > 0 && productsArrayPage.length > 0 && (
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

/* // redux legacy
const mapStateToProps = (state) => {
  return {
    searchField: state.search.searchField,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeSearchField: (text) => {
      dispatch({ type: CHANGE_SEARCHFIELD, text });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalog); */
