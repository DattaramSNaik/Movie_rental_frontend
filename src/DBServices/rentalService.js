import axios from "./http_connection";

const getAll = () => {
  return axios.get("/rentals");
};

const get = (id) => {
  return axios.get(`/rentals/${id}`);
};
const count = () => {
  return axios.get(`/rentals/count`);
};
const paginationSearch = (data) => {
  return axios.post(`/rentals/paginationSearch`, data);
};
const create = (data, token) => {
  return axios.post("/rentals", data, {
    headers: { "x-auth-token": token },
  });
};

const patch = (id, data, token) => {
  return axios.patch(`/rentals/${id}`, data, {
    headers: { "x-auth-token": token },
  });
};
const remove = (id, token) => {
  console.log("rental service", id);
  return axios.delete(`/rentals/${id}`, { headers: { "x-auth-token": token } });
};

const rentalService = {
  getAll,
  get,
  create,
  patch,
  remove,
  count,
  paginationSearch,
};
export default rentalService;
