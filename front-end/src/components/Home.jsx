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
  const categories = ["Kitchen", "Beauty"];

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

  const websiteLink = "https://sswa-store.web.app/";
  const [showPopup, setShowPopup] = useState(false);
  const isInstagramBrowser = /Instagram/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  useEffect(() => {
    if (isInstagramBrowser) {
      setShowPopup(true);
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const openInChrome = () => {
    if (isAndroid) {
      window.location.href = `intent://${websiteLink.replace(
        "https://",
        ""
      )}#Intent;scheme=https;package=com.android.chrome;end;`;
    }
  };

  const copyLink = () => {
    const link = "https://sswa-store.web.app/"; // Set your custom link

    navigator.clipboard
      .writeText(link)
      .then(() => {
        document.getElementById("customPopup").style.display = "block";
      })
      .catch((err) => {
        console.error("Failed to copy link", err);
      });
  };

  const closePopup = () => {
    document.getElementById("customPopup").style.display = "none";
  };

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
                      {/* <Link to={`/product/${product.product_id}`}> */}
                      <Card.Img
                        variant="top"
                        src={product.images}
                        alt={product.name}
                        className="img-fluid"
                      />
                      {/* </Link> */}
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
                        {/* <div className="product-rating">
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
                        </div> */}
                        <div className="bought-last-month">
                          <span>
                            {product.boughtLastMonth}+ people bought this last
                            month
                          </span>
                        </div>
                        {/* <Button
                          variant="success"
                          as={Link}
                          to={`/product/${product.product_id}`}
                          className="mt-auto align-self-center"
                          style={{ fontSize: "1.2rem", padding: "10px 20%" }}
                        >
                          View Details
                        </Button> */}
                        <button
                          style={{
                            backgroundColor: "#ff9900",
                            color: "white",
                            fontSize: "1rem",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            if (isInstagramBrowser) {
                              setShowPopup(true);
                            } else {
                              window.open(product.urls.amazon, "_blank");
                            }
                          }}
                        >
                          Buy on Amazon
                        </button>

                        <Button
                          variant="primary"
                          className="mt-2"
                          style={{ fontSize: "1rem", padding: "8px 15px" }}
                          onClick={(e) => {
                            e.preventDefault();
                            if (isInstagramBrowser) {
                              setShowPopup(true);
                            } else {
                              window.open(product.urls.flipkart, "_blank");
                            }
                          }}
                        >
                          Buy on Flipkart
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
      {/* Custom Popup */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              width: "90%",
              maxWidth: "350px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            <h2 style={{ color: "#333", marginBottom: "10px" }}>
              ⚠ Open in Browser
            </h2>

            {isAndroid && (
              <>
                <button
                  onClick={openInChrome}
                  style={{
                    marginTop: "15px",
                    padding: "10px 15px",
                    border: "none",
                    backgroundColor: "#34A853",
                    color: "white",
                    borderRadius: "5px",
                    fontSize: "16px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    display: "block",
                    width: "100%", // Ensures full width for alignment
                  }}
                >
                  Open in Chrome
                </button>
                <button
                  onClick={copyLink}
                  style={{
                    padding: "10px 15px",
                    border: "none",
                    backgroundColor: "#007BFF",
                    color: "white",
                    borderRadius: "5px",
                    fontSize: "16px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    marginTop: "10px", // Added marginTop to create space between buttons
                    marginBottom: "5px",
                    display: "block",
                    width: "100%",
                  }}
                >
                  Copy Link
                </button>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#555",
                    textAlign: "center",
                  }}
                >
                  Paste the copied link in your browser.
                </p>
              </>
            )}

            {isIOS && (
              <>
                <button
                  onClick={copyLink}
                  style={{
                    marginTop: "15px",
                    padding: "10px 15px",
                    border: "none",
                    backgroundColor: "#007BFF",
                    color: "white",
                    borderRadius: "5px",
                    fontSize: "16px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Copy Link
                </button>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#555",
                    marginTop: "5px",
                    textAlign: "center",
                  }}
                >
                  Paste the copied link in your browser.
                </p>
              </>
            )}

            {/* <button
              onClick={handleClosePopup}
              style={{
                marginTop: "15px",
                padding: "10px 15px",
                border: "none",
                backgroundColor: "#888",
                color: "white",
                borderRadius: "5px",
                fontSize: "16px",
                cursor: "pointer",
                fontWeight: "bold",
                marginLeft: "10px",
              }}
            >
              Cancel
            </button> */}
          </div>
        </div>
      )}

      <div
        id="customPopup"
        style={{
          display: "none",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          zIndex: 1000,
        }}
      >
        <p style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}>
          Link copied! Paste it in your browser.
        </p>
        <button
          onClick={closePopup}
          style={{
            marginTop: "10px",
            padding: "8px 12px",
            border: "none",
            backgroundColor: "#007BFF",
            color: "white",
            borderRadius: "5px",
            fontSize: "14px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Home;
