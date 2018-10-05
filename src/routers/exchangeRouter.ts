import { Router, Request, Response } from 'express';
import Exchange, { IExchange } from '../models/exchange';
import FetchNewExchangeService from '../services/fetchNewExchangeService';

const router: Router = Router();

// - GET /exchanges/now # returns all exchanges
function exchange(req: Request, res: Response) : void {
  Exchange.findOne({}).sort('-createdAt')
    .then((exchange : IExchange) => {
      const now : Date = new Date();
      const twoHourAgo : Date = new Date(now.getTime() - (120 * 60000));

      if (exchange.createdAt > twoHourAgo) {
        res.send(exchange)
      } else {
        const service : FetchNewExchangeService = new FetchNewExchangeService();
        service.run()
        .then( (exg : IExchange) => {
          res.send(exg)
        })
        .catch( () => {
          res.send({ errors: 'plase try again.'})
        })
      }
    })
    .catch(err => {
      res.send(err)
    })
}

// - GET /exchanges # returns all exchanges
function allExchanges(req: Request, res: Response) : void {
  Exchange.find({})
    .then((exchanges : IExchange[]) => {
      res.send(exchanges)
    })
    .catch(err => {
      res.send(err)
    })
}

// - POST /exchanges # insert new one
function addExchange(req: Request, res: Response) : void {
  const exchange : IExchange = new Exchange(req.body);

  exchange.save()
    .then((data : IExchange) => {
      res.send(data)
    })
    .catch(err => {
      res.send(err)
    })
}

router.get('/now', exchange);
router.get('/', allExchanges);
router.post('/', addExchange);

export default router;
