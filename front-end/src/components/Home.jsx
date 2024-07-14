import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  Row,
  Col,
  Form,
  FormControl,
  Button,
  Navbar,
  Container,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../assets/Shop-Smart-With-Aaron.png";
import "./Home.css";

const Home = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  // const categories = ["Beauty", "Health", "Medicine", "Electronics"];
  const categories = ["Health", "Beauty"];

  const handleSearch = () => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleShowMore = (category) => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const groupedProducts = categories.map((category) => ({
    category,
    products: filteredProducts.filter(
      (product) => product.category === category
    ),
  }));

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container fluid>
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

      <Container fluid className="my-4">
        <Form className="d-flex mb-4 justify-content-center">
          <FormControl
            type="search"
            placeholder="Search product"
            className="me-2"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch();
              }
            }}
            style={{ width: "60%" }}
          />
          <Button
            variant="danger"
            onClick={handleSearch}
            style={{ fontSize: "1.2rem", padding: "10px 20px" }}
          >
            Search
          </Button>
        </Form>

        {groupedProducts.map(({ category, products }, categoryIndex) => (
          <div key={category} className="mb-5">
            <h3 className="mb-3 category-heading">{category}</h3>
            <Row>
              {products
                .slice(0, currentPage * productsPerPage)
                .map((product, index) => (
                  <Col
                    key={index}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    className="mb-4"
                  >
                    <Card>
                      <Link to={`/product/${product.product_id}`}>
                        <Card.Img
                          variant="top"
                          src={product.images}
                          alt={product.name}
                          className="img-fluid"
                        />
                      </Link>
                      <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <div className="product-price">
                          {product.discountPercentage && (
                            <span className="discount">
                              -{product.discountPercentage}%{" "}
                            </span>
                          )}
                          <span className="current-price">
                            {product.currentPrice}
                          </span>
                        </div>
                        <div className="product-rating">
                          <span className="stars">
                            {Array(Math.floor(product.rating))
                              .fill("⭐")
                              .join("")}
                          </span>
                          <span className="rating-number">
                            {product.rating.toFixed(1)}
                          </span>
                          <span className="rating-count">
                            ({product.ratingCount})
                          </span>
                        </div>
                        <div className="bought-last-month">
                          <span>
                            {product.boughtLastMonth}+ people bought this last
                            month
                          </span>
                        </div>
                        <Button
                          variant="success"
                          as={Link}
                          to={`/product/${product.product_id}`}
                          className="mt-auto align-self-center"
                          style={{ fontSize: "1.2rem", padding: "10px 20%" }}
                        >
                          View Details
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
            {products.length > currentPage * productsPerPage && (
              <div className="d-flex justify-content-center mt-3">
                <Button
                  variant="primary"
                  onClick={() => handleShowMore(category)}
                >
                  Show More
                </Button>
              </div>
            )}
            {categoryIndex < groupedProducts.length - 1 && (
              <div className="section-separator" />
            )}
          </div>
        ))}
      </Container>

      <footer className="bg-dark text-white text-center py-4 mt-4">
        <Container fluid>
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

export default Home;
