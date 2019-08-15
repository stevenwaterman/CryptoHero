/**
 * Higher prices come before lower prices
 * Then earlier timestamps come before later timestamps
 * Then return 0 iff account ids are the same
 */
export const buyComparator = (a, b) => {
    if (a.unitPrice > b.unitPrice) return -1;
    if (a.unitPrice < b.unitPrice) return 1;
    if (a.timeStamp < b.timeStamp) return -1;
    if (a.timeStamp > b.timeStamp) return 1;
    return a.account.id.localeCompare(b.account.id);
};
/**
 * Higher prices come before lower prices
 * Then earlier timestamps come before later timestamps
 * Then return 0 iff account ids are the same
 */
export const sellComparator = (a, b) => {
    if (a.unitPrice < b.unitPrice) return -1;
    if (a.unitPrice > b.unitPrice) return 1;
    if (a.timeStamp < b.timeStamp) return -1;
    if (a.timeStamp > b.timeStamp) return 1;
    return a.account.id.localeCompare(b.account.id);
};