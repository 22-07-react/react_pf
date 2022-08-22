import Layout from '../common/Layout';
import Pop from '../common/Pop';
import Masonry from 'react-masonry-component';
import { useEffect, useState, useRef } from 'react';

function Gallery() {
	const frame = useRef(null);
	const input = useRef(null);
	const pop = useRef(null);
	const [Items, setItems] = useState([]);
	const [Index, setIndex] = useState(0);
	const [Loading, setLoading] = useState(true);
	const [EnableClick, setEnableClick] = useState(false);
	const masonryOptions = { transitionDuration: '0.5s' };
	const num = 50;
	const user = '164021883@N04';

	const showInterest = () => {
		if (!EnableClick) return;
		setLoading(true);
		frame.current.classList.remove('on');
		getFlickr({ type: 'interest' });
		setEnableClick(false);
	};
	const showSearch = () => {
		const result = input.current.value.trim();
		if (!result) return alert('검색어를 입력하세요');
		if (!EnableClick) return;
		setEnableClick(false);
		setLoading(true);
		frame.current.classList.remove('on');
		getFlickr({ type: 'search', tag: result });
		input.current.value = '';
	};
	const showUser = (e) => {
		if (!EnableClick) return;
		setLoading(true);
		frame.current.classList.remove('on');
		getFlickr({ type: 'user', user: e.target.getAttribute('user') });
		setEnableClick(false);
	};

	useEffect(() => getFlickr({ type: 'user', user: user }), []);

	return (
		<>
			<Layout name={'Gallery'}>
				<button user={user} onClick={showUser}>
					My Gallery
				</button>
				<button onClick={showInterest}>Interest Gallery</button>

				<div className='searchBox'>
					<input
						type='text'
						ref={input}
						onKeyUp={(e) => {
							if (e.key === 'Enter') showSearch();
						}}
					/>
					<button onClick={showSearch}>search</button>
				</div>

				{Loading && <img className='loading' src={process.env.PUBLIC_URL + '/img/loading.gif'} />}

				<div className='frame' ref={frame}>
					<Masonry elementType={'div'} options={masonryOptions}>
						{Items.map((pic, idx) => {
							return (
								<article key={idx}>
									<div className='inner'>
										<div
											className='pic'
											onClick={() => {
												setIndex(idx);
												pop.current.open();
											}}>
											<img
												src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
												alt={pic.title}
											/>
										</div>
										<h2>{pic.title}</h2>
										<div className='profile'>
											<img
												src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
												alt={pic.owner}
												onError={(e) => {
													e.target.setAttribute(
														'src',
														'https://www.flickr.com/images/buddyicon.gif'
													);
												}}
											/>
											<span user={pic.owner} onClick={showUser}>
												{pic.owner}
											</span>
										</div>
									</div>
								</article>
							);
						})}
					</Masonry>
				</div>
			</Layout>

			<Pop ref={pop}>
				{Items.length !== 0 && (
					<img
						src={`https://live.staticflickr.com/${Items[Index].server}/${Items[Index].id}_${Items[Index].secret}_b.jpg`}
						alt={Items[Index].title}
					/>
				)}
			</Pop>
		</>
	);
}

export default Gallery;
