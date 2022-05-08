import { Link } from 'react-router-dom';
import Rating from './Rating';

function Product(props) {
	const { product } = props;

	return (
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
				<Rating
					rating={product.rating}
					numReviews={product.numReviews}
				/>

				<p>
					<strong> £ {product.price} </strong>
				</p>
				<button className="bg-[#f0c14b] rounded-md my-3 w-[150px] mx-auto p-2 border border-[#a88734]">
					Add to cart
				</button>
			</div>
		</div>
	);
}
export default Product;
