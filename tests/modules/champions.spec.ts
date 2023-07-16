import { expect, it } from 'vitest';

it('should sum', async () => {
  const { body, status } = await global.testRequest.get('/api/v1/champion');

  expect(status).toBe(200);
});
