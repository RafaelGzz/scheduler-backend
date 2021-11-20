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
    week_hours: {
        type: Number,
        required: false,
        default: 0
    },
    work_schedule: {
        type: {
            start: {
                type: String,
                required: true
            },
            end: {
                type: String,
                required: true
            }
        },
        required: true
    },
    work_days: [{
        work_hours: [{
            start: {
                type: String,
                required: true
            },
            end: {
                type: String,
                required: true
            },
            break_time: {
                type: Number,
                required: false,
                default: 0
            },
            worked_hours: {
                type: Number,
                required: false,
                default: 0
            },
            required: false,
            default: {

            }
        }],
        date: {
            type: Date,
            required: true,
        },
        required: false,
        default: {

        }
    }]
}, {
    timestamps: true,
});

const Nurse = mongoose.model("Nurse", nurseSchema);

export default Nurse;