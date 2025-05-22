import { useDispatch } from "react-redux";

import { Col, Row, Card, Table, ButtonGroup, Button } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { useParams } from "react-router-dom";
import Banner from "../components/Banner";

import { useState } from "react";
import ProductSize from "../components/ProductSize";
import { Link } from "react-router-dom";
import { AddToCart } from "../constants/actions";

// заглушки
import productsJson from "../../data/products.json";

const Product = () => {
  // redux
  const dispatch = useDispatch();

  const [activeIndex, setActiveIndex] = useState(null);

  // Счётчик количества
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = (max) => {
    quantity < max ? setQuantity(quantity + 1) : setQuantity(max);
    const actualQuantity = quantity + 1;
    setProductForOrder({ ...productForOrder, quantity: actualQuantity }); // обновление количества продукта для добавления в корзину
  };

  const handleDecrement = (min) => {
    quantity > min ? setQuantity(quantity - 1) : setQuantity(min);
    const actualQuantity = quantity - 1;
    setProductForOrder({ ...productForOrder, quantity: actualQuantity }); // обновление количества продукта для добавления в корзину
  };

  const { id } = useParams();

  console.log({ useParamID: id });

  // при get запросе получения конкретного товара
  // const productData = useLoaderData();

  const productData = productsJson.find((product) => product.id === Number(id));

  const availableSizes = productData.sizes.filter((item) => item.available);

  // Товар для передачи в корзину
  const [productForOrder, setProductForOrder] = useState({
    id: productData.id,
    title: productData.title,
    price: productData.price,
    size: undefined,
    quantity: quantity,
  });

  console.log({ productForOrder });

  const handleSize = (size) => {
    setProductForOrder({ ...productForOrder, size: size });
  };

  const handleQuantity = () => {
    setProductForOrder({ ...productForOrder, quantity: quantity });
  };

  return (
    <main className="container">
      <Row>
        <Col>
          <section className="catalog-item">
            <h2 className="text-center">{productData.title}</h2>
            <Row>
              {/* <div className="col-5"> */}
              <Col className="col-5">
                <img
                  src={productData.images[0]}
                  className="img-fluid"
                  alt={productData.title}
                />
              </Col>
              <Col className="col-7">
                <Table bordered hover>
                  <tbody>
                    <tr>
                      <td>Артикул</td>
                      <td>{productData.sku}</td>
                    </tr>
                    <tr>
                      <td>Производитель</td>
                      <td>{productData.manufacturer}</td>
                    </tr>
                    <tr>
                      <td>Цвет</td>
                      <td>{productData.color}</td>
                    </tr>
                    <tr>
                      <td>Материалы</td>
                      <td>{productData.material}</td>
                    </tr>
                    <tr>
                      <td>Сезон</td>
                      <td>{productData.season}</td>
                    </tr>
                    <tr>
                      <td>Повод</td>
                      <td>{productData.reason}</td>
                    </tr>
                  </tbody>
                </Table>

                <div className="text-center">
                  {availableSizes.length > 0 ? (
                    <>
                      <p>
                        Размеры в наличии:{" "}
                        {/* {availableSizes.length > 0 ? (
                      availableSizes.map((item) =>
                        !isSelected ? (
                          <span
                            className="catalog-item-size"
                            onClick={() => setIsSelected(!isSelected)}
                          >
                            {item.size}
                          </span>
                        ) : (
                          <span
                            className="catalog-item-size selected"
                            onClick={() => setIsSelected(!isSelected)}
                          >
                            {item.size}
                          </span>
                        )
                      )
                    ) : (
                      <span>Товар закончился</span>
                    )} */}
                        {availableSizes.map((availableSizes, index) => (
                          <ProductSize
                            availableSize={availableSizes}
                            index={index}
                            setActiveIndex={setActiveIndex}
                            isActive={activeIndex === index}
                            handleSize={handleSize}
                          />
                        ))}
                      </p>
                      <p>
                        Количество:{" "}
                        <ButtonGroup size="sm" className="pl-2">
                          <Button
                            variant="secondary"
                            onClick={() => handleDecrement(1)}
                          >
                            -
                          </Button>
                          <Button as="span" variant="outline-primary">
                            {quantity}
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => handleIncrement(10)}
                          >
                            +
                          </Button>
                        </ButtonGroup>
                      </p>
                    </>
                  ) : (
                    <span className="warning">Товар закончился</span>
                  )}
                </div>

                {activeIndex !== null && (
                  <div className="d-grid gap-2">
                    <Button
                      as={Link}
                      size="lg"
                      variant="danger"
                      to="/cart"
                      onClick={(e) => {
                        console.log("Обновляем общий стор");
                        dispatch(AddToCart(productForOrder));
                        // addToCart(productForOrder);
                        // AddToCart(
                        //   productForOrder.id,
                        //   productForOrder.size,
                        //   productForOrder.quantity
                        // );
                        // dispatch(
                        //   AddToCart(
                        //     productForOrder.id,
                        //     productForOrder.size,
                        //     productForOrder.quantity
                        //   )
                        // );
                      }}
                    >
                      В корзину
                    </Button>
                  </div>
                )}
              </Col>
            </Row>
          </section>
        </Col>
      </Row>
    </main>
  );
};

export default Product;

/* // redux legacy
const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => {
      dispatch({
        type: ADD_TO_CART,
        id: product.id,
        title: product.title,
        price: product.price,
        size: product.size,
        quantity: product.quantity,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product); */

export const productLoader = async ({ params }) => {
  const { id } = params;
  const res = await fetch("http://localhost:7070/api/items/" + id);
  return res.json();
};
