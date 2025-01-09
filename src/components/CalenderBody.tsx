import { useCalenderContext } from '../context/CalanderContext/useCalenderContext';
import MonthView from './calendar-view/MonthView';
import WeekView from './calendar-view/WeekView';

const CalenderBody = () => {
	const { state } = useCalenderContext();
	const { viewMode } = state;

	const isMonthView = viewMode === 'month';

	return (
		<div
			className="dates"
			style={{
				display: 'grid',
				gridTemplateColumns: `repeat(${
					['week', 'month'].includes(viewMode) ? 7 : 1
				}, 1fr)`,
				width: '100%',
			}}
		>
			{isMonthView ? (
				<MonthView />
			) : (
				<WeekView columnCount={viewMode === 'week' ? 7 : 1} />
			)}
		</div>
	);
};

export default CalenderBody;
