import { Container, Flex, Heading, Text } from "@chakra-ui/layout";
import Head from "next/head";

export default function Layout({ children }) {
	return (
		<Container
			bgColor="primary.100"
			maxW="full"
			minH="100vh"
			p={{
				base: "0 15px",
			}}
		>
			<Head>
				<title>Ugandan students in India registration portal</title>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="description"
					content="A portal for Ugandan students wanting to study in India"
				/>
				<meta
					name="keywords"
					content="Uganda, India, students, registration, portal"
				/>
				<meta name="author" content="Ugandan students in India" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<Flex
				w="full"
				p={{
					base: "1rem 0",
					lg: "1.5rem",
					xl: "2.5rem",
				}}
				justifyContent="space-between"
				alignItems="center"
				gap={4}
			>
				<img src="/favicon.ico" alt="logo" width={50} />
				<Text fontSize="xl" color="secondary.100">
					Ugandan students in India registration portal
				</Text>
			</Flex>
			{children}
		</Container>
	);
}
