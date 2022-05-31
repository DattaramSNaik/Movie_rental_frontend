import axios from "./http_connection";

const create = (data) => {
  return axios.post("/login", data);
};
const loginService = {
  create,
};
export default loginService;
