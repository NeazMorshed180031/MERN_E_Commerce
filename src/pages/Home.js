import React from "react";
//import { getProducts } from "../../src/functions/product";
// import ProductCard from "../component/card/ProductCard";
import Jumbotron from "../component/card/Jumbotron";
import "./jumbotro.css";
//import LoadingCard from "../component/card/LoadingCard";
import NewArrivals from "../component/home/NewArrivals";
import BestSellers from "../component/home/BestSellers";
import CategoryList from "../component/Category/CategoryList";
import SubList from "../component/sub/SubList";
const Home = () => {
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   loadAllproducts();
  // }, []);
  // const loadAllproducts = () => {
  //   setLoading(true);
  //   getProducts("createdAt", "desc", 3).then((res) => {
  //     setProducts(res.data);
  //     setLoading(false);
  //   });
  // };
  return (
    <>
      <div className="jumbotron text-danger h1 font-weight-bold">
        <Jumbotron
          text={["Best Seller", "Latest Product", "New Arrival", "Best Seller"]}
        />
      </div>
      <h4 className="text-center p-3 mt-5 display-8 jumbotron">New Arrivals</h4>
      <br />
      <NewArrivals />
      <h4 className="text-center p-3 mt-5 display-8 jumbotron">Best Sellers</h4>
      <br />
      <BestSellers />

      <br />
      <h4 className="text-center p-3 mt-5 display-8 jumbotron">Categories</h4>
      <br />
      <CategoryList />

      <br />

      <br />
      <h4 className="text-center p-3 mt-5 display-8 jumbotron">
        Sub-Categories
      </h4>
      <br />
      <SubList />

      <br />

      <br />
    </>
  );
};

export default Home;
