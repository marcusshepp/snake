export function randomSelection(arr: any[]): any {
    const randIndex: number = Math.floor(Math.random() * arr.length);
    console.log(randIndex);
    console.log(arr[randIndex]);
    return arr[randIndex];
}
