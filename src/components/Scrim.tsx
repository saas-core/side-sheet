import React from 'react';
import { css } from 'emotion';
import { animated, AnimatedValue } from 'react-spring';
import useSideSheetContext from '../hooks/useSideSheetContext';
import useTabTrap from '../hooks/useTabTrap';

const baseClass = css`
  transform: none !important; // react-spring may try to set transform style which we don't need
  
  &:before {
    content: ' ';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .42);
  }
`;

export type ScrimProps = {
  children: React.ReactNode;
  style?: AnimatedValue<any>,
  sideSheetRef?: HTMLElement;
};

export default function Scrim({ children, style, sideSheetRef }: ScrimProps) {
  const { close } = useSideSheetContext();

  useTabTrap(sideSheetRef, close);

  return (
    <animated.div className={baseClass} style={style} onClick={close}>
      {children}
    </animated.div>
  );
}
