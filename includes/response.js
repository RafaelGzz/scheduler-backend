import { ResponseStatus } from "./status.js";

class response {
	status;
	message;
	data;

	constructor(obj) {
		this.status = obj.status ? obj.status : ResponseStatus.SUCCESS;
		this.message = obj.message ? obj.message : "";
		this.data = obj.data ? obj.data : {};
	}
}

export default response;