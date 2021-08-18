import {
	Application,
	Context,
	Router,
  } from "https://deno.land/x/oak@v6.4.2/mod.ts";
  import { parse } from 'https://deno.land/std/flags/mod.ts';
  
  import { Board } from "./classes/board.ts";
  import { BattleSnake } from "./classes/battleSnake.ts";
  import { Game } from "./classes/game.ts";
  
  async function handleIndex({ response }: Context) {
	var battlesnakeInfo = {
	  apiversion: "1",
	  author: "",
	  color: "#888888",
	  head: "default",
	  tail: "default",
	};
	response.body = battlesnakeInfo;
  }
  
  async function handleStart({ request, response }: Context) {
	const body = request.body({ type: "json" });
	const gameData = await body.value;
  
	console.log("START");
	response.body = "ok";
  }
  
  async function handleMove({ request, response }: Context) {
	const body = request.body({ type: "json" });
	const gameData = await body.value;
	const snake = new BattleSnake(gameData?.you as any);
	const board = new Board(gameData?.board);
	const move = snake.findMove(board);
	console.log("MOVE: " + move);
	response.body = { move };
  }
  
  async function handleEnd({ request, response }: Context) {
	const body = request.body({ type: "json" });
	const gameData = await body.value;
  
	console.log("END");
	response.body = "ok";
  }
  
  const router = new Router();
  router
	.get("/", handleIndex)
	.post("/start", handleStart)
	.post("/move", handleMove)
	.post("/end", handleEnd);
  
  const app = new Application();
  app.use(router.routes());
  app.use(router.allowedMethods());

  const { args } = Deno;
  const DEFAULT_PORT = 8000;
  const argPort = parse(args).port;

  
  await app.listen({port: argPort ? Number(argPort) : DEFAULT_PORT });
  