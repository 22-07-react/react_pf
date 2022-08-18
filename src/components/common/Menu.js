import { useState, forwardRef, useImperativeHandle } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';

function Menu() {
	const [Open, setOpen] = useState(true);
	const active = { color: 'orange' };

	return (
		<AnimatePresence>
			{Open && (
				<nav id='mobileGnb'>
					<h1>
						<Link to='/'>
							<img src={process.env.PUBLIC_URL + '/img/logo_w.png'} alt='logo' />
						</Link>
					</h1>

					<ul>
						<li>
							<NavLink to='/department' activeStyle={active}>
								DEPARTMENT
							</NavLink>
						</li>
						<li>
							<NavLink to='/community' activeStyle={active}>
								COMMUNITY
							</NavLink>
						</li>
						<li>
							<NavLink to='/gallery' activeStyle={active}>
								GALLERY
							</NavLink>
						</li>
						<li>
							<NavLink to='/youtube' activeStyle={active}>
								YOUTUBE
							</NavLink>
						</li>
						<li>
							<NavLink to='/location' activeStyle={active}>
								LOCATION
							</NavLink>
						</li>
						<li>
							<NavLink to='/members' activeStyle={active}>
								MEMBERS
							</NavLink>
						</li>
					</ul>
				</nav>
			)}
		</AnimatePresence>
	);
}

export default Menu;
