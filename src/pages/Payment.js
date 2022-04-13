import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../component/StripeCheckOut";
import "./stripe.css";

const promise = loadStripe(
  "pk_test_51KkODSSGu2M5B5Beh9YbLCJljOxCw8dnItgY80sLZ7oMlMilyjxWu6aLx834EGE0aiK3OLHm6lxrUphpchBvdmK0009L5p7MM1"
);

const Payment = () => {
  return (
    <div className="container p-5 text-center">
      <h4>Complete Your Purchase</h4>
      <Elements stripe={promise}>
        <div className="col-md-8  offset-md-2">
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
