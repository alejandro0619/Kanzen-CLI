import cheerio, { Cheerio, CheerioAPI, Element } from 'cheerio';
import axios from 'axios';
import { IGetLibGen, IGetPDFLink } from '../../interfaces/getLibGen.js';

export default class Scrapper {
  private _link: string;
  constructor(link: string) {
    this._link = link;
  }
   private async getLibGen():Promise<IGetLibGen> {
    try {
      const response = await axios({
        url: this._link,
        method: 'GET'
      });
      const $: CheerioAPI= cheerio.load(response.data);
      const body: Cheerio<Element> = $('body');
      return {
        pdf: <string>body.find('td[width="10%"] > a').attr('href'),
        description: <string>body.find('tr[valign="top"] > td[colspan="4"]').text()
      }
    } catch (error) {
      throw new Error(`An error has ocurred: Couldn\'t make a request to the given URL, please try again.`);
    }
  }


  async getPDFLink():Promise<IGetPDFLink> {
    const { pdf, description } = await this.getLibGen()
    try {
      const response = await axios({
        url: pdf,
        method: 'GET'
      });
      const $: CheerioAPI = cheerio.load(response.data);
      const body: Cheerio<Element> = $('body');

      return {
        pdfLink: <string>body.find('h2 > a').attr('href'),
        description: description
      }

    } catch (error) {
      throw new Error(`The pdf link can not be processed, please try again.`)
    }
  }
} 
