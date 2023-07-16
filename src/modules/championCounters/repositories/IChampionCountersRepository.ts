import Champion from '@modules/championCounters/entities/Champion';

interface IChampionCountersRepository {
  save(data: Champion): Promise<void>;
  get(championName: string): Promise<Champion | null>;
}

export default IChampionCountersRepository;
