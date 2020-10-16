const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	courses: [
		{
			type: String,
			uppercase: true,
			required: true
		}
	]
});

module.exports = mongoose.model("Department", departmentSchema);
