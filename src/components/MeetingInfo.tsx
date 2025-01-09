import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useCalenderContext } from "../context/CalanderContext/useCalenderContext";
import CloseIcon from "@mui/icons-material/Close";
import image from "../data/gmeetImg.png";

type TMeetingInfoProps = {
  meetingIds: number[];
};

const MODAL_WIDTH = 240;

const OFFSET = 10;

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
      setPosition({ right: MODAL_WIDTH / 2 + OFFSET, top: OFFSET });
    }
  }, [state.viewMode]);

  const toggle = () => {
    setShowAllEvents(!showAllEvents);
  };
  const onEventClk = (e: any) => {
    e.stopPropagation();

    toggle();

    setMeetingInfo(!showMeetingInfo);
  };

  const showCount = meetingIds.length > 1;
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
            />
          </div>
          {meetingIds.map((id) => {
            const event = meetingIdMap[previewMeetingId];
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
                  <div>{event.desc}</div>
                  <div>{event.summary}</div>
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
          <div>{meeting.summary}</div>
          <div>{meeting.desc}</div>
          <div>{`Time: ${start.format("hh:mm")} - ${end.format("hh:mm")}`}</div>
        </div>
      </>
      {showMeetingInfo && (
        <div className="custom-event-popover">
          <div className="event-content">
            <div className="event-content-left">
              <div className="event-content-details">Hello World</div>

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
      )}
    </div>
  );
};

export default MeetingInfo;
