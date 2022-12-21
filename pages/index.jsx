import {
	FormControl,
	FormLabel,
	Input,
	Stack,
	Button,
	Select,
	Textarea,
} from "@chakra-ui/react";
import { createRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import InputGroup from "../components/inputGroup";
import Layout from "../components/layout";
import Loading from "../components/loading";
import Upload from "../components/upload";

const defaultFormState = {
	general: {
		surName: "",
		middleName: "",
		lastName: "",
		sex: "female",
		dateOfBirth: "",
		place: "",
	},
	passport: {
		number: "",
		dateOfIssue: "",
		place: "",
		expiryDate: "",
	},
	address: {
		ugandaAddress: "",
		indiaAddress: "",
		tel: "",
		fax: "",
		email: "",
	},
	residentialPermit: {
		number: "",
		dateOfIssue: "",
		expiryDate: "",
	},
	guardian: {
		name: "",
		relationship: "married",
		address: "",
		tel: "",
		fax: "",
		email: "",
		occupation: "",
	},
	study: {
		previousTwoEducationalInstitutes: "",
		employmentRecord: "",
		presentCourse: "",
		presentInstituteAddress: "",
		expectedDateOfCompletion: "",
		sponsorship: "",
	},
	otherInformation: "",
	date: "",
	place: "",
	files: {
		photo: null,
		signature: null,
	},
};

export default function Registration() {
	const [formState, setFormState] = useState(defaultFormState);
	const [captchaCode, setCaptchaCode] = useState(null);
	const [loading, setLoading] = useState(false);
	const recaptchaRef = createRef();

	const onReCAPTCHAChange = (captchaCode) => {
		// If the reCAPTCHA code is null or undefined indicating that
		// the reCAPTCHA was expired then return early
		if (!captchaCode) {
			return;
		}
		// Else reCAPTCHA was executed successfully.
		setCaptchaCode(captchaCode);
		console.log("reCAPTCHA executed successfully");
	};

	const onReCAPTCHAExpired = () => {
		console.log("reCAPTCHA expired, please try again");
		recaptchaRef.current.reset();
		setCaptchaCode(null);
	};

	//	validates the form state for required fields
	const validator = () => {
		if (
			formState.general.surName === "" ||
			formState.general.lastName === "" ||
			formState.general.dateOfBirth === "" ||
			formState.general.place === ""
		) {
			alert("Please fill in all the required fields in the General section");
			return false;
		}

		if (
			formState.passport.number === "" ||
			formState.passport.dateOfIssue === "" ||
			formState.passport.expiryDate === ""
		) {
			alert("Please fill in all the required fields in the Passport section");
			return false;
		}

		if (
			formState.address.ugandaAddress === "" ||
			formState.address.indiaAddress === "" ||
			formState.address.tel === "" ||
			formState.address.fax === ""
		) {
			alert("Please fill in all the required fields in the Address section");
			return false;
		}

		if (
			formState.residentialPermit.number === "" ||
			formState.residentialPermit.dateOfIssue === "" ||
			formState.residentialPermit.expiryDate === ""
		) {
			alert(
				"Please fill in all the required fields in the Residential Permit section"
			);
			return false;
		}

		if (
			formState.guardian.name === "" ||
			formState.guardian.address === "" ||
			formState.guardian.tel === "" ||
			formState.guardian.fax === "" ||
			formState.guardian.occupation === ""
		) {
			alert("Please fill in all the required fields in the Guardian section");
			return false;
		}

		if (
			formState.study.previousTwoEducationalInstitutes === "" ||
			formState.study.presentCourse === "" ||
			formState.study.presentInstituteAddress === "" ||
			formState.study.expectedDateOfCompletion === "" ||
			formState.study.sponsorship === ""
		) {
			alert("Please fill in all the required fields in the Study section");
			return false;
		}

		if (formState.date === "" || formState.place === "") {
			alert(
				"Please fill in Date & Place fields in the Other Information section"
			);
			return false;
		}

		if (formState.files.photo === null || formState.files.signature === null) {
			alert("Please upload all the required files");
			return false;
		}

		return true;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		if (!validator()) return;

		fetch("/api/register", {
			method: "POST",
			body: JSON.stringify({ ...formState, captcha: captchaCode }),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.then(() => {
				//	show toast
				alert("Form submitted successfully");
			})
			.catch((err) => console.log(err))
			.finally(() => {
				// Reset the reCAPTCHA so that it can be executed again if user
				// submits another email.
				recaptchaRef.current.reset();
				setCaptchaCode(null);
				setFormState(defaultFormState);
				setLoading(false);
			});
	};

	return (
		<Layout>
			<Loading active={loading} />
			<Stack
				paddingY={8}
				spacing={4}
				minH="100vh"
				w={{
					base: "95%",
					sm: "80%",
					md: "70%",
				}}
				m="auto"
				justifyContent="center"
				alignItems="center"
			>
				<InputGroup label="Name[s]">
					<FormControl id="surName" isRequired>
						<FormLabel>Surname</FormLabel>
						<Input
							value={formState.general.surName}
							color="white"
							onChange={(e) =>
								setFormState({
									...formState,
									general: {
										...formState.general,
										surName: e.target.value,
									},
								})
							}
							type="text"
						/>
					</FormControl>
					<FormControl id="middleName">
						<FormLabel>Middle Name</FormLabel>
						<Input
							type="text"
							color="white"
							value={formState.general.middleName}
							onChange={(e) =>
								setFormState({
									...formState,
									general: {
										...formState.general,
										middleName: e.target.value,
									},
								})
							}
						/>
					</FormControl>
					<FormControl id="lastName" isRequired>
						<FormLabel>Last Name</FormLabel>
						<Input
							type="text"
							color="white"
							value={formState.general.lastName}
							onChange={(e) =>
								setFormState({
									...formState,
									general: {
										...formState.general,
										lastName: e.target.value,
									},
								})
							}
						/>
					</FormControl>
					<Upload
						type="circle"
						onChange={(file) => {
							setFormState({
								...formState,
								files: {
									...formState.files,
									photo: file,
								},
							});
						}}
					/>
				</InputGroup>

				<InputGroup label="General">
					<FormControl id="sex">
						<FormLabel>Sex</FormLabel>
						<Select
							defaultValue="female"
							value={formState.general.sex}
							onChange={(e) =>
								setFormState({
									...formState,
									general: {
										...formState.general,
										sex: e.target.value,
									},
								})
							}
						>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</Select>
					</FormControl>
					<FormControl id="DOB" isRequired>
						<FormLabel>Date of Birth</FormLabel>
						<Input
							type="date"
							color="white"
							value={formState.general.dateOfBirth}
							onChange={(e) =>
								setFormState({
									...formState,
									general: {
										...formState.general,
										dateOfBirth: e.target.value,
									},
								})
							}
						/>
					</FormControl>
					<FormControl id="place" isRequired>
						<FormLabel>Place</FormLabel>
						<Input
							type="text"
							color="white"
							value={formState.general.place}
							onChange={(e) =>
								setFormState({
									...formState,
									general: {
										...formState.general,
										place: e.target.value,
									},
								})
							}
						/>
					</FormControl>
				</InputGroup>

				<InputGroup label="Passport">
					<FormControl id="passportNumber" isRequired>
						<FormLabel>Passport Number</FormLabel>
						<Input
							type="text"
							color="white"
							value={formState.passport.number}
							onChange={(e) => {
								if (isNaN(e.target.value)) return;
								setFormState({
									...formState,
									passport: {
										...formState.passport,
										number: e.target.value,
									},
								});
							}}
						/>
					</FormControl>
					<FormControl id="DOI" isRequired>
						<FormLabel>Date of Issue</FormLabel>
						<Input
							type="date"
							color="white"
							value={formState.passport.dateOfIssue}
							onChange={(e) =>
								setFormState({
									...formState,
									passport: {
										...formState.passport,
										dateOfIssue: e.target.value,
									},
								})
							}
						/>
					</FormControl>
					<FormControl id="Pplace" isRequired>
						<FormLabel>place</FormLabel>
						<Input
							type="text"
							color="white"
							value={formState.passport.place}
							onChange={(e) =>
								setFormState({
									...formState,
									passport: {
										...formState.passport,
										place: e.target.value,
									},
								})
							}
						/>
					</FormControl>
					<FormControl id="DOE" isRequired>
						<FormLabel>Expiry Date</FormLabel>
						<Input
							type="date"
							color="white"
							value={formState.passport.expiryDate}
							onChange={(e) =>
								setFormState({
									...formState,
									passport: {
										...formState.passport,
										expiryDate: e.target.value,
									},
								})
							}
						/>
					</FormControl>
				</InputGroup>

				<InputGroup label="Address" direction="column">
					<Stack
						w="full"
						direction={{
							base: "column",
							md: "row",
						}}
					>
						<FormControl id="ugandaAddress" isRequired>
							<FormLabel>Permanent address in Uganda</FormLabel>
							<Input
								type="text"
								color="white"
								value={formState.address.ugandaAddress}
								onChange={(e) =>
									setFormState({
										...formState,
										address: {
											...formState.address,
											ugandaAddress: e.target.value,
										},
									})
								}
							/>
						</FormControl>
						<FormControl id="indiaAddress" isRequired>
							<FormLabel>Permanent address in India</FormLabel>
							<Input
								type="text"
								color="white"
								value={formState.address.indiaAddress}
								onChange={(e) =>
									setFormState({
										...formState,
										address: {
											...formState.address,
											indiaAddress: e.target.value,
										},
									})
								}
							/>
						</FormControl>
					</Stack>
					<Stack
						w="full"
						spacing={4}
						direction={{
							base: "column",
							md: "row",
						}}
					>
						<FormControl id="tel" isRequired>
							<FormLabel>Tel No.</FormLabel>
							<Input
								type="tel"
								color="white"
								value={formState.address.tel}
								onChange={(e) => {
									if (isNaN(e.target.value)) return;
									setFormState({
										...formState,
										address: {
											...formState.address,
											tel: e.target.value,
										},
									});
								}}
							/>
						</FormControl>
						<FormControl id="fax" isRequired>
							<FormLabel>Fax No.</FormLabel>
							<Input
								type="text"
								color="white"
								value={formState.address.fax}
								onChange={(e) => {
									if (isNaN(e.target.value)) return;
									setFormState({
										...formState,
										address: {
											...formState.address,
											fax: e.target.value,
										},
									});
								}}
							/>
						</FormControl>
						<FormControl id="email">
							<FormLabel>Email address</FormLabel>
							<Input
								type="email"
								color="white"
								value={formState.address.email}
								onChange={(e) =>
									setFormState({
										...formState,
										address: {
											...formState.address,
											email: e.target.value,
										},
									})
								}
							/>
						</FormControl>
					</Stack>
				</InputGroup>

				<InputGroup label="Visa Details">
					<FormControl id="RPNumber" isRequired>
						<FormLabel>Number</FormLabel>
						<Input
							type="text"
							color="white"
							value={formState.residentialPermit.number}
							onChange={(e) => {
								if (isNaN(e.target.value)) return;
								setFormState({
									...formState,
									residentialPermit: {
										...formState.residentialPermit,
										number: e.target.value,
									},
								});
							}}
						/>
					</FormControl>
					<FormControl id="RPDOI" isRequired>
						<FormLabel>Date of Issue</FormLabel>
						<Input
							type="date"
							color="white"
							value={formState.residentialPermit.dateOfIssue}
							onChange={(e) =>
								setFormState({
									...formState,
									residentialPermit: {
										...formState.residentialPermit,
										dateOfIssue: e.target.value,
									},
								})
							}
						/>
					</FormControl>
					<FormControl id="RPDOE" isRequired>
						<FormLabel>Expiry Date</FormLabel>
						<Input
							type="date"
							color="white"
							value={formState.residentialPermit.expiryDate}
							onChange={(e) =>
								setFormState({
									...formState,
									residentialPermit: {
										...formState.residentialPermit,
										expiryDate: e.target.value,
									},
								})
							}
						/>
					</FormControl>
				</InputGroup>

				<InputGroup label="Guardian's Info" direction="column">
					<FormControl id="guardianName" isRequired>
						<FormLabel>Name</FormLabel>
						<Input
							type="text"
							color="white"
							value={formState.guardian.name}
							onChange={(e) =>
								setFormState({
									...formState,
									guardian: {
										...formState.guardian,
										name: e.target.value,
									},
								})
							}
						/>
					</FormControl>
					<FormControl id="guardianAddress" isRequired>
						<FormLabel>Address</FormLabel>
						<Textarea
							color="white"
							value={formState.guardian.address}
							onChange={(e) =>
								setFormState({
									...formState,
									guardian: {
										...formState.guardian,
										address: e.target.value,
									},
								})
							}
						/>
					</FormControl>
					<Stack
						w="full"
						spacing={4}
						direction={{
							base: "column",
							md: "row",
						}}
					>
						<FormControl id="guardianTel" isRequired>
							<FormLabel>Tel No.</FormLabel>
							<Input
								type="tel"
								color="white"
								value={formState.guardian.tel}
								onChange={(e) => {
									if (isNaN(e.target.value)) return;
									setFormState({
										...formState,
										guardian: {
											...formState.guardian,
											tel: e.target.value,
										},
									});
								}}
							/>
						</FormControl>
						<FormControl id="guardianFax" isRequired>
							<FormLabel>Fax No.</FormLabel>
							<Input
								type="text"
								color="white"
								value={formState.guardian.fax}
								onChange={(e) => {
									if (isNaN(e.target.value)) return;
									setFormState({
										...formState,
										guardian: {
											...formState.guardian,
											fax: e.target.value,
										},
									});
								}}
							/>
						</FormControl>
						<FormControl id="guardianEmail">
							<FormLabel>Email address</FormLabel>
							<Input
								type="email"
								color="white"
								value={formState.guardian.email}
								onChange={(e) =>
									setFormState({
										...formState,
										guardian: {
											...formState.guardian,
											email: e.target.value,
										},
									})
								}
							/>
						</FormControl>
					</Stack>
					<FormControl id="guardianOccupation" isRequired>
						<FormLabel>Occupation</FormLabel>
						<Input
							type="text"
							color="white"
							value={formState.guardian.occupation}
							onChange={(e) =>
								setFormState({
									...formState,
									guardian: {
										...formState.guardian,
										occupation: e.target.value,
									},
								})
							}
						/>
					</FormControl>
					<FormControl
						id="martial"
						w={{
							base: "full",
							md: "50%",
							lg: "32%",
						}}
					>
						<FormLabel>Marital Status</FormLabel>
						<Select
							defaultValue="married"
							value={formState.guardian.relationship}
							onChange={(e) =>
								setFormState({
									...formState,
									guardian: {
										...formState.guardian,
										relationship: e.target.value,
									},
								})
							}
						>
							<option value="married">Married</option>
							<option value="divorced">Divorced</option>
							<option value="single">Single</option>
						</Select>
					</FormControl>
				</InputGroup>

				<InputGroup label="Study" direction="column">
					<FormControl id="lastColg" isRequired>
						<FormLabel>
							Last two educational Institutions/Schooles/Colleges attended in
							Uganda or abroad
						</FormLabel>
						<Textarea
							color="white"
							value={formState.study.previousTwoEducationalInstitutes}
							onChange={(e) =>
								setFormState({
									...formState,
									study: {
										...formState.study,
										previousTwoEducationalInstitutes: e.target.value,
									},
								})
							}
						/>
					</FormControl>
					<FormControl id="employmentRecord">
						<FormLabel>Employment record in Uganda or abroad</FormLabel>
						<Textarea
							color="white"
							value={formState.study.employmentRecord}
							onChange={(e) =>
								setFormState({
									...formState,
									study: {
										...formState.study,
										employmentRecord: e.target.value,
									},
								})
							}
						/>
					</FormControl>
					<FormControl id="course" isRequired>
						<FormLabel>Present Course of study</FormLabel>
						<Input
							type="text"
							color="white"
							value={formState.study.presentCourse}
							onChange={(e) =>
								setFormState({
									...formState,
									study: {
										...formState.study,
										presentCourse: e.target.value,
									},
								})
							}
						/>
					</FormControl>
					<FormControl id="lastColg" isRequired>
						<FormLabel>
							Address of Institutions/Schooles/Colleges of studying
						</FormLabel>
						<Textarea
							color="white"
							value={formState.study.presentInstituteAddress}
							onChange={(e) =>
								setFormState({
									...formState,
									study: {
										...formState.study,
										presentInstituteAddress: e.target.value,
									},
								})
							}
						/>
					</FormControl>
					<FormControl id="courseCompletionDate" isRequired>
						<FormLabel>Expected date of completion of the study</FormLabel>
						<Input
							type="date"
							color="white"
							value={formState.study.expectedDateOfCompletion}
							onChange={(e) =>
								setFormState({
									...formState,
									study: {
										...formState.study,
										expectedDateOfCompletion: e.target.value,
									},
								})
							}
						/>
					</FormControl>
					<FormControl id="isSponsoredStudent">
						<FormLabel>
							State whether you are a private or goverment sponsored student.
							Mention name of your sponsor
						</FormLabel>
						<Textarea
							color="white"
							value={formState.study.sponsorship}
							onChange={(e) =>
								setFormState({
									...formState,
									study: {
										...formState.study,
										sponsorship: e.target.value,
									},
								})
							}
						/>
					</FormControl>
				</InputGroup>

				<InputGroup label="Other" direction="column">
					<FormControl id="otherInfo">
						<FormLabel>Any other information (non confidential)</FormLabel>
						<Textarea
							color="white"
							value={formState.otherInformation}
							onChange={(e) =>
								setFormState({
									...formState,
									otherInformation: e.target.value,
								})
							}
						/>
					</FormControl>

					<Stack
						spacing={10}
						w="full"
						direction={{
							base: "column",
							md: "row",
						}}
					>
						<FormControl id="presentDate">
							<FormLabel>Date</FormLabel>
							<Input
								type="date"
								color="white"
								value={formState.date}
								onChange={(e) =>
									setFormState({
										...formState,
										date: e.target.value,
									})
								}
							/>
						</FormControl>
						<FormControl id="presentPlace">
							<FormLabel>Place</FormLabel>
							<Input
								type="text"
								color="white"
								value={formState.place}
								onChange={(e) =>
									setFormState({
										...formState,
										place: e.target.value,
									})
								}
							/>
						</FormControl>
						<FormControl id="presentSignature">
							<FormLabel>Signature</FormLabel>
							<Upload
								type="rectangle"
								onChange={(file) =>
									setFormState({
										...formState,
										files: {
											...formState.files,
											signature: file,
										},
									})
								}
							/>
						</FormControl>
					</Stack>
				</InputGroup>

				<Stack spacing={4} pt={10}>
					<ReCAPTCHA
						ref={recaptchaRef}
						// size="invisible"
						sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
						onChange={onReCAPTCHAChange}
						onExpired={onReCAPTCHAExpired}
					/>
					<Button
						bg="soft.100"
						color="white"
						_hover={{
							bg: "secondary.100",
							color: "black",
						}}
						type="submit"
						onClick={handleSubmit}
						disabled={captchaCode === null}
					>
						register
					</Button>
				</Stack>
			</Stack>
		</Layout>
	);
}
