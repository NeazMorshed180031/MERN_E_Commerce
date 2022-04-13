import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import "./icon.css";
const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useNavigate();

  const handleChange = (e) => {
    // console.log(e.target.value);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history(`/shop?${text}`);
  };

  return (
    <form className="form-inline my-2 my-lg-0 " onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="search"
        value={text}
        className="form-control mr-sm-2 text-center"
        placeholder="Search"
      />
      <div>
        <SearchOutlined onClick={handleSubmit} className="icon" />
      </div>
    </form>
  );
};

export default Search;

{
  /* <SearchOutlined onClick={handleSubmit}  style={{ cursor: "pointer"  }} /> */
}
