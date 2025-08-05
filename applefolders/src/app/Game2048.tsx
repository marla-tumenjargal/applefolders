import React, { useState, useEffect, useCallback } from 'react';

type Board = number[][];

const Game2048 = () => {
  const [board, setBoard] = useState<Board>(() => initializeBoard());
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);

  function initializeBoard(): Board {
    const newBoard: Board = Array(4).fill(null).map(() => Array(4).fill(0));
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    return newBoard;
  }

  function addRandomTile(board: Board): void {
    const emptyCells = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) {
          emptyCells.push([i, j]);
        }
      }
    }
    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      board[randomCell[0]][randomCell[1]] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  const moveLeft = useCallback((board: Board, currentWon: boolean) => {
    let newBoard: Board = board.map(row => [...row]);
    let scoreIncrease = 0;
    let moved = false;
    let hasWon = currentWon;

    for (let i = 0; i < 4; i++) {
      const row = newBoard[i].filter(cell => cell !== 0);
      for (let j = 0; j < row.length - 1; j++) {
        if (row[j] === row[j + 1]) {
          row[j] *= 2;
          scoreIncrease += row[j];
          row[j + 1] = 0;
          if (row[j] === 2048 && !hasWon) {
            hasWon = true;
          }
        }
      }
      const newRow = row.filter(cell => cell !== 0);
      while (newRow.length < 4) {
        newRow.push(0);
      }
      
      if (JSON.stringify(newBoard[i]) !== JSON.stringify(newRow)) {
        moved = true;
      }
      newBoard[i] = newRow;
    }
    return { board: newBoard, score: scoreIncrease, moved, won: hasWon };
  }, []);

  const rotateBoard = useCallback((board: Board): Board => {
    return board[0].map((_, colIndex) => 
      board.map(row => row[colIndex]).reverse()
    );
  }, []);

  const move = useCallback((direction: string) => {
    if (gameOver) return;

    let newBoard = board.map(row => [...row]);
    let rotations = 0;

    // Rotate board to make all moves equivalent to left moves
    switch (direction) {
      case 'ArrowUp':
        rotations = 3;
        break;
      case 'ArrowRight':
        rotations = 2;
        break;
      case 'ArrowDown':
        rotations = 1;
        break;
      default:
        rotations = 0;
    }

    // Rotate board
    for (let i = 0; i < rotations; i++) {
      newBoard = rotateBoard(newBoard);
    }

    // Move left
    const { board: movedBoard, score: scoreIncrease, moved, won: hasWon } = moveLeft(newBoard, won);

    // Rotate back
    let finalBoard = movedBoard;
    for (let i = 0; i < (4 - rotations) % 4; i++) {
      finalBoard = rotateBoard(finalBoard);
    }

    if (moved) {
      addRandomTile(finalBoard);
      setBoard(finalBoard);
      const newScore = score + scoreIncrease;
      setScore(newScore);
      
      if (newScore > bestScore) {
        setBestScore(newScore);
      }

      if (hasWon && !won) {
        setWon(true);
      }

      // Check for game over
      if (isGameOver(finalBoard)) {
        setGameOver(true);
      }
    }
  }, [board, score, bestScore, gameOver, won, moveLeft, rotateBoard]);

  const isGameOver = (board) => {
    // Check for empty cells
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) return false;
      }
    }

    // Check for possible merges
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const current = board[i][j];
        if (
          (i < 3 && board[i + 1][j] === current) ||
          (j < 3 && board[i][j + 1] === current)
        ) {
          return false;
        }
      }
    }
    return true;
  };

  const resetGame = () => {
    setBoard(initializeBoard());
    setScore(0);
    setGameOver(false);
    setWon(false);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
        move(event.key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [move]);

  const getTileColor = (value) => {
    const colors = {
      0: 'transparent',
      2: '#eee4da',
      4: '#ede0c8',
      8: '#f2b179',
      16: '#f59563',
      32: '#f67c5f',
      64: '#f65e3b',
      128: '#edcf72',
      256: '#edcc61',
      512: '#edc850',
      1024: '#edc53f',
      2048: '#edc22e',
    };
    return colors[value] || '#3c3a32';
  };

  const getTileTextColor = (value) => {
    return value <= 4 ? '#776e65' : '#f9f6f2';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">2048</h1>
          <p className="text-gray-600 text-sm">Join numbers to reach 2048!</p>
        </div>

        {/* Score Section */}
        <div className="flex justify-between mb-6">
          <div className="bg-gray-100 rounded-lg px-4 py-3 text-center flex-1 mr-2">
            <div className="text-gray-600 text-xs uppercase tracking-wide">Score</div>
            <div className="text-xl font-bold text-gray-800">{score}</div>
          </div>
          <div className="bg-gray-100 rounded-lg px-4 py-3 text-center flex-1 ml-2">
            <div className="text-gray-600 text-xs uppercase tracking-wide">Best</div>
            <div className="text-xl font-bold text-gray-800">{bestScore}</div>
          </div>
        </div>

        {/* Game Board */}
        <div className="bg-gray-300 rounded-lg p-3 mb-6">
          <div className="grid grid-cols-4 gap-3">
            {board.flat().map((value, index) => (
              <div
                key={index}
                className="w-16 h-16 rounded-md flex items-center justify-center text-lg font-bold transition-all duration-150"
                style={{
                  backgroundColor: getTileColor(value),
                  color: getTileTextColor(value),
                }}
              >
                {value !== 0 && value}
              </div>
            ))}
          </div>
        </div>

        {/* Game Status Messages */}
        {won && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
            🎉 You won! Keep going for a higher score!
          </div>
        )}

        {gameOver && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
            Game Over! No more moves available.
          </div>
        )}

        {/* Controls */}
        <div className="text-center">
          <button
            onClick={resetGame}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 mb-4"
          >
            New Game
          </button>
          
          <div className="text-gray-600 text-sm">
            <p>Use arrow keys to move tiles</p>
            <p className="mt-1">Tiles with the same number merge into one!</p>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="grid grid-cols-3 gap-2 mt-6 max-w-48 mx-auto md:hidden">
          <div></div>
          <button
            onClick={() => move('ArrowUp')}
            className="bg-gray-200 hover:bg-gray-300 rounded-lg p-3 transition-colors"
          >
            ↑
          </button>
          <div></div>
          <button
            onClick={() => move('ArrowLeft')}
            className="bg-gray-200 hover:bg-gray-300 rounded-lg p-3 transition-colors"
          >
            ←
          </button>
          <div></div>
          <button
            onClick={() => move('ArrowRight')}
            className="bg-gray-200 hover:bg-gray-300 rounded-lg p-3 transition-colors"
          >
            →
          </button>
          <div></div>
          <button
            onClick={() => move('ArrowDown')}
            className="bg-gray-200 hover:bg-gray-300 rounded-lg p-3 transition-colors"
          >
            ↓
          </button>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Game2048;