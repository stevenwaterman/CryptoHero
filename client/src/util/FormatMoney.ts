export function formatMoney(num: number | null, decimals: number = 5, withCommas: boolean = true, stripTrailingZeros: boolean = false): string {
    if (num == null) return "";
    let str = num.toFixed(decimals);
    if (withCommas) {
        str = str.replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    if (stripTrailingZeros) {
        const reverse = str.split("").reverse();
        const index: number | undefined = reverse.findIndex((s) => s !== "." && s !== "0");
        if (index == null) return str;
        const slice = reverse.slice(index);
        return slice.reverse().join("");
    } else {
        return str;
    }
}