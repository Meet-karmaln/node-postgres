const client = require("../dbconnect");

const getTasks = async (req, res) => {
	try {
		const tasks = await client.query(`SELECT * FROM tasks`);
		const newTasks = tasks.rows.map((item) => {
			return { ...item, task: item.task.trim(" ") };
		});
		if (newTasks.length === 0) {
			return res.json({ success: true, msg: "no tasks added yet" });
		}
		res.json(newTasks);
	} catch (err) {
		console.log(err);
	}
};

const createTask = (req, res) => {
	if (req.body.length !== 0) {
		req.body.forEach(async (item) => {
			try {
				if (item.task?.trim()) {
					await client.query(`INSERT INTO tasks (task) VALUES ($1)`, [
						item.task.trim(),
					]);
				} else {
					res.json({ success: false, msg: "please add a task" });
				}
			} catch (err) {
				console.log("errrrrrrrrr", err);
			}
		});
	} else {
		res.json({ success: false, msg: "please add data" });
	}
	res.json({ success: true, msg: "task added successfully" });
};

const updateTask = async (req, res) => {
	try {
		const { id } = req.params;
		const { task } = req.body;
		let updatedTask;
		if (task?.trim()) {
			updatedTask = await client.query(
				`UPDATE tasks SET task = $1 WHERE task_id = $2`,
				[task, id]
			);
		} else {
			return res.json({
				success: false,
				msg: "please add a value to replace with",
			});
		}
		if (updatedTask.rowCount === 0) {
			return res.json({ success: false, msg: "not task exsist" });
		}
		res.json({ success: true, msg: "Task updated successfully" });
	} catch (error) {
		res.status(400).json({ success: false, msg: "enter valid Id" });
	}
};

const deleteTask = async (req, res) => {
	const { id } = req.params;
	const newTask = await client.query(`DELETE FROM tasks WHERE task_id = $1`, [
		id,
	]);
	res.send(newTask);
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
