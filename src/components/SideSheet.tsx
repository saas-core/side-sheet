import React from 'react';
import { css } from 'emotion';
import SideSheetProvider from './Provider';
import { useTransition, UseTransitionResult, animated } from 'react-spring';
import Scrim from './Scrim';

const containerClass = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const baseClass = css`
  position: absolute;
  max-width: 100vw;
  height: 100vh;
  right: 0;
`;

const transitionConfig = {
  from: { opacity: 0, transform: 'translate3d(100%, 0, 0)' },
  enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  leave: { opacity: 0, transform: 'translate3d(100%, 0, 0)' },
};

export type SideSheetProps = {
  isOpen: boolean;
  onCloseComplete: () => void;
  children: React.ReactNode;
};

export default function SideSheet({ isOpen, onCloseComplete, children }: SideSheetProps) {
  const tabTrapRef = React.useRef<HTMLDivElement>(null);

  const renderSheet = React.useCallback(
    ({ item: shouldDisplaySheet, key, props }: UseTransitionResult<boolean, any>) => {
      return shouldDisplaySheet && (
        <div className={containerClass} key={key}>
          <Scrim style={props} sideSheetRef={tabTrapRef.current}>
            <animated.div className={baseClass} style={props} onClick={stopPropagation} ref={tabTrapRef}>
              {children}
            </animated.div>
          </Scrim>
        </div>
      );
    },
    [children, tabTrapRef],
  );

  const transitions = useTransition(isOpen, null, transitionConfig);

  return (
    <SideSheetProvider isOpen={isOpen} onClose={onCloseComplete}>
      {transitions.map(renderSheet)}
    </SideSheetProvider>
  );
}

/* HELPERS */

function stopPropagation(e: React.MouseEvent<HTMLElement>) {
  e.stopPropagation();
}