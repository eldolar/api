import BankOptions from '../bankInterfaces'
import axios from 'axios'
import * as cheerio from 'cheerio'

class Supervielle {

  readonly url: string;

  constructor () {
    this.url = "https://bit.ly/2N0GDZc"
  }

  run () : Promise<BankOptions> {
    return axios.get(this.url)
    .then(response => {
      let html : string  = response.data
      const $ = cheerio.load(html);

      const tRow = $('#gvCotizaciones > tbody > tr:nth-child(2)');

      const sanitizedBuy = tRow.find('td:nth-child(2)').text().replace(',', '.');
      const sanitizedSell = tRow.find('td:nth-child(3)').text().replace(',', '.');
      const buy : string = parseFloat(sanitizedBuy).toFixed(2);
      const sell : string = parseFloat(sanitizedSell).toFixed(2);

      return {
        name: 'Supervielle',
        url: 'https://bit.ly/2TfvDaK',
        buy: parseFloat(buy),
        sell: parseFloat(sell)
      }
    })
    .catch(err => {
      return {
        name: 'Supervielle',
        url: 'https://bit.ly/2TfvDaK',
        buy: 0,
        sell: 0
      }
    })
  }
}

export default Supervielle
