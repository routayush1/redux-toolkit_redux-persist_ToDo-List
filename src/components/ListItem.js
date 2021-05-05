import React, { useState, useEffect } from "react";
//styles ans animations
import { motion, AnimatePresence } from "framer-motion";
import {
  popUp,
  lineAnimation,
  textAnimation,
  iconAnimation,
} from "../animations";
import styled from "styled-components";
import { toast } from "react-toastify";
import Lottie from "lottie-react-web";
import CheckBox from "../animations/checkBox.json";
// import CheckBoxWhite from "../animations/checkBoxWhite.json";
import Trash from "../animations/trash.json";
import { useDispatch } from "react-redux";
import { remove, complete } from "../redux/tasks";

const ListItem = ({ task, type, index, currentStatus }) => {
  //constext api

  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  //state
  const [isChecked, setIsChecked] = useState(false);
  const checkHandler = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      toast("Congrats");
      // return;
    }
    dispatch(complete(index));
  };

  const deleteHandler = () => {
    setShow(false);
    setTimeout(() => {
      dispatch(remove(index));
    }, 500);

    // setIsDelete(!isDelete);
  };

  //hover event
  const [onHover, setHover] = useState(false);
  const hoverHandler = (e) => {
    let event = e.target;
    event.addEventListener("mouseenter", function (e) {
      setHover(true);
    });
    event.addEventListener("mouseleave", function (e) {
      setHover(false);
    });
  };

  useEffect(() => {
    if (currentStatus === "Completed") {
      setIsChecked(true);
    }
  }, [currentStatus]);

  return (
    <AnimatePresence>
      {show && (
        <Content
          className={type}
          variants={popUp}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <ABC className={type} variants={lineAnimation} />
          {
            <Wrapper>
              <Text
                className="text"
                variants={textAnimation}
                style={
                  isChecked
                    ? {
                        textDecoration: "line-through",
                        textDecorationThickness: "5px",
                      }
                    : null
                }
              >
                {task}
              </Text>
              <Icons variants={iconAnimation}>
                <motion.div onClick={checkHandler} className="check">
                  <Lottie
                    options={{
                      animationData: CheckBox,
                      loop: false,
                      autoplay: false,
                    }}
                    direction={isChecked ? 1 : -1}
                  />
                </motion.div>
                <motion.div onClick={deleteHandler} onMouseEnter={hoverHandler}>
                  <Lottie
                    options={{
                      animationData: Trash,
                      loop: false,
                      autoplay: true,
                    }}
                    direction={onHover ? 1 : -1}
                  />
                </motion.div>
              </Icons>
            </Wrapper>
          }
        </Content>
      )}
    </AnimatePresence>
  );
};
//
const Content = styled(motion.div)`
  border-radius: 0.5rem;
  /* padding: 0rem 1rem; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  width: 90%;
  /* min-height: 5rem; */
  &.Home {
    background-color: #bbe8fb;
  }
  &.Work {
    background-color: #f2e3e7;
  }
  &.Other {
    background-color: #ceeff1;
  }
  @media only screen and (max-width: 1300px) {
    /* align-content: space-between; */
    /* flex-direction: column; */
  }
`;

const ABC = styled(motion.div)`
  width: 0.5rem;
  height: 80%;
  margin-left: 1rem;
  /* border-radius: 0.5rem 0 0 0.5rem; */
  border-radius: 0.5rem;

  &.Home {
    background: #3067dd;
  }
  &.Work {
    background: #e65a2e;
  }
  &.Other {
    background: #1dbec0;
  }
`;

const Wrapper = styled(motion.div)`
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  word-break: break-all;
  max-width: 70%;

  @media only screen and (max-width: 1300px) {
    /* max-width: 100%; */
    /* justify-content: space-between; */
  }
`;

const Icons = styled(motion.div)`
  /* background-color: white; */
  /* border-radius: 1rem; */
  width: 15%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  cursor: pointer;
  .action {
    /* width: 100%; */
  }
  .trash {
    margin-left: 0.5rem;
  }
  .check {
    margin-top: 0.2rem;
  }
  .type {
    cursor: default;
  }
`;

export default ListItem;
