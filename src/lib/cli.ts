import inquirer from 'inquirer';
import IBooks from '../interfaces/IBooks.js';
import { Commands } from '../utils/Commands.js';
import LibGen from './search.js'

export default class Books{

  private async input() {
    try {
    const answers: {} = await inquirer.prompt({
      type: 'input',
      name: 'search',
      message: '🔎 Type the title of the book🔍'
    });
      if (answers['search'] !== '') {
      console.log(`Please wait, searching for ${answers['search']}...`);
        const Libgen = new LibGen();
        const books:IBooks[] = <IBooks[]>await Libgen.searchBookByTitle(answers['search']);
        const booksName = books.map(x => x.title);
        const selectBook = await inquirer.prompt({
          message: '📖 Search a book by 📖',
          type: 'list',
          name: 'title',
          choices: booksName
        });
        const bookToDownload = books.filter(el => el.title === selectBook.title);
        
      } else {
          console.log('Please, enter a query to search.');
        }
    }
    catch (err) {
      throw new Error('An error has ocurred')
    }
  }


  public async search() {
    const answers: {} = await inquirer.prompt({
      message: '📖 Search a book by 📖',
      type: 'list',
      name: 'command',
      choices: Object.values(Commands)
    });
    switch (answers['command']) {
      case Commands.Title: await this.input();
        break;
      case Commands.Exit: console.log(`👊 Bye 👊`);
    }
  }
}
const books = new Books();
const resp = await books.search()
