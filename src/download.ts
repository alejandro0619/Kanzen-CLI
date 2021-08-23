import { createWriteStream,  mkdirSync, statSync, existsSync } from 'fs';  
import { join, resolve as _resolve } from 'path';
import axios from 'axios';

export default class DownloadBook {
  async downloadBook(url: string, name: string) {
    const homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
    const desktopPath = existsSync(join(<string>homedir, '/Desktop')) ? join(<string>homedir, '/Desktop') : join(<string>homedir, '/Escritorio');
    console.log(desktopPath)
    const bookFolderPath = desktopPath.concat(`/Books/`);
    try {
      
      if (statSync(bookFolderPath)) {
      const writer = createWriteStream(`${bookFolderPath}/${name}`);
      const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
      });
      response.data.pipe(writer);
      writer.on('finish', () => console.log(`✔️downloaded successfully. Check your folder ${bookFolderPath} ✔️`));
      writer.on('error', () => console.error(`⚠️Whoops! An error ocurred while downloading ${name}. Try again ⚠️`));
    }
    } catch (e) {
      mkdirSync(bookFolderPath);
      this.downloadBook(url, name)
    }
  }
}

