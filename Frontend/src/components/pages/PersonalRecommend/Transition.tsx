import { useContext, ReactNode } from "react";
import { SwitchTransition, Transition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

import TransitionContext from './TransitionConText';

const TransitionComponent = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { toggleCompleted } = useContext<any>(TransitionContext);
  return (
    <SwitchTransition>
      <Transition
        key={location.pathname}
        timeout={500}
        onEnter={(node:any) => {
          toggleCompleted(false);
          gsap.set(node, { autoAlpha: 0 });
          gsap
            .timeline({
              paused: true,
              onComplete: () => toggleCompleted(true),
            })
            .to(node, { autoAlpha: 1, duration: 0.5 })
            .play();
        }}
        onExit={(node) => {
          gsap
            .timeline({ paused: true })
            .to(node, { autoAlpha: 0, duration: 0.5 })
            .play();
        }}
      >
        {children}
      </Transition>
    </SwitchTransition>
  );
};

export default TransitionComponent;
