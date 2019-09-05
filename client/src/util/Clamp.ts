import Big, {BigSource} from "big.js";

export function clamp<T>(current: T, min: T | undefined | null = null, max: T | undefined | null = null): T {
    if (min != null && current < min) return min;
    if (max != null && current > max) return max;
    return current;
}

export function clampBig(current: Big, min: BigSource | undefined | null = null, max: BigSource | undefined | null = null): Big {
    if (min) min = Big(min);
    if (max) max = Big(max);
    if (min != null && current.cmp(min) < 0) return min as Big;
    if (max != null && current.cmp(max) > 0) return max as Big;
    return current;
}