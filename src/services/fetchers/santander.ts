import BankOptions from '../bankInterfaces'
import axios from 'axios'
import * as cheerio from 'cheerio'

class Santander {

  readonly url: string;

  constructor () {
    this.url = "https://bit.ly/2O9Mvvm"
  }

  run () : Promise<BankOptions> {
    return axios.get(this.url)
    .then(response => {
      let html : string  = response.data
      const $ = cheerio.load(html);
      const tRow = $('.fortable > table > tbody > tr:nth-child(2)');

      const sanitizedBuy = tRow.find('td:nth-child(2)').text().replace('$', '').replace(',', '.');
      const sanitizedSell = tRow.find('td:nth-child(3)').text().replace('$', '').replace(',', '.');
      const buy : string = parseFloat(sanitizedBuy).toFixed(2);
      const sell : string = parseFloat(sanitizedSell).toFixed(2);

      return {
        name: 'Santander',
        url: 'https://bit.ly/2HpmlGE',
        buy: parseFloat(buy),
        sell: parseFloat(sell)
      }
    })
    .catch(err => {
      return {
        name: 'Santander',
        url: 'https://bit.ly/2HpmlGE',
        buy: 0,
        sell: 0
      }
    })
  }
}

export default Santander
