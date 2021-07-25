#!/usr/bin/env node
import Books from "./lib/cli.js";


  async function start(){
    const Book = new Books();
    await Book.search()
}
await start();

