import BankOptions from '../bankInterfaces'
import axios from 'axios'
import * as cheerio from 'cheerio'

class Galicia {

  readonly url: string;

  constructor () {
    this.url = "https://bit.ly/2wWvApx"
  }

  run () : Promise<BankOptions> {
    return axios.get(this.url)
    .then(response => {
      const result = response.data
      let buy = parseFloat(result.buy.replace(',', '.'));
      let sell = parseFloat(result.sell.replace(',', '.'));

      return {
        name: 'Galicia',
        url: 'https://bit.ly/3oiopB5',
        buy: buy,
        sell: sell
      }
    })
    .catch(err => {
      return {
        name: 'Galicia',
        url: 'https://bit.ly/3oiopB5',
        buy: 0,
        sell: 0
      }
    })
  }
}

export default Galicia
