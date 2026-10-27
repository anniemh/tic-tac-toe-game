import { useState } from "react";
import "./App.css";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(squares) {
  for (const [a, b, c] of winningCombinations) {
    if (
      squares[a] !== "" &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }

  return "";
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== "");

  function handleClick(index) {
    // Stop if the game is over or the square is occupied.
    if (winner || isDraw || squares[index] !== "") {
      return;
    }

    // Create a copy of the board.
    const nextSquares = [...squares];

    // Place the current player's mark.
    nextSquares[index] = currentPlayer;

    // Update the board.
    setSquares(nextSquares);

    // Switch players only if the move hasn't won the game.
    const nextWinner = calculateWinner(nextSquares);

    if (!nextWinner) {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  }

  function resetGame() {
    setSquares(Array(9).fill(""));
    setCurrentPlayer("X");
  }

  return (
    <section className="game-card">
      <div className="game-heading">
        <span className="eyebrow">THE LITTLE GAME CLUB ✳</span>

        <h2>Your move!</h2>

        <p className="game-description">Think outside the square.</p>
      </div>

      <div className="game-status" aria-live="polite">
        {winner ? (
          <p className="winner-message">Winner: {winner}</p>
        ) : isDraw ? (
          <p className="draw-message">It's a draw!</p>
        ) : (
          <p className="turn-message">
            Now playing:{" "}
            <span className={currentPlayer === "X" ? "x-color" : "o-color"}>
              {currentPlayer}
            </span>
          </p>
        )}
      </div>

      <div className="board" role="group" aria-label="Tic Tac Toe board">
        {squares.map((square, index) => (
          <button
            key={index}
            type="button"
            className={`square ${square ? `mark-${square.toLowerCase()}` : ""}`}
            onClick={() => handleClick(index)}
            aria-label={`Square ${index + 1}${square ? `: ${square}` : ": empty"}`}
            disabled={Boolean(winner || isDraw || square)}
          >
            {square}
          </button>
        ))}
      </div>

      <button id="reset" type="button" onClick={resetGame}>
        <span aria-hidden="true">↻</span> Reset game
      </button>

      <p className="game-footer">TWO PLAYERS · NINE SQUARES · ONE WINNER</p>
    </section>
  );
}

function App() {
  return (
    <main className="game">
      <header className="page-header">
        <a className="brand" href="#" aria-label="Little Game Club home">
          PLAY<span>LOUD.</span>
        </a>

        <span className="header-label">A CLASSIC, WITH A TWIST</span>

        <span className="header-symbol" aria-hidden="true">
          ✳
        </span>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">YOUR DAILY DOSE OF FUN</span>

          <h1>
            X marks
            <br />
            the <span>spot.</span>
          </h1>

          <p>
            A little strategy, a little luck, and a whole lot of personality.
          </p>

          <a href="#play" className="hero-link">
            Let's play <span aria-hidden="true">↘</span>
          </a>
        </div>

        <div className="hero-art" aria-hidden="true">
          <span className="art-star">✳</span>
          <span className="art-x">X</span>
          <span className="art-o">O</span>
          <span className="art-caption">GAME ON!</span>
        </div>
      </section>

      <section className="play-section" id="play">
        <div className="section-intro">
          <span className="eyebrow">01 / THE MAIN EVENT</span>
          <h2>Make your move.</h2>
          <p>Three in a row takes the crown.</p>
        </div>

        <Board />

        <aside className="tip-card">
          <span className="tip-icon" aria-hidden="true">
            ✦
          </span>

          <div>
            <h3>A little tip</h3>
            <p>Keep an eye on the diagonals. They can be sneaky!</p>
          </div>
        </aside>
      </section>

      <footer className="page-footer">
        <span>THE LITTLE GAME CLUB © 2026</span>
        <span>MADE FOR FUN, PLAYED WITH LOVE ✳</span>
      </footer>
    </main>
  );
}

export default App;
