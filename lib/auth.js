import jwt from "jsonwebtoken";

//  Check if token is valid
//  If valid, continue
//  If not, return error

export default function auth(req, res, next) {
	const token = req.headers?.authorization?.split(" ")[1];
	if (!token)
		return res.status(401).json({
			message: "Auth failed",
		});

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({
				message: "Auth failed",
			});
		}
		req.user = decoded;
	});

	next();
}
