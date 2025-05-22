// import { Carousel } from "bootstrap";
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
    <Col sm="4">
      <Card className={cardClassName}>
        {/* <Carousel>
          {product.images.length > 1 ? (
            product.images.map((image, index) => (
              <CarouselItem>
                <Image src={image} fluid />
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
        </Carousel> */}

        {/* <ol class="carousel-indicators">
          <li
            data-bs-target="#carouselWithIndicators"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
          ></li>
          <li
            data-bs-target="#carouselWithIndicators"
            data-bs-slide-to="1"
            class=""
          ></li>
          <li
            data-bs-target="#carouselWithIndicators"
            data-bs-slide-to="2"
          ></li>
        </ol> */}

        {/* <a
          class="carousel-control-prev"
          href="#carouselDark"
          role="button"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselDark"
          role="button"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </a> */}

        {/* <a
          class="carousel-control-prev"
          // href="#carouselWithIndicators"
          role="button"
          data-bs-slide="prev"
          onClick={() => setIndex(index - 1)}
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          // href="#carouselWithIndicators"
          role="button"
          data-bs-slide="next"
          onClick={() => setIndex(index + 1)}
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </a> */}
        <div className="product-img-container">
          <Card.Img
            variant="top"
            //   src="./img/products/sandals_myer.jpg"
            src={product.images[index]}
            className="card-img-top img-fluid"
            alt={product.title}
          />
          <Card.ImgOverlay>
            <a
              className="carousel-control-prev"
              // href="#carouselWithIndicators"
              role="button"
              data-bs-slide="prev"
              onClick={handleSlide}
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              // href="#carouselWithIndicators"
              role="button"
              data-bs-slide="next"
              onClick={handleSlide}
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </a>
          </Card.ImgOverlay>
        </div>
        <Card.Body className="card-body">
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
