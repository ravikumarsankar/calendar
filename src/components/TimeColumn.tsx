import dayjs from 'dayjs';
import { useCalenderContext } from '../context/CalanderContext/useCalenderContext';
import { CELL_HEIGHT, DEFAULT_COLORS, FIRST_COLUMN_WIDTH } from './Calendar';
import { generateNextHours } from './Helper';

const TimeColumn = () => {
	const { state } = useCalenderContext();
	const { currentDate, viewMode } = state;
	const isMonthView = viewMode === 'month';

	if (isMonthView) return null;

	const nextHours = generateNextHours(currentDate, 24);
	return (
		<div className="side-panel" style={{ width: FIRST_COLUMN_WIDTH }}>
			{nextHours.map((hour) => {
				const currHour = dayjs(hour);
				const time = currHour.format('hh');
				const clock = currHour.format('a');

				return (
					<div
						key={time + clock}
						className="side-panel-item"
						style={{
							width: FIRST_COLUMN_WIDTH,
							color: DEFAULT_COLORS.fontColor,
							border: `1px solid ${DEFAULT_COLORS.borderColor}`,
							height: CELL_HEIGHT,
							display: 'grid',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<p style={{ margin: 'auto' }}>
							{time} {clock}
						</p>
					</div>
				);
			})}
		</div>
	);
};

export default TimeColumn;
