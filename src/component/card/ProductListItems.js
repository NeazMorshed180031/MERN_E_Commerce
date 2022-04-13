import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const { price, category, subs, shipping, color, brand, quantity, sold } =
    product;
  //   console.log(category,slug)
  return (
    <ul className="list-group">
      <li className="list-group-item">
        Price{""}
        <span className="d-flex flex-row-reverse">$ {price}</span>
      </li>
      {category && (
        <li className="list-group-item">
          Category{""}
          <Link
            to={`/category/${category.slug}`}
            className="d-flex flex-row-reverse"
          >
            {category.name}
          </Link>
        </li>
      )}

      {subs && (
        <li className="list-group-item">
          Sub Categories
          {subs.map((s) => (
            <Link
              key={s._id}
              to={`/sub/${s.slug}`}
              className="d-flex flex-row-reverse"
            >
              {s.name}
            </Link>
          ))}
        </li>
      )}
      <li className="list-group-item">
        Shipping{""}
        <span className="d-flex flex-row-reverse">{shipping}</span>
      </li>
      <li className="list-group-item">
        color{""}
        <span className="d-flex flex-row-reverse"> {color}</span>
      </li>
      <li className="list-group-item">
        Brand{""}
        <span className="d-flex flex-row-reverse"> {brand}</span>
      </li>
      <li className="list-group-item">
        Quantity{""}
        <span className="d-flex flex-row-reverse"> {quantity}</span>
      </li>
      <li className="list-group-item">
        Sold{""}
        <span className="d-flex flex-row-reverse"> {sold}</span>
      </li>
    </ul>
  );
};
export default ProductListItems;
