export function clamp<T>(current: T, min: T | undefined, max: T | undefined): T {
    if (min != null && current < min) return min;
    if (max != null && current > max) return max;
    return current;
}