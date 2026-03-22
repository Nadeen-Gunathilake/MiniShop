import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders MiniShop navbar', () => {
  render(<App />);
  const brandElement = screen.getByText(/MiniShop/i);
  expect(brandElement).toBeInTheDocument();
});
