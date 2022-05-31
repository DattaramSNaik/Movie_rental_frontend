import axios from "./http_connection";

const getAll = () => {
  return axios.get("/genres");
};
const count = (name) => {
  return axios.get(`/genres/count?name=` + name);
};
const get = (id) => {
  return axios.get(`/genres/${id}`);
};
const paginationSearch = (data) => {
  return axios.post(`/genres/paginationSearch`, data);
};

const create = (data, token) => {
  return axios.post("/genres", data, {
    headers: { "x-auth-token": token },
  });
};
const update = (id, data, token) => {
  return axios.put(`/genres/${id}`, data, {
    headers: { "x-auth-token": token },
  });
};
const remove = (id, token) => {
  return axios.delete(`/genres/${id}`, { headers: { "x-auth-token": token } });
};

const genreService = {
  getAll,
  get,
  create,
  update,
  remove,
  paginationSearch,
  count,
};
export default genreService;
