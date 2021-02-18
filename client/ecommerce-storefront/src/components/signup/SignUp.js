import React, { useState } from "react";
import storefront from "../../Storefront";
import "./signup.css";

export default function SignUp() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [email, setEmail] = useState("");
	const [fee, setFee] = useState(0);
	const [signup, setSignup] = useState(false);
	const emailPattern = new RegExp(
		/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!emailPattern.test(email)) {
			alert("invalid email");
			return;
		}
		if (signup) {
			if (password !== confirm) {
				alert("Password does NOT match");
				return;
			}
		}
		storefront
			.checkIn(signup, email, password, confirm, username, fee)
			.then((res) => {
				if (res.status === 201 || res.status === 200) localStorage.setItem("storefront_token", res.token);
				else console.log(res.error);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleChange = (e) => {
		e.preventDefault();
		setSignup((old) => !old);
	};

	return (
		<div className="body">
			<div className="signup">
				<form>
					<input
						type="text"
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
					/>
					<input
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter your password"
					/>
					{signup && (
						<div className="signup-info">
							<input
								type="password"
								onChange={(e) => setConfirm(e.target.value)}
								placeholder="Enter your password again"
							/>
							<input
								type="username"
								onChange={(e) => setUsername(e.target.value)}
								placeholder="Enter your username"
							/>

							<label>
								I want to verify as a merchant
								<input
									className="check"
									type="checkbox"
									defaultChecked={false}
									onChange={() =>
										setFee((old) => (old === 0 ? 50 : 0))
									}
								/>
							</label>
						</div>
					)}
					<button onClick={(e) => handleSubmit(e)}>
						{signup ? "Sign Up" : "Log In"}
					</button>
					<button onClick={(e) => handleChange(e)}>
						{signup
							? "Already have an account"
							: "Create an account"}
					</button>
				</form>
			</div>
		</div>
	);
}
