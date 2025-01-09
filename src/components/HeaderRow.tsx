import { getUpcomingDates } from './Helper';
import { useCalenderContext } from '../context/CalanderContext/useCalenderContext';
import { CELL_HEIGHT, DEFAULT_COLORS, FIRST_COLUMN_WIDTH } from './Calendar';
import dayjs from 'dayjs';

const HeaderRow = (props: { currentDate: Date; columnCount: number }) => {
	const { columnCount, currentDate } = props;
	const {
		state: { viewMode },
	} = useCalenderContext();

	if (['week', 'day'].includes(viewMode)) {
		const comingDays = getUpcomingDates(currentDate, columnCount);

		return (
			<div
				className="days"
				style={{
					display: 'grid',
					gridTemplateColumns: `${FIRST_COLUMN_WIDTH}px 1fr`,
				}}
			>
				<div
					className="blank"
					style={{
						minWidth: FIRST_COLUMN_WIDTH,
						border: `1px solid ${DEFAULT_COLORS.borderColor}`,
					}}
				/>
				<div
					className="cell"
					style={{
						display: 'grid',
						gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
						width: '100%',
					}}
				>
					{comingDays.map((day) => {
						const formattedDate = dayjs(day);
						const currentDay = formattedDate.format('DD');
						const currentMonth = formattedDate.format('MMM');
						const currentDayInWord = formattedDate.format('dddd');
						return (
							<div
								key={currentDay}
								className="day-name"
								style={{
									display: 'grid',
									alignItems: 'center',
									color: DEFAULT_COLORS.primaryFontColor,
									textAlign: 'center',
									padding: 4,
									height: CELL_HEIGHT,
									width: '100%',
									border: `1px solid ${DEFAULT_COLORS.borderColor}`,
									overflowX: 'hidden',
									textOverflow: 'ellipsis',
								}}
							>
								<p>{`${currentDay} ${currentMonth}`}</p>
								<p>{currentDayInWord}</p>
							</div>
						);
					})}
				</div>
			</div>
		);
	}

	return (
		<div
			className="days"
			style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}
		>
			{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
				<div
					key={day}
					className="day-name"
					style={{
						color: DEFAULT_COLORS.fontColor,
						textAlign: 'center',
						padding: 4,
					}}
				>
					{day}
				</div>
			))}
		</div>
	);
};

export default HeaderRow;
