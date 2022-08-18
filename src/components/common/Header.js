import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useRef } from 'react';
import Menu from './Menu';

function Header({ type }) {
	//menu컴포넌트에 전달해주는 토글 기능을 담을 참조객체 생성
	const menu = useRef(null);
	const active = { color: '#000' };
	let logoURL = '';
	type === 'main' ? (logoURL = '/img/logo_w.png') : (logoURL = '/img/logo_b.png');

	return (
		<header className={type}>
			<h1>
				<Link to='/'>
					<img src={process.env.PUBLIC_URL + logoURL} alt='logo' />
				</Link>
				<span>Lorem ipsum dolor sit amet.</span>
			</h1>

			<nav id='webGnb'>
				<ul id='gnb'>
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

				<ul className='util'>
					<li>
						<FontAwesomeIcon icon={faTwitter} />
					</li>
					<li>
						<FontAwesomeIcon icon={faYoutube} />
					</li>
					<li>
						<FontAwesomeIcon icon={faInstagram} />
					</li>
				</ul>
			</nav>

			{/* 토글버튼 클릭시 참조된 토글함수 호출 */}
			<FontAwesomeIcon icon={faBars} onClick={() => menu.current.toggle()} />

			{/* 메뉴컴포넌트를 참조객체에 연결 (토글기능함수) */}
			<Menu ref={menu} />
		</header>
	);
}

export default Header;
