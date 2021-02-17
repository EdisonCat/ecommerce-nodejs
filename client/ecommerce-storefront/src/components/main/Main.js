import React from "react";
import "./main.css";
import Card from "../card/Card";
import item1 from "../../pictures/item1.jpg";
import item2 from "../../pictures/item2.jpg";
import Header from "../header/Header";
import Footer from "../footer/Footer";
export default function Main() {
	const items = [
		{
			link: item1,
			cardSize: "small-card",
			description: "Recommendation for you",
		},
		{
			link: item2,
			cardSize: "small-card",
			description: "Deal of the Day",
		},
	];
	return (
		<div className="body">
			<div className="main">
				{items.map((item) => (
					<Card item={item} />
				))}
			</div>
		</div>
	);
}
