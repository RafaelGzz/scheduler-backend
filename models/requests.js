class DayOffRequest{
    nurse_id;
    date;
    status;

	constructor(
        nurse_id,
        date,
        status,
	){
		this.nurse_id = nurse_id;
		this.date = date;
		this.status = status;
	}
}

export default DayOffRequest