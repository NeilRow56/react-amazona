import React from 'react';
import Header from './Header';

const Home = () => {
	return (
		<>
			<Header />
			<div className="w-full max-w-[1500px] mx-auto bg-blue-100 ">
				<h1 className="text-3xl pt-[50px]">Product List</h1>
			</div>
		</>
	);
};

export default Home;
