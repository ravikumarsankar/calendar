import { TViewMode } from '../context/CalanderContext/CalenderContext';
import { useCalenderContext } from '../context/CalanderContext/useCalenderContext';
import './ViewSwitcher.css';

const VIEW_MODE: TViewMode[] = ['day', 'week', 'month'];

const VIEW_LABEL: Record<TViewMode, string> = {
	day: 'Day',
	month: 'Month',
	week: 'Week',
};

const ViewSwitcher = () => {
	const { updateContext, state } = useCalenderContext();
	const { viewMode } = state;

	const updateView = (view: TViewMode) => {
		updateContext({ viewMode: view });
	};
	return (
		<ul className="view-switcher" style={{ display: 'flex', gap: 5 }}>
			{VIEW_MODE.map((view) => (
				<li
					key={view}
					className={viewMode === view ? 'active' : ''}
					onClick={() => updateView(view)}
				>
					{VIEW_LABEL[view]}
				</li>
			))}
		</ul>
	);
};

export default ViewSwitcher;
