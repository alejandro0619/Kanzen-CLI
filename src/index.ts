#!/usr/bin/env node
import Books from "./lib/cli.js";

class Main{
  public async start(){
    const Book = new Books();
    await Book.search()
  }
}
const MainClass = new Main();
await MainClass.start();