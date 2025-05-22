import { Col, Form, Nav, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import NavbarControlsSearchForm from "../components/NavbarControlsSearchForm";

const RootLayout = () => {
  return (
    <>
      <header className="container">
        <Row>
          <Col>
            <Navbar
              collapseOnSelect
              // fixed="top"
              expand="sm"
              bg="light"
              data-bs-theme="light"
            >
              <Navbar.Brand as={Link} to="/">
                {/* <img src="../img/header-logo.png" alt="Bosa Noga" /> */}
                <img
                  src="https://raw.githubusercontent.com/netology-code/ra16-diploma/refs/heads/master/html/img/header-logo.png"
                  alt="Bosa Noga"
                />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarMain" />
              <Navbar.Collapse id="navbarMain">
                <Nav
                  as="ul"
                  className="mr-auto"
                  style={{ maxHeight: "100px" }}
                  defaultActiveKey="/"
                  navbarScroll
                >
                  <Nav.Item as="li">
                    <Nav.Link as={Link} to="/" eventKey="/">
                      Главная
                    </Nav.Link>
                  </Nav.Item>
                  {/* <Nav.Item as="li">
                    <Nav.Link className="nav-link active" href="/">
                      Главная
                    </Nav.Link>
                  </Nav.Item> */}
                  <Nav.Item as="li">
                    <Nav.Link as={Link} to="/catalog" eventKey="/catalog">
                      Каталог
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Nav.Link as={Link} to="/about" eventKey="/about">
                      О магазине
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Nav.Link as={Link} to="/contacts" eventKey="/contacts">
                      Контакты
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <div>
                  <NavbarControlsSearchForm />
                </div>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
      </header>

      <Outlet />

      <footer className="container bg-light footer">
        <Row>
          <Col sm="4">
            <section>
              <h5>Информация</h5>
              <Nav as="ul" className="nav flex-column">
                <Nav.Item as="li">
                  <Nav.Link as={Link} to="/about">
                    О магазине
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link as={Link} to="/catalog">
                    Каталог
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link as={Link} to="/contacts">
                    Контакты
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </section>
          </Col>
          <Col sm="4">
            <section>
              <h5>Принимаем к оплате:</h5>
              <div className="footer-pay">
                <div className="footer-pay-systems footer-pay-systems-paypal"></div>
                <div className="footer-pay-systems footer-pay-systems-master-card"></div>
                <div className="footer-pay-systems footer-pay-systems-visa"></div>
                <div className="footer-pay-systems footer-pay-systems-yandex"></div>
                <div className="footer-pay-systems footer-pay-systems-webmoney"></div>
                <div className="footer-pay-systems footer-pay-systems-qiwi"></div>
              </div>
            </section>
            <section>
              <div className="footer-copyright">
                2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и
                аксессуаров. Все права защищены.
                <br />
                Доставка по всей России!
              </div>
            </section>
          </Col>
          <Col sm="4" className="text-end">
            <section className="footer-contacts">
              <h5>Контакты:</h5>
              <Link className="footer-contacts-phone" to="tel:+7-495-790-35-03">
                +7 495 79 03 5 03
              </Link>
              <span className="footer-contacts-working-hours">
                Ежедневно: с 09-00 до 21-00
              </span>
              <Link
                className="footer-contacts-email"
                to="mailto:office@bosanoga.ru"
              >
                office@bosanoga.ru
              </Link>
              <div className="footer-social-links">
                <div className="footer-social-link footer-social-link-twitter"></div>
                <div className="footer-social-link footer-social-link-vk"></div>
              </div>
            </section>
          </Col>
        </Row>
      </footer>
    </>
  );
};

export default RootLayout;
