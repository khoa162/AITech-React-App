import React from 'react';
import { ArcherElement } from 'react-archer';
import './WordItems.css';

// type RelationType = {
//     targetId: string;
//     targetAnchor?: 'left' | 'right' | 'top' | 'bottom';
//     sourceAnchor?: 'left' | 'right' | 'top' | 'bottom';
//     style?: React.CSSProperties;
//     label?: string | React.ReactNode;
//   };
  
interface Props {
  id: string;
  word: string;
  isSelected: boolean;
  isMatched: boolean;
  onClick: () => void;
  relations?: any,
  backgroundColor: string
}

export default function WordItem({ id, word, isSelected, isMatched, onClick, relations = [], backgroundColor }: Props) {
  const getBackground = () => {
    if (isMatched) return '#ddd';
    if (isSelected) return '#add8e6';
    return backgroundColor;
  };

  return (
    <ArcherElement id={id} relations={relations}>
      <td
        className="word-cell"
        style={{ backgroundColor: getBackground() }}
        onClick={!isMatched ? onClick : undefined}
      >
        {word}
      </td>
    </ArcherElement>
  );
}
