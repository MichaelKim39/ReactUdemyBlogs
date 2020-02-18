// import and create preconfigure version of axios
import axios from "axios";

export default axios.create({
	// NOTE must be changed each time ngrok is reset
	baseURL: "http://c4c0834e.ngrok.io"
});
