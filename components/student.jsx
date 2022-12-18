import { Text, Image, Box, Stack, Heading } from "@chakra-ui/react";

const Product = ({ imageSrc, imageAlt, ...props }) => (
	<Stack p={{ base: "0 2rem" }}>
		<Image
			objectFit="cover"
			src={imageSrc ?? "https://via.placeholder.com/350x150?text=Loading..."}
			alt={imageAlt}
		/>
		<Heading color="teal.300" size="lg" textTransform="capitalize">
			{props.general.surName +
				" " +
				props.general.middleName +
				" " +
				props.general.lastName}
		</Heading>
		<Heading size="md" color="teal.600" textTransform="uppercase">
			{props.general.place}
		</Heading>
	</Stack>
);

export default Product;
