import React, { useEffect, useState } from "react";
import PerProduct from "../component/card/PerProduct";
import { getProduct, productStar } from "../functions/product";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRelated } from "../functions/product";
import ProductCard from "../component/card/ProductCard";

const Product = () => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related,setRelated]=useState([])
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = useParams();
  // console.log(slug);

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);
  useEffect(()=>{
    if(product.ratings&&user){
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star)//current user star
    }
  })

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data)
      getRelated(res.data._id).then(res=>setRelated(res.data))
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    // console.log(newRating, name);
    productStar(name, newRating, user.token).then((res) => {
      // console.log('rating clicked',res.data);
      loadSingleProduct()
    });
  };

  // console.log(product);
  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <PerProduct product={product} onStarClick={onStarClick} star={star} />
      </div>
      <div className="row p-5">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Product</h4>
          {/* {JSON.stringify(related)} */}
          <hr />

        </div>
      </div>
      <diV className='row pb-5'>
        {related.length?related.map((r)=>(
        <div key={r._id} className="col-md-4 ">
          <ProductCard product={r}/>
        </div>
        )):<div className="text-center col">No Product Found</div>}
      </diV>
    </div>
  );
};
export default Product;
