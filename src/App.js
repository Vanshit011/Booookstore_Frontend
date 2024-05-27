import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import UpdateBookModal from "./components/Book/UpdateBookModel";

function App() {
	const user = localStorage.getItem("token");

	return (
		<BrowserRouter>
			<Routes>
				{user && <Route path="/" exact element={<Main />} />}
				<Route path="/signup" exact element={<Signup />} />
				<Route path="/login" exact element={<Login />} />
				<Route path="/update/:id" exact element={<UpdateBookModal />} />
				<Route path="/" element={<Navigate replace to="/login" />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App; 