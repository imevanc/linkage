import axios from "axios";

const api = axios.create({
  withCredentials: true,
  credentials: "include",
  baseURL: "https://auth-group.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
  },
});

export const createUser = async (user) => {
  return api({
    method: "post",
    url: "/auth/signup",
    data: user,
    withCredentials: true, // Now this is was the missing piece in the client side
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const loginUser = async (body) => {
  return api({
    method: "post",
    url: "/auth/login",
    data: body,
    // withCredentials: true, // Now this is was the missing piece in the client side
  })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};

export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.accessToken) {
    // for Node.js Express back-end
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}
export const getUsers = async () => {
  return api({
    method: "get",
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