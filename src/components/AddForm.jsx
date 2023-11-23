import React from 'react';
import styled from 'styled-components';

const AddForm = ({ handleSubmit, handleInput }) => {
  return (
    <ScForm onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title'>제목</label>
        <input type='text' id='title' name='title' onChange={handleInput} />
      </div>
      <div>
        <label htmlFor='content'>내용</label>
        <input type='text' id='content' name='content' onChange={handleInput} />
      </div>
      <button>등록</button>
    </ScForm>
  );
};

const ScForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px;

  label {
    margin-right: 10px;
  }

  input {
    border-radius: 10px;
  }
`;

export default AddForm;
