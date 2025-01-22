const initialState = {
  list: [
    {
      id: 0,
      text: "리액트 공부하기",
      done: false, //done: false 해야 할 일
    },
    {
      id: 1,
      text: "척추의 요정이 말합니다! 척추 펴기!",
      done: true, //done:true 는 완료 목록
    },
    {
      id: 2,
      text: "운동하기",
      done: false,
    },
  ],
};

const count = initialState.list.length;
initialState["nextID"] = count;

//action의 type에 대한 상수 설정
const CREATE = "todo/CREATE";
const DONE = "todo/DONE";

//components에서 사용될 액션 반환 함수
export function create(payload) {
  return {
    type: CREATE,
    payload: payload, //{id:number, text:string}
  };
}
export function done(id) {
  return {
    type: DONE,
    id: id, //id:number
  };
}

export function todoReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE:
      if (action.payload.text.trim() === "") return state;
      console.log("CREATE 호출됨", action);
      return {
        //기준 형식을 그때로 가지고 오라는 뜻: ...state
        //object형태 bol teriig n hadgalaad nemehiin tuld zaaval ashiglah heregtei
        ...state,
        list: state.list.concat({
          id: action.payload.id,
          text: action.payload.text,
          done: false,
        }),
        nextID: action.payload.id + 1,
      };
    case DONE:
      console.log("DONE 호출됨", action);
      return {
        ...state,
        list: state.list.map((todo) => {
          console.log("in map", todo);
          //바꾸자 하는 조건건
          if (todo.id === action.id) {
            return {
              ...todo, //done을 제외한 text,id 값을 유지시키기 위한 전개연산
              done: true, //done값 덮어쓰기
            };
          } else return todo;
        }),
      };

    default:
      return state;
  }
}
