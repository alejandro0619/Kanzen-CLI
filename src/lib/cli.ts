import inquirer from 'inquirer';
import IBooks from '../interfaces/IBooks.js';
import { Commands } from '../utils/Commands.js';
import LibGen from './search.js'
import sanitizeArray from '../utils/sanitizeArray.js';
import Scrapper from './scrapper/scrapper.js';
import convertFileSize from '../utils/convertFileSize.js';
import IInfo from '../interfaces/IshowInfo.js';
import DownloadBook from '../download.js';
export default class Books{

  private async input() {
    try {
    const answers: {} = await inquirer.prompt({
      type: 'input',
      name: 'search',
      message: '🔎 Enter a query to search🔍'
    });
      if (answers['search'] !== '') {
      console.log(` Please wait, searching for ${answers['search']}...`);
        const Libgen = new LibGen();
        const books:IBooks[] = <IBooks[]>await Libgen.searchBookByTitle(answers['search']);
        const booksName = sanitizeArray(books.map(x => x.title.toLocaleLowerCase()));
        const selectBook = await inquirer.prompt({
          message: ' I want to download: ',
          type: 'list',
          name: 'title',
          choices: booksName
        });

        const bookToDownload = books.filter(el => el.title.toLocaleLowerCase() === selectBook.title)[0];
        const ScrapperClass = new Scrapper(bookToDownload.downloadLink);
        const getPDFLink = await ScrapperClass.getPDFLink();
        console.clear()
        const info = this.showInfo({
          title: selectBook.title,
          desc: bookToDownload.desc,
          ext: getPDFLink.extension,
          fileSize: `${convertFileSize(bookToDownload.size)} MB`
        });
        console.log(info);
        const confirmToDownload = await inquirer.prompt({
          type: 'list',
          name: 'confirm',
          message: `➡️ Confirm to download: ${selectBook.title}`,
          choices: ['✔️ Yes']
        });
        switch (confirmToDownload['confirm']) {
          case '✔️ Yes': await this.download(getPDFLink.pdfLink, `${selectBook.title}${getPDFLink.extension}`)
        }
      } else {
          console.log('Please, enter a query to search.');
        }
    }
    catch (err) {
      console.error('Couldn\'t find a book by the query you enter');
      
    }
  }
  private showInfo(params: IInfo): string {
    const {
      title,
      desc,
      ext,
      fileSize } = params;
    
    return ` ➡️${title} Information: \n✅ Description: ${desc} \n✅ Extension: ${ext} \n✅ Size: ${fileSize}`
  }

  private async download(link: string, name: string): Promise<void> {
    const DownloadBookClass = new DownloadBook();
    await DownloadBookClass.downloadBook(link, name);
  }

  public async search() {
    const answers: {} = await inquirer.prompt({
      message: '📖 Search a book by 📖',
      type: 'list',
      name: 'command',
      choices: Object.values(Commands)
    });
    switch (answers['command']) {
      case Commands.Query: await this.input();
        break;
      case Commands.Exit: console.log(`👊 Bye 👊`);
    }
  }
}
const books = new Books();
const resp = await books.search()
