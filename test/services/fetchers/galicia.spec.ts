import Galicia from '../../../src/services/fetchers/galicia'
import BankOptions from '../../../src/services/bankInterfaces'
import { expect } from 'chai'
import * as nock from 'nock'
import * as fs from 'fs'

describe('fetchers/galicia', () => {
  it ('extracts the dolar', async () => {
    const fetcher = new Galicia()
    
    const json = fs.readFileSync('test/services/data/galicia_02102018.json')
    
    nock(fetcher.url)
    .get('')
    .reply(200, json, { 'Content-Type': 'application/json' })
    
    const result : BankOptions = await fetcher.run()
    expect(result.name).to.equal('Galicia')
    expect(result.buy).to.equal(66.7)
    expect(result.sell).to.equal(69.2)
    expect(result.url).to.equal('https://bit.ly/3oiopB5')
  })

  it ('returns empty values if request get 404', async () => {
    const fetcher = new Galicia()

    nock(fetcher.url)
    .get('')
    .reply(404, {}, { 'Content-Type': 'application/json' })

    const result : BankOptions = await fetcher.run()
    expect(result.name).to.equal('Galicia')
    expect(result.buy).to.equal(0)
    expect(result.sell).to.equal(0)
    expect(result.url).to.equal('https://bit.ly/3oiopB5')    
  })
})
