import {
	Box,
	Button,
	Flex,
	IconButton,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import InputGroup from "./inputGroup";
import KeyField from "./keyValue";

export default function ExpandStudent({ student, deleteRecord }) {
	const [expanded, setExpanded] = useState(false);

	return (
		<>
			<IconButton
				position="absolute"
				top={10}
				right={2}
				bg="lightblue"
				size="xs"
				title="Show Details Of Student"
				icon={<FaChevronDown />}
				onClick={() => setExpanded(true)}
			/>
			<Modal size="3xl" isOpen={expanded} onClose={() => setExpanded(false)}>
				<ModalOverlay />
				<ModalContent bg="#2D3748">
					<ModalHeader>Student Details</ModalHeader>
					<ModalCloseButton onClick={() => setExpanded(false)} />
					<ModalBody>
						<Flex w="full" bg="gray.600" p={2}>
							<Image
								margin="auto"
								width={{
									base: "100%",
									md: "350px",
								}}
								maxHeight="150px"
								objectFit="cover"
								src={
									student?.photo ??
									"https://via.placeholder.com/350x150?text=N/A"
								}
								alt="Student Photo"
							/>
						</Flex>

						<Flex mt={8} justifyContent="space-between" alignItems="center">
							<Text
								fontSize="xs"
								fontWeight="light"
								color="red"
								textAlign="left"
								noOfLines={3}
								width="50%"
							>
								Please note that if you want to view <b>signature</b>, go to
								Cloudinary panel (if its not an image, it won be displayed here)
							</Text>
							<Button
								colorScheme="green"
								marginLeft="auto"
								onClick={() => {
									student?.signature != null
										? window.open(student?.signature)
										: alert("No signature provided");
								}}
							>
								Signature
							</Button>
						</Flex>

						<Stack
							direction={{
								base: "column",
								md: "row",
							}}
						>
							<InputGroup direction="column" label="General">
								<KeyField
									label="Name"
									value={`${
										student?.general.surName === ""
											? "Not"
											: student?.general.surName
									} ${student?.general?.middleName} ${
										student?.general?.lastName === ""
											? "provided"
											: student?.general?.lastName
									}`}
								/>
								<KeyField
									label="Place"
									value={
										student?.general?.place === ""
											? "Not provided"
											: student?.general?.place
									}
								/>
								<KeyField
									label="Date of Birth"
									value={
										student?.general?.dateOfBirth === ""
											? "Not provided"
											: student?.general?.dateOfBirth
									}
								/>
								<KeyField
									label="Gender"
									value={student?.general?.sex ?? "Not provided"}
								/>
							</InputGroup>
							<InputGroup direction="column" label="Passport">
								<KeyField
									label="Number"
									value={
										student.passport?.number === ""
											? "Not provided"
											: student.passport?.number
									}
								/>
								<KeyField
									label="Place of Issue"
									value={
										student.passport?.place === ""
											? "Not provided"
											: student.passport?.place
									}
								/>
								<KeyField
									label="Date of Issue"
									value={
										student.passport?.dateOfIssue === ""
											? "Not provided"
											: student.passport?.dateOfIssue
									}
								/>
								<KeyField
									label="Date of Expiry"
									value={
										student.passport?.expiryDate === ""
											? "Not provided"
											: student.passport?.expiryDate
									}
								/>
							</InputGroup>
						</Stack>

						<InputGroup direction="column" label="Address">
							<KeyField
								label="Address in Uganda"
								value={
									student.address?.ugandaAddress === ""
										? "Not provided"
										: student.address?.ugandaAddress
								}
							/>
							<KeyField
								label="Address in India"
								value={
									student.address?.indiaAddress === ""
										? "Not provided"
										: student.address?.indiaAddress
								}
							/>
							<KeyField
								label="Telephone No."
								value={
									student.address?.tel === ""
										? "Not provided"
										: student.address?.tel
								}
							/>
							<KeyField
								label="Fax No."
								value={
									student.address?.fax === ""
										? "Not provided"
										: student.address?.fax
								}
							/>
							<KeyField
								label="Email"
								value={
									student.address?.email === ""
										? "Not provided"
										: student.address?.email
								}
							/>
						</InputGroup>

						<InputGroup direction="column" label="Visa Details">
							<KeyField
								label="Number"
								value={
									student.residentialPermit?.number === ""
										? "Not provided"
										: student.residentialPermit?.number
								}
							/>
							<KeyField
								label="Date of Issue"
								value={
									student.residentialPermit?.dateOfIssue === ""
										? "Not provided"
										: student.residentialPermit?.dateOfIssue
								}
							/>
							<KeyField
								label="Date of Expiry"
								value={
									student.residentialPermit?.expiryDate === ""
										? "Not provided"
										: student.residentialPermit?.expiryDate
								}
							/>
						</InputGroup>

						<InputGroup direction="column" label="Guardian's Info">
							<KeyField
								label="Name"
								value={
									student.guardian?.name === ""
										? "Not provided"
										: student.guardian?.name
								}
							/>
							<KeyField
								label="Address"
								value={
									student.guardian?.address === ""
										? "Not provided"
										: student.guardian?.address
								}
							/>
							<KeyField
								label="Telephone No."
								value={
									student.guardian?.tel === ""
										? "Not provided"
										: student.guardian?.tel
								}
							/>
							<KeyField
								label="Fax No."
								value={
									student.guardian?.fax === ""
										? "Not provided"
										: student.guardian?.fax
								}
							/>
							<KeyField
								label="Email"
								value={
									student.guardian?.email === ""
										? "Not provided"
										: student.guardian?.email
								}
							/>
							<KeyField
								label="Occupation"
								value={
									student.guardian?.occupation === ""
										? "Not provided"
										: student.guardian?.occupation
								}
							/>
							<KeyField
								label="Marital Status"
								value={
									student.guardian?.relationship === ""
										? "Not provided"
										: student.guardian?.relationship
								}
							/>
						</InputGroup>

						<InputGroup direction="column" label="Study">
							<KeyField
								direction="column"
								label="Last two educational Institutions/Schools/Colleges attended in Uganda or abroad"
								value={
									student.study?.previousTwoEducationalInstitutes === ""
										? "Not provided"
										: student.study?.previousTwoEducationalInstitutes
								}
							/>
							<KeyField
								direction="column"
								label="Employment record in Uganda or abroad"
								value={
									student.study?.employmentRecord === ""
										? "Not provided"
										: student.study?.employmentRecord
								}
							/>
							<KeyField
								direction="column"
								label="Present Course of study"
								value={
									student.study?.presentCourse === ""
										? "Not provided"
										: student.study?.presentCourse
								}
							/>
							<KeyField
								direction="column"
								label="Address of Institutions/Schools/Colleges of studying"
								value={
									student.study?.presentInstituteAddress === ""
										? "Not provided"
										: student.study?.presentInstituteAddress
								}
							/>
							<KeyField
								direction="column"
								label="Expected date of completion of the study"
								value={
									student.study?.expectedDateOfCompletion === ""
										? "Not provided"
										: student.study?.expectedDateOfCompletion
								}
							/>
							<KeyField
								direction="column"
								label="State whether you are a private or goverment sponsored student. Mention name of your sponsor"
								value={
									student.study?.sponsorship === ""
										? "Not provided"
										: student.study?.sponsorship
								}
							/>
						</InputGroup>

						<InputGroup direction="column" label="Other">
							<KeyField
								direction="column"
								label="Any other information (non confidential)"
								value={
									student?.otherInformation === ""
										? "Not provided"
										: student?.otherInformation
								}
							/>
							<KeyField
								label="Date"
								value={student?.date === "" ? "Not provided" : student?.date}
							/>
							<KeyField
								label="Place"
								value={student?.place === "" ? "Not provided" : student?.place}
							/>
						</InputGroup>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={() => setExpanded(false)}
						>
							Close
						</Button>
						<Button variant="ghost" colorScheme="red" onClick={deleteRecord}>
							delete
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
