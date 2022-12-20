import { Image, Stack, Grid, Text, HStack, IconButton } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import ExpandStudent from "./expandedStudentRecord";
import KeyField from "./keyValue";

const Product = ({ deleteRecord, imageAlt = "test", ...props }) => (
	<Stack
		maxW={{
			base: "100%",
			md: "100%",
			lg: "350px",
		}}
		m={{ base: "0 auto" }}
		borderWidth={1}
		borderColor="teal.500"
	>
		<Image
			width={{
				base: "100%",
				md: "100%",
				lg: "350px",
			}}
			maxHeight="150px"
			objectFit="cover"
			src={
				props?.photo ?? "https://via.placeholder.com/350x150?text=Loading..."
			}
			alt={imageAlt}
		/>
		<Grid p={2} gap={2} position="relative">
			<IconButton
				position="absolute"
				top={2}
				right={2}
				icon={<FaTrash size="60%" />}
				bg="red"
				size="xs"
				title="Delete Student Record"
				onClick={() => deleteRecord(props._id)}
			/>
			<ExpandStudent
				student={props}
				deleteRecord={() => deleteRecord(props._id)}
			/>
			<KeyField
				label="Name"
				value={`${
					props?.general.surName === "" ? "Not" : props?.general.surName
				} ${props?.general?.middleName} ${
					props?.general?.lastName === ""
						? "provided"
						: props?.general?.lastName
				}`}
			/>
			<KeyField
				label="Place"
				value={
					props?.general?.place === "" ? "Not provided" : props?.general?.place
				}
			/>
			<KeyField
				label="Date of Birth"
				value={
					props?.general?.dateOfBirth === ""
						? "Not provided"
						: props?.general?.dateOfBirth
				}
			/>
			<KeyField label="Gender" value={props?.general?.sex ?? "Not provided"} />
		</Grid>
	</Stack>
);

export default Product;
