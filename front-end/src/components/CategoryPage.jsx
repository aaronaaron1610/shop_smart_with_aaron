import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container, Pagination, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import './CategoryPage.css';

const CategoryPage = ({ products }) => {
  const { categoryName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const filtered = products.filter(product => product.category.toLowerCase() === categoryName.toLowerCase());
    setFilteredProducts(filtered);
  }, [categoryName, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <Container className="my-4">
      <h2 className="mb-4">Category: {categoryName}</h2>
      <Row>
        {currentProducts.map((product, index) => (
          <Col xl={4} lg={4} md={6} sm={12} xs={12} key={index} className="mb-4">
            <Card className="h-100 text-center">
              <Link to={`/product/${product.id}`}>
                <Card.Img variant="top" src={product.images} alt={product.name} className="img-fluid" />
              </Link>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <div className="product-price">
                  {product.discountPercentage && (
                    <span className="discount">
                      -{product.discountPercentage}%{' '}
                    </span>
                  )}
                  <span className="current-price">
                    {product.currentPrice}
                  </span>
                </div>
                <div className="product-rating">
                  <span className="stars">
                    {Array(Math.floor(product.rating)).fill('⭐').join('')}
                  </span>
                  <span className="rating-number">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="rating-count">
                    ({product.ratingCount})
                  </span>
                </div>
                <div className="bought-last-month">
                  <span>{product.boughtLastMonth}+ people bought this last month</span>
                </div>
                <Button
                  variant="success"
                  as={Link}
                  to={`/product/${product.id}`}
                  className="mt-auto align-self-center"
                  style={{ fontSize: '1.2rem', padding: '10px 20%' }}
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {filteredProducts.length > productsPerPage && (
        <Pagination className="justify-content-center mt-4">
          {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
            <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </Container>
  );
};

export default CategoryPage;
