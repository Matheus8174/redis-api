import { inject, injectable } from 'tsyringe';

import Champion, { Lanes } from '@modules/championCounters/entities/Champion';
import IChampionCountersRepository from '@modules/championCounters/repositories/IChampionCountersRepository';

interface IRequest {
  summonerLane: Lanes;
  enemyChampions: Champion[];
}

@injectable()
class CalculateWhoIsTheBestUseCase {
  constructor(
    @inject('ChampionCountersRepository')
    private championCountersRepository: IChampionCountersRepository
  ) {}

  async execute({ summonerLane, enemyChampions }: IRequest) {
    enemyChampions.forEach(({ name, lane, counters }) => {
      const countersForThisLane = counters.filter(
        ({ lane }) => lane === summonerLane
      );

      // countersForThisLane.sort((a, b) => Number(a.winRate) - Number(b.winRate));

      const bestChampionsAgainstUserLane = counters
        .filter(({ lane }) => lane === summonerLane)
        .slice(0, 6);

      // if (lane === 'top') console.log(counters, name);

      type CounterBestChamps = {
        name: string;
        count: number;
      }[];

      console.log(counters);

      bestChampionsAgainstUserLane.forEach((bestCounterAtUserLane) => {
        const l = counters
          .filter(({ lane }) => lane !== 'top')
          .reduce(
            (count, counter) => {
              const bestChamp = count.find(
                (count) => count.name === counter.name
              );

              // console.log('PPP ', count);

              if (!bestChamp) {
                count.push({
                  name: counter.name,
                  count: 1
                });

                return count;
              }

              if (counter.name === bestCounterAtUserLane.name) {
                // console.log(counter.name, bestCounterAtUserLane.name);

                count[count.findIndex((obj) => obj.name === bestChamp.name)] = {
                  name: bestChamp.name,
                  count: ++bestChamp.count
                };
                // console.log(
                //   count[count.findIndex((obj) => obj.name === bestChamp.name)]
                // );
              }

              return count;
            },
            [{ count: 0, name: '' }]
          );

        // console.log(n);
      });
      // console.log(name, lane, topCounters);
    });
  }
}

export default CalculateWhoIsTheBestUseCase;
