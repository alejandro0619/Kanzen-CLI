import libgen from 'libgen';
import IBooks from '../interfaces/IBooks.js'
export default class LibGen {
  public async searchBookByTitle(title: string):Promise<IBooks[]> {
    try {
      const availableMirrors = await libgen.mirror();
      const options = {
        mirror: availableMirrors,
        query: title,
        count: 10,
      }
      const response: IBooks[] = []
      const data = await libgen.search(options);
      let n = data.length;
      while (n--) {
        response.push({
          title: data[n].title,
          author: data[n].author,
          downloadLink: `http://gen.lib.rus.ec/book/index.php?md5=${data[n].md5.toLowerCase()}`
        });
        return response;
      }
    } catch (err) {
      console.log("⚠️ Couldn't reach any book at the moment. Try checking the title. ⚠️");
      throw new Error(<string>err)
    
    }
  }
}
const Libgen = new LibGen();
const books = await Libgen.searchBookByTitle('Practical Handbook of Genetic Algorithms: Complex Coding Systems, Volume III');
