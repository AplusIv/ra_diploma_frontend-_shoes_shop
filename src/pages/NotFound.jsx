import { Col, Row } from "react-bootstrap";

const NotFound = () => {
  return (
    <main class="container">
      <Row>
        <Col>
          <section class="top-sales">
            <h2 class="text-center">Страница не найдена</h2>
            <p>Извините, такая страница не найдена!</p>
          </section>
        </Col>
      </Row>
    </main>
  );
};

export default NotFound;
