import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
// import { googleAuthProvider } from "../../../../../Source/source-code-for-each-lectures/021-login-page/client/src/firebase";
import firebase from "firebase/compat/app";
import { createOrUpdateUser } from "../../functions/auth";
import "firebase/compat/firestore";
import { useLocation } from "react-router-dom";

const Login = () => {
  let dispatch = useDispatch();
  let history = useNavigate();
  const [email, setEmail] = useState("neazmorshed1971@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState();
  // const { user } = useSelector((state) => ({ ...state }));
  // const { location} = useLocation()
  // const { from } = location.state
  // useEffect(() => {
  //   if (user && user.token) {
  //     history("/");
  //   }
  // }, [user]);

  const roleBasedRedirect = (res) => {
    //if intended page is there
    //  console.log('====',history)
    // console.log('=====>',location)
    // console.log(from)
    // let intended = history.location.state;
    // if (intended) {
    //   history(intended.form);
    // }else{

    if (res.data.role === "admin") {
      history("/admin/dashboard");
    } else {
      history("/user/history");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
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
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
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
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
       
        toast.error(err.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
      </div>
      <br />
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <Button
        onClick={handleSubmit}
        icon={<MailOutlined />}
        type="primary"
        className="mb-3"
        block
        shape="round"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>

      <Button
        onClick={googleLogin}
        icon={<GoogleOutlined />}
        type="danger"
        className="mb-3"
        block
        shape="round"
      >
        Login with Gmail
      </Button>

      <Link to="/forgot/password" className="float-right text-danger">
        Forgot Password
      </Link>
    </form>
  );

  return (
    <div>
      <div className="conatainer p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            {loading ? (
              <h4 className="text-danger">Loading...</h4>
            ) : (
              <h4>Login</h4>
            )}
            {loginForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
