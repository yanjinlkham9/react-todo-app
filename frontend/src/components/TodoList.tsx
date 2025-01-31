import { faCheck, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { create, del, done, update } from "../store/modules/todo";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ReduxState, Todo } from "../../types/types";

export default function TodoList() {
  // useSelector()를 통해서 store의 state 가져오기
  let todoList = useSelector((state:ReduxState) => state.todo.list);
  //   console.log(todoList);

  todoList = todoList.filter((todo: Todo) => todo.done === false);

  const nextID = useSelector((state: ReduxState) => state.todo.nextID);
  // useDispatch()를 통해서 dispatch 함수 생성
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  console.log("nextID", nextID);

  const clearInput = ()=>{
       if(inputRef.current){
      inputRef.current.value = "";
      inputRef.current.focus();  
    }
  }
  // 할 일 추가 POST /todo
  const createTodo = async () => {
    if (inputRef.current&&inputRef.current.value.trim() !== "") {
    // state를 변경해서 화면을 바꾸는 것
    dispatch(create({ id: nextID, text: inputRef.current.value }));
  }
    // DB 정보를 바꾸기 위해서 axios 요청
    await axios.post(`${process.env.REACT_APP_API_SERVER}/todo`, {
      text: inputRef.current?.value,
    });
 
    clearInput();
  };

  // todo 상태 변경 PATCH /todo/:todoId
  const toDone = async (id: number) => {
    // state 를 변경해서 화면을 바꾸는것
    dispatch(done(id));

    // DB 정보를 바꾸기 위해 axios 요청
    await axios.patch(`${process.env.REACT_APP_API_SERVER}/todo/${id}`);
  };

  const enterTodo = (e:React.KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") createTodo();
  };

  useEffect(() => {
    if(inputRef.current) inputRef.current.focus();
  }, []);

  //todo 삭제 /todo/:todoId
  const deleteTodo = async (todoId:number)=>{
    await axios.delete(`${process.env.REACT_APP_API_SERVER}/todo/${todoId}`);
    dispatch(del(todoId));

  }

  //todo 수정 -> 수정/수정 취소 /content
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  const getTodo = (todoId: number) =>{
    setIsUpdateMode(true); //수정 모드로 변경
    const [todo] = todoList.filter((to)=>to.id ===todoId); //{id, text, done}
    console.log("update: ", todo);
    if(inputRef.current) inputRef.current.value = todo.text;
    setUpdateId(todoId);
  }

  const cancelUpdate=()=>{
    setIsUpdateMode(false);
    clearInput();
  }

  const updateTodo = async ()=>{
    const inputValue = inputRef.current?.value as string;
    const res = await axios.patch(`${process.env.REACT_APP_API_SERVER}/content`, {
      id: updateId,
      text: inputValue,
    });
    console.log(res.data); //{isSuccess}
    if(res.data.isSuccess){
      clearInput();
    }
    dispatch(update(updateId, inputValue))
  }


  return (
    <section>
      <h3>할 일 목록</h3>
      <div>
        <input type="text" ref={inputRef} onKeyDown={enterTodo} />
        {isUpdateMode?
        (<>
        <button onClick={updateTodo}>수정</button>  
        <button onClick={cancelUpdate}>수정 취소</button>  
        </>) 
        :(<button onClick={createTodo}>추가</button>)
      }
      
      </div>
      <ul>
        {todoList.map((todo) => {
          return (
            <li key={todo.id}>
              <button onClick={() => toDone(todo.id)}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <span> {todo.text} </span>
              <button onClick={()=> getTodo(todo.id)}> 
                <FontAwesomeIcon icon={faPencil} /> 
                </button>
              <button onClick={()=>deleteTodo(todo.id)}>
              <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
