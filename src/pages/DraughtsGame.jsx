import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

/* ---------------------------------------------
   GAME LOGIC HOOK
--------------------------------------------- */
function useDraughts(variant) {
  const size = variant === 'european' ? 10 : 8

  function createInitialBoard(v) {
    const s = v === 'european' ? 10 : 8
    const board = Array.from({ length: s }, () => Array(s).fill(null))
    const rows = v === 'european' ? 4 : 3
    // White (opponent) at top rows, Red (player) at bottom rows
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < s; c++) {
        if ((r + c) % 2 === 1) board[r][c] = { color: 'white', isKing: false }
      }
    }
    for (let r = s - rows; r < s; r++) {
      for (let c = 0; c < s; c++) {
        if ((r + c) % 2 === 1) board[r][c] = { color: 'red', isKing: false }
      }
    }
    return board
  }

  const [board, setBoard] = useState(() => createInitialBoard(variant))
  const [currentTurn, setCurrentTurn] = useState('red')
  const [selectedPiece, setSelectedPiece] = useState(null)
  const [validMoves, setValidMoves] = useState([])
  const [capturedRed, setCapturedRed] = useState(0)
  const [capturedWhite, setCapturedWhite] = useState(0)
  const [gameStatus, setGameStatus] = useState('playing')
  const [mustCapture, setMustCapture] = useState(false)
  const [lastMove, setLastMove] = useState(null)
  const [chainCapture, setChainCapture] = useState(null)

  const computeCaptures = useCallback((b, r, c, piece, v, excludes = []) => {
    const s = v === 'european' ? 10 : 8
    const opponent = piece.color === 'red' ? 'white' : 'red'
    const results = []
    const allDirs = [{ dr: -1, dc: -1 }, { dr: -1, dc: 1 }, { dr: 1, dc: -1 }, { dr: 1, dc: 1 }]

    let dirs
    if (piece.isKing) {
      dirs = allDirs
    } else {
      // Men can capture in ALL 4 diagonal directions (standard UK/African/European rules)
      dirs = allDirs
    }

    const isFlying = piece.isKing && (v === 'african' || v === 'european')

    if (isFlying) {
      for (const { dr, dc } of dirs) {
        let nr = r + dr
        let nc = c + dc
        let foundOpponent = null
        let foundOpponentPos = null
        while (nr >= 0 && nr < s && nc >= 0 && nc < s) {
          const cell = b[nr][nc]
          if (cell) {
            if (cell.color === opponent && !excludes.some(e => e.row === nr && e.col === nc)) {
              if (foundOpponent) break
              foundOpponent = cell
              foundOpponentPos = { row: nr, col: nc }
            } else {
              break
            }
          } else if (foundOpponent) {
            results.push({
              row: nr,
              col: nc,
              captures: [{ row: foundOpponentPos.row, col: foundOpponentPos.col }],
              path: [{ row: nr, col: nc }]
            })
          }
          nr += dr
          nc += dc
        }
      }
    } else {
      for (const { dr, dc } of dirs) {
        const mr = r + dr
        const mc = c + dc
        const lr = r + 2 * dr
        const lc = c + 2 * dc
        if (mr >= 0 && mr < s && mc >= 0 && mc < s && lr >= 0 && lr < s && lc >= 0 && lc < s) {
          const mid = b[mr][mc]
          const land = b[lr][lc]
          if (mid && mid.color === opponent && !excludes.some(e => e.row === mr && e.col === mc) && !land) {
            results.push({
              row: lr,
              col: lc,
              captures: [{ row: mr, col: mc }],
              path: [{ row: lr, col: lc }]
            })
          }
        }
      }
    }
    return results
  }, [])

  function getCaptureChainsFrom(b, r, c, piece, v, alreadyCaptured = []) {
    const immediateCaptures = computeCaptures(b, r, c, piece, v, alreadyCaptured)
    if (immediateCaptures.length === 0) return [{ row: r, col: c, captures: alreadyCaptured, path: [] }]

    const chains = []
    for (const move of immediateCaptures) {
      const newCaptured = [...alreadyCaptured, ...move.captures]
      const tempBoard = b.map(row => row.map(cell => cell ? { ...cell } : null))
      for (const cap of move.captures) tempBoard[cap.row][cap.col] = null
      tempBoard[move.row][move.col] = piece
      tempBoard[r][c] = null
      const subChains = getCaptureChainsFrom(tempBoard, move.row, move.col, piece, v, newCaptured)
      for (const chain of subChains) {
        chains.push({
          row: chain.row,
          col: chain.col,
          captures: chain.captures,
          path: [{ row: move.row, col: move.col }, ...chain.path]
        })
      }
    }
    return chains
  }

  const getValidMovesForPiece = useCallback((b, r, c, piece, v) => {
    const s = v === 'european' ? 10 : 8
    const allDirs = [{ dr: -1, dc: -1 }, { dr: -1, dc: 1 }, { dr: 1, dc: -1 }, { dr: 1, dc: 1 }]
    let moveDirs
    if (piece.isKing) {
      moveDirs = allDirs
    } else if (v === 'european') {
      moveDirs = allDirs
    } else {
      moveDirs = piece.color === 'red'
        ? [{ dr: -1, dc: -1 }, { dr: -1, dc: 1 }]   // red moves up (toward row 0)
        : [{ dr: 1, dc: -1 }, { dr: 1, dc: 1 }]      // white moves down (toward last row)
    }

    const isFlying = piece.isKing && (v === 'african' || v === 'european')
    const simples = []

    if (isFlying) {
      for (const { dr, dc } of moveDirs) {
        let nr = r + dr
        let nc = c + dc
        while (nr >= 0 && nr < s && nc >= 0 && nc < s && !b[nr][nc]) {
          simples.push({ row: nr, col: nc, captures: [], path: [{ row: nr, col: nc }] })
          nr += dr
          nc += dc
        }
      }
    } else {
      for (const { dr, dc } of moveDirs) {
        const nr = r + dr
        const nc = c + dc
        if (nr >= 0 && nr < s && nc >= 0 && nc < s && !b[nr][nc]) {
          simples.push({ row: nr, col: nc, captures: [], path: [{ row: nr, col: nc }] })
        }
      }
    }

    const captureChains = getCaptureChainsFrom(b, r, c, piece, v)
    const hasCaptures = captureChains.some(ch => ch.captures.length > 0)
    if (hasCaptures) {
      const chains = captureChains.filter(ch => ch.captures.length > 0)
      return chains.map(ch => ({ row: ch.row, col: ch.col, captures: ch.captures, path: ch.path }))
    }
    return simples
  }, [getCaptureChainsFrom])

  const computeAllMoves = useCallback((b, color, v) => {
    const s = v === 'european' ? 10 : 8
    const allCaptures = []
    const allSimples = []

    for (let r = 0; r < s; r++) {
      for (let c = 0; c < s; c++) {
        const piece = b[r][c]
        if (!piece || piece.color !== color) continue
        const moves = getValidMovesForPiece(b, r, c, piece, v)
        for (const m of moves) {
          if (m.captures.length > 0) allCaptures.push({ from: { row: r, col: c }, ...m })
          else allSimples.push({ from: { row: r, col: c }, ...m })
        }
      }
    }

    if (allCaptures.length > 0) {
      if (v === 'european') {
        const maxCaps = Math.max(...allCaptures.map(m => m.captures.length))
        return allCaptures.filter(m => m.captures.length === maxCaps)
      }
      return allCaptures
    }
    return allSimples
  }, [getValidMovesForPiece])

  const checkWin = useCallback((b, justMoved, v) => {
    const opponent = justMoved === 'red' ? 'white' : 'red'
    const s = v === 'european' ? 10 : 8
    let opponentPieces = 0
    for (let r = 0; r < s; r++)
      for (let c = 0; c < s; c++)
        if (b[r][c] && b[r][c].color === opponent) opponentPieces++
    if (opponentPieces === 0) return justMoved
    const opponentMoves = computeAllMoves(b, opponent, v)
    if (opponentMoves.length === 0) return justMoved
    return null
  }, [computeAllMoves])

  const getMovesForSquare = useCallback((b, r, c, color, v) => {
    const piece = b[r][c]
    if (!piece || piece.color !== color) return []
    const allMoves = computeAllMoves(b, color, v)
    const mustCap = allMoves.length > 0 && allMoves[0].captures.length > 0
    if (mustCap) {
      return allMoves
        .filter(m => m.from.row === r && m.from.col === c && m.captures.length > 0)
        .map(m => ({ row: m.row, col: m.col, captures: m.captures, path: m.path }))
    }
    return getValidMovesForPiece(b, r, c, piece, v)
  }, [computeAllMoves, getValidMovesForPiece])

  const handleSquareClick = useCallback((row, col) => {
    if (gameStatus !== 'playing') return

    const cell = board[row][col]

    if (chainCapture) {
      const isValid = validMoves.find(m => m.row === row && m.col === col)
      if (!isValid) return
      const newBoard = board.map(r => r.map(c => c ? { ...c } : null))
      const piece = newBoard[chainCapture.row][chainCapture.col]
      for (const cap of isValid.captures) newBoard[cap.row][cap.col] = null
      newBoard[row][col] = piece
      newBoard[chainCapture.row][chainCapture.col] = null

      const s = variant === 'european' ? 10 : 8
      const wasKing = piece.isKing
      if (!wasKing) {
        if (piece.color === 'red' && row === 0) piece.isKing = true        // red moves up, promotes at top
        if (piece.color === 'white' && row === s - 1) piece.isKing = true  // white moves down, promotes at bottom
      }
      newBoard[row][col] = piece

      const newCapturedRed = capturedRed + isValid.captures.filter(cap => board[cap.row][cap.col]?.color === 'red').length
      const newCapturedWhite = capturedWhite + isValid.captures.filter(cap => board[cap.row][cap.col]?.color === 'white').length

      if (piece.isKing || wasKing) {
        const furtherCaptures = computeCaptures(newBoard, row, col, piece, variant, [])
        if (furtherCaptures.length > 0 && !piece.isKing !== wasKing) {
          const chains = getCaptureChainsFrom(newBoard, row, col, piece, variant)
          const validChains = chains.filter(ch => ch.captures.length > 0)
          if (validChains.length > 0) {
            setBoard(newBoard)
            setCapturedRed(newCapturedRed)
            setCapturedWhite(newCapturedWhite)
            setChainCapture({ row, col })
            setValidMoves(validChains.map(ch => ({ row: ch.row, col: ch.col, captures: ch.captures, path: ch.path })))
            setLastMove({ from: chainCapture, to: { row, col } })
            return
          }
        }
      }

      const furtherCaptures = getCaptureChainsFrom(newBoard, row, col, piece, variant)
        .filter(ch => ch.captures.length > 0)
      if (furtherCaptures.length > 0 && !piece.isKing) {
        setBoard(newBoard)
        setCapturedRed(newCapturedRed)
        setCapturedWhite(newCapturedWhite)
        setChainCapture({ row, col })
        setValidMoves(furtherCaptures.map(ch => ({ row: ch.row, col: ch.col, captures: ch.captures, path: ch.path })))
        setLastMove({ from: chainCapture, to: { row, col } })
        return
      }

      const winner = checkWin(newBoard, currentTurn, variant)
      setBoard(newBoard)
      setCapturedRed(newCapturedRed)
      setCapturedWhite(newCapturedWhite)
      setChainCapture(null)
      setSelectedPiece(null)
      setValidMoves([])
      setLastMove({ from: chainCapture, to: { row, col } })
      if (winner) {
        setGameStatus(winner === 'red' ? 'red_wins' : 'white_wins')
      } else {
        setCurrentTurn(t => t === 'red' ? 'white' : 'red')
        const allMoves = computeAllMoves(newBoard, currentTurn === 'red' ? 'white' : 'red', variant)
        setMustCapture(allMoves.length > 0 && allMoves[0].captures.length > 0)
      }
      return
    }

    if (cell && cell.color === currentTurn) {
      const moves = getMovesForSquare(board, row, col, currentTurn, variant)
      setSelectedPiece({ row, col })
      setValidMoves(moves)
      return
    }

    if (selectedPiece) {
      const isValid = validMoves.find(m => m.row === row && m.col === col)
      if (!isValid) {
        setSelectedPiece(null)
        setValidMoves([])
        return
      }

      const newBoard = board.map(r => r.map(c => c ? { ...c } : null))
      const piece = { ...newBoard[selectedPiece.row][selectedPiece.col] }

      for (const cap of isValid.captures) newBoard[cap.row][cap.col] = null
      newBoard[row][col] = piece
      newBoard[selectedPiece.row][selectedPiece.col] = null

      const s = variant === 'european' ? 10 : 8
      const wasKing = piece.isKing
      if (!wasKing) {
        if (piece.color === 'red' && row === 0) piece.isKing = true
        if (piece.color === 'white' && row === s - 1) piece.isKing = true
      }
      newBoard[row][col] = piece

      const newCapturedRed = capturedRed + isValid.captures.filter(cap => board[cap.row][cap.col]?.color === 'red').length
      const newCapturedWhite = capturedWhite + isValid.captures.filter(cap => board[cap.row][cap.col]?.color === 'white').length

      if (isValid.captures.length > 0 && !piece.isKing) {
        const furtherCaptures = getCaptureChainsFrom(newBoard, row, col, piece, variant)
          .filter(ch => ch.captures.length > 0)
        if (furtherCaptures.length > 0) {
          setBoard(newBoard)
          setCapturedRed(newCapturedRed)
          setCapturedWhite(newCapturedWhite)
          setChainCapture({ row, col })
          setValidMoves(furtherCaptures.map(ch => ({ row: ch.row, col: ch.col, captures: ch.captures, path: ch.path })))
          setLastMove({ from: selectedPiece, to: { row, col } })
          setSelectedPiece(null)
          return
        }
      }

      const winner = checkWin(newBoard, currentTurn, variant)
      setBoard(newBoard)
      setCapturedRed(newCapturedRed)
      setCapturedWhite(newCapturedWhite)
      setSelectedPiece(null)
      setValidMoves([])
      setChainCapture(null)
      setLastMove({ from: selectedPiece, to: { row, col } })
      if (winner) {
        setGameStatus(winner === 'red' ? 'red_wins' : 'white_wins')
      } else {
        const nextTurn = currentTurn === 'red' ? 'white' : 'red'
        setCurrentTurn(nextTurn)
        const allMoves = computeAllMoves(newBoard, nextTurn, variant)
        setMustCapture(allMoves.length > 0 && allMoves[0].captures.length > 0)
      }
    }
  }, [board, currentTurn, selectedPiece, validMoves, gameStatus, variant, chainCapture,
    capturedRed, capturedWhite, getMovesForSquare, getCaptureChainsFrom, computeCaptures,
    computeAllMoves, checkWin])

  const resetGame = useCallback(() => {
    setBoard(createInitialBoard(variant))
    setCurrentTurn('red')
    setSelectedPiece(null)
    setValidMoves([])
    setCapturedRed(0)
    setCapturedWhite(0)
    setGameStatus('playing')
    setMustCapture(false)
    setLastMove(null)
    setChainCapture(null)
  }, [variant])

  return {
    board, currentTurn, selectedPiece, validMoves, capturedRed, capturedWhite,
    gameStatus, mustCapture, lastMove, chainCapture, handleSquareClick, resetGame, size
  }
}

