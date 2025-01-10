import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useCalenderContext } from "../context/CalanderContext/useCalenderContext";
import CloseIcon from "@mui/icons-material/Close";
import image from "../data/gmeetImg.png";
import OutsideClickHandler from "./OutsideClickHandler";
import classNames from "classnames";

type TMeetingInfoProps = {
  meetingIds: number[];
};

const MODAL_WIDTH = 240;

const OFFSET = 10;

interface IEventProps{
  closePopup:any;
  meeting:any;
  meetingView:string;
}

const EventDetails = (props:IEventProps) =>{
  const {closePopup,meeting,meetingView} = props;
  const eventInfo = meeting?.user_det;
  const date = dayjs(meeting.start).format("DD MMM YYYY");
  const candidate = eventInfo?.candidate;
  const dayView = meetingView==='month'?'monthView':'';
return  <OutsideClickHandler onOutsideClick={closePopup}>
  <div className={classNames("custom-event-popover",dayView)}>
 <div className="event-content">
   <div className="event-content-left">
     <div className="event-content-details">
<div className="event-label">{`Interview with: ${candidate?.candidate_firstName}`+ ' '+`${candidate?.candidate_lastName}`}</div>
<div className="event-label">{`Position: ${eventInfo?.job_id?.jobRequest_Role}`}</div>
<div className="event-label">{`Created by: ${eventInfo?.handled_by?.firstName}`+' '+ `${eventInfo?.handled_by?.lastName}`}</div>
<div className="event-label">{`Interview date: ${date}`}</div>
<div className="event-label">Interview via: Google Meet</div>
      </div>

     <div>
       <button className="event-left-btn">Resume.docx</button>

       <button className="event-left-btn">Aadhar card</button>
     </div>
   </div>

   <div className="event-image-btn">
     <img src={image} />

     <button className="join-btn">JOIN</button>
   </div>
 </div>
</div>
</OutsideClickHandler>

}



const MeetingInfo = (props: TMeetingInfoProps) => {
  const { meetingIds } = props;
  const { state } = useCalenderContext();
  const { meetingIdMap } = state;
  const previewMeetingId = meetingIds[0];
  const meeting = meetingIdMap[previewMeetingId];
  const start = dayjs(meeting.start);
  const end = dayjs(meeting.end);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [showMeetingInfo, setMeetingInfo] = useState(false);
  const [position, setPosition] = useState({
    right: -(MODAL_WIDTH + OFFSET),
    top: OFFSET,
  });
  useEffect(() => {
    if (state.viewMode === "month") {
      setPosition({ right: (MODAL_WIDTH / 2 )+ OFFSET, top: OFFSET });
    }
  }, [state.viewMode]);

  const toggle = () => {
    setShowAllEvents(!showAllEvents);
  };
  const onEventClk = (e: any) => {
    if(e.target.id!=='closeIcon'){
    e.stopPropagation();
    
    setMeetingInfo(!showMeetingInfo);
    }
  };
  const closePopup = () => {
   
    setMeetingInfo(false);
  };

  const showCount = meetingIds.length > 1;
  const jobTitle = meeting?.job_id?.jobRequest_Title;
  const interviewName = meeting?.user_det?.handled_by;
  
  return (
    <div className="event-container" onClick={toggle}>
      {showCount && !showAllEvents && (
        <div
          className="count"
          style={{
            background: "#fccb5c",
            color: "#333",
            borderRadius: "50%",
            position: "absolute",
            top: -12,
            right: -12,
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
            width: 24,
            height: 24,
          }}
        >
          {meetingIds.length}
        </div>
      )}
      {showAllEvents && (
       
        <div
          onClick={(e) => onEventClk(e)}
          className="event-list"
          style={{
            position: "absolute",
            right: position.right,
            top: position.top,
            width: MODAL_WIDTH,
            background: "#fff",
          }}
        >
          <div className="meeting-header">
         <div className="meeting-label">Meetings</div>

         <CloseIcon
           style={{ width: "14px", height: "14px" }}
           onClick={toggle}
           id = 'closeIcon'
         />
       </div>
          {meetingIds.map((id) => {
            const event = meetingIdMap[previewMeetingId];
            const job_Title = event?.job_id?.jobRequest_Title;
            const interviewer = event?.user_det?.handled_by;
            const date = dayjs(event.start).format("DD MMM YYYY");
            const timeStart = dayjs(event.start).format("HH : mm");
            const timeEnd = dayjs(event.end).format("HH : mm");
            return (
              <div key={id} className="event-meeting-container">
                <div
                  className="left-bar"
                  style={{
                    width: 10,
                    background: "#0068bd",
                  }}
                />
                <div className="event-data">
                <div>{job_Title}</div>
                <div>{`Interviewer:${interviewer?.firstName}`+' '+`${interviewer.lastName}`}</div>
                  <div>{`Date: ${date} | Time: ${timeStart} - ${timeEnd}`}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <>
        <div className="left-bar" />
        <div className="data-wrap">
          <div>{jobTitle}</div>
          <div>{`Interviewer:${interviewName?.firstName}`+' '+`${interviewName.lastName}`}</div>
          <div>{`Time: ${start.format("hh:mm")} - ${end.format("hh:mm")}`}</div>
        </div>
      </>
      {showMeetingInfo && (
       <EventDetails meeting = {meeting} meetingView = {state.viewMode} closePopup={closePopup}/>
      )}
    </div>
  );
};

export default MeetingInfo;
