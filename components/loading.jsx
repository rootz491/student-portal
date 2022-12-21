import { Grid, Spinner } from "@chakra-ui/react";

export default function Loading({ active = false }) {
	return (
		<Grid
			display={active ? "grid" : "none"}
			position="fixed"
			top="0"
			left="0"
			width="100vw"
			height="100vh"
			placeContent="center"
			zIndex="100"
			bg="rgba(0,0,0,0.8)"
		>
			<Spinner color="white" />
		</Grid>
	);
}
