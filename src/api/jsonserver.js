// import and create preconfigure version of axios
import axios from "axios";

export default axios.create({
	// NOTE must be changed each time ngrok is reset
	baseURL: "http://b154f933.ngrok.io"
});
