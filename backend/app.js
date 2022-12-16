const express = require("express");
const app = express();
const cors = require("cors");
const client = require("./dbconnect");
const route = require("./routes/tasks");

app.use(cors());
app.use(express.json());
app.use("/tasks", route);

const port = 3000;

const start = () => {
	client.connect((err) => {
		if (err) {
			console.log("found and error" + err);
		}
		console.log("conneted smoothly");
		app.listen(port, () => {
			console.log(`server is listening to port ${port}`);
		});
	});
};

start();
