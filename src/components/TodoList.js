import React from "react";

//import module
import styled from "styled-components";

// import componetns
import TodoItem from "../components/TodoItem";

const TodoListContainer = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
  //   background: gray;
`;

function TodoList() {
  return (
    <TodoListContainer>
      <TodoItem text="리액트 공부하기" done={true} />
      <TodoItem text="장고 공부하기" done={true} />
      <TodoItem text="기술 블로그 쓰기" done={false} />
      <TodoItem text="수업 복습하기" done={false} />
    </TodoListContainer>
  );
}

export default TodoList;
