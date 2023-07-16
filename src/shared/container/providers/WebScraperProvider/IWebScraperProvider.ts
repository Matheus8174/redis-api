import Champion, { Lanes } from '@modules/championCounters/entities/Champion';

export type GetChampionsCountersProps = {
  htmlSource: string;
  enemyChampion: string;
  enemyLane: Lanes;
};

interface IWebScraperProvider {
  getHtmlSource(championName: string): Promise<string>;
  getChampionsCounters(props: GetChampionsCountersProps): Promise<Champion>;
}

export default IWebScraperProvider;
