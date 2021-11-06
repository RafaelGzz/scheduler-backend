import { ResponseStatus } from "./status.js";

class response {
    status;
    statusCode;
    message;
    data;

    constructor(obj) {
        this.status = obj.status ? obj.status : ResponseStatus.SUCCESS;
        this.statusCode = obj.statusCode ? obj.statusCode : (this.status == ResponseStatus.SUCCESS ? 200 : 500)
        this.message = obj.message ? obj.message : "";
        this.data = obj.data ? obj.data : {};
    }
}

export default response;