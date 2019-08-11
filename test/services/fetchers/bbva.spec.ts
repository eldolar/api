import BBVA from '../../../src/services/fetchers/bbva'
import BankOptions from '../../../src/services/bankInterfaces'
import { expect } from 'chai'
import * as nock from 'nock'
import * as fs from 'fs'

describe('fetchers/bbva', () => {
  it ('extracts the dolar', async () => {
    const fetcher = new BBVA()
    const page = fs.readFileSync('test/services/data/bbva_02102018.html')
    
    nock(fetcher.url)
    .get('')
    .reply(200, page, { 'content-type': 'text/html' })
    
    const result : BankOptions = await fetcher.run()
    expect(result.name).to.equal('BBVA')
    expect(result.buy).to.equal(26.76)
    expect(result.sell).to.equal(28.74)
  })

  it ('returns empty values if request get 404', async () => {
    const fetcher = new BBVA()

    nock(fetcher.url)
    .get('')
    .reply(404, "", { 'content-type': 'text/html' })

    const result : BankOptions = await fetcher.run()
    expect(result.name).to.equal('BBVA')
    expect(result.buy).to.equal(0)
    expect(result.sell).to.equal(0)
  })
})
