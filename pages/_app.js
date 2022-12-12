import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const colors = {
	primary: {
		100: "#4C3F91",
	},
	secondary: {
		100: "#9145B6",
	},
	soft: {
		100: "#B958A5",
	},
	touch: {
		100: "#FF5677",
	},
};

const theme = extendTheme({
	colors,
	components: {
		Button: {
			baseStyle: {
				fontWeight: "bold",
				colors: "white",
				backgroundColor: "primary.100",
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
