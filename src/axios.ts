import axios from "axios";
const api = import.meta.env.VITE_LOCAL_API || "https://api.chill-hub.net";
axios.defaults.baseURL = api;
export default axios;
