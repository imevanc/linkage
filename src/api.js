import axios from "axios";
import authHeader from "./auth";
const api = axios.create({
  // withCredentials: true,
  // credentials: "include",
  baseURL: "https://final-project-ukage-be.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
  },
});

export const loginUser = async (body) => {
  console.log(body);
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
    // withCredentials: true,
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

export const setVisitsByID = async (_id, visits) => {
  return api({
    method: "PATCH",
    url: `/visits/${_id}`,
    data: visits,
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
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
