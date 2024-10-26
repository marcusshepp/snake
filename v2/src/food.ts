import {
    Asset,
    mouse1Asset,
    mouse2Asset,
    mouse3Asset,
    mouse4Asset,
} from "./asset";
import { randomSelection } from "./utils/random-selection";

export class Food {
    public x: number = 100;
    public y: number = 100;
    public degrees: number = 0;
    public asset: Asset;
    constructor() {
        this.asset = this.getRandMouseAsset();
    }

    public getRandMouseAsset(): Asset {
        let assets: Asset[] = [
            mouse1Asset,
            mouse2Asset,
            mouse3Asset,
            mouse4Asset,
        ];
        return randomSelection(assets);
    }
}
