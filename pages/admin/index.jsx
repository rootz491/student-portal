import React from "react";
import {
	Box,
	Button,
	Flex,
	FormLabel,
	Grid,
	Heading,
	Input,
	InputGroup,
	Spinner,
} from "@chakra-ui/react";
import Student from "../../components/student";
import { useRouter } from "next/router";
import Layout from "../../components/layout";

export default function Admin() {
	const [students, setStudents] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [startData, setStartData] = React.useState(null);
	const [endData, setEndData] = React.useState(null);
	const router = useRouter();

	const fetchRecords = () => {
		const token = localStorage.getItem("token");
		if (!token) {
			router.push("/admin/login");
		}
		if (!startData || !endData) {
			alert("Please select start and end date");
			return;
		}
		setLoading(true);
		fetch(`/api/admin?startDate=${startData}&endDate=${endData}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => {
				if (res.status !== 200) {
					router.push("/admin/login");
				} else {
					const data = res.json();
					return data;
				}
			})
			.then((data) => {
				console.log(data);
				setLoading(false);
				setStudents(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const deleteRecord = (id) => {
		if (!confirm("Are you sure you want to delete this record?")) return;
		const token = localStorage.getItem("token");
		if (!token) router.push("/admin/login");

		fetch("/api/admin", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ id }),
		})
			.then((res) => {
				if (res.status !== 200) {
					// router.push("/admin/login");
					console.log("error");
				} else {
					const data = res.json();
					return data;
				}
			})
			.then((data) => {
				console.log(data);
				fetchRecords();
				alert("Record deleted successfully");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	if (loading) {
		return (
			<Layout>
				<Grid minH="80vh" width="full" placeContent="center">
					<Spinner size="xl" />
				</Grid>
			</Layout>
		);
	}

	return (
		<Layout>
			<Flex
				direction="column"
				justifyContent="center"
				maxW={{
					base: "98%",
					xl: "1200px",
				}}
				m="auto"
				py={5}
			>
				<Heading textAlign="center" size="2xl">
					Students
				</Heading>

				<Flex
					gap="1em"
					justifyContent="center"
					my="4em"
					direction={{
						base: "column",
						md: "row",
					}}
				>
					<InputGroup
						w={{
							base: "100%",
							md: "30%",
						}}
						flexDirection="column"
					>
						<FormLabel>Start Date</FormLabel>
						<Input
							color="white"
							type="date"
							value={startData}
							onChange={(e) => setStartData(e.target.value)}
						/>
					</InputGroup>

					<InputGroup
						w={{
							base: "100%",
							md: "30%",
						}}
						flexDirection="column"
					>
						<FormLabel>End Date</FormLabel>
						<Input
							color="white"
							type="date"
							value={endData}
							onChange={(e) => setEndData(e.target.value)}
						/>
					</InputGroup>

					<Button mt="1.5rem" colorScheme="teal" onClick={fetchRecords}>
						Search
					</Button>
				</Flex>

				<Grid
					mt={{
						base: "1rem",
						lg: "2rem",
						xl: "4rem",
					}}
					w="full"
					gridGap="5"
					gridTemplateColumns="repeat( auto-fit, minmax(300px, 1fr) )"
				>
					{students?.length > 0 ? (
						students?.map((p) => (
							<Student key={p._id} deleteRecord={deleteRecord} {...p} />
						))
					) : (
						<Heading textAlign="center" size="xl">
							No records found
						</Heading>
					)}
				</Grid>
			</Flex>
		</Layout>
	);
}
