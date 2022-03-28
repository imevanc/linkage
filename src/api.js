import axios from "axios";

const api = axios.create({
  baseURL: "https://final-project-ukage-be.herokuapp.com/api",
});

export const createUser = async (user) => {
  return api({
    method: "POST",
    url: "/auth/signup",
    data: user,
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
    method: "POST",
    url: "/auth/login",
    data: body,
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUsers = async () => {
  return api({
    method: "GET",
    url: "/users",
  })
    .then((res) => {
      return res.data.users;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUsersByID = async (_id) => {
  return api({
    method: "GET",
    url: `/users/${_id}`,
  }).then((res) => {
    return res.data.user;
  });
};
