export const expectedPending = (buys, sells) => {
  const pending = new Object({
    buy: [],
    sell: []
  });

  pending.buy.push(...buys);
  pending.sell.push(...sells);
  return pending;
};

export const expectedOrder = (account, direction, units, unitPrice) =>
  new Object({
    account: {
      id: account.id
    },
    direction: direction,
    units: units,
    unitPrice: unitPrice
  });

/**
 * Allows for partial matching - so we don't match on IDs because they are UUIDs
 */
export const expectedTrade = (buyer, seller, units, unitPrice) =>
  new Object({
    buyer: {
      id: buyer.id
    },
    seller: {
      id: seller.id
    },
    units: units,
    unitPrice: unitPrice
  });
