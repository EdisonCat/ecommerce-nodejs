import React, { useState } from "react";
import "./merchant.css";

export default function Sell() {
	const [pictures, setPictures] = useState([]);
	const [descriptions, setDescriptions] = useState([]);
	const [checked, setChecked] = useState([true]);
	const [cover, setCover] = useState(0);
	const handlePreview = (e) => {
		e.preventDefault();
		setPictures([...e.target.files]);
		setDescriptions([]);
	};
	const handleDescription = (e, key) => {
		e.preventDefault();
		let newDescriptions = [...descriptions];
		newDescriptions[key] = e.target.value;
		setDescriptions(newDescriptions);
	};
	const handleCover = (e, key) => {
		e.preventDefault();
		let newChecked = [...checked];
		newChecked[key] = true;
		newChecked[cover] = false;
		setChecked(newChecked);
		setCover(key);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		for (let i = 0; i < descriptions.length; i++) {
			if (descriptions[i] === undefined) {
				alert("Description can NOT be empty");
				return;
			}
		}
		pictures.map((picture, idx) =>
			console.log(picture + " " + descriptions[idx])
		);
		console.log(cover);
	};
	return (
		<div className="body">
			<form>
				<input
					type="file"
					accept="image/*"
					multiple
					onChange={(e) => handlePreview(e)}
				/>
			</form>
			<div className="div_preview">
				{pictures.map((picture, idx) => (
					<div className="div_preview_item" key={idx}>
						<img src={URL.createObjectURL(picture)} alt="" />
						<div className="div_preview_detail">
							<input
								type="textarea"
								placeholder="description"
								onChange={(e) => handleDescription(e, idx)}
							/>
							<div className="div_preview_setting">
								<label htmlFor="cover">
									<button
										style={{
											backgroundColor:
												checked[idx] === true
													? "lightgreen"
													: "white",
                                            transition: "0.5s"
										}}
										onClick={(e) => handleCover(e, idx)}
									>
										Set as cover
									</button>
								</label>
							</div>
						</div>
					</div>
				))}
			</div>
			<button
                className="button_product_submit"
				hidden={pictures.length < 1}
				onClick={(e) => handleSubmit(e)}
			>
				Submit
			</button>
		</div>
	);
}
