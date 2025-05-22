import { Card } from "react-bootstrap";

const Banner = ({ src, text }) => {
  return (
    <Card className="banner">
      <Card.Img
        // src="./img/banner.jpg"
        src={src}
        className="img-fluid"
        alt="К весне готовы!"
      />
      <Card.ImgOverlay>
        <Card.Body>
          <Card.Text as="h2" className="banner-header">
            {text}
          </Card.Text>
        </Card.Body>
      </Card.ImgOverlay>
    </Card>
  );
};

export default Banner;
