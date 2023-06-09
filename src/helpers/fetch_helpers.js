import axios from "axios";

const doPost = async (url, data) => {
    const response = await axios.post(url, JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
    });
    return response;
}

export default doPost;