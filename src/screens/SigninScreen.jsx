import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';

const SigninScreen = () => {
	const { search } = useLocation();
	const redirectInUrl = new URLSearchParams(search).get('redirect');
	const redirect = redirectInUrl ? redirectInUrl : '/';
	return (
		<>
			<div className=" flex flex-col w-full max-w-[600px] h-screen mx-auto items-center justify-center  ">
				<Helmet>
					<title>Sign In</title>
				</Helmet>
				<div className=" flex flex-col w-full">
					<h1 className="mb-3 font-bold">Sign In</h1>
					<form>
						<label htmlFor="">Email</label>
						<input
							className="mb-3 h-10 border border-gray-200 w-full rounded"
							type="email"
							id="email"
							required
						/>
						<label htmlFor="">Password</label>
						<input
							className="mb-3 h-10 border border-gray-200 w-full rounded"
							type="password"
							id="password"
							required
						/>
						<button
							type="submit"
							className="bg-[#f0c14b] rounded-md my-3  mx-auto py-1 px-2 border border-[#a88734]"
						>
							Sign In
						</button>
					</form>
					<div className="flex w-full ">
						<h4 className="mr-2">New customer?</h4>

						<Link
							to={`signup?redirect=${redirect}`}
							className="text-blue-600 cursor-pointer"
						>
							Create your account
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default SigninScreen;
