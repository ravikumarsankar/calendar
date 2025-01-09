import { useCalenderContext } from '../../context/CalanderContext/useCalenderContext';
import { CELL_HEIGHT, DEFAULT_COLORS } from '../Calendar';
import { getUpcomingDates } from '../Helper';
import MeetingInfo from '../MeetingInfo';

const generateNextHours = (date: Date, limit = 24) => {
	const currentDate = new Date(date);
	currentDate.setHours(0, 0, 0, 0);
	const timesArray: Date[] = [];
	for (let i = 0; i < limit; i++) {
		const newTime = new Date(currentDate);
		newTime.setHours(currentDate.getHours() + i);
		timesArray.push(newTime);
	}
	return timesArray;
};

const setMinuteToZero = (time: Date) => {
	const newTime = new Date(time);
	newTime.setMinutes(0, 0, 0);
	return newTime;
};

const WeekView = ({ columnCount }: { columnCount: number }) => {
	const { state } = useCalenderContext();
	const { currentDate, dateMeetingMap } = state;
	const comingDays = getUpcomingDates(currentDate, columnCount);

	return comingDays.map((day) => {
		const nextHours = generateNextHours(day, 24);
		return (
			<div className="day-column-wrap" key={day.getTime()}>
				{nextHours.map((hour) => {
					const formattedHour = setMinuteToZero(hour);
					const timeStamp = formattedHour.getTime();
					const meetingIds = dateMeetingMap[timeStamp];

					return (
						<div
							key={hour.getTime()}
							style={{
								border: `1px solid ${DEFAULT_COLORS.borderColor}`,
								height: CELL_HEIGHT,
								width: '100%',
							}}
							data-date={`${hour}`}
						>
							{meetingIds?.length && <MeetingInfo meetingIds={meetingIds} />}
						</div>
					);
				})}
			</div>
		);
	});
};

export default WeekView;
