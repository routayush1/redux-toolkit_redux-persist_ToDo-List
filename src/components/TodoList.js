import React from "react";
import { useSelector } from "react-redux";
//styles ans animations
import { motion } from "framer-motion";
import styled from "styled-components";
import ListItem from "./ListItem";
//context
import { listAnimation } from "../animations";

const TodoList = () => {
  const { tasks, status } = useSelector((state) => state);

  return (
    <StyledTodoList variants={listAnimation} initial="hidden" animate="show">
      {tasks?.map((task) =>
        status === "All" ? (
          <ListItem
            task={task.task}
            type={task.type}
            key={task.uID}
            index={task.uID}
            currentStatus={task.status}
          />
        ) : (
          task.status === status && (
            <ListItem
              task={task.task}
              type={task.type}
              key={task.uID}
              index={task.uID}
              currentStatus={task.status}
            />
          )
        )
      )}
    </StyledTodoList>
  );
};
//
const StyledTodoList = styled(motion.div)`
  height: 55vh;
  border-radius: 1rem;
  padding-bottom: 2rem;
  margin: 0 auto;
  margin-bottom: 5vh;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: #dedfe4; */
  background-color: #282828;
  z-index: 10;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #23d997;
    border-radius: 1rem;
  }

  @media only screen and (max-width: 1300px) {
    width: 60%;
  }
  @media only screen and (max-width: 720px) {
    width: 100%;
    height: 60vh;
    margin-bottom: 0;
    border-radius: 3rem 3rem 0 0;
    &::-webkit-scrollbar-thumb {
      visibility: hidden;
    }
  }
`;

export default TodoList;
