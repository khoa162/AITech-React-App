import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WordColumn from './WordColumn';
import { ArcherContainer } from 'react-archer';
import '@testing-library/jest-dom';

const renderColumn = (propsOverride = {}) => {
  const defaultProps = {
    title: 'English Words',
    words: ['cat', 'dog'],
    selectedWord: null,
    matchedPairs: [],
    columnType: 'left' as const,
    onWordClick: vi.fn(),
  };

  return render(
    <ArcherContainer strokeColor="blue">
      <WordColumn {...defaultProps} {...propsOverride} />
    </ArcherContainer>
  );
};

describe('WordColumn', () => {
  it('renders table with correct title and words', () => {
    renderColumn();

    expect(screen.getByRole('columnheader')).toHaveTextContent('English Words');
    expect(screen.getByText('cat')).toBeInTheDocument();
    expect(screen.getByText('dog')).toBeInTheDocument();
  });

  it('highlights selected word', () => {
    renderColumn({ selectedWord: 'dog' });
    const selectedCell = screen.getByText('dog');
    expect(selectedCell).toHaveStyle({ backgroundColor: '#add8e6' });
  });

  it('disables matched word from being clicked', async () => {
    const mockClick = vi.fn();
    renderColumn({ matchedPairs: [{ left: 'cat', right: 'chat' }], onWordClick: mockClick });
    const matchedCell = screen.getByText('cat');
    await userEvent.click(matchedCell);
    expect(mockClick).not.toHaveBeenCalled();
  });

  it('calls onWordClick when clicking unmatched word', async () => {
    const mockClick = vi.fn();
    renderColumn({ onWordClick: mockClick });
    const cell = screen.getByText('dog');
    await userEvent.click(cell);
    expect(mockClick).toHaveBeenCalledWith('left', 'dog');
  });
});
