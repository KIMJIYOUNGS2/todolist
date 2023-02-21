import React from "react";

//import module
import styled from "styled-components";

const TodoHeadContainer = styled.div`
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 36px;
    color: #393e46;
  }
  .day {
    margin-top: 4px;
    color: #393e46;
    font-size: 21px;
  }
  .tasks-left {
    color: #00adb5;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
  }
`;

// 오늘 날짜
// getMonth() 메서드는 생성된 Date 객체에서 월(0 ~ 11)를 가져옵니다.
// getMonth()의 반환 값이 0~11 이니까 +1
const renderDate = () => {
  const nowDate = new Date();
  if (nowDate) {
    const year = nowDate.getFullYear();
    const month = String(Number(nowDate.getMonth()) + 1);
    const date = nowDate.getDate();
    return year + "년 " + month + "월 " + date + "일 ";
  }
  return "";
};

// 오늘 요일
// getDay() method는 특정 날짜의 요일을 요일 번호로 return
// getDay()의 반환 값 0~6: 일요일~토요일
const renderDay = () => {
  const nowDate = new Date();
  if (nowDate) {
    const dayToKorean = ["월", "화", "수", "목", "금", "토", "일"];
    const day = nowDate.getDay();
    return dayToKorean[day] + "요일";
  }
  return "";
};

function TodoHead() {
  return (
    <TodoHeadContainer>
      <h1>{renderDate()}</h1>
      <div className="day">{renderDay()}</div>
      <div className="tasks-left">할 일이 2개 남았습니다.</div>
    </TodoHeadContainer>
  );
}

export default TodoHead;
