const getAllJobs = async (req, res) => {
	res.send('Get All Jobs');
};

const getJob = async (req, res) => {
	res.send('Get Job');
};

const createJob = async (req, res) => {
	res.send(req.user);
};

const updateJob = async (req, res) => {
	res.send('Update Job');
};

const deleteJob = async (req, res) => {
	res.send('Delete Job');
};

export { getAllJobs, getJob, createJob, updateJob, deleteJob };