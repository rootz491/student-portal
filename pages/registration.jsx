import {
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Button,
	Text,
	HStack,
	Select,
	Textarea,
} from "@chakra-ui/react";
import { createRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import InputGroup from "../components/inputGroup";
import Layout from "../components/layout";
import Upload from "../components/upload";

export default function Registration() {
	const [formState, setFormState] = useState({
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
	});
	const [captchaCode, setCaptchaCode] = useState(null);
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

	const handleSubmit = (e) => {
		e.preventDefault();
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
			});
	};

	return (
		<Layout>
			<Stack
				paddingY={8}
				spacing={4}
				minH="100vh"
				w="80%"
				m="auto"
				justifyContent="center"
				alignItems="center"
			>
				<InputGroup label="Name[s]">
					<FormControl id="surName" isRequired>
						<FormLabel>Surname</FormLabel>
						<Input
							value={formState.general.surName}
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
							value={formState.passport.number}
							onChange={(e) =>
								setFormState({
									...formState,
									passport: {
										...formState.passport,
										number: e.target.value,
									},
								})
							}
						/>
					</FormControl>
					<FormControl id="DOI" isRequired>
						<FormLabel>Date of Issue</FormLabel>
						<Input
							type="date"
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
					<HStack w="full">
						<FormControl id="ugandaAddress" isRequired>
							<FormLabel>Permanent address in Uganda</FormLabel>
							<Input
								type="text"
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
					</HStack>
					<HStack w="full" spacing={4}>
						<FormControl id="tel" isRequired>
							<FormLabel>Tel No.</FormLabel>
							<Input
								type="tel"
								value={formState.address.tel}
								onChange={(e) =>
									setFormState({
										...formState,
										address: {
											...formState.address,
											tel: e.target.value,
										},
									})
								}
							/>
						</FormControl>
						<FormControl id="fax" isRequired>
							<FormLabel>Fax No.</FormLabel>
							<Input
								type="text"
								value={formState.address.fax}
								onChange={(e) =>
									setFormState({
										...formState,
										address: {
											...formState.address,
											fax: e.target.value,
										},
									})
								}
							/>
						</FormControl>
						<FormControl id="email">
							<FormLabel>Email address</FormLabel>
							<Input
								type="email"
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
					</HStack>
				</InputGroup>

				<InputGroup label="Residential Permit">
					<FormControl id="RPNumber" isRequired>
						<FormLabel>Number</FormLabel>
						<Input
							type="text"
							value={formState.residentialPermit.number}
							onChange={(e) =>
								setFormState({
									...formState,
									residentialPermit: {
										...formState.residentialPermit,
										number: e.target.value,
									},
								})
							}
						/>
					</FormControl>
					<FormControl id="RPDOI" isRequired>
						<FormLabel>Date of Issue</FormLabel>
						<Input
							type="date"
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
					<HStack w="full" spacing={4}>
						<FormControl id="guardianTel" isRequired>
							<FormLabel>Tel No.</FormLabel>
							<Input
								type="tel"
								value={formState.guardian.tel}
								onChange={(e) =>
									setFormState({
										...formState,
										guardian: {
											...formState.guardian,
											tel: e.target.value,
										},
									})
								}
							/>
						</FormControl>
						<FormControl id="guardianFax" isRequired>
							<FormLabel>Fax No.</FormLabel>
							<Input
								type="text"
								value={formState.guardian.fax}
								onChange={(e) =>
									setFormState({
										...formState,
										guardian: {
											...formState.guardian,
											fax: e.target.value,
										},
									})
								}
							/>
						</FormControl>
						<FormControl id="guardianEmail">
							<FormLabel>Email address</FormLabel>
							<Input
								type="email"
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
					</HStack>
					<FormControl id="guardianOccupation" isRequired>
						<FormLabel>Occupation</FormLabel>
						<Input
							type="text"
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
					<FormControl id="martial" w="32%">
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
							value={formState.otherInformation}
							onChange={(e) =>
								setFormState({
									...formState,
									otherInformation: e.target.value,
								})
							}
						/>
					</FormControl>

					<HStack spacing={10} w="full">
						<FormControl id="presentDate">
							<FormLabel>Date</FormLabel>
							<Input
								type="date"
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
					</HStack>
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
						bg={"blue.400"}
						color={"white"}
						_hover={{
							bg: "blue.500",
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
