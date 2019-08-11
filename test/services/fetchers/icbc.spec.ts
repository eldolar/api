import ICBC from '../../../src/services/fetchers/icbc';
import BankOptions from '../../../src/services/bankInterfaces';
import { expect } from 'chai';
import * as nock from 'nock';
import * as fs from 'fs';

describe('fetchers/icbc', () => {
  it ('extracts the dolar', async () => {
    const fetcher = new ICBC();
    
    const json = fs.readFileSync('test/services/data/icbc_10_08_2019.json');
    
    nock(fetcher.url)
    .get('')
    .reply(200, json, { 'Content-Type': 'application/json' });
    
    const result : BankOptions = await fetcher.run();
    expect(result.name).to.equal('ICBC');
    expect(result.buy).to.equal(44.2);
    expect(result.sell).to.equal(46.6);
  })

  it ('returns empty values if request get 404', async () => {
    const fetcher = new ICBC();

    nock(fetcher.url)
    .get('')
    .reply(404, {}, { 'Content-Type': 'application/json' });

    const result : BankOptions = await fetcher.run();
    expect(result.name).to.equal('ICBC');
    expect(result.buy).to.equal(0);
    expect(result.sell).to.equal(0);
  })
})
