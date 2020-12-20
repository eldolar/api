import Nacion from '../../../src/services/fetchers/nacion'
import BankOptions from '../../../src/services/bankInterfaces'
import { expect } from 'chai'
import * as nock from 'nock'
import * as fs from 'fs'

describe('fetchers/nacion', () => {
  it ('extracts the dolar', async () => {
    const fetcher = new Nacion()
    const page = fs.readFileSync('test/services/data/nacion_02102018.html')
    
    nock(fetcher.url)
    .get('')
    .reply(200, page, { 'content-type': 'text/html' })
    
    const result : BankOptions = await fetcher.run()
    expect(result.name).to.equal('Nación')
    expect(result.buy).to.equal(46.3)
    expect(result.sell).to.equal(48.1)
    expect(result.url).to.equal("https://bit.ly/35yOxzf")
  })

  it ('returns empty values if request get 404', async () => {
    const fetcher = new Nacion()

    nock(fetcher.url)
    .get('')
    .reply(404, "", { 'content-type': 'text/html' })

    const result : BankOptions = await fetcher.run()
    expect(result.name).to.equal('Nación')
    expect(result.buy).to.equal(0)
    expect(result.sell).to.equal(0)
    expect(result.url).to.equal("https://bit.ly/35yOxzf")
  })
})
