import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const adminSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 25,
		},
		name: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 50,
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minlength: 6,
			maxlength: 255,
		},
	},
	{
		timestamps: true,
	}
);

adminSchema.methods.encryptPassword = async (password) => {
	return await bcrypt.hash(password, await bcrypt.genSalt(10));
};

adminSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
