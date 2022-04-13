import React from "react";
import ModalImage from "react-modal-image";

import laptop from "../../images/abc.jpg";
import { useDispatch } from "react-redux";
import {toast} from 'react-toastify'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const ProductCardInCheckOut = ({ p }) => {
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  let dispatch = useDispatch();
  const handleColorChange = (e) => {
    // console.log("color", e.target.value);
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });
      // console.log('cart update color',cart)
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleCount = (e) => {
    // console.log('product Quantity',p.quantity)
    let count = e.target.value < 1 ? 1 : e.target.value;
    if(count>p.quantity){
      toast.error(`Max Product Available:${p.quantity}`)
      return
    }

    // console.log("count", e.target.value);
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count;
        }
      });
      // console.log('cart update color',cart)
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove=()=>{
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i,1)
        }
      });
      // console.log('cart update color',cart)
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }

  }

  return (
    <tbody>
      <tr>
        <td className="text-white bg-dark">
          <div style={{ width: "100px", height: "auto" }}>
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <ModalImage small={laptop} large={laptop} />
            )}
          </div>
        </td>
        <td className="text-white bg-dark">{p.title}</td>
        <td className="text-white bg-dark">{p.price}</td>
        <td className="text-white bg-dark">{p.brand}</td>
        <td className="text-white bg-dark">
          <select
            onChange={handleColorChange}
            name="color"
            className="form-control"
          >
            {p.color ? <option>{p.color}</option> : <option>Select</option>}
            {colors
              .filter((c) => c !== p.color)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td className="text-white bg-dark text-center">
          <input
            type="number"
            className="form-control"
            value={p.count}
            onChange={handleCount}
          />
        </td>
        <td className="text-white bg-dark text-center">
          {p.shipping ==='Yes'?<CheckCircleOutlined className="text-success"/>:<CloseCircleOutlined className="text-danger"/>}
        </td>
        <td className="text-white bg-dark text-center"><CloseOutlined onClick={handleRemove} className="text-center"/></td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckOut;
