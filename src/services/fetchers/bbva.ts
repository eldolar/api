import BankOptions from '../bankInterfaces'
import axios from 'axios'
import * as cheerio from 'cheerio'

class BBVA {

  readonly url: string;

  constructor () {
    this.url = "https://bit.ly/2O0wxUt"
  }

  run () : Promise<BankOptions> {
    return axios.get(this.url)
    .then(response => {
      let html : string  = response.data
      const $ = cheerio.load(html);
      const tRow = $('table.tb1 > tbody > tr.tr1');

      const sanitizedBuy = tRow.find('td:nth-child(2) span').text().replace(',', '.');
      const sanitizedSell = tRow.find('td:nth-child(3) span').text().replace(',', '.');
      const buy : string = parseFloat(sanitizedBuy).toFixed(2);
      const sell : string = parseFloat(sanitizedSell).toFixed(2);

      return {
        name: 'BBVA',
        url: 'https://bit.ly/3m5XWF4',
        buy:parseFloat(buy),
        sell: parseFloat(sell)
      }
    })
    .catch(err => {
      return {
        name: 'BBVA',
        url: 'https://bit.ly/3m5XWF4',
        buy: 0,
        sell: 0
      }
    })
  }
}

export default BBVA
