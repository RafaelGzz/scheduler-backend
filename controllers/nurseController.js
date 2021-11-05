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
        const nurse = await Nurse(req.body);
        await nurse.save();

        res.send(new response({ data: nurse }))
    } catch (ex) {
        res.send(new response({ status: "Error", message: "Cannot add nurse", data: ex }))
    }
};

export const deleteNurse = async(req, res) => {
    User.findById(req.username)
        .then((user) => {
            const filteredTasks = user.tasks.filter(
                (val) => val.id !== parseInt(req.params.id)
            );
            if (user.tasks.length === filteredTasks.length)
                return res.send(
                    new response({
                        status: "Error",
                        message: "No task with id:" + req.params.id + " was found",
                    })
                );
            user.tasks = filteredTasks;

            user.markModified("tasks");
            user.save()
                .then(() =>
                    res.send(
                        new response({
                            message: "Task deleted successfully",
                        })
                    )
                )
                .catch((err) =>
                    res
                    .status(400)
                    .send(new response({ status: "Error", message: err }))
                );
        })
        .catch((err) =>
            res
            .status(400)
            .send(new response({ status: "Error", message: err }))
        );
};

export const editNurse = async(req, res) => {
    const { title, teacher, points, place, date, description } = req.body;

    let edited = false;
    User.findById(req.username)
        .then((user) => {
            let tasks = user.tasks;
            for (let i = 0; i < tasks.length; i++) {
                if (parseInt(tasks[i].id) === parseInt(req.params.id)) {
                    tasks[i].title = title;
                    tasks[i].teacher = teacher;
                    tasks[i].points = points;
                    tasks[i].place = place;
                    tasks[i].date = date;
                    tasks[i].description = description;
                    tasks[i].subject = subject;
                    edited = true;
                    break;
                }
            }

            if (!edited)
                return res.send(
                    new response({
                        status: "Error",
                        message: "No task with id:" + req.params.id + " was found",
                    })
                );

            user.tasks = tasks;
            user.markModified("tasks");
            user.save()
                .then(() =>
                    res.send(
                        new response({
                            message: "Task edited successfully",
                        })
                    )
                )
                .catch((err) =>
                    res
                    .status(400)
                    .send(new response({ status: "Error", message: err }))
                );
        })
        .catch((err) =>
            res
            .status(400)
            .send(new response({ status: "Error", message: err }))
        );
};