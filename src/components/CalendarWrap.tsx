import { useEffect, useState } from 'react';
import CalenderProvider from '../context/CalanderContext/CalenderProvider';
import Calendar from './Calendar';
import meetingDataJson from '../data/calanderFromToEndDate.json';

export type TMeetingData =
	| any
	| {
			id: number;
			summary: string;
			desc: string;
			start: string;
			end: string;
			attendees: any;
			status: any;
			comment: string;
			score: {
				P: number;
			};
			link: string;
			user_det: {
				id: number;
				question_score: number;
				status: any;
				candidate: {
					id: number;
					candidate_firstName: string;
					candidate_lastName: string;
					candidateGender: string;
					candidateComment: string;
					candidate_email: string;
				};
				handled_by: {
					id: number;
					last_login: any;
					userEmail: string;
					username: string;
					firstName: string;
					lastName: string;
					userRole: string;
				};
				job_id: {
					id: number;
					jobRequest_Title: string;
					jobRequest_Role: string;
					jobRequest_KeySkills: string;
					jobRequest_Description: string;
				};
			};
			job_id: {
				id: number;
				jobRequest_Title: string;
				jobRequest_Role: string;
				jobRequest_KeySkills: string;
				jobRequest_Description: string;
			};
	  };

const CalendarWrap = () => {
	const [meetingData, setMeetingData] = useState<TMeetingData[]>([]);
	useEffect(() => {
		setMeetingData(meetingDataJson as TMeetingData[]);
	}, []);

	return (
		<CalenderProvider meetingData={meetingData}>
			<Calendar />
		</CalenderProvider>
	);
};

export default CalendarWrap;
