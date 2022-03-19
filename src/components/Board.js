import React, { useState } from "react";
import './styles/Board.css';
import Square from "./Square";

function Board() {

    const status = 'Next player: X';
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    function renderSquare(i) {
        return <Square 
          value={squares[i]}
          onClick={() => handleClick(i)}
         />;
    }

    function calculateWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    }
    
    function handleClick(i) {
      const newSquare = squares.slice();
      if (newSquare[i]) {
        return;
      }
      newSquare[i] = xIsNext ? "X" : "O";
      setXIsNext(!xIsNext);
      setSquares(newSquare);
    }

    if (calculateWinner(squares)) {
      const winner = calculateWinner(squares)
      return <div className="status">{`Winner is: ${winner}`}</div>
    }
    return (  
        <div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
          <div className="status">{`Next player: ${xIsNext ? "X" : "O"}`}</div>
        </div>
    )
}

export default Board;