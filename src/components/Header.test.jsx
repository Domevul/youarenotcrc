import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Header from './Header';

describe('Header', () => {
  it('renders the drug name and turn number', () => {
    const drugName = 'TestDrug';
    const turn = 5;
    render(<Header drugName={drugName} turn={turn} />);

    // Check if the drug name is rendered
    expect(screen.getByText(/TestDrug - Cure Human/i)).toBeInTheDocument();

    // Check if the turn counter is rendered
    expect(screen.getByText(/Turn: 5/i)).toBeInTheDocument();
  });

  it('opens the settings menu and shows options when the button is clicked', async () => {
    const user = userEvent.setup();
    const mockRestart = vi.fn();
    const mockReturnToTitle = vi.fn();
    const mockSave = vi.fn();

    render(
      <Header
        drugName="TestDrug"
        turn={1}
        onRestart={mockRestart}
        onReturnToTitle={mockReturnToTitle}
        onSave={mockSave}
      />
    );

    // Find and click the settings button
    const settingsButton = screen.getByRole('button', { name: /settings/i });
    await user.click(settingsButton);

    // Check if the menu items are visible
    expect(
      screen.getByRole('menuitem', { name: /フェーズ1のやり直し/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('menuitem', { name: /タイトル画面に戻る/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('menuitem', { name: /セーブする/i })
    ).toBeInTheDocument();

    // Click an item and verify the mock function was called
    const restartButton = screen.getByRole('menuitem', {
      name: /フェーズ1のやり直し/i,
    });
    await user.click(restartButton);
    expect(mockRestart).toHaveBeenCalledTimes(1);
  });
});
