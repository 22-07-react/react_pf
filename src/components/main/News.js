import { useState, useEffect } from 'react';

function News() {
	//로컬스토리지에 있는 데이터를 가져와서 다시 JSON객체로 parsing해서 리턴하는 함수
	const getLocalData = () => {
		const dummyPosts = [
			{ title: 'Hello5', content: 'Here comes description in detail.' },
			{ title: 'Hello4', content: 'Here comes description in detail.' },
			{ title: 'Hello3', content: 'Here comes description in detail.' },
			{ title: 'Hello2', content: 'Here comes description in detail.' },
			{ title: 'Hello1', content: 'Here comes description in detail.' },
		];
		const data = localStorage.getItem('post');

		if (data) {
			return JSON.parse(data);
		} else {
			return dummyPosts;
		}
	};

	const [Posts] = useState(getLocalData());

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Posts));
	}, []);

	return (
		<section id='news' className='myScroll'>
			<h1>News</h1>
			{Posts.map((post, idx) => {
				if (idx >= 4) return;

				return (
					<article key={idx}>
						<h2>{post.title}</h2>
						<p>{post.content}</p>
					</article>
				);
			})}
		</section>
	);
}

export default News;
