import { MongoClient } from "mongodb";

export const client = new MongoClient(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

export default function database(req, res, next) {
	if (client.listenerCount("close") === 0) {
		return client
			.connect()
			.then(() => {
				req.dbClient = client;
				req.db = client.db(process.env.DB_NAME);
				return next();
			})
			.catch((err) => {
				console.log(err);
				return res.status(500).json({ error: "Unable to connect to database" });
			});
	}
	req.dbClient = client;
	req.db = client.db(process.env.DB_NAME);
	return next();
}
