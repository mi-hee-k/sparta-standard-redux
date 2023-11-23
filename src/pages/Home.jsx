import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, switchTodo } from '../redux/modules/todo';
import { useNavigate } from 'react-router-dom';
import shortid from 'shortid';

const Home = () => {
  const Todos = useSelector((state) => state.TodoReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: '',
    content: '',
  });

  const handleInput = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      inputs.title.trim().length === 0 ||
      inputs.content.trim().length === 0
    ) {
      alert('제목과 내용을 입력해주세요(빈칸X)');
      return;
    }
    const newTodo = {
      id: shortid.generate(),
      title: inputs.title,
      contents: inputs.content,
      isDone: false,
    };
    dispatch(addTodo(newTodo));
    setInputs({
      title: '',
      content: '',
    });
  };

  const completeBtn = (id) => {
    dispatch(switchTodo(id));
  };

  const deleteBtn = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      dispatch(deleteTodo(id));
    }
    return;
  };

  const moveToDetail = (id) => {
    if (inputs.title.length >= 1 || inputs.content.length >= 1) {
      if (
        window.confirm(
          '작성중인 내용이 있습니다 화면을 이동하시면 내용이 사라집니다 계속하시겠습니까?'
        )
      ) {
        navigate(`/detail/${id}`);
      }
      return;
    }
    navigate(`/detail/${id}`);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>제목</label>
          <input type='text' id='title' name='title' onChange={handleInput} />
        </div>
        <div>
          <label htmlFor='content'>내용</label>
          <input
            type='text'
            id='content'
            name='content'
            onChange={handleInput}
          />
        </div>
        <button>등록</button>
      </form>

      <div>
        <h1>할일 목록 💪</h1>
        {Todos.filter((todo) => todo.isDone === false).map((todo) => {
          return (
            <div onClick={() => moveToDetail(todo.id)}>
              <p>{todo.title}</p>
              <p>{todo.contents}</p>
              <button onClick={() => completeBtn(todo.id)}>완료</button>
              <button onClick={() => deleteBtn(todo.id)}>삭제</button>
            </div>
          );
        })}
        <h1>완료목록 👏</h1>
        {Todos.filter((todo) => todo.isDone === true).map((todo) => {
          return (
            <div>
              <p>{todo.title}</p>
              <p>{todo.contents}</p>
              <button onClick={() => completeBtn(todo.id)}>완료</button>
              <button onClick={() => deleteBtn(todo.id)}>삭제</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
