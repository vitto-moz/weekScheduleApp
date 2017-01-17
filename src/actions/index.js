export const setTime = (day, bt, et, busy) => ({
	type: 'SET_TIME',
	day,
	bt,
	et,
	busy
})

export const toggleHour = (day, bt, et) => ({
	type: 'SET_TIME',
	day,
	bt,
	et
})

export const setAllDay = (day) => ({
	type: 'FILL_ALL_DAY',
	day,
	bt: 0,
	et: 1439
})

export const clearAll = () => ({
	type: 'CLEAR_ALL',
})

