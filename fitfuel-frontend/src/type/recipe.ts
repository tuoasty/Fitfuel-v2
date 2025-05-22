export type Recipe = {
    id: string;
    name:string;
    description:string;
    time:string;
    calories:number;
    carbs:number;
    fat:number;
    fiber:number;
    protein:number;
    picture_url?:string;
}