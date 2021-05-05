import styled from "styled-components";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/tasks";
import { toast } from "react-toastify";

const data = [
  {
    value: "Home",
    color: "#3067dd",
  },
  {
    value: "Work",
    color: "#e65a2e",
  },
  {
    value: "Other",
    color: "#1dbec0",
  },
];

const AddTodo = () => {
  //constext api

  //state
  const [inputValue, setTextInputValue] = useState("");
  const dispatch = useDispatch();

  //select option state
  const [type, setType] = useState("Home");

  const history = useHistory();

  // const [data,setData] = useState([]);

  //exit AddTodo
  const exitAddTodoHandler = (e) => {
    const element = e.target;
    if (element.classList.contains("shadow")) {
      history.push("/");
    }
  };

  //input value , adding to state
  const inputHandler = (e) => {
    setTextInputValue(e.target.value);
  };
  const submitTask = (e) => {
    e.preventDefault();
    if (inputValue === "") {
      toast("Add atleast one task");
      return;
    }
    dispatch(
      addTask({
        type,
        task: inputValue,
        status: "Uncomplete",
        uID: new Date().getTime(),
      })
    );

    setTextInputValue("");
    history.push("/");
  };

  const typeHandler = (e) => {
    setType(e.target.value);
  };

  return (
    <CardShadow className="shadow" onClick={exitAddTodoHandler}>
      <Card>
        <motion.h1>Add a todo</motion.h1>
        <motion.select
          whileTap={{ scale: 0.98 }}
          name="types"
          id="type"
          onChange={typeHandler}
        >
          {data.map((item, index) => (
            <option value={item.value} key={index}>
              {item.value}
            </option>
          ))}
        </motion.select>
        <Text onSubmit={submitTask}>
          <input
            value={inputValue}
            type="text"
            onChange={inputHandler}
            autoFocus
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Add Task
          </motion.button>
        </Text>
      </Card>
    </CardShadow>
  );
};

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
`;

const Card = styled(motion.div)`
  width: 40%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */
  border-radius: 1rem;
  padding: 2rem 2rem;
  background-color: white;
  color: black;
  position: absolute;
  left: 30%;
  top: 30%;
  z-index: 25;
  /* background-color: #dedfe4; */
  background-color: #282828;
  select {
    width: 100%;
    background-color: #1b1b1b;
  }
  @media only screen and (max-width: 1300px) {
    width: 50%;
    left: 25%;
  }
  @media only screen and (max-width: 720px) {
    width: 70%;
    left: 15%;
  }
`;

const Text = styled(motion.form)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  textarea,
  input {
    /* display: block; */
    border-radius: 0.5rem;
    border: none;
    min-width: 60%;
    /* height: 10vh; */
    padding: 1rem 0;
    background-color: #1b1b1b;
    color: #23d997;
    resize: none;
    word-wrap: break-word;
  }
  button {
    padding: 0rem 1rem;
    border: none;
    background-color: #3065d6;
    color: white;
    font-size: 1rem;
    font-weight: lighter;
    margin-right: 3rem;
    border-radius: 0.5rem;
    cursor: pointer;
    margin-left: 2rem;
    height: 100%;
  }
  @media only screen and (max-width: 1300px) {
    flex-direction: column;
    justify-content: space-between;
    height: 7rem;
    button {
      height: 3rem;
    }
    input {
      width: 100%;
    }
  }
`;
export default AddTodo;
