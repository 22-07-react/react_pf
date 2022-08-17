import Layout from '../common/Layout';
import { useRef, useState, useEffect } from 'react';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);
	const inputEdit = useRef(null);
	const textareaEdit = useRef(null);

	const getLocalData = () => {
		const data = localStorage.getItem('post');
		return JSON.parse(data);
	};

	//초기 Posts스테이트에 로컬스토리지의 데이터를 가져와서 저장
	const [Posts, setPosts] = useState(getLocalData());
	const [Allowed, setAllowed] = useState(true);

	//기존 폼요소 초기화 함수
	const resetForm = () => {
		input.current.value = '';
		textarea.current.value = '';
	};

	//글저장 함수
	const createPost = () => {
		if (!input.current.value.trim() || !textarea.current.value.trim()) {
			return alert('제목과 본문을 모두 입력하세요');
		}
		setPosts([{ title: input.current.value, content: textarea.current.value }, ...Posts]);
		resetForm();
	};

	//글삭제 함수
	const deletePost = (index) => {
		const newPosts = Posts.filter((_, idx) => idx !== index);
		setPosts(newPosts);
	};

	//실제 글 수정 함수
	const updatePost = (index) => {
		if (!inputEdit.current.value.trim() || !textareaEdit.current.value.trim()) {
			resetForm();
			return alert('수정할 제목과 본문을 모두 입력하세요.');
		}

		setPosts(
			Posts.map((post, idx) => {
				if (idx === index) {
					post.title = inputEdit.current.value;
					post.content = textareaEdit.current.value;
					post.enableUpdate = false;
				}
				return post;
			})
		);
		setAllowed(true);
	};

	//글 수정모드 변경함수
	const enableUpdate = (index) => {
		if (!Allowed) return;
		setAllowed(false);
		setPosts(
			Posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = true;
				return post;
			})
		);
	};

	//글 출력모드 변경함수
	const disableUpdate = (index) => {
		setAllowed(true);
		setPosts(
			Posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = false;
				return post;
			})
		);
	};

	//Posts값이 변경될때마다 로컬 스토리지에 기존 데이터를 다시 문자열로 변환해서 저장
	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Posts));
	}, [Posts]);

	return (
		<Layout name={'Community'}>
			<div className='inputBox'>
				<input type='text' placeholder='제목을 입력하세요' ref={input} />
				<br />
				<textarea cols='30' rows='3' placeholder='본문을 입력하세요' ref={textarea}></textarea>
				<br />
				<div className='btnSet'>
					<button>CANCEL</button>
					<button onClick={createPost}>WRITE</button>
				</div>
			</div>

			<div className='showBox'>
				{Posts.map((post, idx) => {
					return (
						<article key={idx}>
							{post.enableUpdate ? (
								//수정모드
								<>
									<div className='editTxt'>
										<input type='text' defaultValue={post.title} ref={inputEdit} />
										<br />
										<textarea
											name=''
											id=''
											cols='30'
											rows='3'
											ref={textareaEdit}
											defaultValue={post.content}></textarea>
										<br />
									</div>
									<div className='btnSet'>
										<button onClick={() => disableUpdate(idx)}>CANCEL</button>
										<button onClick={() => updatePost(idx)}>UPDATE</button>
									</div>
								</>
							) : (
								//출력모드
								<>
									<div className='txt'>
										<h2>{post.title}</h2>
										<p>{post.content}</p>
									</div>

									<div className='btnSet'>
										<button onClick={() => enableUpdate(idx)}>EDIT</button>
										<button onClick={() => deletePost(idx)}>DELETE</button>
									</div>
								</>
							)}
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Community;
