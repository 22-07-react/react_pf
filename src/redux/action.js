//해당 함수는 인수로 전달된 값을 type이 SET_MEMBERS인 액션객체에 담아 리턴
export const setMembers = (member) => {
	return {
		type: 'SET_MEMBERS',
		payload: member,
	};
};
