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
	Grid,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import Loading from "../../components/loading";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleShowClick = () => setShowPassword(!showPassword);

	const login = (e) => {
		e.preventDefault();
		setLoading(true);
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
				if (data?.token == null) {
					alert("Invalid credentials");
					throw new Error("Invalid credentials");
				} else {
					localStorage.setItem("token", data.token);
					router.push("/admin");
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<Layout>
			<Loading active={loading} />
			<Grid minH="80vh" p={3}>
				<Stack
					flexDir="column"
					mb="2"
					justifyContent="center"
					alignItems="center"
				>
					<Avatar bg="black" />
					<Heading color="soft.100">Welcome</Heading>
					<Box minW={{ base: "90%", md: "468px" }}>
						<form onSubmit={login}>
							<Stack
								spacing={4}
								p="1rem"
								backgroundColor="secondary.100"
								boxShadow="md"
							>
								<FormControl>
									<InputGroup>
										<InputLeftElement
											pointerEvents="none"
											children={<CFaUserAlt color="black" />}
										/>
										<Input
											_placeholder={{
												color: "black",
											}}
											_hover={{
												borderColor: "black",
											}}
											type="email"
											placeholder="email address"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											borderWidth="1px"
											color="black"
											borderColor="black"
										/>
									</InputGroup>
								</FormControl>
								<FormControl>
									<InputGroup>
										<InputLeftElement
											pointerEvents="none"
											children={<CFaLock color="black" />}
										/>
										<Input
											_placeholder={{
												color: "black",
											}}
											_hover={{
												borderColor: "black",
											}}
											type={showPassword ? "text" : "password"}
											placeholder="Password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											borderWidth="1px"
											color="black"
											borderColor="black"
										/>
										<InputRightElement width="4.5rem">
											<Button
												borderWidth="1px"
												color="white"
												bg="black"
												h="1.75rem"
												_hover={{ bg: "black" }}
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
									bg="black"
									color="white"
									_hover={{ bg: "soft.100" }}
									width="full"
								>
									Login
								</Button>
							</Stack>
						</form>
					</Box>
				</Stack>
			</Grid>
		</Layout>
	);
};

export default LoginPage;
