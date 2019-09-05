import Big from "big.js";

export function formatMoney(num: Big | null, decimals: number, withCommas: boolean, stripTrailingZeros: boolean): string {
    if (num == null) return "";
    let str = num.toFixed(decimals);

    if (withCommas) {
        str = str.replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    if (stripTrailingZeros) {
        const reverse = str.split("").reverse();

        let index: number | undefined = reverse.findIndex((s) => s === "." || s !== "0");
        if (index == null) return str;
        if (reverse[index] === ".") index++;

        const slice = reverse.slice(index);
        return slice.reverse().join("");
    } else {
        return str;
    }
}

export function formatInput(num: Big | null): string {
    return formatMoney(num, 5, false, false);
}

export function formatPercent(num: Big | null): string {
    return formatMoney(num, 2, false, false);
}