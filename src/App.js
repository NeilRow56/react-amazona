import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';

import AboutScreen from './screens/AboutScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';

function App() {
	return (
		<div className="">
			{/* Home */}
			<Routes>
				<Route path="/product/:slug" element={<ProductScreen />} />
				<Route path="/about" element={<AboutScreen />} />
				<Route path="/cart" element={<CartScreen />} />
				<Route path="/signin" element={<SigninScreen />} />
				<Route path="/" element={<HomeScreen />} />
			</Routes>
		</div>
	);
}

export default App;
