#!/usr/bin/env node
import Books from "./lib/cli.js";
async function main() {
  const Book = new Books();
  await Book.search()
}
//main()