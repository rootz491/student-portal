import React from "react";
import { Flex, Grid, Heading, Spinner } from "@chakra-ui/react";
import Student from "../../components/student";
import { useRouter } from "next/router";

export default function Admin() {
	const [students, setStudents] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const router = useRouter();

	React.useEffect(() => {
		fetchRecords();
	}, []);

	const fetchRecords = () => {
		const token = localStorage.getItem("token");
		if (!token) {
			router.push("/admin/login");
		}
		fetch("/api/admin", {
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
			<Grid height="100vh" width="full" placeContent="center">
				<Spinner size="xl" />
			</Grid>
		);
	}

	return (
		<Flex
			direction="column"
			justifyContent="center"
			maxW={{
				base: "98%",
				xl: "1200px",
			}}
			m="50px auto"
		>
			<Heading textAlign="center" size="2xl">
				Students
			</Heading>
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
				{students.length > 0 ? (
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
	);
}
