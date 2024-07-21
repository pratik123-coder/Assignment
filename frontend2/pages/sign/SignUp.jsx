import { Link } from "react-router-dom";

import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
	const [inputs,setInputs] = useState({
		name: '',
		email: '',
		password: '',

	});
	const {loading,signup} = useSignup();

	const handleSubmit = async(e) => {
		e.preventDefault();
		await signup(inputs);
	};
	return (
		<div className='flex flex-col items-center justify-center max-w-5xl mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-black'>
					Sign Up 
				</h1>
				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text text-black'>Name</span>
						</label>
						<input type='text' placeholder='John Doe' className='w-full input input-bordered bg-slate-200  h-10'
						value={inputs.name} onChange={(e)=> setInputs({...inputs,name:e.target.value})} />
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text text-black'>Email</span>
						</label>
						<input type='email' placeholder='johndoe' className='w-full input input-bordered h-10 bg-slate-200'
						value={inputs.email} onChange={(e)=>setInputs({...inputs,email:e.target.value})} />
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text text-black'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={inputs.password} 
							onChange={(e)=>setInputs({...inputs,password:e.target.value})}
						/>
					</div>

					<Link to='/login' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' href='#'>
						Already have an account?
					</Link>

					<div>
					<button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;