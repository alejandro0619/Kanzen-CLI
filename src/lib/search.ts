import libgen from 'libgen';
import IBooks from '../interfaces/IBooks.js';
import { arrayToObject } from '../utils/arrToObj.js';
export default class LibGen {

  public async searchBookByTitle(title: string):Promise<IBooks | string> {
    try {
      const availableMirrors = await libgen.mirror();
      const options = {
        mirror: availableMirrors,
        query: title,
        count: 10,
      }
      const response_tmp: IBooks[] = []
      const data = await libgen.search(options);
      let n: number = data.length;
      while (n--) {
         response_tmp.push({
          title: data[n].title,
          author: data[n].author,
          downloadLink: `http://gen.lib.rus.ec/book/index.php?md5=${data[n].md5.toLowerCase()}`
        });
      }
      //cast {} to IBook
      const response = <IBooks>arrayToObject(<[]>response_tmp, 'title');
      return response_tmp.length === 0 ? 'Whoops! Couldn\'t find the book you\'re looking for.' : response;
      
    } catch (err) {
      throw new Error("⚠️ Couldn't reach any book at the moment. Try checking the title. ⚠️")
    }

  }
}
const Libgen = new LibGen();
const books = await Libgen.searchBookByTitle('a');

