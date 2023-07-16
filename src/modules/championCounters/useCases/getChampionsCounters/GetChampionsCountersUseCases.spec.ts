import { expect, it, describe, beforeAll, vi } from 'vitest';
import { RedisClientType } from 'redis';

import ChampionCountersRepository from '@modules/championCounters/infra/redis/repositories/ChampionCountersRepository';
import redisClient from '@shared/infra/redis/RedisClient';
import Champion from '@modules/championCounters/entities/Champion';
import PuppeteerWebScraperProvider from '@shared/container/providers/WebScraperProvider/PuppeteerWebScraperProvider';
import puppeteerScrapeResult from '@mocks/puppeteerScrapeResult';

import GetChampionUseCase from './GetChampionsCountersUseCase';

let championCountersRepository: ChampionCountersRepository;

let puppeteerWebScraperProvider: PuppeteerWebScraperProvider;

let sut: GetChampionUseCase;

describe('#GetChampionsCounters', () => {
  beforeAll(() => {
    championCountersRepository = new ChampionCountersRepository(
      redisClient as RedisClientType
    );

    puppeteerWebScraperProvider = new PuppeteerWebScraperProvider();

    sut = new GetChampionUseCase(
      championCountersRepository,
      puppeteerWebScraperProvider
    );
  });

  it('should find a champion in the storage', async () => {
    const champion: Champion = {
      name: 'lucian',
      lane: 'adc',
      counters: [{ name: 'caitlyn', winRate: '34.99', lane: 'adc' }]
    };

    await championCountersRepository.save(champion);

    expect(sut.execute(champion.name, champion.lane)).resolves.toEqual(
      expect.objectContaining(champion)
    );
  });

  it('should find no champion in the storage', async () => {
    const { name, lane }: Champion = {
      name: 'lucian',
      lane: 'adc',
      counters: [{ name: 'caitlyn', winRate: '34.99', lane: 'adc' }]
    };

    vi.spyOn(puppeteerWebScraperProvider, 'getHtmlSource').mockResolvedValue(
      puppeteerScrapeResult
    );

    const result = await sut.execute(name, lane);

    expect(result).toEqual(
      expect.objectContaining({
        name,
        lane
      })
    );

    expect(result).toHaveProperty('counters');
  });

  it('should get champions counters from PuppeteerWebScraperProvider', async () => {
    const { name, lane }: Champion = {
      name: 'lucian',
      lane: 'mid',
      counters: [{ name: 'caitlyn', winRate: '34.99', lane: 'adc' }]
    };

    vi.spyOn(championCountersRepository, 'get').mockResolvedValue(null);

    vi.spyOn(puppeteerWebScraperProvider, 'getHtmlSource').mockResolvedValue(
      puppeteerScrapeResult
    );

    const result = await sut.execute(name, lane);

    expect(result).toHaveProperty('name', name);
    expect(result).toHaveProperty('lane', lane);
  });
});
