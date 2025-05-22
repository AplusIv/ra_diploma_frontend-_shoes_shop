import { Col, Card, CarouselItem, Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = ({ product, cardClassName, basePath }) => {
  return (
    <Col sm="4" className="product-card-container">
      <Card className={cardClassName}>
        <Carousel interval={null} data-bs-theme="dark" indicators={true}>
          {product.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image
                src={image}
                fluid
                className="card-img-top img-fluid"
                alt={`Slide ${++index}`}
              />
            </CarouselItem>
          ))}
        </Carousel>

        <Card.Body className="product-card-body">
          <Card.Title as="h6" className="card-text">
            {product.title}
          </Card.Title>
          <Card.Text className="card-text">{product.price} руб.</Card.Text>
          <Card.Link
            as={Link}
            to={
              basePath
                ? basePath + product.id.toString()
                : product.id.toString()
            }
            // to={product.id.toString()}

            className="btn btn-outline-primary"
          >
            Заказать
          </Card.Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCard;
