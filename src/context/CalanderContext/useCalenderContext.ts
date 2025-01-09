import { useContext } from 'react';
import { CalenderContext } from './CalenderContext';

export const useCalenderContext = () => {
	const context = useContext(CalenderContext);

	if (!context) {
		throw new Error('Not able to access CalenderContext');
	}

	return context;
};
