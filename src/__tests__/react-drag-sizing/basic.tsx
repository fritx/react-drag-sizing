import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
// import { DragSizing } from 'react-drag-sizing';
import { DragSizing } from '../../../packages/react-drag-sizing';

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container as HTMLDivElement);
});

it('border left', () => {
  act(() => {
    ReactDOM.render(
      <DragSizing id="sizing" border="left">
        content
      </DragSizing>,
      container
    );
  });
  const sizing = container.querySelector('#sizing') as HTMLDivElement;
  expect(sizing.innerHTML).toBe(
    '<div style="cursor: ew-resize; position: absolute; z-index: 10; width: 16px; top: 0px; bottom: 0px; left: -8px;"></div>content'
  );
});

it('border top', () => {
  act(() => {
    ReactDOM.render(
      <DragSizing id="sizing" border="top">
        content
      </DragSizing>,
      container
    );
  });
  const sizing = container.querySelector('#sizing') as HTMLDivElement;
  expect(sizing.innerHTML).toBe(
    '<div style="cursor: ns-resize; position: absolute; z-index: 10; height: 16px; left: 0px; right: 0px; top: -8px;"></div>content'
  );
});
