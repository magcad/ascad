import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// TODO : make a real and complete test suite
test('renders stepper', () => {
  render(<App />);
  const titleElement = screen.getByText(/ASCAD/i);
  expect(titleElement).toBeInTheDocument();
});
