import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';

import AboutScreen from './screens/AboutScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
	return (
		<div className="">
			{/* Home */}
			<Routes>
				<Route path="/product/:slug" element={<ProductScreen />} />
				<Route path="/about" element={<AboutScreen />} />
				<Route path="/" element={<HomeScreen />} />
			</Routes>
		</div>
	);
}

export default App;
