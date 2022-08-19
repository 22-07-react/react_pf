function Visual() {
	return (
		<figure id='visual' className='myScroll'>
			<video src={process.env.PUBLIC_URL + '/img/vid.mp4'} loop muted autoPlay></video>
		</figure>
	);
}

export default Visual;
