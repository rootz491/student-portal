import nextConnect from "next-connect";
import cloudinary from "../../lib/cloudinary";
import middleware from "../../lib/middleware";

const handler = nextConnect();
handler.use(middleware);

const folderName = "ugandan-student-portal";

const upload = async (file, studentFolderName, callback) => {
	return await cloudinary.uploader.upload(
		file,
		{
			use_asset_folder_as_public_id_prefix: true,
			folder: folderName + "/" + studentFolderName,
			overwrite: true,
			invalidate: true,
		},
		function (error, result) {
			if (error) return console.log(error);
			else callback(result?.url ?? null);
		}
	);
};

handler.post(async (req, res) => {
	const { files, captcha, ...body } = JSON.parse(req.body);

	//	Validate captcha
	const response = await fetch(
		`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
			},
		}
	);
	const captchaValidation = await response.json();
	if (!captchaValidation.success) {
		res.send({
			status: "error",
			message: "Captcha validation failed",
		});
		return;
	}

	const docCount = await req.db.collection("students").countDocuments();
	const studentFolderName =
		docCount + 1 + "___" + Math.random().toString(36).substring(2, 15);
	//	Upload files
	const imgs = {
		photo: null,
		signature: null,
	};

	if (files?.photo != null)
		await upload(files?.photo, studentFolderName, (result) => {
			imgs.photo = result;
		});
	if (files?.signature != null)
		await upload(
			files?.signature,
			studentFolderName,
			(result) => (imgs.signature = result)
		);

	const { acknowledged } = await req.db
		.collection("students")
		.insertOne({ ...body, ...imgs, createdAt: new Date() });
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
