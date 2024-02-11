import { useEffect, useState } from 'react';
import Logo from './Logo';
import UserEntry from './UserEntry';
import UserStatus from './UserStatus';

const NavBar = () => {
	const [authenticated, setAuthenticated] = useState(() => {
		return localStorage.getItem('token') ? true : false;
	});

	useEffect(() => {
		const user = localStorage.getItem('token');
		setAuthenticated(user ? true : false);
	}, []);

	return (
		<div className='sticky top-0 z-50 bg-white px-2 py-1 shadow-sm md:px-4'>
			<div className='flex items-center justify-between'>
				<Logo />
				{authenticated ? <UserStatus /> : <UserEntry />}
			</div>
		</div>
	);
};

export default NavBar;
