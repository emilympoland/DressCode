// app/upload/page.js
'use client';

import './page.css';
import axios from "axios";
import React, { useState } from "react";

const Upload = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const onFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
	};
	const onFileUpload = () => {
		const formData = new FormData();
		formData.append(
			"myFile",
			selectedFile,
			selectedFile.name
		);
		console.log(selectedFile);
		axios.post("api/uploadfile", formData);
	};
	const fileData = () => {
		if (selectedFile) {
			return (
				<div>
					<h2>File Details:</h2>
					<p>File Name: {selectedFile.name}</p>
					<p>File Type: {selectedFile.type}</p>
					<p>
						Last Modified: {selectedFile.lastModifiedDate.toDateString()}
					</p>
				</div>
			);
		} else {
			return (
				<div>
					<br />
					<h4>Choose before Pressing the Upload button</h4>
				</div>
			);
		}
	};

	return (
		<div id="upload-container">
			<h1>Upload New Piece of Clothing</h1>
			<div>
				<input type="file" onChange={onFileChange} id="upload-button"/>
				<button onClick={onFileUpload} id='upload-button'>Upload</button>
			</div>
			{fileData()}
		</div>
	);
};

export default Upload;
