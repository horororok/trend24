// Counter.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { increment, decrement, incrementByAmount } from "./slices/counterSlice";

const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch: AppDispatch = useDispatch();

  return (
    <div>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <span>{count}</span>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
      <div>
        <button onClick={() => dispatch(incrementByAmount(10))}>+10</button>
        <button onClick={() => dispatch(incrementByAmount(-10))}>-10</button>
      </div>
    </div>
  );
};

export default Counter;
