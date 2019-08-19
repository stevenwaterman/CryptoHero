/**
 * Higher prices come before lower prices
 * Then earlier timestamps come before later timestamps
 * Then return 0 iff account ids are the same
 */
import Order from "../trading/order";

function compareTime(a: Order, b: Order): number {
    if (a.timestamp.getTime() < b.timestamp.getTime()) return -1;
    if (a.timestamp.getTime() > b.timestamp.getTime()) return 1;
    return a.id.localeCompare(b.id);
}

export function buyComparator(a: Order, b: Order): number {
    const compPrice = b.unitPrice.cmp(a.unitPrice);
    if (compPrice === 0) {
        return compareTime(a, b);
    } else {
        return compPrice;
    }
}

/**
 * Higher prices come before lower prices
 * Then earlier timestamps come before later timestamps
 * Then return 0 iff account ids are the same
 */
export function sellComparator(a: Order, b: Order): number {
    const compPrice = a.unitPrice.cmp(b.unitPrice);
    if (compPrice === 0) {
        return compareTime(a, b);
    } else {
        return compPrice;
    }
}
