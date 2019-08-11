import { Router, Request, Response } from 'express';
import Exchange, { IExchange } from '../models/exchange';
import FetchNewExchangeService from '../services/fetchNewExchangeService';

const router: Router = Router();

/**
 * @api {get} /exchanges/now Request Current exchange information
 * @apiDescription Search the information on DB. It will update the data
 * on DB if the last time it was updated was more than 2 hours ago.
 * @apiName GetExchange
 * @apiGroup Exchange
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *   "banks":[
 *     {
 *       "buy":{"$numberDecimal":"36.7"},
 *       "sell":{"$numberDecimal":"38.5"},"
 *       "name":"Nación"
 *     },
 *     ...
 *   ]
 * }
 */
function exchange(req: Request, res: Response) : void {
  Exchange.findOne({}).sort('-createdAt')
    .then((exchange : IExchange) => {
      const now : Date = new Date();
      const twoHourAgo : Date = new Date(now.getTime() - (120 * 60000));

      if (exchange && exchange.createdAt > twoHourAgo) {
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

/**
 * @api {get} /exchanges/force-update Update the bank information on DB.
 * @apiDescription It updates the bank exchange information on DB.
 * This endpoint doesn't check if the data was updated, it just forces it.
 * Don't use this. It was created in order to update the DB when new a
 * bank is added.
 * @apiName ForceExchange
 * @apiGroup Exchange
 */
function forceExchange(req: Request, res: Response) : void {
  const service : FetchNewExchangeService = new FetchNewExchangeService();
  service.run()
  res.send(200)
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
router.get('/force-update', forceExchange);
router.get('/', allExchanges);
router.post('/', addExchange);

export default router;
