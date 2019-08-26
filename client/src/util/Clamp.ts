export function clamp<T>(current: T, min: T | undefined | null = null, max: T | undefined | null = null): T {
    if (min != null && current < min) return min;
    if (max != null && current > max) return max;
    return current;
}