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
	Textarea
} from "@chakra-ui/react";
import InputGroup from "../components/inputGroup";
import Layout from "../components/layout";
import Upload from "../components/upload";

export default function Registration() {
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
						<Input type="text" />
					</FormControl>
					<FormControl id="middleName">
						<FormLabel>Middle Name</FormLabel>
						<Input type="text" />
					</FormControl>
					<FormControl id="lastName" isRequired>
						<FormLabel>Last Name</FormLabel>
						<Input type="text" />
					</FormControl>
					<Upload type="circle" />
				</InputGroup>

				<InputGroup label="General">
					<FormControl id="sex">
						<FormLabel>Sex</FormLabel>
						<Select defaultValue="female">
							<option value="male">Male</option>
							<option value="female">Female</option>
						</Select>
					</FormControl>
					<FormControl id="DOB" isRequired>
						<FormLabel>Date of Birth</FormLabel>
						<Input type="date" />
					</FormControl>
					<FormControl id="place" isRequired>
						<FormLabel>Place</FormLabel>
						<Input type="text" />
					</FormControl>
				</InputGroup>

				<InputGroup label="Passport">
					<FormControl id="passportNumber" isRequired>
						<FormLabel>Passport Number</FormLabel>
						<Input type="text" />
					</FormControl>
					<FormControl id="DOI" isRequired>
						<FormLabel>Date of Issue</FormLabel>
						<Input type="date" />
					</FormControl>
					<FormControl id="Pplace" isRequired>
						<FormLabel>place</FormLabel>
						<Input type="text" />
					</FormControl>
					<FormControl id="DOE" isRequired>
						<FormLabel>Expiry Date</FormLabel>
						<Input type="date" />
					</FormControl>
				</InputGroup>

				<InputGroup label="Address" direction="column">
					<HStack w="full">
						<FormControl id="ugandaAddress" isRequired>
							<FormLabel>Permanent address in Uganda</FormLabel>
							<Input type="text" />
						</FormControl>
						<FormControl id="indiaAddress" isRequired>
							<FormLabel>Permanent address in India</FormLabel>
							<Input type="text" />
						</FormControl>
					</HStack>
					<HStack w="full" spacing={4}>
						<FormControl id="tel" isRequired>
							<FormLabel>Tel No.</FormLabel>
							<Input type="tel" />
						</FormControl>
						<FormControl id="fax" isRequired>
							<FormLabel>Fax No.</FormLabel>
							<Input type="text" />
						</FormControl>
						<FormControl id="email">
							<FormLabel>Email address</FormLabel>
							<Input type="email" />
						</FormControl>
					</HStack>
				</InputGroup>

				<InputGroup label="Residential Permit">
					<FormControl id="RPNumber" isRequired>
						<FormLabel>Number</FormLabel>
						<Input type="text" />
					</FormControl>
					<FormControl id="RPDOI" isRequired>
						<FormLabel>Date of Issue</FormLabel>
						<Input type="date" />
					</FormControl>
					<FormControl id="RPDOE" isRequired>
						<FormLabel>Expiry Date</FormLabel>
						<Input type="date" />
					</FormControl>
				</InputGroup>

				<InputGroup label="Guardian's Info" direction="column">
					<FormControl id="guardianName" isRequired>
						<FormLabel>Name</FormLabel>
						<Input type="text" />
					</FormControl>
					<FormControl id="guardianAddress" isRequired>
						<FormLabel>Address</FormLabel>
						<Textarea></Textarea>
					</FormControl>
					<HStack w="full" spacing={4}>
						<FormControl id="guardianTel" isRequired>
							<FormLabel>Tel No.</FormLabel>
							<Input type="tel" />
						</FormControl>
						<FormControl id="guardianFax" isRequired>
							<FormLabel>Fax No.</FormLabel>
							<Input type="text" />
						</FormControl>
						<FormControl id="guardianEmail">
							<FormLabel>Email address</FormLabel>
							<Input type="email" />
						</FormControl>
					</HStack>
					<FormControl id="guardianOccupation" isRequired>
						<FormLabel>Occupation</FormLabel>
						<Input type="text" />
					</FormControl>
					<FormControl id="martial" w="32%">
						<FormLabel>Marital Status</FormLabel>
						<Select defaultValue="married">
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
						<Textarea />
					</FormControl>
					<FormControl id="employmentRecord">
						<FormLabel>Employment record in Uganda or abroad</FormLabel>
						<Textarea />
					</FormControl>
					<FormControl id="course" isRequired>
						<FormLabel>Present Course of study</FormLabel>
						<Input type="text" />
					</FormControl>
					<FormControl id="lastColg" isRequired>
						<FormLabel>
							Address of Institutions/Schooles/Colleges of studying
						</FormLabel>
						<Textarea />
					</FormControl>
					<FormControl id="courseCompletionDate" isRequired>
						<FormLabel>Expected date of completion of the study</FormLabel>
						<Input type="date" />
					</FormControl>
					<FormControl id="isSponsoredStudent">
						<FormLabel>
							State whether you are a private or goverment sponsored student.
							Mention name of your sponsor
						</FormLabel>
						<Textarea />
					</FormControl>
				</InputGroup>

				<InputGroup label="Other" direction="column">
					<FormControl id="otherInfo">
						<FormLabel>Any other information (non confidential)</FormLabel>
						<Textarea />
					</FormControl>

					<HStack spacing={10} w="full">
						<FormControl id="presentDate">
							<FormLabel>Date</FormLabel>
							<Input type="date" />
						</FormControl>
						<FormControl id="presentPlace">
							<FormLabel>Place</FormLabel>
							<Input type="text" />
						</FormControl>
						<FormControl id="presentSignature">
							<FormLabel>Signature</FormLabel>
							<Upload type="rectangle" />
							{/* TODO make a custom component out of it! */}
						</FormControl>
					</HStack>
				</InputGroup>

				<Stack spacing={10}>
					<Stack
						direction={{ base: "column", sm: "row" }}
						align={"start"}
						justify={"space-between"}
					>
						<Text>Are you a human?</Text>
						<Checkbox>Yes</Checkbox>
					</Stack>
					<Button
						bg={"blue.400"}
						color={"white"}
						_hover={{
							bg: "blue.500",
						}}
					>
						register
					</Button>
				</Stack>
			</Stack>
		</Layout>
	);
}
