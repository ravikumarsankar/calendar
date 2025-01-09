import { createContext } from 'react';
import { TMeetingData } from '../../components/CalendarWrap';

export type TViewMode = 'day' | 'week' | 'month';

export type TCalenderState = {
	viewMode: TViewMode;
	pageOffset: number;
	currentDate: Date;
	meetingIdMap: Record<string, TMeetingData>;
	dateMeetingMap: Record<string, number[]>;
	dayBasedMeetingMap: Record<string, number[]>;
};

export type TCalenderContextKeys = keyof TCalenderState;

export type TCalenderContext = {
	state: TCalenderState;
	updateCalender: <T extends TCalenderContextKeys>(
		key: T,
		value: TCalenderState[T]
	) => void;
	updateContext: (payload: Partial<TCalenderState>) => void;
};

export const CalenderContext = createContext<TCalenderContext | undefined>(
	undefined
);
