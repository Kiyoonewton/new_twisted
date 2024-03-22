import axios from "axios";
import Cookies from "js-cookie";

let api = axios.create({
    baseURL: process.env.API_URL,
});

export const updateAPIToken = (token: string) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const isLoggedIn = () => {
    if (api.defaults.headers.common["Authorization"]) {
        return true;
    } else {
        // Check if the token exists
        const tokens = Cookies.get("tokens");
        const userDetails = Cookies.get("user");

        if (tokens && userDetails) {
            if (new Date(JSON.parse(tokens).access.expires) < new Date()) {
                // Token expired
                throw Error("Not logged in");
            } else {
                // User is still signed in
                api.defaults.headers.common["Authorization"] = `Bearer ${
                    JSON.parse(tokens).access.token
                }`;

                return true;
            }
        } else {
            throw Error("Not logged in");
        }
    }
};

export default api;