/**
 * Higher prices come before lower prices
 * Then earlier timestamps come before later timestamps
 * Then return 0 iff account ids are the same
 */
export const buyComparator = (a, b) => {
  const compPrice = b.unitPrice.cmp(a.unitPrice);
  if (compPrice !== 0) return compPrice;
  if (a.timestamp.getTime() < b.timestamp.getTime()) return -1;
  if (a.timestamp.getTime() > b.timestamp.getTime()) return 1;
  return a.id.localeCompare(b.id);
};
/**
 * Higher prices come before lower prices
 * Then earlier timestamps come before later timestamps
 * Then return 0 iff account ids are the same
 */
export const sellComparator = (a, b) => {
  const compPrice = a.unitPrice.cmp(b.unitPrice);
  if (compPrice !== 0) return compPrice;
  if (a.timestamp.getTime() < b.timestamp.getTime()) return -1;
  if (a.timestamp.getTime() > b.timestamp.getTime()) return 1;
  return a.id.localeCompare(b.id);
};
