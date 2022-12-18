import nextConnect from "next-connect";
import middleware from "../../../lib/middleware";
import auth from "../../../lib/auth";

const handler = nextConnect();

handler.use(middleware);

handler.use(auth);

handler.get((req, res) => {
	return req.db
		.collection("students")
		.find({})
		.toArray()
		.then((students) => {
			console.log(students);
			return res.status(200).json(students);
		})
		.catch((error) => {
			console.log(error);
			return res.status(500).json({
				message: "Something went wrong",
			});
		});
});

handler.delete((req, res) => {
	const { id } = req.body;

	return req.db
		.collection("students")
		.deleteOne({ _id: id })
		.then((result) => {
			if (result.deletedCount === 1) {
				return res.status(200).json({
					message: "Student deleted",
				});
			}
			return res.status(404).json({
				message: "Student not found",
			});
		})
		.catch((error) => {
			return res.status(500).json({
				message: "Something went wrong",
			});
		});
});

export default handler;
