import { useRef } from 'react';
import './Calendar.css';

import { useCalenderContext } from '../context/CalanderContext/useCalenderContext';
import HeaderRow from './HeaderRow';
import BodyWrapper from './BodyWrapper';
import Header from './Header/Header';

export const DEFAULT_COLORS = {
	primaryFontColor: '#333',
	fontColor: '#0069be',
	borderColor: '#e6e6e6',
	bgColor: '#fafafa',
};

export const DATE_COLUMNS_COUNT = 7;
export const CELL_HEIGHT = 70;
export const CELL_WIDTH = 90;

export const FIRST_COLUMN_WIDTH = 60;

const Calendar = () => {
	const { state } = useCalenderContext();
	const { viewMode, currentDate } = state;

	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={containerRef}
			className="calendar"
			style={{ background: DEFAULT_COLORS.bgColor, width: '100%' }}
		>
			<Header />
			<div className="calendar-body">
				<HeaderRow
					columnCount={viewMode === 'week' ? 7 : 1}
					currentDate={currentDate}
				/>
				<BodyWrapper />
			</div>
		</div>
	);
};

export default Calendar;
