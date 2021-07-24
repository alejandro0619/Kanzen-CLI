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
      writer.on('finish', () => console.log('Book downloaded successfully'));
      writer.on('error', () => console.error('Whoops! Couldn\'t download the book. Try again.'));
    }
    } catch (e) {
      mkdirSync(bookFolderPath);
      this.downloadBook(url, name)
    }
  }
}
const Download = new DownloadBook();
const downloadBook = Download.downloadBook('http://31.42.184.140/main/25000/f82414e5c050b3cca9a250d440794aaa/Chrstan%20Hlmann%20-%20Beginning%20JavaScript%20with%20DOM%20Scripting%20and%20Ajax_%20From%20Novice%20to%20Professional-Jones%20%26%20Bartlett%20Publishers%20%282006%29.pdf', 'javascript.pdf')
