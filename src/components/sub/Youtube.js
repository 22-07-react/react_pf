import Layout from '../common/Layout';
import Pop from '../common/Pop';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

function Youtube() {
	const pop = useRef(null);
	const [Vids, setVids] = useState([]);
	const [Index, setIndex] = useState(0);

	const getYoutube = async () => {
		const key = 'AIzaSyCMfwz2923Ts1sPkx0J7I0mnMHPmYKw4vo';
		const playlist = 'PLHtvRFLN5v-VD95TBpr5Dh2zguWCjjmMG';
		const num = 6;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

		await axios.get(url).then((json) => {
			setVids(json.data.items);
		});
	};

	useEffect(getYoutube, []);

	return (
		<>
			<Layout name={'Youtube'}>
				{Vids.map((vid, idx) => (
					<article key={vid.id}>
						<h2>
							{vid.snippet.title.length > 30
								? vid.snippet.title.substr(0, 30) + '...'
								: vid.snippet.title}
						</h2>

						<div className='txt'>
							<p>
								{vid.snippet.description.length > 200
									? vid.snippet.description.substr(0, 200) + '...'
									: vid.snippet.description}
							</p>
							<span>{vid.snippet.publishedAt.split('T')[0]}</span>
						</div>

						<div className='pic'>
							<img src={vid.snippet.thumbnails.standard.url} alt={vid.title} />
							<FontAwesomeIcon
								icon={faYoutube}
								onClick={() => {
									setIndex(idx);
									pop.current.open();
								}}
							/>
						</div>
					</article>
				))}
			</Layout>

			<Pop ref={pop}>
				{Vids.length !== 0 && (
					<iframe
						src={`https://www.youtube.com/embed/${Vids[Index].snippet.resourceId.videoId}`}
						frameBorder='0'></iframe>
				)}
			</Pop>
		</>
	);
}

export default Youtube;
