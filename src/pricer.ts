export type Category = 'size' | 'creamer';
export type Option =
  | 'small'
  | 'medium'
  | 'large'
  | 'none'
  | 'dairy'
  | 'non-dairy';
export type Price = number;

export interface Pricer {
  /**
   * Invoked each time the user makes a selection.
   * No need to validate arguments, the caller validates the arguments
   * before this function is invoked.
   * @returns the total price of the coffee so far given all the
   * selections made
   */
  (category: Category, option: Option): Price;
}

type Selections = {
  size?: 'small' | 'medium' | 'large';
  creamer?: 'none' | 'dairy' | 'non-dairy';
};

const SIZE_PRICES: Record<NonNullable<Selections['size']>, Price> = {
  small: 1.0,
  medium: 1.5,
  large: 2.0,
};

const CREAMER_PRICES: Record<NonNullable<Selections['creamer']>, Price> = {
  none: 0.0,
  dairy: 0.25,
  'non-dairy': 0.5,
};

/**
 * A new pricer is created for each coffee being purchased.
 */
export const createPricer = (): Pricer => {
  let selections: Selections = {};

  const calculateTotal = (current: Selections): Price => {
    const sizePrice =
      current.size !== undefined ? SIZE_PRICES[current.size] : 0;

    const creamerPrice =
      current.creamer !== undefined ? CREAMER_PRICES[current.creamer] : 0;

    return sizePrice + creamerPrice;
  };

  return (category: Category, option: Option): Price => {
    selections = {
      ...selections,
      [category]: option,
    } as Selections;

    return calculateTotal(selections);
  };
};
