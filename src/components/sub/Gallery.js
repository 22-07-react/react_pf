import Layout from '../common/Layout';
import Pop from '../common/Pop';
import Masonry from 'react-masonry-component';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Gallery() {
	const dispatch = useDispatch();
	const frame = useRef(null);
	const input = useRef(null);
	const pop = useRef(null);
	//store에 있는 flickr데이터를 가져옴 (처음 사이클에서는 빈배열  가져옴)
	const Pics = useSelector((store) => store.flickrReducer.flickr);
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
		dispatch({
			type: 'FLICKR_START',
			Opt: {
				type: 'search',
				tag: result,
			},
		});
		input.current.value = '';
	};
	const showUser = (e) => {
		if (!EnableClick) return;
		setLoading(true);
		frame.current.classList.remove('on');
		dispatch({
			type: 'FLICKR_START',
			Opt: {
				type: 'user',
				user: e.target.getAttribute('user'),
			},
		});
		setEnableClick(false);
	};

	//컴포넌트 마운트시
	useEffect(() => {
		dispatch({
			//FLICKR_START액션타입의 액션 객체를 saga로 전달
			type: 'FLICKR_START',
			Opt: {
				type: 'user',
				user: user,
			},
		});
	}, []);

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
						{Pics.map((pic, idx) => {
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
				{Pics.length !== 0 && (
					<img
						src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`}
						alt={Pics[Index].title}
					/>
				)}
			</Pop>
		</>
	);
}

export default Gallery;
