import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteTodo } from '../redux/modules/todo';

const Detail = () => {
  const Todos = useSelector((state) => state.TodoReducer);
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentTodo = Todos.find((todo) => todo.id === id);
  const { title, contents, isDone } = currentTodo;

  const moveToPrev = () => {
    navigate('/');
  };

  const deleteCurrentTodo = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      dispatch(deleteTodo(id));
      navigate('/');
    }
    return;
  };
  return (
    <div>
      <h1>{title}</h1>
      <span>{contents}</span>
      <span>{isDone ? '완료' : '할일'}</span>
      <button onClick={moveToPrev}>이전화면으로</button>
      <button onClick={deleteCurrentTodo}>삭제</button>
    </div>
  );
};

export default Detail;
