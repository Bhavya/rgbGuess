module com.rgbguess.api {

    export class ImageFetcher {
        private uriArray: Array<String> = new Array<String>();
        private length: number = 0;

        constructor() { }

        loadImages(): void {
           this.addImage("https://tse1.mm.bing.net/th?id=OIP.P0FgS6d76p-wCGHXJpTfSAHaEo&pid=Api");
           this.addImage("https://wallpaperstock.net/wallpapers/thumbs1/52697wide.jpg");
           this.addImage("http://www.kinyu-z.net/data/wallpapers/35/822910.jpg");
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
            this.uriArray[this.length] = name;
            this.length += 1;
        }
    }
}