import React from "react";
import { Flex, Grid, Spinner } from "@chakra-ui/react";
import Student from "../../components/student";
import { useRouter } from "next/router";

export default function Admin() {
	const [students, setStudents] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const router = useRouter();

	React.useEffect(() => {
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
	}, []);

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
			maxW={{ xl: "1200px" }}
			m="0 auto"
			minH="100vh"
		>
			<Grid
				w="full"
				gridGap="5"
				gridTemplateColumns="repeat( auto-fit, minmax(300px, 1fr) )"
			>
				{students?.map((p) => (
					<Student key={p._id} {...p} />
				))}
			</Grid>
		</Flex>
	);
}
