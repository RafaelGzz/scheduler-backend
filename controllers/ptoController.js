import { ptoEditionValidation, ptoReigisterValidation } from "../includes/validation.js";
import response from "../includes/response.js";
import { ResponseStatus } from "../includes/status.js";
import PTO from "../models/pto.model.js";

export const getPto = async (req, res) => {
	try {
		const pto = await PTO.findOne({ nurse_id: req.params.nurse_id }).orFail();
		res.send(
			new response({
				data: pto
			})
		);

	} catch (ex) {
		res.send(new response({ status: ResponseStatus.ERROR, message: "Not found", data: ex }))
	}
};

export const getPtos = async (req, res) => {
	try {
		const ptos = await PTO.find({}).orFail();
		res.send(
			new response({
				data: ptos
			})
		);
	} catch (ex) {
		res.send(new response({ status: ResponseStatus.ERROR, message: "No PTOs on database", data: ex }))
	}
};

export const getPtosByNurse = async (req, res) => {
	try {
		const ptos = await PTO.find({ nurse_id: req.body.nurse_id }).orFail();
		res.send(
			new response({
				data: ptos
			})
		);
	} catch (ex) {
		res.send(new response({ status: ResponseStatus.ERROR, message: "No PTOs on database", data: ex }))
	}
};

export const addPto = async (req, res) => {
	try {
		const { error } = ptoReigisterValidation(req.body);
		if (error) {
			return res.send(new response({ status: ResponseStatus.ERROR, message: error.details[0].message }))
		}
		const pto = await PTO(req.body);
		const savedPto = await pto.save();
		res.send(new response({ data: savedPto }));
	} catch (ex) {
		res.send(new response({ status: ResponseStatus.ERROR, message: "Cannot add pto", data: ex }))
	}
};

export const deletePto = async (req, res) => {
	try {
		const deleted = await PTO.findByIdAndDelete(req.params.id).orFail();
		return res.send(new response({ data: deleted }))
	} catch (ex) {
		res.send(new response({ status: ResponseStatus.ERROR, message: "Cannot delete pto", data: ex }))
	}
};

export const editPto = async (req, res) => {
	const data = req.body;
	try {
		const { error } = ptoReigisterValidation(req.body);
		if (error) {
			return res.send(new response({ status: ResponseStatus.ERROR, message: error.details[0].message }))
		}
		await PTO.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
		const pto = await PTO.findById(req.params.id).orFail();

		res.send(new response({ data: pto }))

	} catch (ex) {
		res.send(new response({ status: ResponseStatus.ERROR, message: "Cannot edit pto", data: ex }))
	}
};