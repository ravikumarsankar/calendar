import { ReactNode, useEffect, useMemo, useState } from 'react';
import {
	CalenderContext,
	TCalenderContextKeys,
	TCalenderState,
} from './CalenderContext';
import { TMeetingData } from '../../components/CalendarWrap';
import dayjs from 'dayjs';

type TCalenderProviderProps = {
	children: ReactNode;
	meetingData: TMeetingData[];
};

export const getKeyForDay = (date: Date) => dayjs(date).format('DD-MM-YYYY');

const getMeetingMeta = (meetingData: TMeetingData[]) => {
	const meetingIdMap: Record<string, TMeetingData> = {};
	const dateMeetingMap: Record<string, number[]> = {};
	const dayBasedMeetingMap: Record<string, number[]> = {};

	meetingData.forEach((data) => {
		meetingIdMap[data.id] = data;
		const startDateTime = new Date(data.start).getTime();
		const formattedStartDate = getKeyForDay(data.start);

		if (!dateMeetingMap[startDateTime]) {
			dateMeetingMap[startDateTime] = [];
		}
		dateMeetingMap[startDateTime].push(data.id);

		if (!dayBasedMeetingMap[formattedStartDate]) {
			dayBasedMeetingMap[formattedStartDate] = [];
		}
		dayBasedMeetingMap[formattedStartDate].push(data.id);
	});

	return { meetingIdMap, dateMeetingMap, dayBasedMeetingMap };
};

const CalenderProvider = (props: TCalenderProviderProps) => {
	const { children, meetingData } = props;

	const { dateMeetingMap, meetingIdMap, dayBasedMeetingMap } = useMemo(
		() => getMeetingMeta(meetingData),
		[meetingData]
	);
	const [calenderState, setCalendarContext] = useState<TCalenderState>({
		viewMode: 'week',
		pageOffset: 0,
		currentDate: new Date(),
		dateMeetingMap,
		meetingIdMap,
		dayBasedMeetingMap,
	});

	useEffect(() => {
		updateContext({
			...calenderState,
			dateMeetingMap,
			meetingIdMap,
			dayBasedMeetingMap,
		});
	}, [meetingData]);

	const updateCalender = <T extends TCalenderContextKeys>(
		key: T,
		value: TCalenderState[T]
	) => {
		setCalendarContext({ ...calenderState, [key]: value });
	};

	const updateContext = (payload: Partial<TCalenderState>) => {
		setCalendarContext({ ...calenderState, ...payload });
	};

	return (
		<CalenderContext.Provider
			value={{ state: calenderState, updateCalender, updateContext }}
		>
			{children}
		</CalenderContext.Provider>
	);
};

export default CalenderProvider;
