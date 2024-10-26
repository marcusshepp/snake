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

export const snake1: Asset = new Asset(`snake-1`);
export const snakeBody: Asset = new Asset(`snake-body`);
