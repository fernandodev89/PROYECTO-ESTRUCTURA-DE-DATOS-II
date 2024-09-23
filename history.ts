import { Actions } from "./actions";
export class HistoryActions{
    private nameCompany: string;
    private priceActions : number;
    private quantity : number;
    private users : string[];
    private date: Date;

    constructor(nameCompany: string, priceActions: number, quantity:number, users1:string,users2:string){
        this.nameCompany = nameCompany;
        this.priceActions = priceActions;
        this.quantity = quantity;
        this.users = [users1, users2];
        this.date = new Date(); 
    }

    public viewHistory():void{
        console.log(`Nombre de la compania: ${this.nameCompany} \nPrecio por accion${this.priceActions}\nCantidad de acciones: ${this.quantity}\nUsuarios involucrados: ${this.users[0]} | ${this.users[1]}\nFecha: ${this.date.toISOString().split('T')[0]}`)
    }
}
