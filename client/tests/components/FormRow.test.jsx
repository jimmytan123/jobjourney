import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FormRow from '../../src/components/FormRow';

describe('FormRow', () => {
  it('should display labelText as the label content if labelText is provided', () => {
    render(<FormRow type="text" name="email" labelText="Your email" />);

    const label = screen.getByLabelText('Your email');
    expect(label).toBeInTheDocument();
  });

  it('should display name as the label content if labelText is not provided', () => {
    render(<FormRow type="text" name="email" />);

    const label = screen.getByLabelText('email');
    expect(label).toBeInTheDocument();
  });

  it('should have default value in the input if provided', () => {
    render(
      <FormRow
        type="text"
        name="email"
        labelText="Your email"
        defaultValue="test@email.com"
      />
    );

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('test@email.com');
  });

  it('should not have default value in the input if not provided', () => {
    render(<FormRow type="text" name="email" labelText="Your email" />);

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('');
  });
});
