import { useState, forwardRef, useImperativeHandle } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';

function Menu() {
	const [Open, setOpen] = useState(true);
	const active = { color: 'orange' };

	return (
		<AnimatePresence>
			{Open && (
				<nav>
					<h1>
						<Link to='/'>
							<img src={process.env.PUBLIC_URL + '/img/logo_w.png'} alt='logo' />
						</Link>
					</h1>

					<ul>
						<li>
							<NavLink to='/department'>DEPARTMENT</NavLink>
						</li>
						<li>
							<NavLink to='/community'>COMMUNITY</NavLink>
						</li>
						<li>
							<NavLink to='/gallery'>GALLERY</NavLink>
						</li>
						<li>
							<NavLink to='/youtube'>YOUTUBE</NavLink>
						</li>
						<li>
							<NavLink to='/location'>LOCATION</NavLink>
						</li>
						<li>
							<NavLink to='/members'>MEMBERS</NavLink>
						</li>
					</ul>
				</nav>
			)}
		</AnimatePresence>
	);
}

export default Menu;
