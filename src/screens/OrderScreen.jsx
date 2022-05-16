import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store';
import { getError } from '../utils/utilsError';
import Header from '../components/Header';

function reducer(state, action) {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true, error: '' };
		case 'FETCH_SUCCESS':
			return {
				...state,
				loading: false,
				order: action.payload,
				error: '',
			};
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
}
export default function OrderScreen() {
	const { state } = useContext(Store);
	const { userInfo } = state;

	const params = useParams();
	const { id: orderId } = params;
	const navigate = useNavigate();

	const [{ loading, error, order }, dispatch] = useReducer(reducer, {
		loading: true,
		order: {},
		error: '',
	});

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				dispatch({ type: 'FETCH_REQUEST' });
				const { data } = await axios.get(`/api/orders/${orderId}`, {
					headers: { authorization: `Bearer ${userInfo.token}` },
				});
				dispatch({ type: 'FETCH_SUCCESS', payload: data });
			} catch (err) {
				dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
			}
		};

		if (!userInfo) {
			return navigate('/login');
		}
		if (!order._id || (order._id && order._id !== orderId)) {
			fetchOrder();
		}
	}, [order, userInfo, orderId, navigate]);

	return loading ? (
		<div>Loading...</div>
	) : error ? (
		<div>{error}</div>
	) : (
		<>
			<Header />
			<div className=" max-w-[1200px] pt-16  h-screen mx-auto flex flex-col  ">
				<Helmet>
					<title>Order {orderId}</title>
				</Helmet>
				<h1 className="mx-5 mb-3">Order {orderId}</h1>
				<div className="grid grid-cols-3 gap-4 mx-5 ">
					<div className="col-span-3 md:col-span-2">
						<div className="border border-gray-200 rounded w-full p-3">
							<h2 className="font-semibold ">Shipping</h2>
							<strong>Name:</strong>{' '}
							{order.shippingAddress.fullName} <br />
							<strong>Address: </strong>{' '}
							{order.shippingAddress.address},{' '}
							{order.shippingAddress.city},{' '}
							{order.shippingAddress.postCode},{' '}
							{order.shippingAddress.country}
							{order.isDelivered ? (
								<div className="bg-green-600 h-[30px] flex flex-col justify-center rounded ">
									Delivered at {order.deliveredAt}
								</div>
							) : (
								<div className="bg-red-300 h-[30px] flex flex-col justify-center rounded my-3 ">
									Not Delivered
								</div>
							)}
						</div>
						<div className="border border-gray-200 rounded w-full p-3 mt-4">
							<h2 className="font-semibold my-2">Payment</h2>
							<div className="flex">
								<strong className="">Method: </strong>
								<h4 className="ml-2"> {order.paymentMethod}</h4>
							</div>
							{order.isPaid ? (
								<div className="bg-green-600 h-[30px] flex flex-col justify-center rounded ">
									Paid at {order.paidAt}
								</div>
							) : (
								<div className="bg-red-300 h-[30px] flex flex-col justify-center rounded my-3 ">
									Not Paid
								</div>
							)}
						</div>
						<h2 className="font-semibold ml-3 mt-2">Items:</h2>
						{order.orderItems.map((item) => (
							<div
								key={item._id}
								className="border border-gray-200 rounded w-full p-3 mt-4"
							>
								<div className="flex items-center pl-20">
									<div className="w-full  ">
										<img
											className=" justify-center w-20 h-25"
											src={item.image}
											alt={item.name}
										/>
									</div>
									<div className="w-full">
										<Link to={`/product/${item.slug}`}>
											{item.name}
										</Link>
									</div>
									<div className="w-full">
										{item.quantity}
									</div>
									<div className="w-full">£{item.price}</div>
								</div>
							</div>
						))}
					</div>
					<div className="">
						<div className="w-full border border-gray-200 rounded">
							<h2 className="font-semibold ml-3">
								Order Summary
							</h2>
							<div className="flex border-b border-gray-200 mx-5 mt-1">
								<div className="w-full ">Items</div>
								<div className="w-full">
									£{order.itemsPrice.toFixed(2)}
								</div>
							</div>
							<div className="flex border-b border-gray-200 mx-5 mt-2">
								<div className="w-full  ">Shipping</div>
								<div className="w-full">
									£{order.shippingPrice.toFixed(2)}
								</div>
							</div>
							<div className="flex border-b border-gray-200 mx-5 mt-2">
								<div className="w-full ">VAT</div>
								<div className="w-full">
									£{order.taxPrice.toFixed(2)}
								</div>
							</div>
							<div className="flex border-b border-gray-200 mx-5 mt-2">
								<div className="w-full  font-bold">
									Order Total
								</div>
								<div className="w-full">
									<h4 className="font-bold">
										£{order.totalPrice.toFixed(2)}
									</h4>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
