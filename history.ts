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
        //usuario1(comprador) usuario2(vendedor)
        this.users = [users1, users2];
        this.date = new Date(); 
    }

    public viewHistory():void{
        console.log(`| Nombre de la compania: ${this.nameCompany} \n| Precio por accion: ${this.priceActions}\n| Cantidad de acciones: ${this.quantity}\n| Usuarios involucrados: ${this.users[0]} | ${this.users[1]}\n| Fecha: ${this.date.toISOString().split('T')[0]}`)
    }
}
