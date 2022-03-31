import axios from "axios";
import authHeader from "./auth";
const api = axios.create({
  baseURL: "https://final-project-ukage-be.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
  },
});

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

export const getUsers = async () => {
  return api({
    method: "GET",
    url: "/users",
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
    headers: authHeader(),
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const setVisitsByID = async (_id, visits) => {
  return api({
    method: "PATCH",
    url: `/visits/${_id}`,
    data: visits,
    headers: authHeader(),
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const postVisit = async (body) => {
  return api({
    method: "POST",
    url: `/visits`,
    data: body,
    headers: authHeader(),
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getVisitsByUser = async (_id) => {
  return api({
    method: "GET",
    url: `users/${_id}/visits`,
    headers: authHeader(),
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const patchVolunteer = async (id, data) => {
  return api({
    method: "PATCH",
    url: `/users/${id}`,
    data: data,
    headers: authHeader(),
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
