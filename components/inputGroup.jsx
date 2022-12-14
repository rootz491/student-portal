import { Stack, Text } from "@chakra-ui/layout";

export default function InputGroup({
	label,
	children,
	props,
	direction = "row",
}) {
	return (
		<Stack w="full" pt={6} {...props}>
			<Text
				mr="auto"
				color="soft.100"
				textAlign="left"
				mb={2}
				fontWeight="bold"
				fontSize="20px"
			>
				{label}
			</Text>
			<Stack
				direction={direction}
				w="full"
				alignItems="start"
				rounded="lg"
				borderWidth={1}
				borderColor="secondary.100"
				spacing={4}
				padding={4}
			>
				{children}
			</Stack>
		</Stack>
	);
}
