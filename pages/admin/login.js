import { useState } from "react";
import {
	Flex,
	Heading,
	Input,
	Button,
	InputGroup,
	Stack,
	InputLeftElement,
	chakra,
	Box,
	Link,
	Avatar,
	FormControl,
	FormHelperText,
	InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Router, useRouter } from "next/router";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const handleShowClick = () => setShowPassword(!showPassword);

	const login = (e) => {
		e.preventDefault();
		console.log("login", email, password);
		fetch("/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})
			.then((res) => {
				if (res.status !== 200) {
					throw new Error("Failed to authenticate");
				} else {
					const data = res.json();
					return data;
				}
			})
			.then((data) => {
				localStorage.setItem("token", data.token);
				router.push("/admin");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Flex
			flexDirection="column"
			width="100wh"
			height="100vh"
			backgroundColor="gray.200"
			justifyContent="center"
			alignItems="center"
		>
			<Stack
				flexDir="column"
				mb="2"
				justifyContent="center"
				alignItems="center"
			>
				<Avatar bg="teal.500" />
				<Heading color="teal.400">Welcome</Heading>
				<Box minW={{ base: "90%", md: "468px" }}>
					<form onSubmit={login}>
						<Stack
							spacing={4}
							p="1rem"
							backgroundColor="whiteAlpha.900"
							boxShadow="md"
						>
							<FormControl>
								<InputGroup>
									<InputLeftElement
										pointerEvents="none"
										children={<CFaUserAlt color="gray.300" />}
									/>
									<Input
										type="email"
										placeholder="email address"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										borderWidth="1px"
										color="black"
										borderColor="lightgray"
									/>
								</InputGroup>
							</FormControl>
							<FormControl>
								<InputGroup>
									<InputLeftElement
										pointerEvents="none"
										color="gray.300"
										children={<CFaLock color="gray.300" />}
									/>
									<Input
										type={showPassword ? "text" : "password"}
										placeholder="Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										borderWidth="1px"
										color="black"
										borderColor="lightgray"
									/>
									<InputRightElement width="4.5rem">
										<Button
											borderWidth="1px"
											// color="black"
											bg="lightgray"
											h="1.75rem"
											_hover={{ bg: "lightgray" }}
											size="sm"
											onClick={handleShowClick}
										>
											{showPassword ? "Hide" : "Show"}
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<Button
								borderRadius={0}
								type="submit"
								variant="solid"
								colorScheme="teal"
								width="full"
								color="white"
							>
								Login
							</Button>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	);
};

export default LoginPage;
