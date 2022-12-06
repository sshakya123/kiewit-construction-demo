import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { it, vi } from 'vitest';
import Input from './Input';

it('should apply the provided input and associate the label with the input ', () => {
  render(<Input label='My Label' id='id' value='' onChange={() => {}} />);
  screen.getByLabelText('My Label');
});

it('should render an input with the provided value', () => {
  render(<Input label='My Label' id='id' value='val' onChange={() => {}} />);
  expect(screen.getByRole('textbox', { name: 'My Label' })).toHaveValue('val');
});

it('should fire the onChange handler on keypress', async () => {
  const onChange = vi.fn();
  render(<Input label='My Label' id='id' value='val' onChange={onChange} />);
  await userEvent.type(screen.getByLabelText('My Label'), 'a');
  expect(onChange).toHaveBeenCalledTimes(1);
});

it('should render a text input by default', () => {
  render(<Input label='My Label' id='id' value='val' onChange={() => {}} />);
  expect(screen.getByLabelText('My Label')).toHaveAttribute('type', 'text');
});

it('should render a password input when passed a type of password', () => {
  render(
    <Input
      label='My Label'
      id='id'
      value='val'
      onChange={() => {}}
      type='password'
    />
  );
  expect(screen.getByLabelText('My Label')).toHaveAttribute('type', 'password');
});
