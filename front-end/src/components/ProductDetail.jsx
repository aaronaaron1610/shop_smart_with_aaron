import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Carousel,
  Navbar,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import ReactPlayer from "react-player";
import logo from "../assets/Shop-Smart-With-Aaron.png";
import { getProductById } from "../services/ApiServices";
import "./ProductDetail.css"; // Import the CSS file

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(productId);
        setProduct(productData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              alt="Logo"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Shop Smart With Aaron
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="my-5">
        <Row>
          <Col md={6}>
            <Card>
              {Array.isArray(product.images) && product.images.length > 1 ? (
                <Carousel>
                  {product.images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <Card.Img
                        variant="top"
                        src={image}
                        alt={product.name}
                        className="img-fluid"
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <Card.Img
                  variant="top"
                  src={product.images}
                  alt={product.name}
                  className="img-fluid"
                />
              )}
              <Card.Body>
                <div className="product-price">
                  {product.discountPercentage && (
                    <span className="discount">
                      -{product.discountPercentage}%{" "}
                    </span>
                  )}
                  <span className="current-price">{product.currentPrice}</span>
                  {product.mrp && (
                    <div className="mrp">M.R.P.: {product.mrp}</div>
                  )}
                </div>
                <div className="product-rating">
                  <span className="stars">
                    {Array(Math.floor(product.rating)).fill("⭐").join("")}
                  </span>
                  <span className="rating-number">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="rating-count">({product.ratingCount})</span>
                </div>
                <div className="bought-last-month">
                  <span>
                    {product.boughtLastMonth}+ people bought this last month
                  </span>
                </div>
                <Button
                  variant="success"
                  className=""
                  onClick={handleShowModal}
                >
                  Buy Now
                </Button>

                {product.usageTips && (
                  <div className="mt-3">
                    <br />
                    <hr />
                    <h4 className="text-primary">How To Use</h4>
                    <ul>
                      {product.usageTips.map((tip, index) => (
                        <li key={index} style={{ textAlign: "left" }}>
                          <strong>{tip.split(":")[0]}:</strong>
                          {tip.split(":")[1]}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="p-3">
              <Card.Body>
                <Card.Title
                  className="bg-dark text-white p-2 rounded"
                  style={{ marginBottom: "2rem" }}
                >
                  {product.name}
                </Card.Title>
                <Card.Text style={{ textAlign: "left" }}>
                  <strong>Brand:</strong> {product.brand}
                </Card.Text>
                <Card.Text style={{ textAlign: "left" }}>
                  <strong>Price:</strong>{" "}
                  <span className="bg-warning text-dark p-1 rounded">
                    {product.currentPrice}
                  </span>
                </Card.Text>
                <Card.Text style={{ textAlign: "left" }}>
                  <strong>Replacement:</strong> {product.returnPolicy}
                </Card.Text>
                <Card.Text style={{ textAlign: "left" }}>
                  <strong>Warranty:</strong> {product.warranty}
                </Card.Text>
                {/* Dynamically rendering all product-specific details */}
                {Object.entries(product).map(([key, value]) => {
                  if (
                    key !== "_id" &&
                    key !== "product_id" &&
                    key !== "brand" &&
                    key !== "name" &&
                    key !== "image" &&
                    key !== "images" &&
                    key !== "prices" &&
                    key !== "currentPrice" &&
                    key !== "returnPolicy" &&
                    key !== "warranty" &&
                    key !== "category" &&
                    key !== "urls" &&
                    key !== "advantages" &&
                    key !== "whyBetter" &&
                    key !== "disadvantages" &&
                    key !== "specialFeatures" &&
                    key !== "includedComponents" &&
                    key !== "recommendedUses" &&
                    key !== "discountPercentage" &&
                    key !== "mrp" &&
                    key !== "rating" &&
                    key !== "ratingCount" &&
                    key !== "boughtLastMonth" &&
                    key !== "usageTips" &&
                    key !== "ingredients" &&
                    key !== "problemItSolves" &&
                    key !== "amazonPrice" &&
                    key !== "flipkartPrice"
                  ) {
                    return (
                      <Card.Text key={key} style={{ textAlign: "left" }}>
                        <strong>
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                          :
                        </strong>{" "}
                        {JSON.stringify(value)}
                      </Card.Text>
                    );
                  }
                  return null;
                })}
                <hr />
                <h4 className="text-primary">Problem it Solves</h4>
                <ul>
                  {product.problemItSolves.map((problem, index) => (
                    <li key={index} style={{ textAlign: "left" }}>
                      {problem}
                    </li>
                  ))}
                </ul>
                <hr />
                <h4 className="text-primary">Benefits</h4>
                <ul>
                  {product.advantages.map((adv, index) => (
                    <li key={index} style={{ textAlign: "left" }}>
                      {adv}
                    </li>
                  ))}
                </ul>
                <hr />
                <h4 className="text-primary">
                  Why It's Better Than Other Products
                </h4>
                <ul>
                  {product.whyBetter.map((reason, index) => (
                    <li key={index} style={{ textAlign: "left" }}>
                      <strong>{reason.split(":")[0]}:</strong>
                      {reason.split(":")[1]}
                    </li>
                  ))}
                </ul>
                <hr />
                <h4 className="text-primary">Limitations</h4>
                <ul>
                  {product.disadvantages.map((disadv, index) => (
                    <li key={index} style={{ textAlign: "left" }}>
                      {disadv}
                    </li>
                  ))}
                </ul>
                <hr />
                <h4 className="text-primary">Key Features</h4>
                <ul>
                  {product.specialFeatures.map((feature, index) => (
                    <li key={index} style={{ textAlign: "left" }}>
                      {feature}
                    </li>
                  ))}
                </ul>
                <hr />
                <h4 className="text-primary">What's in the Box</h4>
                <ul>
                  {product.includedComponents.map((component, index) => (
                    <li key={index} style={{ textAlign: "left" }}>
                      {component}
                    </li>
                  ))}
                </ul>
                <hr />
                <h4 className="text-primary">Recommended Uses</h4>
                <ul>
                  {product.recommendedUses.map((use, index) => (
                    <li key={index} style={{ textAlign: "left" }}>
                      {use}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="success"
                  className="mt-3"
                  onClick={handleShowModal}
                >
                  Buy Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Buy Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {product.urls && (
            <>
              {product.urls.amazon && (
                <Button
                  variant="primary"
                  className="w-100 mb-3"
                  href={product.urls.amazon}
                  target="_blank"
                >
                  Buy on Amazon
                  {/* <span> at {product.prices?.amazon}</span> */}
                </Button>
              )}
              {/* {product.urls.flipkart && (
                <Button
                  variant="primary"
                  className="w-100"
                  href={product.urls.flipkart}
                  target="_blank"
                >
                  Buy on Flipkart
                  <span> at {product.prices?.flipkart}</span>
                </Button>
              )} */}
              {/* {product.urls.youtube && (
                <div className="mt-4">
                  <ReactPlayer
                    url={product.urls.youtube}
                    playing
                    controls
                    className="react-player"
                    width="100%"
                    height="250px"
                  />
                </div>
              )} */}
            </>
          )}
        </Modal.Body>
      </Modal>

      <footer className="bg-dark text-white text-center py-4 mt-4">
        <Container>
          <Row>
            <Col>
              <FontAwesomeIcon icon={faFacebook} size="2x" className="me-3" />
              <FontAwesomeIcon icon={faInstagram} size="2x" className="me-3" />
              <FontAwesomeIcon icon={faYoutube} size="2x" />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <p>&copy; 2024 Shop Smart With Aaron. All rights reserved.</p>
              <p>
                <a
                  href="mailto:immanuelaaron1@gmail.com"
                  className="text-white"
                >
                  immanuelaaron1@gmail.com
                </a>
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default ProductDetail;
