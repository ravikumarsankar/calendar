import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import ViewSwitcher from '../ViewSwitcher';
import { useCalenderContext } from '../../context/CalanderContext/useCalenderContext';
import { getViewModeMeta } from '../Helper';
import dayjs from 'dayjs';

const MONTH_NAMES = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const Header = () => {
	const { state, updateCalender } = useCalenderContext();
	const { currentDate, viewMode } = state;
	const { isMonthView, isWeekView, isDayView } = getViewModeMeta(viewMode);
	const dayOffset = isWeekView ? 7 : 1;

	const handlePrevMonth = () => {
		if (isMonthView) {
			updateCalender(
				'currentDate',
				new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
			);
		} else {
			updateCalender(
				'currentDate',
				new Date(
					currentDate.getFullYear(),
					currentDate.getMonth(),
					currentDate.getDate() - dayOffset
				)
			);
		}
	};

	const handleNext = () => {
		if (isMonthView) {
			updateCalender(
				'currentDate',
				new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
			);
		} else {
			updateCalender(
				'currentDate',
				new Date(
					currentDate.getFullYear(),
					currentDate.getMonth(),
					currentDate.getDate() + dayOffset
				)
			);
		}
	};

	const getHeadTitle = () => {
		if (isDayView) return dayjs(currentDate).format('DD ddd, MMMM YYYY');

		if (isWeekView) {
			const weekStart = dayjs(currentDate);
			const weekEnd = weekStart.add(6, 'day');
			return `${weekStart.format('DD MMM')} - ${weekEnd.format('DD MMM')}`;
		}

		return `${
			MONTH_NAMES[currentDate.getMonth()]
		} ${currentDate.getFullYear()}`;
	};
	return (
		<div className="header">
			<div
				className='nav-btn'
			>
				<button onClick={handlePrevMonth} className='chevron-btn'>
					<FontAwesomeIcon icon={faChevronLeft} size="1x" />
				</button>

				<button onClick={handleNext} className='chevron-btn'>
					<FontAwesomeIcon icon={faChevronRight} size="1x" />
				</button>
			</div>
			<div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
				<h3>{getHeadTitle()}</h3>
			</div>
			<ViewSwitcher />
		</div>
	);
};

export default Header;
