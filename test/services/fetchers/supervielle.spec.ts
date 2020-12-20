import Supervielle from '../../../src/services/fetchers/supervielle'
import BankOptions from '../../../src/services/bankInterfaces'
import { expect } from 'chai'
import * as nock from 'nock'
import * as fs from 'fs'

describe('fetchers/Supervielle', () => {
  it ('extracts the dolar', async () => {
    const fetcher = new Supervielle()
    const page = fs.readFileSync('test/services/data/supervielle_02102018.html')
    
    nock(fetcher.url)
    .get('')
    .reply(200, page, { 'content-type': 'text/html' })
    
    const result : BankOptions = await fetcher.run()
    expect(result.name).to.equal('Supervielle')
    expect(result.buy).to.equal(37.20)
    expect(result.sell).to.equal(39.00)
    expect(result.url).to.equal('https://bit.ly/31FIGH5')
  })

  it ('returns empty values if request get 404', async () => {
    const fetcher = new Supervielle()

    nock(fetcher.url)
    .get('')
    .reply(404, "", { 'content-type': 'text/html' })

    const result : BankOptions = await fetcher.run()
    expect(result.name).to.equal('Supervielle')
    expect(result.buy).to.equal(0)
    expect(result.sell).to.equal(0)
    expect(result.url).to.equal('https://bit.ly/31FIGH5')
  })
})
