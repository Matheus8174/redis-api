import puppeteer from 'puppeteer';
import { load } from 'cheerio';

import IWebScraperProvider, {
  GetChampionsCountersProps
} from './IWebScraperProvider';

import Champion, {
  Lanes,
  Counter
} from '@modules/championCounters/entities/Champion';

class PuppeteerWebScraperProvider implements IWebScraperProvider {
  public async getHtmlSource(championName: string): Promise<string> {
    const browser = await puppeteer.launch({
      headless: true
    });

    const page = await browser.newPage();

    await page.goto(`https://lolalytics.com/lol/${championName}/build/`, {});

    await page.evaluate(async () => {
      window.scrollBy(0, 2000);
    });

    const buttonSelector = '.ButtonSet_wrapper__33xGK div[data-id="2"]';

    await page.click(buttonSelector);

    const htmlSource = await page.content();

    browser.close();

    return htmlSource;
  }

  public async getChampionsCounters({
    htmlSource,
    enemyLane,
    enemyChampion
  }: GetChampionsCountersProps): Promise<Champion> {
    const $ = load(htmlSource);

    const allChampionsCounters = $('.Panel_data__dtE8F > div').toArray();

    allChampionsCounters.shift();
    allChampionsCounters.pop();

    const allChampionsCountersByLane = $(allChampionsCounters)
      .children()
      .map((_, e) => {
        const $$ = load($(e).html() as string);

        const href = $$('a').attr('href') as string;

        const championName = href.slice(
          href.indexOf('/vs/') + 4,
          href.indexOf('/build/')
        );

        type LaneControl = {
          top: 'top';
          jungle: 'jungle';
          middle: 'mid';
          bottom: 'adc';
          support: 'sup';
        };

        const lane = href?.slice(
          href.indexOf('vslane') + 7
        ) as LaneControl['top'];

        const laneControl: LaneControl = {
          top: 'top',
          jungle: 'jungle',
          middle: 'mid',
          bottom: 'adc',
          support: 'sup'
        };

        return {
          lane: laneControl[lane],
          champions: {
            name: championName,
            winRate: $$('div').html() as string
          }
        };
      })
      .toArray();

    const counters: Counter[] = [];

    ['top', 'jungle', 'mid', 'adc', 'sup'].forEach((_lane) => {
      allChampionsCountersByLane
        .filter(({ lane }) => lane === _lane)
        .forEach(({ champions: { name, winRate } }) =>
          counters.push({
            name,
            winRate,
            lane: _lane as Lanes
          })
        );
    });

    return {
      name: enemyChampion,
      lane: enemyLane,
      counters
    };
  }
}

export default PuppeteerWebScraperProvider;
