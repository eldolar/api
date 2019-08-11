import BankOptions from '../bankInterfaces'
import axios from 'axios'

class ICBC {
  readonly url: string;

  constructor () {
    this.url = "http://bit.ly/2YHE8Ra";
  }

  run () : Promise<BankOptions> {
    return axios.get(this.url)
    .then(response => {
      const result = response.data;

      let buy = parseFloat(result['valorCompra'].replace(',', '.'));
      let sell = parseFloat(result['valorVenta'].replace(',', '.'));

      return {
        name: 'ICBC',
        buy: buy,
        sell: sell
      }
    })
    .catch(err => {
      return {
        name: 'ICBC',
        buy: 0,
        sell: 0
      }
    })
  }
}

export default ICBC
