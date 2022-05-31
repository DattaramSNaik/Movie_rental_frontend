import axios from "./http_connection";

const create = (data) => {
  return axios.post("/users", data);
};
const registerService = {
  create,
};
export default registerService;
