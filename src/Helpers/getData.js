import axios from "axios";

const getData = async (url) => {
    return await axios.get(url);
}

export default getData;