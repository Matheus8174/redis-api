import { inject, injectable } from 'tsyringe';

import IChampionCountersRepository from '@modules/championCounters/repositories/IChampionCountersRepository';
import Champion, { Lanes } from '@modules/championCounters/entities/Champion';
import IWebScraperProvider from '@shared/container/providers/WebScraperProvider/IWebScraperProvider';

@injectable()
class GetChampionUseCase {
  constructor(
    @inject('ChampionCountersRepository')
    private championCountersRepository: IChampionCountersRepository,
    @inject('PuppeteerWebScraperProvider')
    private puppeteerWebScraperProvider: IWebScraperProvider
  ) {}

  public async execute(
    enemyChampion: string,
    enemyLane: Lanes
  ): Promise<Champion> {
    let championsCounters = await this.championCountersRepository.get(
      enemyChampion
    );

    if (championsCounters) return championsCounters;

    const htmlSource = await this.puppeteerWebScraperProvider.getHtmlSource(
      enemyChampion
    );

    championsCounters =
      await this.puppeteerWebScraperProvider.getChampionsCounters({
        htmlSource,
        enemyChampion,
        enemyLane
      });

    await this.championCountersRepository.save(championsCounters);

    return championsCounters;
  }
}

export default GetChampionUseCase;
