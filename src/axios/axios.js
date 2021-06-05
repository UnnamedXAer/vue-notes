import Axios from "axios";

// expected to be a rest api passed as env var but there is not server yet
const API_URL = "http://127.0.0.1:9200";

const axios = Axios.create({
  baseURL: API_URL,
});

export default axios;
