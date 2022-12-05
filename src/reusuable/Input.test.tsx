import { render, screen } from '@testing-library/react';
import { it } from 'vitest';
import Input from './Input';

it('should apply the provided input', () => {
  render(<Input label='My Label' id='id' value='' onChange={() => {}} />);
  screen.getByLabelText('My Label');
});
