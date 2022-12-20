import { HStack, Stack, Text } from "@chakra-ui/react";

const KeyField = ({ label, value, direction = "row" }) => (
	<Stack direction={direction}>
		<Text textDecoration="underline" textTransform="uppercase" fontSize="16px">
			{label}
		</Text>
		<Text color="teal.600" textTransform="capitalize" fontSize="16px">
			{value}
		</Text>
	</Stack>
);

export default KeyField;
