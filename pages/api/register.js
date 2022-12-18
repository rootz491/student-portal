import nextConnect from "next-connect";
import { client } from "../../lib/database";
import middleware from "../../lib/middleware";

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
	const { files, ...body } = JSON.parse(req.body);
	const { acknowledged } = await req.db.collection("students").insertOne(body);
	if (acknowledged) {
		res.send({
			status: "ok",
		});
	} else {
		res.send({
			status: "error",
		});
	}
});

export default handler;
