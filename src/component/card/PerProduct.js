import React,{useState} from "react";
import { Card, Tabs,Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Laptop from "../../images/abc.jpg";
import "../../index.css";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "./modal/RatingModal";
import showAverage from '../../functions/rating'
import _ from "lodash";
import {useSelector,useDispatch} from 'react-redux'
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const { TabPane } = Tabs;
const PerProduct = ({ product,onStarClick,star }) => {
  const { title, description, images, slug, _id } = product;
  const [tooltip,setTooltip]=useState('Click to add')
  const {user,cart} =useSelector((state)=>({...state}))
  const dispatch=useDispatch()
  const history=useNavigate()


  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log("unique", unique);
      localStorage.setItem("cart", JSON.stringify(unique));
      setTooltip('Added')
    
      //add to redux state
      dispatch({
        type:"ADD_TO_CART",
        payload:unique
      })

      dispatch({
        type:"SET_VISIBLE",
        payload:true
      })

    }
  };

  const handleAddToWishlist=e=>{
    e.preventDefault()
    addToWishlist(product._id,user.token).then(res=>{
      // console.log("Added to wishlist",res.data)
      toast.success("Added to wishlist")
      history("/user/wishlist")
    })

  }
   
  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay interval={2000} infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card cover={<img src={Laptop} className="mb-3 " />}></Card>
        )}
        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Contact us on 8295118788
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3"> {title}</h1>
        {product&& product.ratings&& product.ratings.length>0 ?showAverage(product):<div className="text-center pt-1 pb-3">No Rating Yet</div>}

        <Card
          actions={[
            <Tooltip title={tooltip}>
            <a onClick={handleAddToCart}>
              <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
            </a>,
            </Tooltip>,
            <a onClick={handleAddToWishlist}>
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </a>,
                    <RatingModal>
                    <StarRating
                      name={_id}
                      numberOfStars={5}
                      rating={star}
                      changeRating={onStarClick}
                      // changeRating={(newRating, name) =>
                      //   console.log("newRating", newRating, "name", name)
                      // }
                      isSelectable={true}
                      starRatedColor="red"
                    />
                    </RatingModal>
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default PerProduct;
