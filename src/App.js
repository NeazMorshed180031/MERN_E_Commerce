import React, { useEffect, useCallback,lazy,Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";


import { auth } from "./firebase";

import { currentUser } from "./functions/auth";

const Login=lazy(()=>import("./pages/auth/Login")) ;
const SideDrawer=lazy(()=>import("./component/drawer/SideDrawer")) ;
const Register =lazy(()=>import("./pages/auth/Register"));
const Home =lazy(()=>import("./pages/Home"))
const Header=lazy(()=>import("../src/component/nav/Header")) ;
const RegisterComplete=lazy(()=>import("./pages/auth/RegisterComplete")) ;
const ForgotPassword=lazy(()=>import("./pages/auth/ForgotPassword"));
// const auth =lazy(()=>import("./firebase")) ;
// const currentUser =lazy(()=>import("./functions/auth"));
const HistoryPage =lazy(()=>import("./pages/user/History")) ;
const UserRoute =lazy(()=>import("./component/routes/UserRoute"));
const Password =lazy(()=>import("./pages/user/Password")) ;
const Wishlist =lazy(()=>import("./pages/user/Wishlist")) ;
const AdminDashboard=lazy(()=>import("./pages/admin/AdminDashboard")) ;
const AdminRoute =lazy(()=>import("./component/routes/AdminRoute"));
const CategoryCreate =lazy(()=>import("./pages/admin/category/CategoryCreate")) ;
const CategoryUpdate =lazy(()=>import("./pages/admin/category/CategoryUpdate"));
const SubCreate =lazy(()=>import("./pages/admin/sub/SubCreate"));
const SubUpdate =lazy(()=>import("./pages/admin/sub/SubUpdate")) ;
const ProductCreate =lazy(()=>import("./pages/admin/product/ProductCreate")) ;
const AllProduct =lazy(()=>import("./pages/admin/product/AllProduct"));
const ProductUpdate =lazy(()=>import("./pages/admin/product/ProductUpdate")) ;
const ProductDetails =lazy(()=>import("./pages/Product"));
const CategoryHome =lazy(()=>import("./pages/category/CategoryHome"));
const SubHome =lazy(()=>import("./pages/sub/SubHome")) ;
const Shop =lazy(()=>import("./pages/Shop"));
const Cart =lazy(()=>import("./pages/Cart"));
const Checkout =lazy(()=>import("./pages/Checkout")) ;
const CreateCouponPage =lazy(()=>import("./pages/coupon/CreateCoupon"));
const Payment =lazy(()=>import("./pages/Payment"))


const App = () => {
  const dispatch = useDispatch();

  // const stableDispatch = useCallback(dispatch, [])

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user);

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
        // history("/");
        // console.log(idTokenResult.token);
      }
    });
    // cleanup
    return () => unsubscribe();
  }, []);

  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          __ React Redux EC
          <LoadingOutlined />
          MMERCE __
        </div>
      }
    >
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/complete" element={<RegisterComplete />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route
          path="/user/history"
          element={
            <UserRoute>
              <HistoryPage />
            </UserRoute>
          }
        />
        <Route
          path="/user/password"
          element={
            <UserRoute>
              <Password />
            </UserRoute>
          }
        />

        <Route
          path="/admin/password"
          element={
            <AdminRoute>
              <Password />
            </AdminRoute>
          }
        />

        <Route
          path="/user/wishlist"
          element={
            <UserRoute>
              <Wishlist />
            </UserRoute>
          }
        />
        <Route path="/sub/:slug" element={<SubHome />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/category"
          element={
            <AdminRoute>
              <CategoryCreate />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/category/:slug"
          element={
            <AdminRoute>
              <CategoryUpdate />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/subcategory"
          element={
            <AdminRoute>
              <SubCreate />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/sub/:slug"
          element={
            <AdminRoute>
              <SubUpdate />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/product"
          element={
            <AdminRoute>
              <ProductCreate />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AllProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/product/:slug"
          element={
            <AdminRoute>
              <ProductUpdate />
            </AdminRoute>
          }
        />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route
          path="/admin/coupon"
          element={
            <AdminRoute>
              <CreateCouponPage />
            </AdminRoute>
          }
        />

        <Route path="/category/:slug" element={<CategoryHome />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/checkout"
          element={
            <UserRoute>
              <Checkout />
            </UserRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <UserRoute>
              <Payment />
            </UserRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default App;
