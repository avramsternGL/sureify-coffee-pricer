import { createPricer } from './pricer';

it('provides the latest price given the options selected so far', () => {
  const pricer = createPricer();

  pricer('size', 'small');
  const defaultPrice = pricer('creamer', 'none');
  expect(defaultPrice).toBe(1.0);

  const priceAfterFirstSelection = pricer('creamer', 'dairy');
  expect(priceAfterFirstSelection).toBe(1.25);

  const priceAfterSecondSelection = pricer('creamer', 'non-dairy');
  expect(priceAfterSecondSelection).toBe(1.5);

  const priceAfterThirdSelection = pricer('size', 'large');
  expect(priceAfterThirdSelection).toBe(2.5);
});

it('replaces previous selection instead of accumulating', () => {
  const pricer = createPricer();
  pricer('size', 'large');
  pricer('size', 'medium');

  expect(pricer('size', 'small')).toBe(1.0);
});

it('prices for each size correctly with NO creamer', () => {
  const pricer = createPricer();
  pricer('creamer', 'none');

  pricer('size', 'small');
  expect(pricer('size', 'small')).toBe(1.0);

  expect(pricer('size', 'medium')).toBe(1.5);

  expect(pricer('size', 'large')).toBe(2.0);
});

it('prices each creamer option correctly', () => {
  const pricer = createPricer();
  pricer('size', 'medium');

  expect(pricer('creamer', 'none')).toBe(1.5);

  expect(pricer('creamer', 'dairy')).toBe(1.75);

  expect(pricer('creamer', 'non-dairy')).toBe(2.0);
});
