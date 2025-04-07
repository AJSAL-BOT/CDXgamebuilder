"use client"

interface GameConfig {
  backgroundColor: string
  backgroundImage: string
  cellColor: string
  cellImage: string
  player1Symbol: string
  player2Symbol: string
  boardSize?: number
  player1Name?: string
  player2Name?: string
  soundEnabled?: boolean
  theme?: string
  customFontFamily?: string
  borderStyle?: string
  winCondition?: number
  timerEnabled?: boolean
  timerDuration?: number
  animationsEnabled?: boolean
  gameTitle?: string
}

export function generateGameHTML(config: GameConfig): string {
  const {
    backgroundColor,
    backgroundImage,
    cellColor,
    cellImage,
    player1Symbol,
    player2Symbol,
    boardSize,
    player1Name,
    player2Name,
    soundEnabled,
    customFontFamily,
    borderStyle,
    winCondition,
    timerEnabled,
    timerDuration,
    animationsEnabled,
    gameTitle,
  } = config

  const size = boardSize || 3
  const cells = size * size
  const condition = winCondition || 3
  const title = gameTitle || "Tic Tac Toe"

  // Font families mapping
  const fontFamilies = {
    default: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    mono: "'Courier New', monospace",
    rounded: "'Comic Sans MS', cursive",
    elegant: "'Palatino Linotype', serif",
  }

  const selectedFont = fontFamilies[customFontFamily as keyof typeof fontFamilies] || fontFamilies.default

  // Create the HTML with properly escaped template literals
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: ${selectedFont};
  }
  
  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: ${backgroundColor};
    ${
      backgroundImage
        ? `background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;`
        : ""
    }
    color: white;
    padding: 20px;
  }
  
  .container {
    max-width: 500px;
    width: 100%;
    text-align: center;
  }
  
  h1 {
    margin-bottom: 20px;
    font-size: 2rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .status {
    margin-bottom: 20px;
    font-size: 1.2rem;
    font-weight: 500;
  }
  
  .board {
    display: grid;
    grid-template-columns: repeat(${size}, 1fr);
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .cell {
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
    background-color: ${cellColor};
    ${
      cellImage
        ? `background-image: url(${cellImage});
    background-size: cover;
    background-position: center;`
        : ""
    }
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px ${borderStyle || "solid"} rgba(255, 255, 255, 0.2);
  }
  
  .cell:hover {
    opacity: 0.9;
    ${animationsEnabled ? "transform: scale(1.05);" : ""}
  }
  
  .cell.winning {
    box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.7);
    border-color: rgba(255, 255, 255, 0.8);
    ${animationsEnabled ? "transform: scale(1.05);" : ""}
  }
  
  button {
    padding: 10px 20px;
    font-size: 1rem;
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    margin: 0 5px;
  }
  
  button:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .footer {
    margin-top: 40px;
    font-size: 0.8rem;
    opacity: 0.7;
  }
  
  .score-board {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
  }
  
  .score-item {
    text-align: center;
  }
  
  .score-name {
    font-size: 0.9rem;
    margin-bottom: 5px;
  }
  
  .score-value {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .history {
    margin-top: 20px;
    max-height: 100px;
    overflow-y: auto;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 10px;
  }
  
  .history-title {
    font-size: 0.9rem;
    margin-bottom: 8px;
  }
  
  .history-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
  
  .history-button {
    font-size: 0.8rem;
    padding: 5px 10px;
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .history-button.active {
    background-color: rgba(138, 43, 226, 0.6);
  }
  
  .controls {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    flex-wrap: wrap;
    gap: 5px;
  }
  
  .timer-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    font-size: 1.2rem;
  }
  
  .timer {
    padding: 5px 10px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    margin-left: 10px;
  }
  
  .timer.warning {
    color: #ff5555;
    animation: pulse 1s infinite;
  }
  
  .game-info {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .info-pill {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.8rem;
  }
  
  .achievements {
    margin-top: 15px;
    background-color: rgba(0, 0, 0, 0.2);
    padding: 10px;
    border-radius: 8px;
  }
  
  .achievement {
    display: flex;
    align-items: center;
    gap: 5px;
    color: gold;
    font-size: 0.9rem;
    margin-bottom: 5px;
  }
  
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
  
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    z-index: 1000;
    transform: translateY(-100px);
    opacity: 0;
    transition: all 0.3s ease;
  }
  
  .notification.show {
    transform: translateY(0);
    opacity: 1;
  }
  
  .game-title-edit {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }
  
  .game-title-edit input {
    background-color: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    margin-right: 5px;
    font-size: 1rem;
  }
  
  .game-title-edit button {
    padding: 5px 10px;
    font-size: 0.8rem;
  }
</style>
</head>
<body>
<div class="container">
  <div class="game-title-edit">
    <input type="text" id="game-title-input" value="${title}" placeholder="Game Title">
    <button id="update-title-button">Update Title</button>
  </div>
  
  <h1 id="game-title">${title}</h1>
  
  <div class="score-board">
    <div class="score-item">
      <div class="score-name">${player1Name || "Player 1"}</div>
      <div class="score-value" id="player1-score">0</div>
    </div>
    ${
      timerEnabled
        ? `
    <div class="score-item">
      <div class="score-name">Timer</div>
      <div class="score-value" id="timer">${timerDuration}s</div>
    </div>
    `
        : ""
    }
    <div class="score-item">
      <div class="score-name">${player2Name || "Player 2"}</div>
      <div class="score-value" id="player2-score">0</div>
    </div>
  </div>
  
  <div class="game-info">
    <div class="info-pill">${size}x${size} Board</div>
    <div class="info-pill">${condition} in a row</div>
    <div class="info-pill" id="move-counter">Move: 0</div>
  </div>
  
  <div class="status" id="status">Next player: ${player1Name || "Player 1"}</div>
  <div class="board" id="board">
    ${Array(cells)
      .fill(null)
      .map((_, i) => `<div class="cell" data-index="${i}"></div>`)
      .join("\n    ")}
  </div>
  
  <div class="controls">
    <button id="reset-button">Reset Game</button>
    <button id="undo-button" disabled>Undo Move</button>
    ${timerEnabled ? '<button id="timer-button">Pause Timer</button>' : ""}
    <button id="save-game-button">Save Game</button>
    <button id="load-game-button">Load Game</button>
  </div>
  
  <div class="history">
    <div class="history-title">Game History:</div>
    <div class="history-buttons" id="history-buttons">
      <button class="history-button active" data-step="0">Start</button>
    </div>
  </div>
  
  <div class="achievements" id="achievements">
    <div class="history-title">Achievements:</div>
    <div id="achievements-list">No achievements yet</div>
  </div>
  
  <div class="footer">Created with Code DropX Game Builder</div>
  <div class="subscribe-button">
    <a href="http://www.youtube.com/@Code-DropX" target="_blank" style="display: inline-block; background-color: #FF0000; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; margin-top: 20px;">
      Subscribe to Code DropX
    </a>
  </div>
</div>

<div class="notification" id="notification"></div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset-button');
    const undoButton = document.getElementById('undo-button');
    const historyButtons = document.getElementById('history-buttons');
    const player1ScoreElement = document.getElementById('player1-score');
    const player2ScoreElement = document.getElementById('player2-score');
    const moveCounter = document.getElementById('move-counter');
    const achievementsList = document.getElementById('achievements-list');
    const notification = document.getElementById('notification');
    const gameTitleInput = document.getElementById('game-title-input');
    const updateTitleButton = document.getElementById('update-title-button');
    const gameTitleDisplay = document.getElementById('game-title');
    const saveGameButton = document.getElementById('save-game-button');
    const loadGameButton = document.getElementById('load-game-button');
    
    // Game configuration
    const size = ${size};
    const winCondition = ${condition};
    const player1Symbol = '${player1Symbol}';
    const player2Symbol = '${player2Symbol}';
    const player1Name = '${player1Name || "Player 1"}';
    const player2Name = '${player2Name || "Player 2"}';
    const soundEnabled = ${soundEnabled !== false};
    const timerEnabled = ${timerEnabled === true};
    const timerDuration = ${timerDuration || 10};
    const animationsEnabled = ${animationsEnabled !== false};
    
    // Game state
    let currentBoard = Array(${cells}).fill(null);
    let isPlayer1Next = true;
    let gameWinner = null;
    let winningLine = null;
    let moveHistory = [{board: Array(${cells}).fill(null), isPlayer1Next: true}];
    let currentStep = 0;
    let player1Score = 0;
    let player2Score = 0;
    let moveCount = 0;
    let gameStarted = false;
    let fastestWin = null;
    let achievements = [];
    let consecutiveWins = { player1: 0, player2: 0 };
    let gameTitle = '${title}';
    
    // Timer state
    let timeLeft = timerDuration;
    let timerInterval = null;
    let isTimerActive = false;
    
    // Timer elements
    const timerElement = document.getElementById('timer');
    const timerButton = document.getElementById('timer-button');
    
    // Sound effects - use inline URLs to avoid file loading issues
    const moveSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-simple-countdown-922.mp3');
    const winSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3');
    const drawSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3');
    const timerSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
    const achievementSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3');
    
    // Show notification
    function showNotification(message, duration = 3000) {
      notification.textContent = message;
      notification.classList.add('show');
      
      setTimeout(function() {
        notification.classList.remove('show');
      }, duration);
    }
    
    // Update game title
    if (updateTitleButton) {
      updateTitleButton.addEventListener('click', function() {
        const newTitle = gameTitleInput.value.trim();
        if (newTitle) {
          gameTitle = newTitle;
          gameTitleDisplay.textContent = newTitle;
          document.title = newTitle;
          showNotification('Game title updated!');
        }
      });
    }
    
    // Save and load game
    if (saveGameButton) {
      saveGameButton.addEventListener('click', saveGame);
    }
    
    if (loadGameButton) {
      loadGameButton.addEventListener('click', loadGame);
    }
    
    function saveGame() {
      const gameData = {
        currentBoard: currentBoard,
        isPlayer1Next: isPlayer1Next,
        gameWinner: gameWinner,
        winningLine: winningLine,
        moveHistory: moveHistory,
        currentStep: currentStep,
        player1Score: player1Score,
        player2Score: player2Score,
        moveCount: moveCount,
        gameStarted: gameStarted,
        fastestWin: fastestWin,
        achievements: achievements,
        consecutiveWins: consecutiveWins,
        gameTitle: gameTitle
      };
      
      try {
        localStorage.setItem('tictactoe-saved-game', JSON.stringify(gameData));
        showNotification('Game saved successfully!');
      } catch (error) {
        console.error('Error saving game:', error);
        showNotification('Failed to save game.');
      }
    }
    
    function loadGame() {
      try {
        const savedData = localStorage.getItem('tictactoe-saved-game');
        if (!savedData) {
          showNotification('No saved game found.');
          return;
        }
        
        const gameData = JSON.parse(savedData);
        
        // Restore game state
        currentBoard = gameData.currentBoard;
        isPlayer1Next = gameData.isPlayer1Next;
        gameWinner = gameData.gameWinner;
        winningLine = gameData.winningLine;
        moveHistory = gameData.moveHistory;
        currentStep = gameData.currentStep;
        player1Score = gameData.player1Score;
        player2Score = gameData.player2Score;
        moveCount = gameData.moveCount;
        gameStarted = gameData.gameStarted;
        fastestWin = gameData.fastestWin;
        achievements = gameData.achievements || [];
        consecutiveWins = gameData.consecutiveWins || { player1: 0, player2: 0 };
        
        if (gameData.gameTitle) {
          gameTitle = gameData.gameTitle;
          gameTitleDisplay.textContent = gameTitle;
          gameTitleInput.value = gameTitle;
          document.title = gameTitle;
        }
        
        // Update UI
        player1ScoreElement.textContent = player1Score;
        player2ScoreElement.textContent = player2Score;
        moveCounter.textContent = 'Move: ' + moveCount;
        
        renderBoard();
        updateHistoryButtons();
        updateAchievements();
        
        // Update game status
        if (gameWinner) {
          status.textContent = 'Winner: ' + (gameWinner === player1Symbol ? player1Name : player2Name);
          highlightWinningCells();
        } else if (currentBoard.every(function(cell) { return cell !== null; })) {
          status.textContent = 'Game ended in a draw!';
        } else {
          status.textContent = 'Next player: ' + (isPlayer1Next ? player1Name : player2Name);
        }
        
        // Update undo button state
        undoButton.disabled = currentStep === 0;
        
        // Reset timer if needed
        if (timerEnabled) {
          resetTimer();
          if (gameStarted && !gameWinner && currentStep === moveHistory.length - 1) {
            timeLeft = timerDuration;
            updateTimerDisplay();
            startTimer();
          }
        }
        
        showNotification('Game loaded successfully!');
      } catch (error) {
        console.error('Error loading game:', error);
        showNotification('Failed to load game.');
      }
    }
    
    // Play sound function
    function playSound(type) {
      if (!soundEnabled) return;
      
      try {
        if (type === 'move') {
          moveSound.currentTime = 0;
          moveSound.play().catch(function(e) { console.log('Sound play error:', e); });
        } else if (type === 'win') {
          winSound.currentTime = 0;
          winSound.play().catch(function(e) { console.log('Sound play error:', e); });
          if (animationsEnabled) {
            triggerConfetti();
          }
        } else if (type === 'draw') {
          drawSound.currentTime = 0;
          drawSound.play().catch(function(e) { console.log('Sound play error:', e); });
        } else if (type === 'timer') {
          timerSound.currentTime = 0;
          timerSound.play().catch(function(e) { console.log('Sound play error:', e); });
        } else if (type === 'achievement') {
          achievementSound.currentTime = 0;
          achievementSound.play().catch(function(e) { console.log('Sound play error:', e); });
        }
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    }
    
    // Confetti function
    function triggerConfetti() {
      const colors = ['#bb0000', '#ffffff'];
      
      const canvas = document.createElement('canvas');
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.pointerEvents = 'none';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.zIndex = '999';
      document.body.appendChild(canvas);
      
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const pieces = [];
      const numberOfPieces = 100;
      const gravity = 0.3;
      
      function randomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
      }
      
      function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = pieces.length - 1; i >= 0; i--) {
          const piece = pieces[i];
          piece.velocity.y += gravity;
          piece.x += piece.velocity.x;
          piece.y += piece.velocity.y;
          
          if (piece.y > canvas.height) {
            pieces.splice(i, 1);
            continue;
          }
          
          ctx.beginPath();
          ctx.fillStyle = piece.color;
          ctx.arc(piece.x, piece.y, piece.size, 0, 2 * Math.PI);
          ctx.fill();
        }
        
        if (pieces.length > 0) {
          requestAnimationFrame(update);
        } else {
          document.body.removeChild(canvas);
        }
      }
      
      for (let i = 0; i < numberOfPieces; i++) {
        pieces.push({
          x: canvas.width / 2,
          y: canvas.height / 2,
          size: Math.random() * 5 + 3,
          color: randomColor(),
          velocity: {
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 10
          }
        });
      }
      
      requestAnimationFrame(update);
    }
    
    // Timer functions
    function startTimer() {
      if (!timerEnabled || gameWinner) return;
      
      isTimerActive = true;
      if (timerButton) timerButton.textContent = 'Pause Timer';
      
      clearInterval(timerInterval);
      timerInterval = setInterval(function() {
        if (timeLeft > 0) {
          timeLeft--;
          updateTimerDisplay();
          
          // Add warning class when time is running low
          if (timeLeft <= 3) {
            if (timerElement) timerElement.classList.add('warning');
            cells.forEach(function(cell) {
              if (!cell.textContent) {
                cell.classList.add('warning');
              }
            });
          }
        } else {
          // Time's up - switch player
          playSound('timer');
          isPlayer1Next = !isPlayer1Next;
          timeLeft = timerDuration;
          updateTimerDisplay();
          status.textContent = 'Time\\'s up! Next player: ' + (isPlayer1Next ? player1Name : player2Name);
          
          // Remove warning classes
          if (timerElement) timerElement.classList.remove('warning');
          cells.forEach(function(cell) {
            cell.classList.remove('warning');
          });
        }
      }, 1000);
    }
    
    function pauseTimer() {
      isTimerActive = false;
      if (timerButton) timerButton.textContent = 'Resume Timer';
      clearInterval(timerInterval);
    }
    
    function updateTimerDisplay() {
      if (timerElement) {
        timerElement.textContent = timeLeft + 's';
      }
    }
    
    function resetTimer() {
      timeLeft = timerDuration;
      updateTimerDisplay();
      if (timerElement) timerElement.classList.remove('warning');
      cells.forEach(function(cell) {
        cell.classList.remove('warning');
      });
      
      clearInterval(timerInterval);
      isTimerActive = false;
      if (timerButton) timerButton.textContent = 'Start Timer';
    }
    
    // Add achievement function
    function addAchievement(text) {
      if (!achievements.includes(text)) {
        achievements.push(text);
        updateAchievements();
        playSound('achievement');
        showNotification('Achievement unlocked: ' + text);
      }
    }
    
    function updateAchievements() {
      if (achievements.length > 0) {
        achievementsList.innerHTML = achievements.map(function(achievement) {
          return '<div class="achievement">🏆 ' + achievement + '</div>';
        }).join('');
      } else {
        achievementsList.innerHTML = 'No achievements yet';
      }
    }
    
    // Add click event to each cell
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        handleCellClick(index);
      });
    }
    
    // Reset button click event
    resetButton.addEventListener('click', resetGame);
    
    // Undo button click event
    undoButton.addEventListener('click', function() {
      if (currentStep > 0) {
        jumpToStep(currentStep - 1);
      }
    });
    
    // Timer button click event
    if (timerButton) {
      timerButton.addEventListener('click', function() {
        if (isTimerActive) {
          pauseTimer();
        } else {
          startTimer();
        }
      });
    }
    
    function handleCellClick(index) {
      // If cell is already filled or game is won or we're viewing history, do nothing
      if (currentBoard[index] || gameWinner || currentStep < moveHistory.length - 1) return;
      
      // Start game on first move
      if (!gameStarted) {
        gameStarted = true;
        if (timerEnabled) {
          startTimer();
        }
      }
      
      // Play move sound
      playSound('move');
      
      // Update the board state
      currentBoard[index] = isPlayer1Next ? player1Symbol : player2Symbol;
      moveCount++;
      moveCounter.textContent = 'Move: ' + moveCount;
      
      // Update the UI
      renderBoard();
      
      // Add to history
      moveHistory = moveHistory.slice(0, currentStep + 1);
      moveHistory.push({
        board: [...currentBoard],
        isPlayer1Next: !isPlayer1Next
      });
      currentStep = moveHistory.length - 1;
      
      // Update history buttons
      updateHistoryButtons();
      
      // Reset timer for next player
      if (timerEnabled && isTimerActive) {
        timeLeft = timerDuration;
        updateTimerDisplay();
      }
      
      // Check for winner
      const result = checkGameResult();

      if (result.winner) {
        gameWinner = result.winner;
        winningLine = result.line;
        
        // Highlight winning cells
        highlightWinningCells();
        
        // Update score
        if (gameWinner === player1Symbol) {
          player1Score++;
          player1ScoreElement.textContent = player1Score;
          status.textContent = 'Winner: ' + player1Name;
          consecutiveWins.player1++;
          consecutiveWins.player2 = 0;
          
          // Check for achievements
          if (consecutiveWins.player1 === 3) {
            addAchievement(player1Name + ' won 3 games in a row!');
          }
        } else {
          player2Score++;
          player2ScoreElement.textContent = player2Score;
          status.textContent = 'Winner: ' + player2Name;
          consecutiveWins.player2++;
          consecutiveWins.player1 = 0;
          
          // Check for achievements
          if (consecutiveWins.player2 === 3) {
            addAchievement(player2Name + ' won 3 games in a row!');
          }
        }
        
        // Track fastest win
        if (fastestWin === null || moveCount < fastestWin) {
          fastestWin = moveCount;
          if (moveCount <= size + 1) {
            addAchievement('Lightning Victory: Won in just ' + moveCount + ' moves!');
          }
        }
        
        // Play win sound
        playSound('win');
        
        // Stop timer
        if (timerEnabled) {
          pauseTimer();
        }
      } else if (result.isDraw) {
        status.textContent = 'Game ended in a draw!';
        playSound('draw');
        consecutiveWins.player1 = 0;
        consecutiveWins.player2 = 0;
        
        // Stop timer
        if (timerEnabled) {
          pauseTimer();
        }
      } else {
        // Switch player
        isPlayer1Next = !isPlayer1Next;
        status.textContent = 'Next player: ' + (isPlayer1Next ? player1Name : player2Name);
      }
      
      // Update undo button state
      undoButton.disabled = currentStep === 0;
    }
    
    function renderBoard() {
      cells.forEach(function(cell, index) {
        cell.textContent = currentBoard[index] || '';
        
        // Remove winning highlight
        cell.classList.remove('winning');
        cell.classList.remove('warning');
      });
      
      // Add winning highlight if there's a winner
      if (winningLine) {
        highlightWinningCells();
      }
    }
    
    function highlightWinningCells() {
      if (!winningLine) return;
      
      winningLine.forEach(function(index) {
        cells[index].classList.add('winning');
      });
    }
    
    function checkGameResult() {
      // Generate winning lines based on board size and win condition
      const lines = [];
      
      // Check rows
      for (let row = 0; row < size; row++) {
        for (let col = 0; col <= size - winCondition; col++) {
          const line = [];
          for (let i = 0; i < winCondition; i++) {
            line.push(row * size + (col + i));
          }
          lines.push(line);
        }
      }
      
      // Check columns
      for (let col = 0; col < size; col++) {
        for (let row = 0; row <= size - winCondition; row++) {
          const line = [];
          for (let i = 0; i < winCondition; i++) {
            line.push((row + i) * size + col);
          }
          lines.push(line);
        }
      }
      
      // Check diagonals (top-left to bottom-right)
      for (let row = 0; row <= size - winCondition; row++) {
        for (let col = 0; col <= size - winCondition; col++) {
          const line = [];
          for (let i = 0; i < winCondition; i++) {
            line.push((row + i) * size + (col + i));
          }
          lines.push(line);
        }
      }
      
      // Check diagonals (top-right to bottom-left)
      for (let row = 0; row <= size - winCondition; row++) {
        for (let col = size - 1; col >= winCondition - 1; col--) {
          const line = [];
          for (let i = 0; i < winCondition; i++) {
            line.push((row + i) * size + (col - i));
          }
          lines.push(line);
        }
      }
      
      for (let i = 0; i < lines.length; i++) {
        const lineIndices = lines[i];
        const firstSymbol = currentBoard[lineIndices[0]];
        
        if (!firstSymbol) continue;
        
        let isWinningLine = true;
        for (let j = 1; j < lineIndices.length; j++) {
          if (currentBoard[lineIndices[j]] !== firstSymbol) {
            isWinningLine = false;
            break;
          }
        }
        
        if (isWinningLine) {
          return { winner: firstSymbol, line: lineIndices, isDraw: false };
        }
      }
      
      // Check for draw
      const isDraw = currentBoard.every(function(cell) { return cell !== null; });
      return { winner: null, line: null, isDraw: isDraw };
    }
    
    function resetGame() {
      currentBoard = Array(${cells}).fill(null);
      isPlayer1Next = true;
      gameWinner = null;
      winningLine = null;
      moveCount = 0;
      moveCounter.textContent = 'Move: ' + moveCount;
      gameStarted = false;
      
      // Reset history
      moveHistory = [{board: [...currentBoard], isPlayer1Next: true}];
      currentStep = 0;
      updateHistoryButtons();
      
      // Reset timer
      if (timerEnabled) {
        resetTimer();
      }
      
      // Update UI
      status.textContent = 'Next player: ' + player1Name;
      renderBoard();
      
      // Disable undo button
      undoButton.disabled = true;
    }
    
    function jumpToStep(step) {
      currentStep = step;
      currentBoard = [...moveHistory[step].board];
      isPlayer1Next = moveHistory[step].isPlayer1Next;
      moveCount = step;
      moveCounter.textContent = 'Move: ' + moveCount;
      
      // Update UI
      renderBoard();
      
      // Update history buttons
      updateHistoryButtons();
      
      // Update undo button state
      undoButton.disabled = currentStep === 0;
      
      // Reset timer
      if (timerEnabled) {
        resetTimer();
      }
      
      if (step === 0) {
        gameWinner = null;
        winningLine = null;
        status.textContent = 'Next player: ' + (isPlayer1Next ? player1Name : player2Name);
        gameStarted = false;
      } else {
        gameStarted = true;
        // Check game state
        const result = checkGameResult();
        if (result.winner) {
          gameWinner = result.winner;
          winningLine = result.line;
          status.textContent = 'Winner: ' + (gameWinner === player1Symbol ? player1Name : player2Name);
          highlightWinningCells();
        } else if (result.isDraw) {
          gameWinner = null;
          winningLine = null;
          status.textContent = 'Game ended in a draw!';
        } else {
          gameWinner = null;
          winningLine = null;
          status.textContent = 'Next player: ' + (isPlayer1Next ? player1Name : player2Name);
          
          // Start timer if game is ongoing
          if (timerEnabled && step > 0) {
            timeLeft = timerDuration;
            updateTimerDisplay();
            startTimer();
          }
        }
      }
    }

    function updateHistoryButtons() {
      // Clear existing buttons
      historyButtons.innerHTML = '';
      
      // Add buttons for each step
      moveHistory.forEach(function(_, step) {
        const button = document.createElement('button');
        button.className = 'history-button ' + (step === currentStep ? 'active' : '');
        button.textContent = step === 0 ? 'Start' : 'Move ' + step;
        button.setAttribute('data-step', step);
        
        button.addEventListener('click', function() {
          jumpToStep(parseInt(this.getAttribute('data-step')));
        });
        
        historyButtons.appendChild(button);
      });
    }
    
    // Initialize the game
    updateHistoryButtons();
    updateAchievements();
    
    // Log initialization complete to help with debugging
    console.log('Game initialized successfully!');
  });
</script>
</body>
</html>`
}

