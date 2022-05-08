import React from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';

const ProductScreen = () => {
	const params = useParams();
	const { slug } = params;
	return (
		<>
			<Header />
			<div className="">
				<h1 className="ml-5 pt-24">{slug}</h1>
			</div>
			<Footer />
		</>
	);
};

export default ProductScreen;
