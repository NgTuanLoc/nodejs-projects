import { StatusCodes } from 'http-status-codes';

import Job from '../models/Job.js';
import {
	BadRequestError,
	NotFoundError,
	UnauthenticatedError,
} from '../errors/index.js';

const getAllJobs = async (req, res) => {
	const jobs = await Job.find({ createdBy: req.user.userId });
	res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
	const { id: jobId } = req.params;
	const { userId } = req.user;

	const job = await Job.findOne({
		_id: jobId,
		createdBy: userId,
	});

	if (!job) {
		throw new NotFoundError(`No job with id: ${jobId}`);
	}

	res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
	req.body.createdBy = req.user.userId;
	const job = await Job.create(req.body);
	res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
	res.send('Update Job');
};

const deleteJob = async (req, res) => {
	res.send('Delete Job');
};

export { getAllJobs, getJob, createJob, updateJob, deleteJob };
