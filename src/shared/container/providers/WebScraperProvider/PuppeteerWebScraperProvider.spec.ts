import { beforeAll, describe, expect, it, vi } from 'vitest';

import puppeteerScrapeResult from '@mocks/puppeteerScrapeResult';
import PuppeteerWebScraperProvider from './PuppeteerWebScraperProvider';

let sut: PuppeteerWebScraperProvider;

describe('#PuppeteerWebScraperProvider', () => {
  beforeAll(() => {
    sut = new PuppeteerWebScraperProvider();
  });

  it('getHtmlSource method should return the html source from the page', async () => {
    vi.spyOn(sut, 'getHtmlSource').mockResolvedValue(puppeteerScrapeResult);

    const htmlSource = await sut.getHtmlSource('sivir');

    expect(htmlSource).toBeTypeOf('string');

    expect(htmlSource.length).greaterThan(150);
  });

  it('should scrape for champions counters', async () => {
    const enemyChampion = 'sivir';

    vi.spyOn(sut, 'getHtmlSource').mockResolvedValue(puppeteerScrapeResult);

    const htmlSource = await sut.getHtmlSource(enemyChampion);

    const result = await sut.getChampionsCounters({
      enemyChampion,
      enemyLane: 'adc',
      htmlSource
    });

    expect(result).toEqual(
      expect.objectContaining({
        name: enemyChampion,
        lane: 'adc'
      })
    );

    expect(result).toHaveProperty('counters');
  });
});
