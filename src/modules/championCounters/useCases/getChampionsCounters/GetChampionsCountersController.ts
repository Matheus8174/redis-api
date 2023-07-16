import { container } from 'tsyringe';
import { Request, Response } from 'express';

import GetChampionsCountersUseCases from './GetChampionsCountersUseCase';

interface IRequest {
  top: string;
  jungle: string;
  mid: string;
  adc: string;
  sup: string;
  summonerRole: 'top' | 'jungle' | 'mid' | 'adc' | 'sup';
}

class GetChampionsCountersController {
  public async execute(request: Request, response: Response) {
    const { summonerRole, ...lanes }: IRequest = request.body;

    const getChampionsCountersUseCases = container.resolve(
      GetChampionsCountersUseCases
    );

    const n = Object.keys(lanes).map(
      (lane: 'top' | 'jungle' | 'mid' | 'adc' | 'sup') =>
        getChampionsCountersUseCases.execute(request['lane'], lane)
    );

    Promise.all(n);

    return response.status(200).end();
  }
}

export default GetChampionsCountersController;
