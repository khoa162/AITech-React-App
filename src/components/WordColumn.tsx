import React, { JSX } from 'react';
import WordItem from './WordItems';
import './WordColumn.css';

type CustomRelation = {
  targetId: string;
  targetAnchor?: 'left' | 'right' | 'top' | 'bottom';
  sourceAnchor?: 'left' | 'right' | 'top' | 'bottom';
  label?: string | React.ReactNode;
  style?: React.CSSProperties;
};

interface Props {
  title: string;
  words: string[];
  selectedWord: string | null;
  matchedPairs: { left: string; right: string }[];
  columnType: 'left' | 'right';
  onWordClick: (column: 'left' | 'right', word: string) => void;
  titleColor?: string 
}

export default function WordColumn({
  title,
  words,
  selectedWord,
  matchedPairs,
  columnType,
  onWordClick,
  titleColor
}: Props) {
  const renderColumns = (words: string[]): JSX.Element[] => {
    return words.map((word, rowNumber) => {
      const isSelected = selectedWord === word;
      const isMatched = matchedPairs.some(
        (pair) => (columnType === 'left' ? pair.left : pair.right) === word
      );

      const relations: CustomRelation[] =
        columnType === 'left'
          ? matchedPairs
              .filter((pair) => pair.left === word)
              .map((pair) => ({
                targetId: `right-${pair.right}`,
                targetAnchor: 'left',
                sourceAnchor: 'right',
              }))
          : [];

      const id = `${columnType}-${word}`;
      const rowBackgroundColor = (!(rowNumber % 2) && title == 'English Words') ? '#dee9f7' : (!(rowNumber % 2) && title == 'French Words') ? '#dbead5' : 'white'
      console.log("title ", title)

      return (
        <tr key={word}>
          <WordItem
            id={id}
            word={word}
            isSelected={isSelected}
            isMatched={isMatched}
            onClick={() => onWordClick(columnType, word)}
            relations={relations}
            backgroundColor={rowBackgroundColor}
          />
        </tr>
      );
    });
  }

  return (
    <table className="word-table">
      <thead>
        <tr>
          <th style={{ backgroundColor: titleColor }}>{title}</th>
        </tr>
      </thead>
      <tbody>
        {renderColumns(words)}
      </tbody>
    </table>
  );
}
