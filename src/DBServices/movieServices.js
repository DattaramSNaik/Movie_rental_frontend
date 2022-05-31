import axios from "./http_connection";

const getAll = () => {
  return axios.get("/movies");
};
const count = (genreName, title) => {
  return axios.get(`/movies/count?genreName=${genreName}&title=${title}`);
};
const get = (id) => {
  return axios.get(`/movies/${id}`);
};
const create = (data, token) => {
  return axios.post("/movies", data, {
    headers: { "x-auth-token": token },
  });
};
const pfs = (data) => {
  return axios.post("/movies/pfs", data);
};

const update = (id, data, token) => {
  return axios.put(`/movies/${id}`, data, {
    headers: { "x-auth-token": token },
  });
};
const remove = (id, token) => {
  return axios.delete(`/movies/${id}`, { headers: { "x-auth-token": token } });
};

const movieServices = {
  getAll,
  count,
  get,
  create,
  pfs,
  update,
  remove,
};
export default movieServices;
