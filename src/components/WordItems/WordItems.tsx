import React from 'react';
import { ArcherElement } from 'react-archer';
import './WordItems.css';

import { Colors } from '../../Colors';
  
interface Props {
  id: string;
  word: string;
  isSelected: boolean;
  isMatched: boolean;
  onClick: () => void;
  relations?: any,
  backgroundColor?: string
}

export default function WordItem({ id, word, isSelected, isMatched, onClick, relations = [], backgroundColor }: Props) {
  const getBackground = () => {
    if (isMatched) return Colors.LightGray;
    if (isSelected) return Colors.LightBlue;
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