/* ---------------------------------------------
  VARIANT SELECTOR
--------------------------------------------- */
function VariantSelector({ onStart }) {
  const [selected, setSelected] = useState('uk')
  const [stake] = useState(10000)

  const variants = [
    {
      id: 'uk',
      name: 'UK / English',
      icon: '🇬🇧',
      desc: '8×8 board, kings move 1 square, forward captures only',
      detail: 'Classic British rules. Pieces move forward only. Kings move one diagonal square in any direction.'
    },
    {
      id: 'african',
      name: 'African',
      icon: '🌍',
      desc: '8×8 board, kings fly multiple squares, forward captures',
      detail: 'Popular across Africa. Same as English rules but kings slide like a bishop — powerful endgames.'
    },
    {
      id: 'european',
      name: 'European / International',
      icon: '🏆',
      desc: '10×10 board, flying kings, men capture backwards, max capture rule',
      detail: 'Championship standard. Larger board, men can capture in all directions, maximum capture is mandatory.'
    }
  ]

  return (
    <div className="dg-variant-selector">
      <div className="dg-vs-header">
        <div className="dg-vs-icon">♟</div>
        <h1 className="dg-vs-title">Draughts</h1>
        <p className="dg-vs-subtitle">Choose your variant to start playing</p>
      </div>

      <div className="dg-vs-cards">
        {variants.map(v => (
          <button
            key={v.id}
            className={`dg-vs-card${selected === v.id ? ' selected' : ''}`}
            onClick={() => setSelected(v.id)}
          >
            <div className="dg-vs-card-icon">{v.icon}</div>
            <div className="dg-vs-card-name">{v.name}</div>
            <div className="dg-vs-card-desc">{v.desc}</div>
            <div className="dg-vs-card-detail">{v.detail}</div>
            {selected === v.id && <div className="dg-vs-check">✓</div>}
          </button>
        ))}
      </div>

      <div className="dg-vs-stake">
        <div className="dg-vs-stake-label">Entry Stake</div>
        <div className="dg-vs-stake-amount">UGX {stake.toLocaleString()}</div>
        <div className="dg-vs-stake-prize">Prize Pool: UGX {(stake * 1.8).toLocaleString()}</div>
      </div>

      <button className="dg-vs-start-btn" onClick={() => onStart(selected)}>
        Start Game
      </button>
    </div>
  )
}

