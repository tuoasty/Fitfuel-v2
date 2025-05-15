import axios from "axios";

export default axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3000",
    transformRequest: [
        (data) => {
            return JSON.stringify(data);
        },
    ],
    transformResponse: [
        (data) => {
            return JSON.parse(data);
        }
    ]
})
