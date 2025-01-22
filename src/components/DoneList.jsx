import { faSquareCheck } from "@fortawesome/free-solid-svg-icons/faSquareCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
export default function DoneList() {
  let doneList = useSelector((state) => state.todo.list).filter(
    (todo) => todo.done == true
  );

  return (
    <section className="container">
      <h3>완료된 목록</h3>
      <ul className="done">
        {doneList.map((todo) => {
          return (
            <li key={todo.id}>
              <span>
                <FontAwesomeIcon icon={faSquareCheck} />
              </span>
              <span>{todo.text}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
