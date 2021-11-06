import response from "../includes/response.js";
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
            res.send(new response({ status: "Error", message: "Duplicate nurse_id", data: { nurse_id: a.nurse_id, name: a.name } }))
        } else {

            const nurse = await Nurse(req.body);
            await nurse.save();

            res.send(new response({ data: nurse }))
        }
    } catch (ex) {
        res.send(new response({ status: "Error", message: "Cannot add nurse", data: ex }))
    }
};

export const deleteNurse = async(req, res) => {
    try {
        const deleted = await Nurse.findOneAndDelete({ nurse_id: req.params.id }).orFail();
        res.send(new response({ data: deleted }))
    } catch (ex) {
        res.send(new response({ status: "Error", message: "Cannot delete nurse", data: ex }))
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