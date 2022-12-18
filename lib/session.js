import session from "next-session";
import connectMongo from "connect-mongo";

const MongoStore = connectMongo(session);

export default function (req, res, next) {
	return session({ store: new MongoStore({ mongoUrl: process.env.MONGODB_URI }) })(
		req,
		res,
		next
	);
}
