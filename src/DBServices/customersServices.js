import axios from "./http_connection";

const getAll = () => {
  return axios.get("/customers");
};

const get = (id) => {
  return axios.get(`/customers/${id}`);
};
const count = (name) => {
  return axios.get(`/customers/count?name=${name}`);
};
const create = (data, token) => {
  return axios.post("/customers", data, {
    headers: { "x-auth-token": token },
  });
};
const paginationSearch = (data, token) => {
  return axios.post("/customers/paginationSearch", data);
};
const update = (id, data, token) => {
  return axios.put(`/customers/${id}`, data, {
    headers: { "x-auth-token": token },
  });
};
const remove = (id, token) => {
  return axios.delete(`/customers/${id}`, {
    headers: { "x-auth-token": token },
  });
};

const customersService = {
  getAll,
  get,
  create,
  update,
  remove,
  paginationSearch,
  count,
};
export default customersService;
