
import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WordItem from './WordItems';
import '@testing-library/jest-dom';
import { ArcherContainer } from 'react-archer';

describe('WordItem', () => {
    const renderWithTable = (ui: React.ReactNode) => {
        return render(
          <ArcherContainer strokeColor="blue">
            <table>
              <tbody>
                <tr>{ui}</tr>
              </tbody>
            </table>
          </ArcherContainer>
        );
      };
      

  it('renders the word inside a td', () => {
    const { getByText } = renderWithTable(
      <WordItem id="w1" word="forest" isSelected={false} isMatched={false} onClick={() => {}} />
    );
    const cell = getByText('forest');
    expect(cell).toBeInTheDocument();
  });

  it('applies selected background color when isSelected = true', () => {
    const { getByText } = renderWithTable(
      <WordItem id="w2" word="folder" isSelected={true} isMatched={false} onClick={() => {}} />
    );
    const cell = getByText('folder');
    expect(cell).toHaveStyle({ backgroundColor: '#add8e6' });
  });

  it('applies matched background color when isMatched = true', () => {
    const { getByText } = renderWithTable(
      <WordItem id="w3" word="camel" isSelected={false} isMatched={true} onClick={() => {}} />
    );
    const cell = getByText('camel');
    expect(cell).toHaveStyle({ backgroundColor: '#ddd' });
  });

  it('calls onClick when clicked and not matched', async () => {
    const handleClick = vi.fn();
    const { getByText } = renderWithTable(
      <WordItem id="w4" word="milk" isSelected={false} isMatched={false} onClick={handleClick} />
    );
    const cell = getByText('milk');
    await userEvent.click(cell);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when isMatched = true', async () => {
    const handleClick = vi.fn();
    const { getByText } = renderWithTable(
      <WordItem id="w5" word="sun" isSelected={false} isMatched={true} onClick={handleClick} />
    );
    const cell = getByText('sun');
    await userEvent.click(cell);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
