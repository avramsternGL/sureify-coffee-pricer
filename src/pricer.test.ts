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
