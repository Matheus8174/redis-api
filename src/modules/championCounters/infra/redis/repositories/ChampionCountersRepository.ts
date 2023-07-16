import { RedisClientType } from 'redis';
import { inject, injectable } from 'tsyringe';

import IChampionCountersRepository from '@modules/championCounters/repositories/IChampionCountersRepository';
import Champion from '@modules/championCounters/entities/Champion';

@injectable()
class ChampionCountersRepository implements IChampionCountersRepository {
  constructor(
    @inject('RedisClient')
    private redisClient: RedisClientType
  ) {}

  public async save({ name, ...champion }: Champion): Promise<void> {
    const data = JSON.stringify({ name, ...champion });

    await this.redisClient.set(name, data);
  }

  public async get(championName: string): Promise<Champion | null> {
    const championStringify = await this.redisClient.get(championName);

    if (!championStringify) return null;

    const championObj: Champion = JSON.parse(championStringify);

    return championObj;
  }
}

export default ChampionCountersRepository;
