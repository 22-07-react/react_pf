import Layout from '../common/Layout';
import Pop from '../common/Pop';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Gallery() {
	const key = '4612601b324a2fe5a1f5f7402bf8d87a';
	const method = 'flickr.people.getPhotos';
	const num = 8;
	const id = '164021883@N04';
	const url = `https://www.flickr.com/services/rest/?method=${method}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&user_id=${id}`;

	const [Items, setItems] = useState([]);
	const [Index, setIndex] = useState(0);
	const [Open, setOpen] = useState(false);

	useEffect(() => {
		axios.get(url).then((json) => {
			console.log(json.data.photos.photo);
			setItems(json.data.photos.photo);
		});
	}, []);

	return (
		<>
			<Layout name={'Gallery'}>
				{Items.map((pic, idx) => {
					return (
						<article
							key={idx}
							onClick={() => {
								setIndex(idx);
								setOpen(true);
							}}>
							<div className='pic'>
								<img
									src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
									alt={pic.title}
								/>
							</div>
							<h2>{pic.title}</h2>
						</article>
					);
				})}
			</Layout>

			{Open && (
				<Pop setOpen={setOpen}>
					<img
						src={`https://live.staticflickr.com/${Items[Index].server}/${Items[Index].id}_${Items[Index].secret}_b.jpg`}
						alt={Items[Index].title}
					/>
				</Pop>
			)}
		</>
	);
}

export default Gallery;