/* ---------------------------------------------
  TIMER HOOK
--------------------------------------------- */
function useTimer(isActive) {
  const [seconds, setSeconds] = useState(600)
  const prevActive = useRef(isActive)

  useEffect(() => {
    if (!isActive) return
    const id = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [isActive])

  useEffect(() => {
    if (isActive && !prevActive.current) {
      // turn started, don't reset — keep accumulating
    }
    prevActive.current = isActive
  }, [isActive])

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
  return { display: fmt(seconds), seconds }
}

/* ---------------------------------------------
  PLAYER CARD
--------------------------------------------- */
function PlayerCard({ name, initials, rank, color, isActive, capturedCount, captureColor, isOpponent }) {
  const { display, seconds } = useTimer(isActive)
  const rankColors = { Diamond: '#00cfff', Gold: '#ffd700', Silver: '#aaa', Bronze: '#cd7f32' }
  const timerCls = seconds < 60 ? 'dg-timer danger' : seconds < 180 ? 'dg-timer warning' : 'dg-timer'
  const [aboutOpen, setAboutOpen] = useState(false)

  const stats = isOpponent
    ? { matches: 142, wins: 98, winRate: '69%', titles: ['🏆 MTN Cup 2025', '🥇 Weekly Cup #8'] }
    : { matches: 89,  wins: 61, winRate: '69%', titles: ['🥇 MTN Cup 2026', '🥈 Community League'] }

  return (
    <div className={`dg-player-card${isActive ? ' active' : ''}`}>
      <div className="dg-player-top">
        <div className={`dg-avatar dg-avatar-${color}`}>{initials}</div>
        <div className="dg-player-info">
          <div className="dg-player-name">{name}</div>
          <div className="dg-rank-badge" style={{ color: rankColors[rank] || '#fff' }}>
            {rank === 'Diamond' ? '💎' : rank === 'Gold' ? '🥇' : rank === 'Silver' ? '🥈' : '🥉'} {rank}
          </div>
        </div>
        <div className={timerCls}>{display}</div>
      </div>

      {/* About Player dropdown */}
      <button className="dg-about-toggle" onClick={() => setAboutOpen(o => !o)}>
        <span>About Player</span>
        <span className={`dg-about-chevron${aboutOpen ? ' open' : ''}`}>▾</span>
      </button>
      {aboutOpen && (
        <div className="dg-about-panel">
          <div className="dg-about-row"><span>Matches</span><span>{stats.matches}</span></div>
          <div className="dg-about-row"><span>Wins</span><span>{stats.wins}</span></div>
          <div className="dg-about-row"><span>Win Rate</span><span>{stats.winRate}</span></div>
          <div className="dg-about-titles">
            <span className="dg-about-titles-lbl">Titles</span>
            {stats.titles.map(t => <div key={t} className="dg-about-title-item">{t}</div>)}
          </div>
        </div>
      )}

      <div className="dg-captured-row">
        <span className="dg-captured-label">Captured:</span>
        {Array.from({ length: capturedCount }).map((_, i) => (
          <div key={i} className={`dg-captured-pip dg-pip-${captureColor}`} />
        ))}
        <span className="dg-captured-num">{capturedCount}</span>
      </div>
    </div>
  )
}

/* ---------------------------------------------
  BOARD
--------------------------------------------- */
function Board({ board, size, selectedPiece, validMoves, lastMove, onSquareClick, variant, chainCapture }) {
  const darkColor = '#5c3317'
  const lightColor = '#f0c070'

  const isSelected = (r, c) => selectedPiece && selectedPiece.row === r && selectedPiece.col === c
  const isChain = (r, c) => chainCapture && chainCapture.row === r && chainCapture.col === c
  const isValidMove = (r, c) => validMoves.some(m => m.row === r && m.col === c)
  const isLastMove = (r, c) => lastMove && (
    (lastMove.from.row === r && lastMove.from.col === c) ||
    (lastMove.to.row === r && lastMove.to.col === c)
  )

  const squareSize = size === 10 ? 52 : 64
  const colLabels = size === 10
    ? ['A','B','C','D','E','F','G','H','I','J']
    : ['A','B','C','D','E','F','G','H']
  const rowLabels = size === 10
    ? ['1','2','3','4','5','6','7','8','9','10']
    : ['1','2','3','4','5','6','7','8']

  const boardGrid = (
    <div
      className="dg-board"
      style={{
        gridTemplateColumns: `repeat(${size}, ${squareSize}px)`,
        gridTemplateRows: `repeat(${size}, ${squareSize}px)`
      }}
    >
      {Array.from({ length: size }).map((_, r) =>
        Array.from({ length: size }).map((_, c) => {
          const isDark = (r + c) % 2 === 1
          const piece = board[r][c]
          const selected = isSelected(r, c) || isChain(r, c)
          const validTarget = isValidMove(r, c)
          const lastMv = isLastMove(r, c)

          let bg = isDark ? darkColor : lightColor
          if (lastMv && isDark) bg = '#7a4520'

          return (
            <div
              key={`${r}-${c}`}
              className="dg-square"
              style={{
                width: squareSize,
                height: squareSize,
                background: bg,
                boxShadow: selected ? 'inset 0 0 0 3px #0a84ff, inset 0 0 12px rgba(10,132,255,0.4)' : undefined
              }}
              onClick={() => onSquareClick(r, c)}
            >
              {piece && (
                <div
                  className={`dg-piece${selected ? ' dg-piece-selected' : ''}`}
                  style={{
                    background: piece.color === 'red'
                      ? 'radial-gradient(circle at 35% 35%, #ff4422, #cc2200)'
                      : 'radial-gradient(circle at 35% 35%, #ffffff, #f5f5f5)',
                    border: piece.color === 'red' ? '3px solid #8b0000' : '3px solid #cccccc',
                    boxShadow: piece.color === 'red'
                      ? '0 3px 8px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,100,80,0.4)'
                      : '0 3px 8px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.8)'
                  }}
                >
                  {piece.isKing && (
                    <span className="dg-king-crown">♛</span>
                  )}
                </div>
              )}
              {validTarget && !piece && (
                <div className="dg-move-dot" />
              )}
              {validTarget && piece && piece.color !== (selectedPiece ? board[selectedPiece.row]?.[selectedPiece.col]?.color : null) && (
                <div className="dg-capture-ring" />
              )}
            </div>
          )
        })
      )}
    </div>
  )

  return (
    <div className="dg-board-frame">
      <div className="dg-board-inner-row">
        {boardGrid}
        {/* Side labels (1–8 or 1–10) */}
        <div className="dg-board-labels-side">
          {rowLabels.map((label) => (
            <div
              key={label}
              className="dg-board-label-cell"
              style={{ width: 18, height: squareSize }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
      {/* Bottom labels (A–H or A–J) */}
      <div className="dg-board-labels-bottom">
        {colLabels.map((label) => (
          <div
            key={label}
            className="dg-board-label-cell"
            style={{ width: squareSize, height: 18 }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------------------------------------------
  WIN MODAL
--------------------------------------------- */
function WinModal({ gameStatus, onPlayAgain, onBack, variant }) {
  if (gameStatus === 'playing') return null
  const isDraw = gameStatus === 'draw'
  const winnerIsRed = gameStatus === 'red_wins'
  const winnerName = winnerIsRed ? 'LudoChampion' : 'BoardKing_UG'
  const prize = isDraw ? 0 : winnerIsRed ? 18000 : 0

  return (
    <div className="dg-win-modal-backdrop">
      <div className="dg-win-modal">
        <div className="dg-win-icon">{isDraw ? '🤝' : winnerIsRed ? '🏆' : '😔'}</div>
        <div className="dg-win-title">
          {isDraw ? 'It\'s a Draw!' : winnerIsRed ? 'You Win!' : 'You Lose!'}
        </div>
        <div className="dg-win-subtitle">
          {isDraw
            ? 'Both players played equally well.'
            : winnerIsRed
              ? `${winnerName} wins the match!`
              : `${winnerName} wins this round.`}
        </div>
        {!isDraw && winnerIsRed && (
          <div className="dg-win-prize">
            <span className="dg-win-prize-label">Prize Won</span>
            <span className="dg-win-prize-amount">UGX {prize.toLocaleString()}</span>
          </div>
        )}
        <div className="dg-win-buttons">
          <button className="dg-win-btn-primary" onClick={onPlayAgain}>Play Again</button>
          <button className="dg-win-btn-secondary" onClick={onBack}>Back to Games</button>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------
   RULES POPUP
--------------------------------------------- */
function RulesPopup({ variant, onAcknowledge }) {
  const variantInfo = {
    uk: {
      flag: '🇬🇧',
      name: 'UK / English Draughts',
      desc: 'American/English Draughts is played on an 8×8 board with 12 pieces per side. Men can only move and capture forward. Kings move one square diagonally in any direction. Captures are mandatory — you must jump if a jump is available.'
    },
    african: {
      flag: '🌍',
      name: 'African Draughts',
      desc: 'African Draughts uses an 8×8 board. Men move and capture forward only. Kings (Flying Kings) can move multiple squares diagonally in any direction. Captures are mandatory.'
    },
    european: {
      flag: '🇪🇺',
      name: 'European / International Draughts',
      desc: 'International Draughts is played on a 10×10 board with 20 pieces per side. Men capture in all directions. Kings fly multiple squares diagonally. The player who can make the most captures must do so.'
    }
  }
  const info = variantInfo[variant] || variantInfo.uk

  return (
    <div className="dg-rules-popup-backdrop">
      <div className="dg-rules-popup">
        <div className="dg-rules-popup-flag">{info.flag}</div>
        <h2 className="dg-rules-popup-title">{info.name}</h2>
        <div className="dg-rules-popup-level">Beginner Level</div>
        <p className="dg-rules-popup-desc">{info.desc}</p>
        <button className="dg-rules-popup-btn" onClick={onAcknowledge}>
          I Understand — Let&apos;s Play! ▶
        </button>
      </div>
    </div>
  )
}

/* ---------------------------------------------
   LANDSCAPE PROMPT
--------------------------------------------- */
function LandscapePrompt({ onDismiss, dismissed }) {
  if (dismissed) return null
  return (
    <div className="dg-landscape-prompt">
      <div className="dg-landscape-icon">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="22" y="10" width="28" height="52" rx="6" stroke="white" strokeWidth="3" fill="none"/>
          <rect x="27" y="14" width="18" height="36" rx="2" fill="rgba(255,255,255,0.15)"/>
          <circle cx="36" cy="55" r="3" fill="white" opacity="0.7"/>
          <path d="M10 36 C10 28 14 22 20 18" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 3"/>
          <path d="M62 36 C62 28 58 22 52 18" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 3"/>
          <path d="M6 40 L10 36 L14 40" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="dg-landscape-text">Rotate your phone for the best experience</div>
      <button className="dg-landscape-anyway" onClick={onDismiss}>Play Anyway</button>
    </div>
  )
}

/* ---------------------------------------------
   CHAT PANEL
--------------------------------------------- */
function ChatPanel({ isOpen, onClose }) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, sender: 'BoardKing_UG', text: 'Good luck! 🎲', time: '10:00' },
    { id: 2, sender: 'LudoChampion', text: "Let's go! ♟️", time: '10:00' }
  ])
  const endRef = useRef(null)

  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    if (!message.trim()) return
    const now = new Date()
    const time = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`
    setMessages(m => [...m, { id: Date.now(), sender: 'LudoChampion', text: message.trim(), time }])
    setMessage('')
    setTimeout(() => {
      const replies = ['Nice move!', 'Hmm, interesting...', "You're good!", 'I see what you did there 😏', 'Almost had you!']
      const reply = replies[Math.floor(Math.random() * replies.length)]
      const t = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`
      setMessages(m => [...m, { id: Date.now() + 1, sender: 'BoardKing_UG', text: reply, time: t }])
    }, 1200)
  }

  return (
    <div className={`dg-chat-panel${isOpen ? ' open' : ''}`}>
      <div className="dg-chat-header">
        <span>Chat</span>
        <button className="dg-chat-close" onClick={onClose}>✕</button>
      </div>
      <div className="dg-chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`dg-chat-msg${msg.sender === 'LudoChampion' ? ' dg-chat-msg-mine' : ''}`}>
            <div className="dg-chat-bubble">{msg.text}</div>
            <div className="dg-chat-meta">{msg.sender} · {msg.time}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="dg-chat-input-row">
        <input
          className="dg-chat-input"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Type a message..."
        />
        <button className="dg-chat-send" onClick={send}>Send</button>
      </div>
    </div>
  )
}

/* ---------------------------------------------
  GAME CONTROLS
--------------------------------------------- */
function GameControls({ onResign, onDraw, onChatToggle, chatOpen, gameStatus }) {
  const [confirmResign, setConfirmResign] = useState(false)

  if (gameStatus !== 'playing') return null

  return (
    <div className="dg-controls">
      {confirmResign ? (
        <div className="dg-resign-confirm">
          <span>Resign?</span>
          <button className="dg-btn-danger-sm" onClick={() => { onResign(); setConfirmResign(false) }}>Yes</button>
          <button className="dg-btn-ghost-sm" onClick={() => setConfirmResign(false)}>No</button>
        </div>
      ) : (
        <button className="dg-btn-danger" onClick={() => setConfirmResign(true)}>Resign</button>
      )}
      <button className="dg-btn-warn" onClick={onDraw}>Offer Draw</button>
      <button className={`dg-btn-chat${chatOpen ? ' active' : ''}`} onClick={onChatToggle}>
        💬 Chat
      </button>
    </div>
  )
}

/* ---------------------------------------------
   MAIN DRAUGHTS GAME COMPONENT
--------------------------------------------- */
export default function DraughtsGame() {
  const navigate = useNavigate()
  const [gameStarted, setGameStarted] = useState(false)
  const [rulesAcknowledged, setRulesAcknowledged] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState('uk')

  const [landscapeDismissed, setLandscapeDismissed] = useState(false)

  const {
    board, currentTurn, selectedPiece, validMoves, capturedRed, capturedWhite,
    gameStatus, mustCapture, lastMove, chainCapture, handleSquareClick, resetGame, size
  } = useDraughts(selectedVariant)

  const variantNames = { uk: 'UK / English', african: 'African', european: 'European' }

  // AI opponent (white pieces — simple random move)
  const aiTimerRef = useRef(null)
  useEffect(() => {
    if (!gameStarted || gameStatus !== 'playing' || currentTurn !== 'white') return
    if (aiTimerRef.current) clearTimeout(aiTimerRef.current)
    aiTimerRef.current = setTimeout(() => {
      // Compute all moves for white
      const s = selectedVariant === 'european' ? 10 : 8
      const allCaptures = []
      const allSimples = []
      const dirs4 = [{ dr: -1, dc: -1 }, { dr: -1, dc: 1 }, { dr: 1, dc: -1 }, { dr: 1, dc: 1 }]

      for (let r = 0; r < s; r++) {
        for (let c = 0; c < s; c++) {
          const piece = board[r][c]
          if (!piece || piece.color !== 'white') continue
          // Simple random click approach: find valid squares
          let moveDirs
          if (piece.isKing) {
            moveDirs = dirs4
          } else if (selectedVariant === 'european') {
            moveDirs = dirs4
          } else {
            moveDirs = [{ dr: 1, dc: -1 }, { dr: 1, dc: 1 }]  // white moves down
          }
          const isFlying = piece.isKing && (selectedVariant === 'african' || selectedVariant === 'european')
          // Check captures first
          for (const { dr, dc } of dirs4) {
            if (isFlying) {
              let nr = r + dr, nc = c + dc
              let foundOpp = false, oppR = -1, oppC = -1
              while (nr >= 0 && nr < s && nc >= 0 && nc < s) {
                const cell = board[nr][nc]
                if (cell) {
                  if (cell.color === 'red' && !foundOpp) { foundOpp = true; oppR = nr; oppC = nc }
                  else break
                } else if (foundOpp) {
                  allCaptures.push({ fromR: r, fromC: c, toR: nr, toC: nc })
                }
                nr += dr; nc += dc
              }
            } else {
              const mr = r + dr, mc = c + dc
              const lr = r + 2 * dr, lc = c + 2 * dc
              if (mr >= 0 && mr < s && mc >= 0 && mc < s && lr >= 0 && lr < s && lc >= 0 && lc < s) {
                if (board[mr][mc]?.color === 'red' && !board[lr][lc]) {
                  allCaptures.push({ fromR: r, fromC: c, toR: lr, toC: lc })
                }
              }
            }
          }
          for (const { dr, dc } of moveDirs) {
            if (isFlying) {
              let nr = r + dr, nc = c + dc
              while (nr >= 0 && nr < s && nc >= 0 && nc < s && !board[nr][nc]) {
                allSimples.push({ fromR: r, fromC: c, toR: nr, toC: nc })
                nr += dr; nc += dc
              }
            } else {
              const nr = r + dr, nc = c + dc
              if (nr >= 0 && nr < s && nc >= 0 && nc < s && !board[nr][nc]) {
                allSimples.push({ fromR: r, fromC: c, toR: nr, toC: nc })
              }
            }
          }
        }
      }

      const pool = allCaptures.length > 0 ? allCaptures : allSimples
      if (pool.length === 0) return
      const move = pool[Math.floor(Math.random() * pool.length)]
      handleSquareClick(move.fromR, move.fromC)
      setTimeout(() => handleSquareClick(move.toR, move.toC), 200)
    }, 800)
    return () => { if (aiTimerRef.current) clearTimeout(aiTimerRef.current) }
  }, [gameStarted, currentTurn, gameStatus, board, selectedVariant, handleSquareClick])

  const handleStart = (variant) => {
    setSelectedVariant(variant)
    setRulesAcknowledged(false)
    setGameStarted(true)
  }

  const handleResign = () => {
    // white wins if red resigns
    // This triggers via state in the hook — we simulate by calling a win
    // Since hook doesn't expose setGameStatus directly, we'll just navigate back
    navigate('/games')
  }

  const handleDraw = () => {
    // In a real game this would be negotiated; here we'll just offer and accept
    // For UX purposes, just reset
    if (window.confirm('Offer a draw? (Demo: auto-accept)')) {
      resetGame()
    }
  }

  const handlePlayAgain = () => {
    resetGame()
    setGameStarted(false)
    setRulesAcknowledged(false)
  }

  if (!gameStarted) {
    return (
      <>
        <LandscapePrompt onDismiss={() => setLandscapeDismissed(true)} dismissed={landscapeDismissed} />
        <VariantSelector onStart={handleStart} />
      </>
    )
  }

  const boardSquareSize = selectedVariant === 'european' ? 52 : 64
  const boardPixels = boardSquareSize * size

  return (
    <div className="dg-page">
      {/* TOP BAR */}
      <div className="dg-topbar">
        <div className="dg-topbar-left">
          <button className="dg-back-btn" onClick={() => navigate('/games')}>
            ← Back to Games
          </button>
          <div className="dg-topbar-title">
            Draughts
            <span className="dg-variant-badge">{variantNames[selectedVariant]}</span>
          </div>
        </div>
        <div className="dg-topbar-center">
          🏆 PRIZE POOL: UGX 18,000
        </div>
        <div className="dg-topbar-right">
          Stake: UGX 10,000
        </div>
      </div>

      {/* GAME AREA */}
      <div className="dg-game-area">

        {/* LEFT PANEL — Opponent */}
        <div className="dg-panel">
          <PlayerCard
            name="BoardKing_UG"
            initials="BK"
            rank="Gold"
            color="white"
            isActive={currentTurn === 'white' && gameStatus === 'playing'}
            capturedCount={capturedWhite}
            captureColor="red"
            isOpponent={true}
          />

          <div className="dg-turn-indicator">
            <div className={`dg-turn-dot dg-turn-${currentTurn}`} />
            <span>{currentTurn === 'red' ? 'Your turn' : "Opponent's turn"}</span>
            {mustCapture && <span className="dg-must-capture">Must capture!</span>}
          </div>

          <div className="dg-score-row">
            <div className="dg-score-item">
              <div className="dg-score-pip dg-pip-red" />
              <span>{capturedWhite} taken</span>
            </div>
            <div className="dg-score-item">
              <div className="dg-score-pip dg-pip-white" />
              <span>{capturedRed} taken</span>
            </div>
          </div>

          <GameControls
            onResign={handleResign}
            onDraw={handleDraw}
            onChatToggle={null}
            chatOpen={false}
            gameStatus={gameStatus}
          />

          <div className="dg-rules-hint">
            <div className="dg-rules-title">Rules</div>
            {selectedVariant === 'uk' && <p>Forward moves only. Kings move 1 square. Captures are forced.</p>}
            {selectedVariant === 'african' && <p>Forward moves only. Kings fly multiple squares. Captures are forced.</p>}
            {selectedVariant === 'european' && <p>10×10 board. Men capture in all directions. Kings fly. Max captures mandatory.</p>}
          </div>
        </div>

        {/* BOARD — center */}
        <div className="dg-board-wrap">
          <Board
            board={board}
            size={size}
            selectedPiece={selectedPiece}
            validMoves={validMoves}
            lastMove={lastMove}
            onSquareClick={handleSquareClick}
            variant={selectedVariant}
            chainCapture={chainCapture}
          />
        </div>

        {/* RIGHT PANEL — Player + Chat filling remaining space */}
        <div className="dg-panel dg-panel-right">
          <PlayerCard
            name="LudoChampion"
            initials="LC"
            rank="Diamond"
            color="red"
            isActive={currentTurn === 'red' && gameStatus === 'playing'}
            capturedCount={capturedRed}
            captureColor="white"
            isOpponent={false}
          />

          {/* Chat always visible, fills remaining height */}
          <ChatPanel isOpen={true} onClose={() => {}} />
        </div>

      </div>

      {/* RULES POPUP — shown once after variant selection, before first move */}
      {!rulesAcknowledged && (
        <RulesPopup
          variant={selectedVariant}
          onAcknowledge={() => setRulesAcknowledged(true)}
        />
      )}

      {/* WIN MODAL */}
      <WinModal
        gameStatus={gameStatus}
        onPlayAgain={handlePlayAgain}
        onBack={() => navigate('/games')}
        variant={selectedVariant}
      />

      {/* LANDSCAPE PROMPT — mobile portrait only */}
      <LandscapePrompt onDismiss={() => setLandscapeDismissed(true)} dismissed={landscapeDismissed} />
    </div>
  )
}
