import inquirer from 'inquirer';
import IBooks from '../interfaces/IBooks.js';
import { Commands } from '../utils/Commands.js';
import LibGen from './search.js'
import sanitizeArray from '../utils/sanitizeArray.js';
import Scrapper from './scrapper/scrapper.js';
import convertFileSize from '../utils/convertFileSize.js';
import IInfo from '../interfaces/IshowInfo.js';

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
        const booksName = sanitizeArray(books.map(x => x.title.toLocaleLowerCase()));
        const selectBook = await inquirer.prompt({
          message: '📖 Search a book by 📖',
          type: 'list',
          name: 'title',
          choices: booksName
        });

        const bookToDownload = books.filter(el => el.title.toLocaleLowerCase() === selectBook.title)[0];
        const ScrapperClass = new Scrapper(bookToDownload.downloadLink);
        const getPDFLink = await ScrapperClass.getPDFLink();
        const info = this.showInfo({
          title: selectBook.title,
          desc: getPDFLink.description,
          ext: getPDFLink.extension,
          fileSize: convertFileSize(bookToDownload.size)
        });
        console.log(info);
        const confirmToDownload = await inquirer.prompt({
          type: 'list',
          name: 'confirm',
          message: `➡️ Confirm to download: ${answers['search']}`,
          choices: ['⬇️ Download ⬇️']
        });
        switch (confirmToDownload['confirm']) {
          case '⬇️ Download ⬇️': this.download(getPDFLink.pdfLink)
        }
      } else {
          console.log('Please, enter a query to search.');
        }
    }
    catch (err) {
      throw new Error('An error has ocurred');
    }
  }
  private showInfo(params: IInfo): string {
    const {
      title,
      desc,
      ext,
      fileSize } = params;
    
    return `➡️${title} Information:
  ✅ Description: ${desc}
  ✅ Extension: ${ext}
  ✅ Size: ${fileSize}`
  }

  private download(link: string) {
    console.log(link)
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
