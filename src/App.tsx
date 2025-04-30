import React, { useState } from 'react';
import WordColumn from './components/WordColumn';
import { ArcherContainer } from 'react-archer';
import { englishWords, frenchWords, correctPairs } from './data';

import './App.css';

function shuffleArray<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [buttonLabel, setButtonLabel] = useState<'GO' | 'GRADE'>('GO');
  const [leftWords, setLeftWords] = useState<string[]>([]);
  const [rightWords, setRightWords] = useState<string[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<{ left: string; right: string }[]>([]);
  const [score, setScore] = useState<number | null>(null);

  const handleGo = () => {
    setLeftWords(shuffleArray(englishWords));
    setRightWords(shuffleArray(frenchWords));
    setMatchedPairs([]);
    setSelectedLeft(null);
    setSelectedRight(null);
    setScore(null);
    setButtonLabel('GRADE');
    setGameStarted(true);
  };

  const handleGrade = () => {
    let correct = 0;
    matchedPairs.forEach(pair => {
      const expected = correctPairs[pair.left];
      if (expected === pair.right) correct++;
    });
    const percentage = Math.round((correct / Object.keys(correctPairs).length) * 100);
    setScore(percentage);
    setButtonLabel('GO');
    setGameStarted(false);
  };

  const handleWordClick = (column: 'left' | 'right', word: string) => {
    if (matchedPairs.some(pair => pair.left === word || pair.right === word)) return;

    if (column === 'left') {
      setSelectedLeft(word);
    } else {
      setSelectedRight(word);
    }

    if (
      (column === 'left' && selectedRight) ||
      (column === 'right' && selectedLeft)
    ) {
      const newPair = {
        left: column === 'left' ? word : selectedLeft!,
        right: column === 'right' ? word : selectedRight!,
      };
      setMatchedPairs([...matchedPairs, newPair]);
      setSelectedLeft(null);
      setSelectedRight(null);
    }
  };

  return (
    <div  className="app-container">
      <h1>French Memory Game</h1>
      <button onClick={buttonLabel === 'GO' ? handleGo : handleGrade}>{buttonLabel}</button>
      {score !== null && <h2>Your Score: {score}%</h2>}

      {gameStarted && (
        <ArcherContainer strokeColor="blue">
          <div className="layout-grid">
              <WordColumn
                title="English Words"
                words={leftWords}
                selectedWord={selectedLeft}
                matchedPairs={matchedPairs}
                columnType="left"
                onWordClick={handleWordClick}
              />
              <WordColumn
                title="French Words"
                words={rightWords}
                selectedWord={selectedRight}
                matchedPairs={matchedPairs}
                columnType="right"
                onWordClick={handleWordClick}
                titleColor='#93bf85'
              />
            </div>
          </ArcherContainer>
      
      )}
    </div>
  );
}