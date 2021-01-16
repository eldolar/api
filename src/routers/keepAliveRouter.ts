import { Router, Request, Response } from 'express';
const router: Router = Router();

/**
 * @api {get} / Request to keep it alive.
 * @apiDescription Always return 200
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *    status: 'ok'
 * }
 */
function alive(req: Request, res: Response) : void {
  res
    .status(200)
    .json({status: 'ok'})
}

router.get('/', alive);

export default router;
