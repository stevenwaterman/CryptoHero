export function formatMoney(num: number | null, decimals: number = 5, stripTrailingZeros: boolean = false): string {
    if (num == null) return "";
    const withZeros: string = num.toFixed(decimals).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    if (stripTrailingZeros) {
        const reverse = withZeros.split("").reverse();
        const index: number | undefined = reverse.findIndex((s) => s !== "." && s !== "0");
        if (index == null) return withZeros;
        const slice = reverse.slice(index);
        return slice.reverse().join("");
    } else {
        return withZeros;
    }
}