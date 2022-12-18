import nextConnect from "next-connect";
import middleware from "../../lib/middleware";
import jwt from "jsonwebtoken";

const handler = nextConnect();

handler.use(middleware);

handler.post((req, res) => {
	const { email, password } = req.body;

	return req.db
		.collection("users")
		.findOne({ email })
		.then((user) => {
			if (user) {
				if (password === user.password) return Promise.resolve(user);
				return Promise.reject(Error("The password you entered is incorrect"));
			}
			return Promise.reject(Error("The email does not exist"));
		})
		.then((user) => {
			console.log(user);
			delete user.password;
			const token = jwt.sign(
				{ email: user.email, _id: user._id },
				process.env.JWT_SECRET,
				{ expiresIn: 86400 }
			); // 1 day token
			return res.send({
				status: "ok",
				token: token,
			});
		})
		.catch((error) =>
			res.send({
				status: "error",
				message: error.toString(),
			})
		);
});

export default handler;
