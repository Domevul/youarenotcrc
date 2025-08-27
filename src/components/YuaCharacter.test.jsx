import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import YuaCharacter from './YuaCharacter.jsx';

describe('YuaCharacter', () => {
  // Vite provides `import.meta.env.BASE_URL` which is '/' in test environments
  const base = import.meta.env.BASE_URL;

  test('renders neutral expression by default (affection: 0)', () => {
    render(<YuaCharacter health={100} affection={0} />);
    const imgElement = screen.getByAltText('Yua');
    expect(imgElement).toHaveAttribute('src', `${base}yua-neutral.svg`);
  });

  test('renders happy expression for high affection (>= 50)', () => {
    render(<YuaCharacter health={100} affection={50} />);
    const imgElement = screen.getByAltText('Yua');
    expect(imgElement).toHaveAttribute('src', `${base}yua-happy.svg`);
  });

  test('renders sad expression for negative affection (< 0)', () => {
    render(<YuaCharacter health={100} affection={-10} />);
    const imgElement = screen.getByAltText('Yua');
    expect(imgElement).toHaveAttribute('src', `${base}yua-sad.svg`);
  });

  test('renders placeholder image on image error and it is visible', async () => {
    render(<YuaCharacter health={100} affection={0} />);
    const imgElement = screen.getByAltText('Yua');

    // Simulate image loading error
    fireEvent.error(imgElement);

    // Wait for the state update and check the src attribute
    await waitFor(() => {
      expect(imgElement).toHaveAttribute('src', `${base}yua-placeholder.svg`);
    });

    // A simple check to ensure the element is considered visible
    expect(imgElement).toBeVisible();
  });
});
