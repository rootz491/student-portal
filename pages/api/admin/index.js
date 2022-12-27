import nextConnect from "next-connect";
import middleware from "../../../lib/middleware";
import auth from "../../../lib/auth";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);
handler.use(auth);

handler.get((req, res) => {
	const { startDate, endDate } = req.query;

	return req.db
		.collection("students")
		.find({
			createdAt: {
				$gte: new Date(startDate),
				$lte: new Date(endDate),
			},
		})
		.toArray()
		.then((students) => {
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
	console.log(id);
	return req.db
		.collection("students")
		.deleteOne({
			_id: ObjectId(id),
		})
		.then((result) => {
			if (result.deletedCount === 1) {
				return res.status(200).json({
					success: true,
					message: "Student deleted",
				});
			}
			return res.status(200).json({
				success: false,
				message: "Student not found",
			});
		})
		.catch((error) => {
			console.log(error);
			return res.status(500).json({
				message: "Something went wrong",
			});
		});
});

export default handler;
