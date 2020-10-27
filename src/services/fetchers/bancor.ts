import BankOptions from '../bankInterfaces';
import axios from 'axios';

class Bancor {
  readonly url: string;

  constructor () {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    this.url = 'https://bit.ly/35ENSfE';
  }

  run () : Promise<BankOptions> {
    return axios.get(this.url)
    .then(response => {
      const result = response.data;
      let buy, sell;

      result.forEach( (data : any) => {
        if (data['CurrencyCode'] === 'USD' && data['OperationCode'] === 'MCC') {
          buy = parseFloat(data['Value'].replace(',', '.'))
        }

        if (data['CurrencyCode'] === 'USD' && data['OperationCode'] === 'MCV') {
          sell = parseFloat(data['Value'].replace(',', '.'))
        }
      });

      return {
        name: 'Bancor',
        buy: buy,
        sell: sell
      }
    })
    .catch(err => {
      return {
        name: 'Bancor',
        buy: 0,
        sell: 0
      }
    })
  }
}

export default Bancor
