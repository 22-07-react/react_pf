import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Pop from '../common/Pop';

function Vids() {
	const pop = useRef(null);
	const [Index, setIndex] = useState(0);
	const youtube = useSelector((store) => store.youtube.data);

	return (
		<>
			<section id='vids' className='myScroll'>
				<Swiper
					modules={[Pagination, Navigation, Autoplay]}
					autoplay={{ delay: 2000, disableOnInteraction: true }}
					pagination={{ clickable: true }}
					navigation={true}
					spaceBetween={50}
					loop={true}
					slidesPerView={3}
					centeredSlides={true}>
					{youtube.map((vid, idx) => {
						if (idx >= 4) return;
						return (
							<SwiperSlide key={vid.id}>
								<div className='inner'>
									<div
										className='pic'
										onClick={() => {
											setIndex(idx);
											pop.current.open();
										}}>
										<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
									</div>
									<h2>{vid.snippet.title}</h2>
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</section>

			<Pop ref={pop}>
				{youtube.length !== 0 && (
					<iframe
						src={`https://www.youtube.com/embed/${youtube[Index].snippet.resourceId.videoId}`}
						frameBorder='0'></iframe>
				)}
			</Pop>
		</>
	);
}

export default Vids;
