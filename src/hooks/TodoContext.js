import React, { useContext, useReducer, createContext, useRef } from "react";

// 초기 상태 정의
const initialTodos = [
  {
    id: 1,
    text: "프로젝트 생성하기",
    done: true,
  },
  {
    id: 2,
    text: "컴포넌트 스타일링하기",
    done: true,
  },
  {
    id: 3,
    text: "Context 만들기",
    done: false,
  },
  {
    id: 4,
    text: "기능 구현하기",
    done: false,
  },
];

/*
    리듀서: 액션의 type에 따라 변화를 일으키는 함수
    리듀서는 state 와 action 을 파라미터로 받습니다.
    state 가 undefined 일때 (스토어가 생성될때) state 의 기본값을 initialState 로 사용합니다.
    action.type 에 따라 다른 작업을 하고, 새 상태를 만들어서 반환합니다.
    이 때 주의 할 점은 state 를 직접 수정하면 안되고,
    기존 상태 값에 원하는 값을 덮어쓴 새로운 객체를 만들어서 반환해야합니다.
*/

function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return state.concat(action.todo);
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext(); // nextId: 의미하는 값은 새로운 항목을 추가 할 때 사용 할 고유 ID 값

export function TodoProvider({ children }) {
  // useReducer(): 첫번째 인자인 reducer 함수가 반환(return)하는 값으로 state를 갱신하는 역할
  // state: 상태
  // dispatch: reducer 함수를 실행시키며 컴포넌트 내에서 state의 업데이트를 일으키기 위해 사용
  const [state, dispatch] = useReducer(todoReducer, initialTodos);

  // initialTodos 배열 4개 입력 되어있으니까 다음 id는 5가 올 차례
  // 그래서 nexId 변수에 useRef(5)로 초기화 해두면 nextId의 값은 리렌더링이 되더라도 초기화 없이 값이 증가
  const nextId = useRef(5);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

// useContext 를 사용하는 커스텀 Hook export
export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}
