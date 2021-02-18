import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import NotFound from "./components/notfound/NotFound";
import Switch from "react-bootstrap/esm/Switch";
import SignUp from "./components/signup/SignUp";
import Login from "./components/login/Login";
import "./components/main/main.css";
import Sell from "./components/merchant/Sell";
import OrderManagement from "./components/merchant/OrderManagement";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route path="/signup" component={SignUp} exact />
				<Route path="/home" component={Main} exact />
				<Route path="login" component={Login} exact />
				<Route path="/merchant/sell" component={Sell} exact />
				<Route path="/merchant/order" component={OrderManagement} exact />
				{/* <Route path="/*" component={NotFound} exact/> */}
			</Switch>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
