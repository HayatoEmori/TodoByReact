import "./styles.css";
import React, { useState } from "react";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (event) => {
    setTodoText(event.target.value);
  };

  const onClickAdd = () => {
    if (todoText === "") return;

    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    newIncompleteTodos.splice(index, 1);
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickReturn = (index) => {
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  // 仮想DOMで差分のみの再レンダリングを有効にするため、
  // mapなどループで処理する箇所の一番親のタグにkey属性を指定すること。

  // 以下の書き方(引数指定)だと即実行されてしまう。アロー関数の中で呼ぶ形にすること。
  // <button onClick={onClickDelete(index)}>削除</button>
  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onAdd={onClickAdd}
        disabled={5 <= incompleteTodos.length}
      />
      {5 <= incompleteTodos.length && (
        <p style={{ color: "red" }}>登録できるtodoは5個まで。消化せよ！</p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onComplete={onClickComplete}
        onDelete={onClickDelete}
      />

      <CompleteTodos todos={completeTodos} onClickReturn={onClickReturn} />
    </>
  );
};
