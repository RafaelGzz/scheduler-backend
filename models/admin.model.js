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
        requests: {
            required: false,
            type: [{
                nurse_id: {
                    type: Number,
                    trim: true,
                    required: true,
                },
				date: {
                    type: Date,
                    trim: true,
					required: true,
                },
				status: {
					type: String,
					required: true,
					trim: true
				}
            }]
        }
	},
	{
		timestamps: true,
	}
);

userSchema.methods.encryptPassword = async (password) => {
	return await bcrypt.hash(password, await bcrypt.genSalt(10));
};

userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
