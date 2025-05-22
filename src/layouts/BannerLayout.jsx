import { Col, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";

const BannerLayout = () => {
  // src="./img/banner.jpg"
  const src =
    "https://raw.githubusercontent.com/netology-code/ra16-diploma/refs/heads/master/html/img/banner.jpg";
  return (
    <main className="container">
      <Row>
        <Col>
          <Banner src={src} text="К весне готовы!" />

          <Outlet />
        </Col>
      </Row>
    </main>
  );
};

export default BannerLayout;
