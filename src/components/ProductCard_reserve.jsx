import { useState } from "react";
import { Col, Card, CarouselItem, Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = ({ product, cardClassName, basePath }) => {
  const [index, setIndex] = useState(0);

  const handleSlide = (e) => {
    // e.stopPropagation();
    console.log({ index });
    console.log(product.images.length);
    const maxIndex = product.images.length - 1;
    console.log({ maxIndex });
    if (maxIndex === 0) return;
    // console.log(e, e.target, e.target.className);
    const { target } = e;
    const { offsetParent } = e;
    console.log(e);
    console.log(target.dataset.bsSlide);
    const action = target.dataset.bsSlide;
    console.log(action);
    if (action === "prev") {
      index > 0 ? setIndex(index - 1) : setIndex(maxIndex);
    }
    if (action === "next") {
      index < maxIndex ? setIndex(index + 1) : setIndex(0);
    }
  };
  return (
    <Col sm="4" className="product-card-container">
      {/* <Card className={cardClassName}> */}
      {/* <Card className={`col col-sm-4 ${cardClassName}`}> */}
      <Card className={cardClassName}>
        <Carousel interval={null} data-bs-theme="dark" indicators={true}>
          {product.images.length > 1 ? (
            product.images.map((image, index) => (
              <CarouselItem>
                <Image
                  src={image}
                  fluid
                  className="card-img-top img-fluid"
                  alt={`Slide ${++index}`}
                />
              </CarouselItem>
            ))
          ) : (
            <Card.Img
              variant="top"
              //   src="./img/products/sandals_myer.jpg"
              src={product.images[0]}
              className="card-img-top img-fluid"
              alt={product.title}
            />
          )}
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

            // путь href должен быть просто product.id.toString()
            className="btn btn-outline-primary"
          >
            Заказать
          </Card.Link>
        </Card.Body>
        {/* <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer> */}
      </Card>
    </Col>
  );
};

export default ProductCard;
