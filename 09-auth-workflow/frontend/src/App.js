import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
	Home,
	Error,
	Register,
	Login,
	Verify,
	Dashboard,
	ProtectedRoute,
	ForgotPassword,
	ResetPassword,
} from './pages';
import Navbar from './components/Navbar';
import { useGlobalContext } from './context';
function App() {
	const { isLoading, user } = useGlobalContext();
	console.log('🚀 ~ file: App.js ~ line 17 ~ App ~ user', user);
	if (isLoading) {
		return (
			<section className='page page-center'>
				<div className='loading'></div>
			</section>
		);
	}
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route path='/' exact>
					<Home />
				</Route>
				<Route path='/login' exact>
					<Login />
				</Route>
				<Route path='/register' exact>
					<Register />
				</Route>
				<ProtectedRoute path='/dashboard' exact>
					<Dashboard />
				</ProtectedRoute>
				<Route path='/forgot-password' exact>
					<ForgotPassword />
				</Route>
				<Route path='/user/verify-email' exact>
					<Verify />
				</Route>
				<Route path='/user/reset-password' exact>
					<ResetPassword />
				</Route>
				<Route path='*'>
					<Error />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
