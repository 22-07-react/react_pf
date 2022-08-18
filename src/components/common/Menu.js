import { useState, forwardRef, useImperativeHandle } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';

//Memu컴포넌트를 화살표함수로 변경해서 forwardRef메서드의 인수로 전달
const Menu = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);
	const active = { color: 'orange' };

	//부모컴포넌트의 참조객체에 담길 객체를 리턴 (Open값을 토글시켜주는 함수)
	useImperativeHandle(ref, () => {
		return {
			toggle: () => setOpen(!Open),
		};
	});

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
});

export default Menu;
