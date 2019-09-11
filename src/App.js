import React from 'react';
import './App.css';


const PLAYER_IMG = <img src={require("./assets/x.png")} alt={"com"}  width="100" height="100" />
const COM_IMG = <img src={require("./assets/circle.png")} alt={"com"}  width="100" height="100" />

const COM = "O"
const PLAYER = "X"

// const COM = <img src={x} alt={"com"} width="100" height="100" />
// const PLAYER = <img src={circle} alt={"player"} width="100" height="100"  />

const WinningCombination = [
  [0, 1, 2],
  [0, 3, 6],
	[0, 4, 8],
	[1, 4, 7],
	[2, 5, 8],
	[3, 4, 5],
	[6, 4, 2],
	[6, 7, 8]
]

const EMPTYBOARD = [
  [],[],[],[],[],[],[],[],[]
]


class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      board: [],
      stopped: false
    }
  }

  componentWillMount(){
    this.startGame()
  }

  startGame(){
    this.setState({
      board: Array.from(Array(9).keys())
    })  
  }

  async turnConfirm(cell){
    if (typeof this.state.board[cell] === 'number') {
      await this.turn(cell, PLAYER)
      if (!this.checkWin(this.state.board, PLAYER) && !this.checkDraw()){
        await this.turn(this.betterPosition(), COM);
      }
    }
  }

  emptyCells(){
    return this.state.board.filter(s => typeof s == 'number');
  }

  betterPosition(){
    return this.minimax(this.state.board, COM).index;
    
  }

  checkDraw(){
    if (this.emptyCells().length === 0) {
      this.chooseWinner("Empate!")
      return true;
    }
    return false;
  }

  minimax(newBoard, player) {
    var emptyCells = this.emptyCells();
  
    if (this.checkWin(newBoard, PLAYER)) {
      return {pontos: -10};
    } else if (this.checkWin(newBoard, COM)) {
      return {pontos: 10};
    } else if (emptyCells.length === 0) {
      return {pontos: 0};
    }

    var plays = [];

    var resultado;

    for (var i = 0; i < emptyCells.length; i++) {
      var play = {};
      play.index = newBoard[emptyCells[i]];
      newBoard[emptyCells[i]] = player;
  
      if (player === COM) {
        resultado = this.minimax(newBoard, PLAYER);
        play.pontos = resultado.pontos;
      } else {
        resultado = this.minimax(newBoard, COM);
        play.pontos = resultado.pontos;
      }
  
      newBoard[emptyCells[i]] = play.index;
  
      plays.push(play);
    }
  
    var betterPlay;
    if(player === COM) {
      var highestScore = -10000;
      for(var i = 0; i < plays.length; i++) {
        if (plays[i].pontos > highestScore) {
          highestScore = plays[i].pontos;
          betterPlay = i;
        }
      }
    } else {
      var highestScore = 10000;
      for(var i = 0; i < plays.length; i++) {
        if (plays[i].pontos < highestScore) {
          highestScore = plays[i].pontos;
          betterPlay = i;
        }
      }
    }
  
    return plays[betterPlay];
  }

  chooseWinner(winner){
    alert(winner)
    this.startGame()
  }

  turn(cell, player) {
    console.log(cell, "---", player)
    this.setState(state => {
      const board = state.board.map((item, i) => {
        if (i === cell) {
          return item = player
        }
        else{
          return item
        }
      })

      return {
        board,
      };
      
    })
    // this.state.board[cell] = player;
    let gameWin = this.checkWin(this.state.board, player)
    if(gameWin){
      this.gameOver(gameWin)
    }
  }

  checkWin(board, player) {
    let plays = board.reduce((a,e,i)=>
      (e === player) ? a.concat(i) : a,[]
    );
    let gameWin = null;
    // console.log(plays)
    for (let [index, win] of WinningCombination.entries()) {
      if (win.every(elem => plays.indexOf(elem) > -1)) {
        gameWin = {index: index, player: player};
        break;
      }
    }
    return gameWin;
  }

  gameOver(gameWin) {
   this.chooseWinner(gameWin.player === PLAYER ? "Você venceu!" : "Você perdeu.");
  }


  render(){
    return (
      <div className="App">
        <header>
          <h1>{"Jogo Da Velha"}</h1>
        </header>
        <div style={{pointerEvents: this.state.stopped ? "none" : null}}>
          <table>
          <tbody>
            <tr>
                <td className="game-field" id="0" onClick={() => this.turnConfirm(0)}>
                  {this.state.board[0] === "O" ? COM_IMG : null}
                  {this.state.board[0] === "X" ? PLAYER_IMG : null}
                </td>
                <td className="game-field" id="1" onClick={() => this.turnConfirm(1)}>
                  {this.state.board[1] === "O" ? COM_IMG : null}
                  {this.state.board[1] === "X" ? PLAYER_IMG : null}                </td>
                <td className="game-field" id="2" onClick={() => this.turnConfirm(2)}>
                  {this.state.board[2] === "O" ? COM_IMG : null}
                  {this.state.board[2] === "X" ? PLAYER_IMG : null}
                </td>
            </tr>
            <tr>
                <td className="game-field" id="3" onClick={() => this.turnConfirm(3)}>
                  {this.state.board[3] === "O" ? COM_IMG : null}
                  {this.state.board[3] === "X" ? PLAYER_IMG : null}
                  </td>
                <td className="game-field" id="4" onClick={() => this.turnConfirm(4)}>
                  {this.state.board[4] === "O" ? COM_IMG : null}
                  {this.state.board[4] === "X" ? PLAYER_IMG : null}
                  </td>
                <td className="game-field" id="5" onClick={() => this.turnConfirm(5)}>
                  {this.state.board[5] === "O" ? COM_IMG : null}
                  {this.state.board[5] === "X" ? PLAYER_IMG : null}
                </td>
            </tr>
            <tr>
                <td className="game-field" id="6" onClick={() => this.turnConfirm(6)}>
                  {this.state.board[6] === "O" ? COM_IMG : null}
                  {this.state.board[6] === "X" ? PLAYER_IMG : null}
                </td>
                <td className="game-field" id="7" onClick={() => this.turnConfirm(7)}>
                  {this.state.board[7] === "O" ? COM_IMG : null}
                  {this.state.board[7] === "X" ? PLAYER_IMG : null}
                </td>
                <td className="game-field" id="8" onClick={() => this.turnConfirm(8)}>
                  {this.state.board[8] === "O" ? COM_IMG : null}
                  {this.state.board[8] === "X" ? PLAYER_IMG : null}
                </td>
            </tr>
          </tbody>
      </table>
        </div>
      <div>
        <h3 onClick={()=>this.startGame()}>{"NOVO JOGO"}</h3>
      </div>
        
      </div>
    );
  }
}

export default App;
