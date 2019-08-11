import Exchange, { IExchange } from '../models/exchange'
import BankOptions from './bankInterfaces';

import Nacion from './fetchers/nacion'
import Santander from './fetchers/santander'
import BBVA from './fetchers/bbva'
import Galicia from './fetchers/galicia'
import Supervielle from './fetchers/supervielle'
import ICBC from './fetchers/icbc'

class FetchNewExchangeService {

  constructor() {}

  run() : Promise<IExchange> {
    let promises : Promise<BankOptions>[] = [
      new Nacion().run(),
      new Santander().run(),
      new BBVA().run(),
      new Galicia().run(),
      new Supervielle().run(),
      new ICBC().run()
    ];

    return Promise.all(promises)
    .then( (banks : BankOptions[]) => {
      // save record into db
      let exg = { banks };
      const newExchange : IExchange = new Exchange(exg);

      return newExchange.save()
    })
  }
}

export default FetchNewExchangeService;
