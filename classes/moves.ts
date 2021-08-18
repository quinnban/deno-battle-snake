export interface MoveHolder {
    value: number;
    move: Move;
  }
  
  export class ChooseMove {
    possibleMoves: MoveHolder[];
  
    constructor() {
      this.possibleMoves = [
        {
          value: 10,
          move: Move.up,
        },
        {
          value: 10,
          move: Move.down,
        },
        {
          value: 10,
          move: Move.left,
        },
        {
          value: 10,
          move: Move.right,
        },
      ];
    }
  }
  
  export enum Move {
    up = "up",
    down = "down",
    right = "right",
    left = "left",
  }
  