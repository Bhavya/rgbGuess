module com.rgbguess.api {

    export class ImageFetcher {
        private uriArray: Array<String> = new Array<String>();
        private length: number = 0;

        constructor() { }

        loadImages(): void {
           this.addImage("rainbow-texture-image-hd.jpg");
           this.addImage("Autumn_fireball.jpg");
           this.addImage("Tulipes-dans-Central-Park-1.jpg");
        }

        getAllImages(): Array<String> {
            return this.uriArray;
        }

        getRandomImage(): string {
            let index: number = Math.round(Math.random() * (this.length-1));
            console.log("index:" + index);
            return this.uriArray[index].toString();
        }

        private addImage(name: string) : void {
            this.uriArray[this.length] = `assets/${name}`;
            this.length += 1;
        }
    }
}