import { configure, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';

addDecorator(
  withOptions({
    sortStoriesByKind: true,
  }),
);

// automatically import all files ending in *.stories.tsx
const req = require.context('../stories', true, /.stories.tsx/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
