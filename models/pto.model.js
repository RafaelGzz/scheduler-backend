import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ptoSchema = new Schema(
	{
		nurse_id: {
			type: Number,
			required: true,
			trim: true,
		},
		date: {
			type: Date,
			required: true,
		},
		status: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

const PTO = mongoose.model("pto", ptoSchema);

export default PTO;
