import { Container } from "@chakra-ui/layout";
import Head from "next/head";

export default function Layout({ children }) {
	return (
		<Container bgColor="primary.100" maxW="full" minH="100vh">
			<Head>
				<title>Ugandan Student Registration Portal</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{children}
		</Container>
	);
}
