import React from 'react';
import styled from 'styled-components';

const TodoList = ({ Todos, moveToDetail, completeBtn, deleteBtn, isDone }) => {
  return (
    <ScListWrapper>
      <h1>{isDone ? '완료목록 👏' : '할일 목록 💪'}</h1>
      {Todos.filter((todo) => todo.isDone === isDone).map((todo) => {
        return (
          <ScTodoItemGroup onClick={() => moveToDetail(todo.id)}>
            <h2>{todo.title}</h2>
            <p>{todo.contents}</p>
            <ScBtnGroup>
              <button onClick={() => completeBtn(todo.id)}>
                {isDone ? '취소' : '완료'}
              </button>
              <button onClick={() => deleteBtn(todo.id)}>삭제</button>
            </ScBtnGroup>
          </ScTodoItemGroup>
        );
      })}
    </ScListWrapper>
  );
};

const ScListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  h2 {
    font-weight: bold;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 10px;
  }
`;

const ScTodoItemGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  border: 1px solid black;
  border-radius: 10px;
`;

const ScBtnGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button:nth-child(1) {
    margin-right: 10px;
  }
`;

export default TodoList;
