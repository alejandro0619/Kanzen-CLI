import inquirer from 'inquirer';
import { Commands } from '../utils/Commands.js';
import LibGen from './search.js'
import IBooks  from '../interfaces/IBooks'
export default class Books{

  private async input():Promise<IBooks[] | void> {
    try {
    const answers: {} = await inquirer.prompt({
      type: 'input',
      name: 'search',
      message: '🔎 Type the title of the book🔍'
    });
      if (answers['search'] !== '') {
      console.log(`searching for ${answers['search']}...\nPlease wait.`);
      const Libgen = new LibGen();
      console.log('worked!')
      return await Libgen.searchBookByTitle(answers['search']);
      } else {
          return console.log('Please, enter a query to search.')
        }
    }
    catch (err) {
      throw new Error('An error has ocurred')
    }
  }
  private async selectABook() {
    const books: IBooks[] | void = await this.input();
    
    
  }

  public async search() {
    const answers: {} = await inquirer.prompt({
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
