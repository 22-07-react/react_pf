import Layout from '../common/Layout';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Members() {
	const history = useHistory();
	const initVal = {
		userid: '',
		email: '',
		pwd1: '',
		pwd2: '',
		gender: null,
		interests: null,
		edu: '',
		comments: '',
	};
	const [Val, setVal] = useState(initVal);
	const [Err, setErr] = useState({});
	//전송 버튼 클릭 유무를 담을 스테이트
	const [Submit, setSubmit] = useState(false);

	const check = (value) => {
		const errs = {};

		//인증처리할 조건 정규표현식
		const eng = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[~!@#$%^&*()_+\]]/;

		//userid 인증처리
		if (value.userid.length < 5) {
			errs.userid = '아이디를 5글자 이상 입력하세요';
		}
		//email 인증처리
		if (value.email.length < 8 || !/@/.test(value.email)) {
			errs.email = '이메일주소는 8글자 이상 @를 포함하세요';
		}
		//pwd1 인증처리
		if (
			value.pwd1.length < 6 ||
			!eng.test(value.pwd1) ||
			!num.test(value.pwd1) ||
			!spc.test(value.pwd1)
		) {
			errs.pwd1 = '비밀번호는 6글자 이상, 영문, 숫자, 특수문자를 모두 포함하세요';
		}
		//pwd2 인증처리
		if (value.pwd1 !== value.pwd2 || !value.pwd2) {
			errs.pwd2 = '두개의 비밀번호를 동일하게 입력하세요';
		}
		//gender 인증처리
		if (!value.gender) {
			errs.gender = '성별을 선택하세요';
		}
		//interests 인증처리
		if (!value.interests) {
			errs.interests = '관심사를 하나 이상 선택하세요';
		}
		//edu 인증처리
		if (value.edu === '') {
			errs.edu = '최종학력을 선택하세요';
		}
		//comments 인증처리
		if (value.comments.length < 10) {
			errs.comments = '남기는 말을 10글자 이상 입력하세요';
		}
		return errs;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setErr(check(Val));
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleRadio = (e) => {
		const { name } = e.target;
		const isCheck = e.target.checked;
		setVal({ ...Val, [name]: isCheck });
	};

	const handleCheck = (e) => {
		let isCheck = false;
		const { name } = e.target;
		const inputs = e.target.parentElement.querySelectorAll('input');

		inputs.forEach((el) => {
			if (el.checked) isCheck = true;
		});
		setVal({ ...Val, [name]: isCheck });
	};

	const handleSelect = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	useEffect(() => {
		const len = Object.keys(Err).length;
		if (len === 0 && Submit) {
			alert('회원가입이 완료되었습니다. 메인페이지로 이동합니다.');
			history.push('/');
		}
	}, [Err]);

	return (
		<Layout name={'Members'}>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend className='h'>회원가입 폼 양식</legend>
					<table border='1'>
						<caption className='h'>회원가입 정보 입력</caption>
						<tbody>
							{/* userid */}
							<tr>
								<th scope='row'>
									<label htmlFor='userid'>USER ID</label>
								</th>
								<td>
									<input
										type='text'
										placeholder='아이디를 입력하세요'
										name='userid'
										id='userid'
										//value={Val.userid}
										onChange={handleChange}
									/>
									<span className='err'>{Err.userid}</span>
								</td>
							</tr>

							{/* password */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd1'>PASSWORD</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd1'
										id='pwd1'
										//value={Val.pwd1}
										placeholder='비밀번호를 입력하세요'
										onChange={handleChange}
									/>
									<span className='err'>{Err.pwd1}</span>
								</td>
							</tr>
							<tr>
								<th scope='row'>
									<label htmlFor='pwd2'>RE-PASSWORD</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd2'
										id='pwd2'
										//value={Val.pwd2}
										placeholder='비밀번호를 재입력하세요'
										onChange={handleChange}
									/>
									<span className='err'>{Err.pwd2}</span>
								</td>
							</tr>

							{/* email */}
							<tr>
								<th scope='row'>
									<label htmlFor='email'>E-MAIL</label>
								</th>
								<td>
									<input
										type='text'
										id='email'
										name='email'
										//value={Val.email}
										placeholder='이메일 주소를 입력하세요'
										onChange={handleChange}
									/>
									<span className='err'>{Err.email}</span>
								</td>
							</tr>

							{/* gender */}
							<tr>
								<th scope='row'>GENDER</th>
								<td>
									<label htmlFor='male'>MALE</label>
									<input type='radio' id='male' name='gender' onChange={handleRadio} />

									<label htmlFor='female'>FEMALE</label>
									<input type='radio' id='female' name='gender' onChange={handleRadio} />
									<span className='err'>{Err.gender}</span>
								</td>
							</tr>

							{/* interests */}
							<tr>
								<th scope='row'>INTERESTS</th>
								<td>
									<label htmlFor='sports'>Sports</label>
									<input type='checkbox' id='sports' name='interests' onChange={handleCheck} />

									<label htmlFor='music'>Music</label>
									<input type='checkbox' id='music' name='interests' onChange={handleCheck} />

									<label htmlFor='game'>Game</label>
									<input type='checkbox' id='game' name='interests' onChange={handleCheck} />
									<span className='err'>{Err.interests}</span>
								</td>
							</tr>

							{/* edu */}
							<tr>
								<th scope='row'>
									<label htmlFor='edu'>EDUCATION</label>
								</th>
								<td>
									<select name='edu' id='edu' onChange={handleSelect}>
										<option value=''>최종 학력을 선택하세요</option>
										<option value='elementary-school'>초등학교 졸업</option>
										<option value='middle-school'>중학교 졸업</option>
										<option value='high-school'>고등학교 졸업</option>
										<option value='college'>대학교 졸업</option>
									</select>
									<span className='err'>{Err.edu}</span>
								</td>
							</tr>

							{/* comments */}
							<tr>
								<th scope='row'>
									<label htmlFor='comments'>COMMENTS</label>
								</th>
								<td>
									<textarea
										name='comments'
										id='comments'
										cols='30'
										rows='3'
										placeholder='남기는말을 입력하세요'
										onChange={handleChange}></textarea>
									<span className='err'>{Err.comments}</span>
								</td>
							</tr>

							{/* btnSet */}
							<tr>
								<th colSpan='2'>
									<input type='reset' value='cancel' />
									<input type='submit' value='submit' onClick={() => setSubmit(true)} />
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}

export default Members;
