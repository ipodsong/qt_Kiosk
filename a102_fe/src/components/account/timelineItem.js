import React, { useState } from "react";
import {
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { Activity } from "react-feather";
import { Button } from "reactstrap";
import { AiOutlineMessage } from "react-icons/ai";
import { AiFillMessage } from "react-icons/ai";

function TimelineItem(contribution) {
  const [showDetail, setshowDetail] = useState(false);

  // 콘스트로 선언할 때는 바로 변수를 못 받나요? 아 {} 없이 바로 보내줘도 되는거였습니다!
  // javascript 문자열 슬라이싱은 .slice를 씁니다.
  // 01월을 1월로 출력하기 가능?
  const contribDate = contribution.contribution.contributionDate.slice(5, 7);
  const contribDay = contribution.contribution.contributionDate.slice(8, 10);

  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      animate={true}
      // date={contribution.contribution.contributionDate}
      // icon={<i
      //   class="fas fa-heartbeat contribution-icon"></i>}
      icon={<Activity />}
    >
      <div className="timelinItem-grid">
        {/* <div className="timelineItem-title">
          { contribution.contribution.itemName }을 후원했어요!
        </div> */}
        <div className="timelineItem-title">
          {/* { contribution.contribution.item.store.storeName }에 방문했어요! */}
          {contribution.contribution.storeName}에 방문해서{" "}
          {contribution.contribution.itemName}을 후원했어요!
        </div>
        <div className="timelineItem-time">
          {contribDate}월 {contribDay}일
        </div>
        <div className="timelineItem-btn col-12 row justify-content-end m-0">
          <Button
            className="timelineItem-toggle"
            onClick={() => {
              setshowDetail(!showDetail);
            }}
          >
            {!showDetail ? "메시지보기" : "메시지닫기"}
          </Button>
        </div>
        {showDetail ? (
          <div className="timelineItem-message">
            {showDetail && (
              <div><AiOutlineMessage/>{contribution.contribution.contributionMessage}</div>
            )}
            {showDetail && (
              <div><AiFillMessage/>{contribution.contribution.contributionAnswer? contribution.contribution.contributionAnswer : "아동이 후원된 음식을 먹게 되면, 메세지가 전송됩니다."} </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </VerticalTimelineElement>
  );
}
// export default detailClick;
export default TimelineItem;
