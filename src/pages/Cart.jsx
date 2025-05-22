import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  ListGroup,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import PromoCode from "../components/PromoCode";
import {
  cancelPromo,
  clearOrder,
  clearProducts,
  deleteFromCart,
  makeOrder,
  usePromo,
} from "../constants/actions";

const Cart = () => {
  // redux
  const dispatch = useDispatch();

  const promoRedux = useSelector((state) => state.cart.promoCode);
  console.log({ promoRedux });

  const cartProductsRedux = useSelector((state) => state.cart.products);
  console.log({ cartProductsRedux });

  const orderRedux = useSelector((state) => state.order.orderStatus);
  console.log({ orderRedux });

  const [promoValue, setPromoValue] = useState("");

  const [validated, setValidated] = useState(false);
  console.log({ validated });

  const [owner, setOwner] = useState({
    phone: "",
    address: "",
  });
  console.log(owner);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { value } = event.target;
    const { name } = event.target;
    setOwner({ ...owner, [name]: value });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(form.elements);
    const sumInput = document.getElementById("sum");

    if (cartProductsRedux.length === 0) {
      sumInput.setCustomValidity("Инпут нулевой");
      sumInput.reportValidity();
      sumInput.validity.valid;
    }

    sumInput.willValidate = true;
    console.log({
      checkValidity: sumInput.checkValidity(),
      willValidate: sumInput.willValidate,
      validity: sumInput.validity,
      valid: sumInput.validity.valid,
    });

    console.log({
      formVal: form.checkValidity(),
      sumInputVal: sumInput.checkValidity(),
    });
    // console.log(sumInput.willValidate);
    // console.log(sumInput.validity);
    // console.log(sumInput.validity.valid);
    // console.log(sumInput.checkValidity());
    if (form.checkValidity() === false || sumInput.validity.valid === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      console.log("Validate ok");

      console.log(form.elements);

      // добавить проверку и тултип про пустую корзину
      dispatch(makeOrder(owner, cartProductsRedux, promoRedux));
      // props.makeOrder(owner, props.products);

      // navigate("/order");
      // Добавить очистку стора и локалстораджа

      // setValidated(true);

      // Дождаться ответа сервера, при корректном статусе ответа -> показать модалку
      setTimeout(() => {
        setModalShow(true);
      }, 1000);
    }

    setValidated(true);

    // redirect("/order");
    // <Navigate to="/order" />;
    // if (form.checkValidity() === true) {
    //   console.log("Смена маршрута");
    //   navigate("/order");
    // }
  };

  const handleDelete = (id, size) => {
    console.log(id, size);
    // props.deleteFromCart(id, size);
    dispatch(deleteFromCart(id, size));
  };

  const handlePromoCode = () => {
    console.log({ promoValue });
    // props.usePromo(promoValue);

    dispatch(usePromo(promoValue));
    setPromoValue(""); // очистка инпута
  };

  const deletePromoCode = () => {
    dispatch(cancelPromo());

    // props.cancelPromo();
  };

  const [modalShow, setModalShow] = useState(false);

  const handleCloseModal = () => {
    setModalShow(false);
    dispatch(clearOrder());
    dispatch(clearProducts());

    navigate("/"); // вернуться на главную
  };

  return (
    <main className="container">
      <Row>
        <Col>
          <section className="cart">
            <h2 className="text-center">Корзина</h2>
            <Table bordered hover>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Название</th>
                  <th scope="col">Размер</th>
                  <th scope="col">Кол-во</th>
                  <th scope="col">Стоимость</th>
                  <th scope="col">Итого</th>
                  <th scope="col">Действия</th>
                </tr>
              </thead>
              <tbody>
                {cartProductsRedux.map((product, index) => (
                  <tr key={index}>
                    <td scope="row">{index + 1}</td>
                    <td>
                      <Link to={"../catalog/" + product.id}>
                        {product.title}
                      </Link>
                    </td>
                    <td>{product.size}</td>
                    <td>{product.quantity}</td>
                    {promoRedux.discount > 0 ? (
                      <td>
                        {(product.price * (100 - promoRedux.discount)) / 100}{" "}
                        руб.
                        <td className="exPrice">{product.price} руб.</td>
                      </td>
                    ) : (
                      <td>{product.price} руб.</td>
                    )}

                    {promoRedux.discount > 0 ? (
                      <td>
                        {((product.price * (100 - promoRedux.discount)) / 100) *
                          product.quantity}{" "}
                        руб.
                        <td className="exPrice">
                          {product.price * product.quantity} руб.
                        </td>
                      </td>
                    ) : (
                      <td>{product.price * product.quantity} руб.</td>
                    )}
                    <td>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleDelete(product.id, product.size)}
                      >
                        Удалить
                      </Button>
                    </td>
                  </tr>
                ))}

                <tr>
                  <td colSpan="5" className="text-end">
                    <Form.Label htmlFor="sum">Общая стоимость</Form.Label>
                    {/* Общая стоимость */}
                  </td>
                  <td colSpan="2">
                    <Form.Group
                      // validated={validated}
                      className="position-relative"
                    >
                      <Form.Control
                        id="sum"
                        className="cart-sum-input"
                        form="cart-form"
                        type="text"
                        value={
                          cartProductsRedux.length > 0
                            ? `${cartProductsRedux
                                .map(
                                  (product) =>
                                    ((product.price *
                                      (100 - promoRedux.discount)) /
                                      100) *
                                    product.quantity
                                )
                                .reduce(
                                  (accumulator, currentValue) =>
                                    accumulator + currentValue
                                )} руб.`
                            : "0 руб."
                        }
                        isInvalid={cartProductsRedux.length === 0 && validated}
                        isValid={cartProductsRedux.length > 0 && validated}
                        // required
                        readOnly
                        plaintext
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        Товары отсутствуют в корзине
                      </Form.Control.Feedback>
                    </Form.Group>
                    {/* {cartProductsRedux.length > 0
                      ? cartProductsRedux
                          .map(
                            (product) =>
                              ((product.price * (100 - promoRedux.discount)) /
                                100) *
                              product.quantity
                          )
                          .reduce(
                            (accumulator, currentValue) =>
                              accumulator + currentValue
                          )
                      : "0 "}{" "}
                    руб. */}
                  </td>
                </tr>
              </tbody>
            </Table>

            <Form.Label htmlFor="promo">Промокод</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                id="promo"
                placeholder="Введите промокод"
                // aria-label="Recipient's username"
                // aria-describedby="basic-addon2"
                value={promoValue}
                onChange={(e) => setPromoValue(e.target.value)}
                disabled={promoRedux.status === "accepted"}
              />
              <Button
                variant="outline-secondary"
                onClick={handlePromoCode}
                disabled={promoRedux.status === "accepted"}
              >
                Применить
              </Button>
            </InputGroup>
            {promoRedux.status === "accepted" ? (
              <PromoCode
                title={promoRedux.value}
                deletePromoCode={deletePromoCode}
              />
            ) : null}

            {!promoRedux.status ? null : promoRedux.status === "accepted" ? (
              <p>Промокод успешно применён.</p>
            ) : (
              <p>Промокод отсутствует. Попробуйте ввести новый.</p>
            )}
          </section>

          <section className="order row">
            <h2 className="text-center">Оформить заказ</h2>
            <Card style={{ width: "30rem" }} className="mx-auto">
              <Form
                id="cart-form"
                noValidate
                validated={validated}
                className="card-body"
                onSubmit={handleSubmit}
              >
                <Form.Group
                  controlId="phone" // id для всей группы
                  className="form-group position-relative"
                  // className="position-relative"
                >
                  <Form.Label>Телефон</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    // pattern="^[\+]?7-[0-9]{3}-[0-9]{3}-[0-9]{4}$"
                    pattern="^9[0-9]{9}$"
                    placeholder="Ваш телефон"
                    required
                    value={owner.phone}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    Введите номер телефона (10 цифр, начиная с 9)
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  controlId="address"
                  className="form-group position-relative"
                  // className="position-relative"
                >
                  <Form.Label>Адрес доставки</Form.Label>
                  <Form.Control
                    name="address"
                    // id="address"
                    placeholder="Адрес доставки"
                    required
                    value={owner.address}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    Введите существующий адрес доставки
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  controlId="agreement"
                  className="form-group position-relative"
                  // className="position-relative"
                >
                  <Form.Check
                    // class="form-check-input"
                    id="agreement"
                    type="checkbox"
                    label="Согласен с правилами доставки"
                    feedback="Перед оформлением выразите согласие с условиями доставки"
                    feedbackType="invalid"
                    feedbackTooltip
                    required
                  />
                </Form.Group>
                <Button
                  // as={Link}
                  variant="outline-secondary"
                  // className="btn-outline-secondary"
                  // to="/order"
                  value="Оформить"
                  // as="input"
                  type="submit"
                >
                  Оформить
                </Button>
              </Form>
            </Card>
            {/* </Col> */}
          </section>

          {/* Модальное окно при прохождении валидации */}
          <Modal
            show={modalShow}
            onHide={handleCloseModal}
            backdrop="static"
            keyboard={false} // нельзя закрыть при клавише esc
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Данные заказа</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Заказ оформлен!</h4>
              <ListGroup className="list-group-flush order-data">
                <ListGroup.Item>
                  {promoRedux.status === "accepted"
                    ? `Промокод "${promoRedux.value}" применен. `
                    : "Промокод не применен. "}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Информация о заказе:</b>
                  <ListGroup className="list-group-flush products-info">
                    {cartProductsRedux.length > 0 &&
                      cartProductsRedux.map((product, index) => (
                        <ListGroup.Item key={index}>
                          {cartProductsRedux.length > 1
                            ? `${index + 1}) `
                            : null}
                          <b>{product.title}</b> <br />
                          Размер: {product.size}.
                          <br />
                          Количество: {product.quantity} шт.
                          <br />
                          {promoRedux.status === "accepted"
                            ? "Цена за единицу (с учетом промокода): "
                            : "Цена за единицу: "}
                          {product.price -
                            (promoRedux.discount / 100) * product.price}{" "}
                          руб.
                        </ListGroup.Item>
                      ))}

                    <ListGroup.Item>
                      Общая цена заказа:{" "}
                      {cartProductsRedux.length > 0 &&
                        cartProductsRedux
                          .map(
                            (product) =>
                              ((product.price * (100 - promoRedux.discount)) /
                                100) *
                              product.quantity
                          )
                          .reduce(
                            (accumulator, currentValue) =>
                              accumulator + currentValue
                          )}{" "}
                      руб.
                    </ListGroup.Item>
                  </ListGroup>
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Получатель:</b>
                  <ListGroup className="list-group-flush contact-data">
                    <ListGroup.Item>
                      телефон: +7{orderRedux.owner.phone}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      адрес: {orderRedux.owner.address}
                    </ListGroup.Item>
                  </ListGroup>
                </ListGroup.Item>
                <ListGroup.Item>
                  Благодарим Вас за выбор нашего магазина, ожидайте, пожалуйста,
                  уведомления о статусе заказа.
                </ListGroup.Item>
              </ListGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseModal}>
                Ясно, понятно
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </main>
  );
};

export default Cart;

/* // legacy Redux
const mapStateToProps = (state, ownProps) => {
  return {
    products: state.cart.products,
    promoCode: state.cart.promoCode,

    orderStatus: state.orderStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFromCart: (id, size) => {
      dispatch({ type: DELETE_FROM_CART, id, size });
    },
    usePromo: (promoCode) => {
      dispatch({ type: USE_PROMO, promoCode });
    },
    cancelPromo: () => {
      dispatch({ type: CANCEL_PROMO });
    },

    makeOrder: (owner, products) => {
      dispatch({ type: MAKE_ORDER, owner, products });
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Cart); */
