import { Coordinates } from "./coordinates.ts";
import { BattleSnake } from "./battleSnake.ts";

export class Board {
  height: number;
  width: number;
  food: Coordinates[];
  hazards: Coordinates[];
  snakes: BattleSnake[];
  gameBoard: string[][];

  constructor(board: Board) {
    this.height = board.height;
    this.width = board.width;
    this.food = board.food;
    this.hazards = board.hazards;
    this.snakes = board.snakes;
     this.gameBoard = [];
    for(let i: number = 0; i < 11; i++) {
      this.gameBoard[i] = [];
    }
    this.createGameBoard();
  }
  private createGameBoard() {
    this.snakes.forEach((snake) => {
      snake.body.forEach((point) => {
        this.gameBoard[point.x][point.y] = "x";
      });
    });
    this.food.forEach((food) => {
      this.gameBoard[food.x][food.y] = "o";
    });
  }
}
