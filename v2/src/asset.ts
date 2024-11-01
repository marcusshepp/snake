const ASSET_HEIGHT: number = 100;
const ASSET_WIDTH: number = 100;
const BACKGROUND_HEIGHT: number = 100;
const BACKGROUND_WIDTH: number = 100;
const ASSET_PATH: string = "../assets";

export class Asset {
    public imgId: string;
    public width: number;
    public height: number;
    public isBackground: boolean;
    public element: HTMLImageElement;
    constructor(imgId: string, isBackgroud: boolean = false) {
        this.imgId = imgId;
        this.element = document.querySelector(`#${imgId}`) as HTMLImageElement;
        this.isBackground = isBackgroud;
    }
}

export const snake1Asset: Asset = new Asset(`snake-1`);
export const snakeBodyAsset: Asset = new Asset(`snake-body`);
// export const mouse1Asset: Asset = new Asset(`mouse-1`);
export const mouse2Asset: Asset = new Asset(`mouse-2`);
export const mouse3Asset: Asset = new Asset(`mouse-3`);
export const mouse4Asset: Asset = new Asset(`mouse-4`);
