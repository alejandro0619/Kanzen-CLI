import libgen from 'libgen';

export default class LibGen {
  public async searchBookByTitle(title: string) {
    const availableMirrors = await libgen.mirror();
    const options = {
      mirror: availableMirrors,
      title: title,
      count: 5,
    }
    try {
      const data = await libgen.search(options)
      let n = data.length;
        while (n--){
          console.log('');
          console.log('Title: ' + data[n].title)
          console.log('Author: ' + data[n].author)
          console.log('Download: ' +'http://gen.lib.rus.ec/book/index.php?md5=' + data[n].md5.toLowerCase())
        }
    } catch (err) {
      throw new Error("Couldn't get any book by the params you enter");
  
    }
  }
}
const Libgen = new LibGen();
const books = await Libgen.searchBookByTitle('Douglas Lind');
