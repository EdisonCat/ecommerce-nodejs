import "./App.css";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import NotFound from "./components/notfound/NotFound";
import Switch from "react-bootstrap/esm/Switch";
import SignUp from "./components/signup/SignUp";
import Login from "./components/login/Login";
import "./components/main/main.css";

function App() {
	return (
		<BrowserRouter>
			<div className="body">
        <Header />
				<Switch>
					<Route path="/signup" component={SignUp} exact />
					<Route path="/home" component={Main} exact />
					<Route path="login" component={Login} exact />
					{/* <Route path="/*" component={NotFound} /> */}
				</Switch>
        <Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
