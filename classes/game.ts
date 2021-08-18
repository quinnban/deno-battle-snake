export class Game {
    id: string;
    ruleset: RuleSet;
    timeout: number;
  
    constructor(game: Game) {
      this.id = game.id;
      this.ruleset = game.ruleset;
      this.timeout = game.timeout;
    }
  }
  
  class RuleSet {
    name: string;
    version: string;
  
    constructor() {
      this.name = "";
      this.version = "";
    }
  }
  