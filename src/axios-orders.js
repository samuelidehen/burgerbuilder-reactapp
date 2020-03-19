import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-reactapp-bf88e.firebaseio.com/"
});

export default instance;
