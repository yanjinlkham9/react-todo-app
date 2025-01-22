import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCheckToSlot } from "@fortawesome/free-solid-svg-icons/faCheckToSlot";
import { create, done } from "../store/modules/todo";

export default function TodoList() {
  //useSelector()을 통해서 store의 state를 가져오기
  let todoList = useSelector((state) => state.todo.list);
  todoList = todoList.filter((todo) => todo.done == false);
  console.log(todoList);
  //useDispatch()를 통해서 dispatch 함수 생성==> reducer-g damjuulj avah {todoReducer-g}
  const dispatch = useDispatch();

  //input tag 선택하기 위해 ref 불러오기
  const inputRef = useRef();

  const nextID = useSelector((state) => state.todo.nextID);
  console.log("nextID", nextID);
  const createTodo = () => {
    dispatch(
      create({
        id: nextID,
        text: inputRef.current.value,
      })
    );
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  const enterTodo = (e) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") createTodo();
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <section>
      <h3>할일 목록</h3>
      <div>
        <input type="text" ref={inputRef} onKeyDown={enterTodo} />
        <button onClick={createTodo}>추가</button>
      </div>
      <ul>
        {todoList.map((todo) => {
          return (
            <li key={todo.id}>
              <button onClick={() => dispatch(done(todo.id))}>
                <FontAwesomeIcon icon={faCheckToSlot} />
              </button>
              <span>{todo.text}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
