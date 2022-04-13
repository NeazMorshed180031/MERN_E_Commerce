import React, { useState, useEffect } from "react";
import AdminNav from "../../../component/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  updateCategory,
  removeCategory,
  getCategory,
} from "../../../functions/category";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const CategoryUpdate = () => {
  const [name, setName] = useState("");

  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  //   const [category, setCategory] = useState([]);
  let { slug } = useParams();

  const loadCategory = () => getCategory(slug).then(setName(slug));

  useEffect(() => {
    loadCategory();
    // console.log(slug);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name)
    setLoading(true);
    updateCategory(slug, { name }, user.token)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is created`);
        // loadCategories();
      })
      .catch((err) => {
        setLoading(false);
      // console.log(err);
        toast.error(err.response.data);
      });
  };

  //   const handleRemove = async (slug) => {
  //     // let answer=window.confirm("Delete?")
  //     // console.log(answer,slug)
  //     if (window.confirm("Delet?")) {
  //       setLoading(true);
  //       removeCategory(slug, user.token)
  //         .then((res) => {
  //           setLoading(false);
  //           toast.error(`${res.data.name} has been Deleted`);
  //           loadCategories();
  //         })
  //         .catch((err) => {
  //           setLoading(false);
  //           toast.error(err.response.data);
  //         });
  //     }
  //   };

  const categoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoFocus
          required
        />
        <br />
        <button className="btn btn-outline-primary">Save</button>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Update Category</h4>
          )}
          {categoryForm()}
          <br />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
