import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//fetch함수 정의
export const fetchMembers = createAsyncThunk(
	//고유의 문자값 등록 (내부적으로 actionType 생성할때 활용되는 값)
	'members/requestMembers',
	async () => {
		//axios요청할 URL생성
		const url = process.env.PUBLIC_URL + '/DB/members.json';
		const response = await axios.get(url);
		return response.data.members;
	}
);

//슬라이스 함수 생성
const memberSlice = createSlice({
	//내부적으로 전역으로 관리될 데이터가 값일 property이름으로 등록될 값
	name: 'members',
	initialState: {
		data: [],
		isLoading: false,
	},

	//아래 각각 대괄호 안에 fetch함수 이름 등록
	extraReducers: {
		[fetchMembers.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchMembers.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchMembers.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});

//해당 슬라이스 export
export default memberSlice.reducer;
