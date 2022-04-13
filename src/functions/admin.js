import axios from "axios";

export const getOrders = async (authtoken) =>
  await axios.get(`http://localhost:8000/api/admin/orders`, {
    headers: {
      authtoken,
    },
  });

export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `http://localhost:8000/api/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );
