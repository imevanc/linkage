import axios from "axios";
import authHeader from "./auth";
const api = axios.create({
  withCredentials: true,
  credentials: "include",
  baseURL: "https://final-project-ukage-be.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
  },
});

export const getUsers = async () => {
  return api({
    method: "GET",
    url: "/users",
    withCredentials: true,
    headers: authHeader(),
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUsersByID = async (_id) => {
  return api({
    method: "GET",
    url: `/users/${_id}`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
