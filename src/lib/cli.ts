import inquirer from 'inquirer';
import { Commands } from '../utils/Commands.js';
import LibGen from './search.js'
export default class Books{

  private async input():Promise<void> {
    console.clear();
    const answers = await inquirer.prompt({
      type: 'input',
      name: 'search',
      message: '🔎 Type the title of the book🔍'
    });
    if (answers['search'] !== '') {
      console.log(answers['search']);
      const Libgen = new LibGen();
      const searchBook = await Libgen.searchBookByTitle(answers['search']);
      console.log(searchBook);
    } else {
      console.log('endpoint')
    }
  }
  public async search() {
    const answers = await inquirer.prompt({
      message: '📖 Search a book by 📖',
      type: 'list',
      name: 'command',
      choices: Object.values(Commands)
    });
    switch (answers['command']) {
      case Commands.Title: await this.input()
    }
  }
}
const books = new Books();
const resp = await books.search()
