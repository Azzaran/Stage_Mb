import axios from "axios";

function loginAdmin(admins) {
    return axios.post("http://127.0.0.1:3000/connexion", admins);
}

export default{
    loginAdmin,
}