import React from 'react';
import { storiesOf } from '@storybook/react';
import { css } from 'emotion';
import useSideSheetControls from '../src/hooks/useSideSheetControls';
import SideSheet from '../src/components/SideSheet';

storiesOf('side-sheet', module)
  .add('Default', () => {
    return (
      <React.Fragment>
        <TestComponent>
          <TestSheet1 />
        </TestComponent>
        <br/>
        <a href="https://bing.com" target="_blank">Bing</a>
      </React.Fragment>
    );
  })
  .add('Sheet customisation', () => {
    return (
      <React.Fragment>
        <TestComponent>
          <TestSheet2 />
        </TestComponent>
        <br/>
      </React.Fragment>
    );
  });

function TestSheet1() {
  return (
    <div>
      Lorem ipsum
      <br/>
      <a href="https://yandex.com" target="_blank">Yandex</a>
      <br/>
      <a href="https://google.com" target="_blank">Google</a>
    </div>
  );
}

const styledSheetClass = css`
  background-color: #f5f5f5;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

function TestSheet2() {
  return (
    <div className={styledSheetClass}>
      <p>
        Styled sheet
      </p>
      <p className={css({ flexGrow: 1 })}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita id illum ipsa ipsum iste itaque iusto molestiae molestias nihil quasi quis repellat saepe sequi similique tempore temporibus, unde velit voluptates.
      </p>
      <p>
        <button>do nothing</button>
      </p>
    </div>
  );
}

function TestComponent({ children }: { children: React.ReactNode }) {
  const { open, sideSheetProps } = useSideSheetControls();

  return (
    <React.Fragment>
      <button onClick={open}>
        Open side sheet
      </button>
      <SideSheet {...sideSheetProps}>
        {children}
      </SideSheet>
    </React.Fragment>
  );
}