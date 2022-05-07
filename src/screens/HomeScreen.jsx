import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
// import data from '../utils/data';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get('/api/products');
			setProducts(result.data);
		};
		fetchData();
	}, []);

	return (
		<>
			<Header />
			<div className="w-full max-w-[1500px] mx-auto ">
				<h1 className="text-3xl pt-[80px] pb-5">Featured Products</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  ">
					{products.map((product) => (
						<div
							className="flex flex-col border border-[#404040] m-4 max-w-[410px
							]"
							key={product.slug}
						>
							<Link to={`/product/${product.slug}`}>
								<img
									className="w-full max-w-[400px]"
									src={product.image}
									alt={product.name}
								/>
							</Link>
							<div className="p-4">
								<Link to={`/proroduct/${product.slug}`}>
									<p>{product.name}</p>
								</Link>
								<p>
									<strong> £ {product.price} </strong>
								</p>
								<button className="bg-[#f0c14b] rounded-md my-3 w-[150px] mx-auto p-2 border border-[#a88734]">
									Add to cart
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Home;
