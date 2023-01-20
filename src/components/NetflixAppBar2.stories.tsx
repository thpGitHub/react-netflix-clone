import React from 'react';
import { withRouter } from 'storybook-addon-react-router-v6';

import ResponsiveAppBar from './NetflixAppBar2'

export default {
  component: ResponsiveAppBar,
  title: 'ResponsiveAppBar',
  decorators: [withRouter],
};

// const Template = args => <Task {...args} />;
const Template = () => <ResponsiveAppBar  />

export const Default = Template.bind({});
// Default.args = {
//   task: {
//     id: '1',
//     title: 'Test Task',
//     state: 'TASK_INBOX',
//   },
// };

export const Pinned = Template.bind({});
// Pinned.args = {
//   task: {
//     ...Default.args.task,
//     state: 'TASK_PINNED',
//   },
// };

export const Archived = Template.bind({});
// Archived.args = {
//   task: {
//     ...Default.args.task,
//     state: 'TASK_ARCHIVED',
//   },
// };