import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';

import About from './components/About';

function App() {
	return (
		<div className="">
			{/* Home */}
			<Routes>
				<Route path="/about" element={<About />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
