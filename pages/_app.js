import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const colors = {
	primary: {
		100: "#000000",
	},
	secondary: {
		100: "#F0CB00",
	},
	soft: {
		100: "#CC0102",
	},
};

const theme = extendTheme({
	colors,
	components: {
		Button: {
			baseStyle: {
				fontWeight: "bold",
				colors: "white",
				backgroundColor: "secondary.100",
			},
		},
		Text: {
			baseStyle: {
				color: "white",
			},
		},
		Input: {
			baseStyle: {
				color: "white",
			},
		},
		Heading: {
			baseStyle: {
				color: "secondary.100",
			},
		},
		FormLabel: {
			baseStyle: {
				color: "white",
			},
		},
		Select: {
			baseStyle: {
				color: "white",
			},
		},
	},
});

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
