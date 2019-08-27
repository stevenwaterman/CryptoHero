export function fundsAvailable(funds: Map<string, number>, asset: string): number {
    const [_, amount] = funds.find(([check]) => check === asset) as [string, number];
    return amount as number;
}