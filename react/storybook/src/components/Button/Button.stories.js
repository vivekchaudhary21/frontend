import React from 'react';
import Button from './Button';
import Center from '../Center/Center';

export default {
  title: 'Form/Button',
  component: Button,
  args: {
    children: 'Button',
  },
  // Component Level Decorators
  decorators: [
    (Story) => (
      <Center>
        <Story />
      </Center>
    ),
  ],
};

// export const Primary = () => <Button variant='primary'>Primary</Button>;
// export const Secondary = () => <Button variant='secondary'>Secondary</Button>;
// export const Success = () => <Button variant='success'>Success</Button>;
// export const Danger = () => <Button variant='danger'>Danger</Button>;

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
//Story lvel Decorators
// Primary.decorators = [
//   (Story) => (
//     <div style={{ padding: '20px' }}>
//       <Story />
//     </div>
//   ),
// ];
Primary.args = {
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
};

export const Success = Template.bind({});
Success.args = {
  variant: 'success',
};

export const Danger = Template.bind({});
Danger.args = {
  variant: 'danger',
};

export const LongPrimary = Template.bind({});
LongPrimary.args = {
  ...Primary.args,
};
