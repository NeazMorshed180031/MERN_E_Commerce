import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../../src/functions/product";
import ProductCard from "../../component/card/ProductCard";
//import Jumbotron from "../card/Jumbotron";
import "./jumbotro.css";
import LoadingCard from "../../component/card/LoadingCard";
import { Pagination } from "antd";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    function loadAllProducts() {
      setLoading(true);
      // sort, order, limit
      getProducts("sold", "desc", page).then((res) => {
        setProducts(res.data);
        setLoading(false);
      });
    }
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);
  return (
    <>
      {/* <div className="jumbotron text-danger h1 font-weight-bold">
        <Jumbotron
          text={["Best Seller", "Latest Product", "New Arrival", "Best Seller"]}
        />
      </div> */}
      {/* <h4 className="text-center p-3 mt-5 display-3 jumbotron">New Arrivals</h4>
      <br /> */}
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="row">
        <nav className="col-md-5 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={(productsCount / 2) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};

export default BestSellers;
