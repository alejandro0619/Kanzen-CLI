import { createWriteStream,  mkdirSync, statSync, accessSync } from 'fs';  
import { join, resolve as _resolve } from 'path';
import axios from 'axios';

export default class DownloadBook {
  async downloadBook(url: string, name: string) {
    const homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
    const desktopPath = join(<string>homedir, '/Desktop');
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
      writer.on('finish', () => console.log(`✔️ ${name} downloaded successfully ✔️`));
      writer.on('error', () => console.error(`⚠️Whoops! An error ocurred while downloading ${name}. Try again ⚠️`));
    }
    } catch (e) {
      mkdirSync(bookFolderPath);
      this.downloadBook(url, name)
    }
  }
}

