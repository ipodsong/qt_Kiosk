import React, { Fragment, useState, useEffect } from "react";
import {
  VerticalTimeline,
  // VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
// import { Edit, Video, Image, Activity } from "react-feather";
import TimelineItem from "./timelineItem";
// import Contribution from "../support/contribution";
// import { Col, Container, Row } from "reactstrap";

function Timeline() {
  const [contributions, setContributions] = useState([]);

  // 유즈이펙트를 카와이이이 하게 써볼게요! ^0^
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/account/usercontribution`, {
      // fetch의 기본 요청은 GET이므로 따로 method를 정의하지 않습니다.
      // header: localStorage.getItem('access-token')
      headers: {
        // 키값을 "token"으로 설정할 것인가? 확인해보고 authentication.js 의 fetch도 함께 수정하자
        // 왜 어떤 사람들은 이를 'access_token'으로 쓰지? 로컬 스토리지는 '-'를 쓰는데.
        // 해당 fetch 함수 내용 확인한 다음 memberInfo, memberQnA 병행하여 확인해야하는걸 잊지말자!
        token: localStorage.getItem("access-token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setContributions(res);
        //   console.log("지금 받아올 내용은:", res)
        //   console.log("실제로 받은 내용은:", contributions)
        //   console.log("어떻게 파싱할까요?:", contributions[0])
      });
  }, []);

  // return (
  //   <div></div>
  // );
  if (contributions.length !== 0) {
    // console.log("이게 0일 경우인데요:", contributions)
    return (
      <Fragment>
        <VerticalTimeline layout={"1-column-right"}>
          {contributions.map((contributionItem, index) => (
            <TimelineItem key={index} contribution={contributionItem} />
          ))}
        </VerticalTimeline>
      </Fragment>
    );
  } else {
    return (
      <div className="ProfileInfo">
        <p className="font-weight-bold">
          테스트 결제를 하시고 후원 랭킹에 참여해보세요!
        </p>
        <p>0. 회원가입 및 로그인해주세요</p>
        <p>1. '후원하기'에서 서울시 종로구 창신동을 검색해주세요</p>
        <p>2. 국수나무 창신점 선택해주세요</p>
        <p>3. 원하시는 메뉴를 마음껏 담아주세요</p>
        <p>4. 카카오페이로 테스트 결제를 실행해보세요</p>
        <p>5. 결제는 테스트 결제로 진행되며 후원 내역은 기록됩니다:)</p>
      </div>
    );
  }
}

export default Timeline;
