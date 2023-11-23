const initialState = [
  {
    id: '아이디1',
    title: '제목1',
    contents: '내용1',
    isDone: false,
  },
  {
    id: '아이디2',
    title: '제목2',
    contents: '내용2',
    isDone: false,
  },
  {
    id: '아이디3',
    title: '제목3',
    contents: '내용3',
    isDone: true,
  },
];

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';
const SWITCH_TODO = 'SWITCH_TODO';

export const addTodo = (payload) => {
  return {
    type: ADD_TODO,
    payload,
  };
};
export const deleteTodo = (payload) => {
  return {
    type: DELETE_TODO,
    payload,
  };
};
export const switchTodo = (payload) => {
  return {
    type: SWITCH_TODO,
    payload,
  };
};

const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [action.payload, ...state];
    case SWITCH_TODO:
      return state.map((item) => {
        if (item.id === action.payload) {
          item.isDone = !item.isDone;
        }
        return item;
      });
    case DELETE_TODO:
      console.log(action.payload);
      return state.filter((state) => state.id !== action.payload);
    default:
      return state;
  }
};

export default TodoReducer;
