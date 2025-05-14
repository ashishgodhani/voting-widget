import axios from "axios";

export default async function fetchAPIData() {
    try {
        const response = await axios.get("https://my.beastscan.com/test-kit")
        return response
    } catch (error) {
        console.log(error);
  
    }
}