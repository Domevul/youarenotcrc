import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './Header';

describe('Header', () => {
  it('renders the drug name and turn number', () => {
    const drugName = 'TestDrug';
    const turn = 5;
    render(<Header drugName={drugName} turn={turn} />);

    // Check if the drug name is rendered
    expect(screen.getByText(/TestDrug - 治験シミュレーション/i)).toBeInTheDocument();

    // Check if the turn counter is rendered
    expect(screen.getByText(/Turn: 5/i)).toBeInTheDocument();
  });
});
