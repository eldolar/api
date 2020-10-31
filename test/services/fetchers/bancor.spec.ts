import Bancor from '../../../src/services/fetchers/bancor';
import BankOptions from '../../../src/services/bankInterfaces';
import { expect } from 'chai';
import * as nock from 'nock';
import * as fs from 'fs';

describe('fetchers/bancor', () => {
  it ('extracts the dolar', async () => {
    const fetcher = new Bancor();
    
    const json = fs.readFileSync('test/services/data/bancor_10_08_2019.json');
    
    nock(fetcher.url)
    .get('')
    .reply(200, json, { 'Content-Type': 'application/json' });
    
    const result : BankOptions = await fetcher.run();
    expect(result.name).to.equal('Bancor');
    expect(result.buy).to.equal(44.4);
    expect(result.sell).to.equal(46.9);
    expect(result.url).to.equal('https://bit.ly/3dPuDE3');
  })

  it ('returns empty values if request get 404', async () => {
    const fetcher = new Bancor();

    nock(fetcher.url)
    .get('')
    .reply(404, {}, { 'Content-Type': 'application/json' });

    const result : BankOptions = await fetcher.run();
    expect(result.name).to.equal('Bancor');
    expect(result.buy).to.equal(0);
    expect(result.sell).to.equal(0);
    expect(result.url).to.equal('https://bit.ly/3dPuDE3');
  })
})
