export function withChanges<T extends S, S>(source: T, changes: S): T {
    const out: any = {};
    Object.assign(out, source);
    Object.assign(out, changes);
    return out;
}