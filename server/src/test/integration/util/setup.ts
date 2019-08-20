import {REGISTRY} from "../../../app/registry";
import {G} from "./global";

export function setup(): void {
    resetBeforeEach();
    resetAfterEach();
}

export function resetBeforeEach(): void {
    beforeEach(() => {
        REGISTRY.clear();
        G.BROKER.clear();
        G.SERVER.launch(G.PORT);
    });
}

export function resetAfterEach(): void {
    afterEach(() => {
        G.SERVER.shutdown();
    });
}
