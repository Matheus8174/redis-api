import { container } from 'tsyringe';

import PuppeteerWebScraperProvider from './WebScraperProvider/PuppeteerWebScraperProvider';
import IWebScraperProvider from './WebScraperProvider/IWebScraperProvider';

container.registerSingleton<IWebScraperProvider>(
  'PuppeteerWebScraperProvider',
  PuppeteerWebScraperProvider
);
