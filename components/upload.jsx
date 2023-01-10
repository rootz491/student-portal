import {
	Box,
	FormControl,
	FormLabel,
	Grid,
	IconButton,
	Input,
	Text,
} from "@chakra-ui/react";
import React from "react";
import { FaTrash } from "react-icons/fa";

export default function Upload({ type = "rectangle", onChange }) {
	const [file, setFile] = React.useState(null);

	function handleChange(e) {
		e.preventDefault();
		let uploadFile = e.target.files[0];

		//	check file size
		if (uploadFile.size > 1027970) {
			alert("File size is too big. Max size is 500KB");
			return;
		}

		let reader = new FileReader();
		reader.onloadend = () => {
			setFile({
				file: uploadFile,
				imagePreviewUrl: reader.result,
			});
			//	set file to b64 url
			if (onChange) onChange(reader.result);
		};

		reader.readAsDataURL(uploadFile);
	}

	function handleRemove() {
		setFile(null);
	}

	if (type === "circle") {
		return (
			<FormControl
				id="file_upload_circle"
				as={Grid}
				height="75px"
				width={{
					base: "80px",
					md: "150px",
					lg: "300px",
				}}
				margin="auto"
				rounded="100%"
				placeContent="center"
				bg={file == null ? "secondary.100" : "none"}
				zIndex={10}
			>
				{file != null ? (
					<>
						<Box
							width="100%"
							height="100%"
							position="absolute"
							top="0"
							left="0"
							zIndex={10}
							bg="rgba(0,0,0,0.5)"
							rounded="100%"
						>
							<img
								src={file.imagePreviewUrl}
								alt="preview"
								width="80%"
								height="100%"
								style={{
									position: "absolute",
									top: "50%",
									left: "50%",
									transform: "translate(-50%, -50%)",
									// objectFit: "cover",
									zIndex: 5,
									borderRadius: "100%",
								}}
							/>
						</Box>
						<IconButton
							icon={<FaTrash color="red" />}
							onClick={handleRemove}
							position="absolute"
							top="0"
							right="0"
							w="30px"
							h="30px"
							bgColor="red"
							color="white"
							zIndex={20}
						/>
					</>
				) : (
					<>
						<FormLabel w="full" h="full" cursor="pointer" color="black" m={0}>
							upload
						</FormLabel>
						<Input
							onChange={handleChange}
							type="file"
							accept="image/*"
							display="none"
						/>
					</>
				)}
			</FormControl>
		);
	} else if (type === "rectangle")
		return (
			<>
				<FormControl
					id="file_upload_rect"
					as={Text}
					w="full"
					p={2}
					bg="secondary.100"
					color="black"
					rounded="full"
					textAlign="center"
				>
					<FormLabel
						w="full"
						h="full"
						cursor="pointer"
						color="black"
						m={0}
						textAlign="center"
					>
						{file != null ? file.file.name ?? "unknown file" : "Upload File"}
					</FormLabel>
					<Input
						type="file"
						onChange={handleChange}
						accept="image/*"
						display="none"
					/>
				</FormControl>
			</>
		);
	else return null;
}
