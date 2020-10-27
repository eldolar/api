import Santander from '../../../src/services/fetchers/santander'
import BankOptions from '../../../src/services/bankInterfaces'
import { expect } from 'chai'
import * as nock from 'nock'
import * as fs from 'fs'

describe('fetchers/santander', () => {
  it ('extracts the dolar', async () => {
    const fetcher = new Santander()
    const page = fs.readFileSync('test/services/data/santander_02102018.html')
    
    nock(fetcher.url)
    .get('')
    .reply(200, page, { 'content-type': 'text/html' })
    
    const result : BankOptions = await fetcher.run()
    expect(result.name).to.equal('Santander')
    expect(result.buy).to.equal(30.48)
    expect(result.sell).to.equal(30.53)
    expect(result.url).to.equal('https://bit.ly/2HpmlGE')
  })

  it ('returns empty values if request get 404', async () => {
    const fetcher = new Santander()

    nock(fetcher.url)
    .get('')
    .reply(404, "", { 'content-type': 'text/html' })

    const result : BankOptions = await fetcher.run()
    expect(result.name).to.equal('Santander')
    expect(result.buy).to.equal(0)
    expect(result.sell).to.equal(0)
    expect(result.url).to.equal('https://bit.ly/2HpmlGE')
  })
})
