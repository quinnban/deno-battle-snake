import { Coordinates } from "./coordinates.ts";
import { ChooseMove, Move } from "./moves.ts";
import { Board } from "./board.ts";

export class BattleSnake {
  id: string;
  name: string;
  health: number;
  body: Coordinates[];
  latency: string;
  head: Coordinates;
  length: number;
  shout: string;
  squad: string;

  constructor(snake: BattleSnake) {
    this.id = snake.id;
    this.name = snake.name;
    this.health = snake.health;
    this.body = snake.body;
    this.latency = snake.latency;
    this.head = snake.head;
    this.length = snake.length;
    this.shout = snake.shout;
    this.squad = snake.squad;
  }

  findMove(board: Board): string {
    let possibleMoves = new ChooseMove();
    console.log("dontRunIntoSomething");
    this.dontRunIntoSomething(board.gameBoard, possibleMoves);
    console.log("dontRunIntoTheWalls")
    this.dontRunIntoTheWalls(possibleMoves);
    console.log("findClosestFood")
    this.findClosestFood(board.food, possibleMoves);

    possibleMoves.possibleMoves.sort((a, b) => b.value - a.value);
    return possibleMoves.possibleMoves[0].move;
  }

  private dontRunIntoSomething(gameBoard: string[][],possibleMoves: ChooseMove): void {

    if ((this.head.y -1 >= 0) && gameBoard[this.head.x][this.head.y - 1] === "x") {
      possibleMoves.possibleMoves.find((x) => x.move === Move.down)!.value -= 11;
    }

    if ( (this.head.y +1 <= 10) && gameBoard[this.head.x][this.head.y + 1] === "x") {
      possibleMoves.possibleMoves.find((x) => x.move === Move.up)!.value -= 11;
    }

    if ((this.head.x -1 >= 0) && gameBoard[this.head.x - 1][this.head.y] === "x") {
        possibleMoves.possibleMoves.find((x) => x.move === Move.left)!.value -= 11;
    }

    if ((this.head.x +1 <= 10) && gameBoard[this.head.x + 1][this.head.y] === "x") {
      possibleMoves.possibleMoves.find((x) => x.move === Move.right)!.value -= 11;
    }
  }

  private dontRunIntoTheWalls(possibleMoves: ChooseMove): void {
    
    if (this.head.y + 1 > 10) {
      possibleMoves.possibleMoves.find((x) => x.move === Move.up)!.value -= 11;
    }

    
    if (this.head.y - 1 < 0) {
      possibleMoves.possibleMoves.find((x) => x.move === Move.down)!.value -= 11;
    }

    
    if (this.head.x + 1 > 10) {
      possibleMoves.possibleMoves.find((x) => x.move === Move.right)!.value -= 11;
    }

    
    if (this.head.x - 1 < 0) {
      possibleMoves.possibleMoves.find((x) => x.move === Move.left)!.value -= 11;
    }
  }

  private findClosestFood(food: Coordinates[],possibleMoves: ChooseMove): void {
    let closestFood: Coordinates = { x: 0, y: 0 };
    let closestDistance = 1000;
    let distance = 0;
    
    food.forEach((food) => {
        distance = Math.abs(this.head.y - food.y) + Math.abs(this.head.x - food.x);
        if (distance < closestDistance) {
        closestDistance = distance;
        closestFood = food;
        }
    });

    const dx = this.head.x - closestFood.x;
    const dy = this.head.y - closestFood.y;

    if (Math.abs(dx) <= Math.abs(dy)) {
        if(dx=== 0 && dy > 0 ){
            possibleMoves.possibleMoves.find((x) => x.move === Move.down)!.value += 8;
        } else if (dx === 0 && dy < 0) {
            possibleMoves.possibleMoves.find((x) => x.move === Move.up)!.value += 8;
        } else if (dx > 0 && dy > 0) {
            possibleMoves.possibleMoves.find((x) => x.move === Move.left)!.value += 8;
            possibleMoves.possibleMoves.find((x) => x.move === Move.down)!.value += 5;
        } else if (dx > 0 && dy < 0) {
            possibleMoves.possibleMoves.find((x) => x.move === Move.left)!.value += 8;
            possibleMoves.possibleMoves.find((x) => x.move === Move.up)!.value += 5;
        } else if (dx < 0 && dy < 0) {
            possibleMoves.possibleMoves.find((x) => x.move === Move.right)!.value += 8;
            possibleMoves.possibleMoves.find((x) => x.move === Move.up)!.value += 5;
        } else {
            possibleMoves.possibleMoves.find((x) => x.move === Move.right)!.value += 8;
            possibleMoves.possibleMoves.find((x) => x.move === Move.down)!.value += 5;
        }
    } 
    
    if (Math.abs(dy) < Math.abs(dx)) {
        if(dy === 0 && dx < 0){
            possibleMoves.possibleMoves.find((x) => x.move === Move.right)!.value += 8;
        } else if (dy === 0 && dx > 0){
            possibleMoves.possibleMoves.find((x) => x.move === Move.left)!.value += 8;
        } else if (dy > 0 && dx > 0) {
            possibleMoves.possibleMoves.find((x) => x.move === Move.down)!.value += 8;
            possibleMoves.possibleMoves.find((x) => x.move === Move.left)!.value += 5;
        } else if (dy > 0 && dx < 0){
            possibleMoves.possibleMoves.find((x) => x.move === Move.down)!.value += 8;
            possibleMoves.possibleMoves.find((x) => x.move === Move.right)!.value += 5;
        } else if (dy < 0 && dx < 0){
            possibleMoves.possibleMoves.find((x) => x.move === Move.up)!.value += 8;
            possibleMoves.possibleMoves.find((x) => x.move === Move.right)!.value += 5;
        } else {
            possibleMoves.possibleMoves.find((x) => x.move === Move.up)!.value += 8;
            possibleMoves.possibleMoves.find((x) => x.move === Move.left)!.value += 5;
        }
    }
  }
}
