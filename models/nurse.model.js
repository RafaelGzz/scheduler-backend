import mongoose from "mongoose";

const Schema = mongoose.Schema;

const nurseSchema = new Schema({
    nurse_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    days_off_available: {
        type: Number,
        required: false,
        default: 1
    },
    work_schedule: {
        type: {
            start: {
                type: Date,
                required: true
            },
            end: {
                type: Date,
                required: true
            }
        },
        required: true,
        default: {

        }
    },
    work_hours: {
        type: {
            start: {
                type: Date,
                required: true
            },
            end: {
                type: Date,
                required: true
            }
        },
        required: false,
        default: {

        }
    },
    break_hours: {
        type: {
            start: {
                type: Date,
                required: true
            },
            end: {
                type: Date,
                required: true
            }
        },
        required: false,
        default: {

        }
    },
    total_worked_hours: {
        type: Number,
        required: false,
        default: 0
    }
}, {
    timestamps: true,
});

const Nurse = mongoose.model("Nurse", nurseSchema);

export default Nurse;