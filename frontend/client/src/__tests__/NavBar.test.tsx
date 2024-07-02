
// src/__tests__/NavBar.test.tsx

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar from '@/components/Layout/navBar';

describe('NavBar', () => {
  it('renders the logo', () => {
    render(<NavBar />);
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders the title', () => {
    render(<NavBar />);
    const title = screen.getByText('Dinehub');
    expect(title).toBeInTheDocument();
  });

  it('renders the Register Your Restaurant link', () => {
    render(<NavBar />);
    const registerLink = screen.getByText('Register Your Restaurant');
    expect(registerLink).toBeInTheDocument();
  });

 
});
