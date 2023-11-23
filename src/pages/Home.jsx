import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, switchTodo } from '../redux/modules/todo';
import { useNavigate } from 'react-router-dom';
import shortid from 'shortid';
import AddForm from '../components/AddForm';
import TodoList from '../components/TodoList';
import styled from 'styled-components';

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
    <ScWrapper>
      <AddForm handleSubmit={handleSubmit} handleInput={handleInput} />

      <div>
        <TodoList
          Todos={Todos}
          moveToDetail={moveToDetail}
          completeBtn={completeBtn}
          deleteBtn={deleteBtn}
          isDone={false}
        />

        <TodoList
          Todos={Todos}
          moveToDetail={moveToDetail}
          completeBtn={completeBtn}
          deleteBtn={deleteBtn}
          isDone={true}
        />
      </div>
    </ScWrapper>
  );
};

const ScWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  width: 100%;
  height: 100vh;
  padding: 20px;
`;

export default Home;
