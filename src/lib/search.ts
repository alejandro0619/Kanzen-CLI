import libgen from 'libgen';

export default class LibGen {
  public async searchBook() {
    const availableMirrors = await libgen.mirror()

    const options = {
      mirror: availableMirrors,
      query: 'coding',
      count: 5,
      sort_by: 'year',
      reverse: true
    }
    try {
      const data = await libgen.search(options)
      let n = data.length
      console.log(`${n} results for "${options.query}"`)
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