export default class Requirements {
    private readonly changes: Map<string, Array<[any, number]>> = new Map();
    private readonly testRunner: (name: string, params: any, status: number) => void;
    private readonly defaultParams: any;

    constructor(defaultParams: any, testRunner: (name: string, params: any, status: number) => void) {
        this.testRunner = testRunner;
        this.defaultParams = defaultParams;
    }

    invalidWhen(param: string, isValue: any, shouldReturnStatus: number): Requirements {
        let current: Array<[any, number]> | undefined = this.changes.get(param);
        if (current == null) {
            current = [];
            this.changes.set(param, current);
        }
        current.push([isValue, shouldReturnStatus]);
        return this;
    }

    execute(): void {
        this.changes.forEach((tmp: Array<[any, number]>, param: string) => {
            tmp.forEach(([invalidValue, expectedStatus]: [any, number]) => {
                const params = {...this.defaultParams};
                params[param] = invalidValue;
                const name = `${param} may not be ${invalidValue}, expect status ${expectedStatus}`;
                this.testRunner(name, params, expectedStatus);
            })
        })
    }
}