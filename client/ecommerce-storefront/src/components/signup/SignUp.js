import React, { useState } from "react";
import Header from "../header/Header";
import "./signup.css";

export default function SignUp() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [email, setEmail] = useState("");
	const [verify, setVerify] = useState(false);
	const [fee, setFee] = useState(0);
	const [signup, setSignup] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (verify) {
			setFee(50);
		}
		if (signup) {
			console.log("signup info is as below:");
			console.log(email);
			console.log(password);
			console.log(confirm);
			console.log(username);
			console.log(verify);
			console.log(fee);
		} else {
			console.log("login info is as below:");
			console.log(email);
			console.log(password);
		}
	};

	const handleChange = (e) => {
		e.preventDefault();
		setSignup((old) => !old);
	};

	return (
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
								onChange={(e) => setVerify((old) => !old)}
							/>
						</label>
					</div>
				)}
				<button onClick={(e) => handleSubmit(e)}>
					{signup ? "Sign Up" : "Log In"}
				</button>
				<button onClick={(e) => handleChange(e)}>
					{signup ? "Already have an account" : "Create an account"}
				</button>
			</form>
		</div>
	);
}
