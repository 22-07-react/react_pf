import { combineReducers } from 'redux';

const initMember = {
	members: [
		{
			name: 'Julia',
			position: 'President',
			pic: 'member1.jpg',
		},
		{
			name: 'David',
			position: 'Vice President',
			pic: 'member2.jpg',
		},
		{
			name: 'Emily',
			position: 'UI Designer',
			pic: 'member3.jpg',
		},
		{
			name: 'Paul',
			position: 'Front-end Engineer',
			pic: 'member4.jpg',
		},
		{
			name: 'Sara',
			position: 'Back-end Engineer',
			pic: 'member5.jpg',
		},
		{
			name: 'Michael',
			position: 'Project Manager',
			pic: 'member6.jpg',
		},
	],
};

const memberReducer = (state = initMember, action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };

		default:
			return state;
	}
};

const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		case 'SET_YOUTUBE':
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({ memberReducer, youtubeReducer });

export default reducers;
