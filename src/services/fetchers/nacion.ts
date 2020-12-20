import BankOptions from '../bankInterfaces'
import axios from 'axios'
import * as cheerio from 'cheerio'

class Nacion {

  readonly url: string;

  constructor () {
    this.url = "https://bit.ly/2NvKhcM"
  }

  run () : Promise<BankOptions> {
    return axios.get(this.url)
    .then(response => {
      let html : string  = response.data
      const $ = cheerio.load(html);
      const tRow = $('#billetes > table > tbody > tr:nth-child(1)');
      const buy : string = parseFloat(tRow.find('td:nth-child(2)').text().replace(',', '.')).toFixed(2);
      const sell : string = parseFloat(tRow.find('td:nth-child(3)').text().replace(',', '.')).toFixed(2);
    
      return {
        name: 'Nación',
        url: "https://bit.ly/35yOxzf",
        buy: parseFloat(buy),
        sell: parseFloat(sell),
      }
    })
    .catch(err => {
      return {
        name: 'Nación',
        url: "https://bit.ly/35yOxzf",
        buy: 0,
        sell: 0,
      }
    })
  }
}

export default Nacion
