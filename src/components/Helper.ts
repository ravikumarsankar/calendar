import { TViewMode } from "../context/CalanderContext/CalenderContext";

export const getUpcomingDates = (startDate: Date, length: number) => {
	const datesArray: Date[] = [];
	const start = new Date(startDate);

	for (let i = 0; i < length; i++) {
		const currentDate = new Date(start);
		currentDate.setDate(start.getDate() + i);
		datesArray.push(currentDate);
	}

	return datesArray;
};

export const getDaysInMonth = (month: number, year: number) =>
	new Date(year, month + 1, 0).getDate();

export const firstDayOfMonth = (month: number, year: number) =>
	new Date(year, month, 1).getDay();

export const generateNextHours = (date: Date, hourOffset = 24) => {
	const currentDate = new Date(date);
	currentDate.setHours(0, 0, 0, 0);
	const timesArray: Date[] = [];
	for (let i = 0; i < hourOffset; i++) {
		const newTime = new Date(currentDate);
		newTime.setHours(currentDate.getHours() + i);
		timesArray.push(newTime);
	}
	return timesArray;
};

export const getViewModeMeta = (viewMode: TViewMode) => {
	const isMonthView = viewMode === 'month';
	const isDayView = viewMode === 'day';
	const isWeekView = viewMode === 'week';

	return { isDayView, isMonthView, isWeekView };
};
