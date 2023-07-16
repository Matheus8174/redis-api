export type Lanes = 'top' | 'jungle' | 'mid' | 'adc' | 'sup';

export type Counter = {
  name: string;
  winRate: string;
  lane: Lanes;
};

interface IChampion {
  lane: Lanes;
  name: string;
  counters: Counter[];
}

export default IChampion;
