import { beforeAll, describe, it } from 'vitest';
import { RedisClientType } from 'redis';

import redisClient from '@shared/infra/redis/RedisClient';
import ChampionCountersRepository from '@modules/championCounters/infra/redis/repositories/ChampionCountersRepository';

import {
  top,
  jungle,
  mid,
  adc,
  suport
} from '@mocks/getChampionsCountersUseCaseResult';
import CalculateWhoIsTheBestUseCase from './CalculateWhoIsTheBestUseCase';

let sut: CalculateWhoIsTheBestUseCase;

describe('#CalculateWhoIsTheBest', () => {
  beforeAll(() => {
    const championCountersRepository = new ChampionCountersRepository(
      redisClient as RedisClientType
    );

    sut = new CalculateWhoIsTheBestUseCase(championCountersRepository);
  });

  it('should find the best champion ', async () => {
    sut.execute({
      summonerLane: 'top',
      enemyChampions: [top, jungle, mid, adc, suport]
    });
  });
});
