import React, { useState,useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Register = () => {
  const [email, setEmail] = useState("");
  let history = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) {
      history("/");
    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: "http://localhost:3000/register/complete",
      handleCodeInApp: "true",
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is send to ${email}. Click to Complete Your Registration.`
    );

    //save user email
    window.localStorage.setItem("emailForRegistration", email);
    //
    setEmail("");
  };
  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <button type="submit" className="btn btn-raised">
        Register/{email}{" "}
      </button>
    </form>
  );

  return (
    <div>
      <div className="conatainer p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4>Register</h4>
            {registerForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
