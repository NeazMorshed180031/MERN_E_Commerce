import axios from "axios";

export const getCategories = async () => {
  return await axios.get(`http://localhost:8000/api/categories`);
};

export const getCategory = async (slug) => {
  return await axios.get(`http://localhost:8000/api/category/${slug}`);
};

export const removeCategory = async (slug, authtoken) => {
  return await axios.delete(`http://localhost:8000/api/category/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const createCategory = async (category, authtoken) => {
  return await axios.post(`http://localhost:8000/api/category`, category, {
    headers: {
      authtoken,
    },
  });
};

// export const updateCategory = async (slug, category, authtoken) =>
//   await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, {
//     headers: {
//       authtoken,
//     },
//   });

export const updateCategory = async (slug,category, authtoken) => {
  return await axios.put(`http://localhost:8000/api/category/${slug}`,category, {
    headers: {
      authtoken,
    },
  });
};


export const getCategorySubs = async (_id) => {
  return await axios.get(`http://localhost:8000/api/category/subs/${_id}`);
};
