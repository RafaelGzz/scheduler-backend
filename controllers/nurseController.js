import response from "../includes/response.js";
import Task from "../models/task.model.js";
import Nurse from "../models/nurse.model.js";

export const getNurse = async(req, res) => {
    try {
        const nurse = await Nurse.findOne({ nurse_id: req.params.id }).orFail();
        res.send(
            new response({
                data: nurse
            })
        );

    } catch (ex) {
        res.send(new response({ status: "Error", message: "Not found", data: ex }))
    }
};

export const getNurses = async(req, res) => {

    try {
        const nurses = await Nurse.find({}).orFail();
        res.send(
            new response({
                data: nurses
            })
        );
    } catch (ex) {
        res.send(new response({ status: "Error", message: "No nurses on database", data: ex }))
    }

};

export const addNurse = async(req, res) => {
    try {
        const a = await Nurse.findOne({ nurse_id: req.body.nurse_id })
        if (a != null) {
            res.send(new response({ status: "Error", message: "Duplicate nurse_id" }))
        } else {
            const nurse = await Nurse(req.body).orFail();
            await nurse.save().orFail();

            res.send(new response({ data: nurse }))
        }
    } catch (ex) {
        res.send(new response({ status: "Error", message: "Cannot add nurse", data: ex }))
    }
};

export const deleteNurse = async(req, res) => {
    try {

    } catch (ex) {

    }
};

export const editNurse = async(req, res) => {
    try {

        await Nurse.findOneAndUpdate({ nurse_id: req.body.nurse_id }, req.body, { useFindAndModify: false })
        const nurse = await Nurse.findOne({ nurse_id: req.body.nurse_id }).orFail();

        res.send(new response({ data: nurse }))

    } catch (ex) {
        res.send(new response({ status: "Error", message: "Cannot edit nurse", data: ex }))
    }
};


// export function valid(req, res, next) {
//     const nurse = req.body;

//     if (nurse.nurse_id == null) res.send(new response({ status: "Error", message: "Missing nurse_id", data: nurse }))
//     else if (nurse.name == null) res.send(new response({ status: "Error", message: "Missing name", data: nurse }))
//     else if (nurse.work_schedule == null) res.send(new response({ status: "Error", message: "Missing work_schedule", data: nurse }))
//     else next();
// };