import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//fetch함수 정의
export const fetchYoutube = createAsyncThunk(
	//고유의 문자값 등록 (내부적으로 actionType 생성할때 활용되는 값)
	'youtube/requestYoutube',
	async () => {
		//axios요청할 URL생성
		const key = 'AIzaSyCMfwz2923Ts1sPkx0J7I0mnMHPmYKw4vo';
		const playlist = 'PLHtvRFLN5v-VD95TBpr5Dh2zguWCjjmMG';
		const num = 6;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;
		const response = await axios.get(url);
		return response.data.items;
	}
);

//슬라이스 함수 생성
const youtubeSlice = createSlice({
	//내부적으로 전역으로 관리될 데이터가 값일 property이름으로 등록될 값
	name: 'youtube',
	initialState: {
		data: [],
		isLoading: false,
	},

	//아랠 각각 대괄호 안에 fetch함수 이름 등록
	extraReducers: {
		[fetchYoutube.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchYoutube.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchYoutube.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});

//해당 슬라이스 export
export default youtubeSlice.reducer;
