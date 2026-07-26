import React, { useReducer } from "react";
import Button from "react-bootstrap/esm/Button";

const Reducer = () => {
  let count_action = {
    increment: "increment",
    decrement: "decrement",
    reset: "reset",
  };
  let reducer = (state, action) => {
    switch (action.type) {
      case count_action.increment:
        return {
          ...state,
          count: state.count + 1,
        };
      case count_action.decrement:
        return {
          ...state,
          count: state.count - 1,
        };
      case count_action.reset:
        return {
          ...state,
          count: 0,
        };
      default:
        return state;
    }
  };
  let [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <div>
      <h2>Count - {state.count}</h2>
      <Button
        onClick={() => {
          dispatch({ type: count_action.increment });
        }}
      >
        increment
      </Button>

      <Button
        onClick={() => {
          dispatch({ type: count_action.decrement });
        }}
      >
        Decrement
      </Button>
      <Button
        onClick={() => {
          dispatch({ type: count_action.reset });
        }}
      >
        Reset
      </Button>
    </div>
  );
};

export default Reducer;
