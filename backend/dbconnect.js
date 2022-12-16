const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
	user: "postgres",
	host: "localhost",
	database: "Taskify",
	password: process.env.CONNECTION_PASSWORD,
	port: 5432,
});

module.exports = client;
