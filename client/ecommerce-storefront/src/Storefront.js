import endpoints from "./config/endpoints";
class Storefront {
	checkIn = async (signup, email, password, confirm, username, fee) => {
		const response = { error: null, status: null };
		const signupRequest = { email, password, username, fee };
		const loginRequest = { email, password };
		try {
			const res = await fetch( process.env.REACT_APP_BASE_URL + process.env.REACT_APP_USER_PATH + 
				(signup ? endpoints.signupEndpoint() : endpoints.loginEndpoint()),
				{
					method: "POST",
					body: JSON.stringify(signup ? signupRequest : loginRequest),
					headers: { "Content-Type": "application/json" },
				}
			);
			response.status = res.status;
			const json = await res.json();
			response.error = json.message;
			response.token = json.token;
		} catch (error) {
			response.error = error.toString();
		}
		return response;
	};
}

const storefront = new Storefront();
export default storefront;
