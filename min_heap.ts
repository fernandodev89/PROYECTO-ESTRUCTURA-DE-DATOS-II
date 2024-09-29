import {Actions} from "./actions";
import { User } from "./user";
import { HistoryActions } from "./history";
export class MinHeap {
    private heap: Array<[User ,Actions]>;
    private n: number; // n = cantidad de elementos insertados

    constructor(size: number) {
        this.heap = new Array(size + 1);
        this.n = 0;
    }

    public isEmpty(): boolean { 
        return this.n == 0;
    }

    public getQuantity(): number{
        return this.n;
    }

    public insert(user:User,value: Actions): void {
        if (this.n == this.heap.length - 1) {
            this.resize(2*this.heap.length);
        }
        this.n++;
        this.heap[this.n] = [user,value];
        this.swap(this.n);
    }

    private swap(i:number): void{
        let father: number = Math.floor(i / 2)
        while(i > 1 && this.heap[father][1].getPrice() > this.heap[i][1].getPrice()) {
            let temp: [User,Actions] = this.heap[father];
            this.heap[father] = this.heap[i];
            this.heap[i] = temp
            i = father;
            father = Math.floor(i / 2);
        }
    }

    private resize(newSise:number): void {
        let newHeap:Array<[User,Actions]> = new Array(newSise);
        newHeap = [...this.heap];
        this.heap = newHeap;
    }


    public getMin():[User,Actions] | null {
        if (this.n < 1) {
        return null; // Manejo de error si heap está vacío
    }

        let max: [User, Actions] = this.heap[1];
        this.heap[1] = this.heap[this.n];
        this.heap[this.n] = [new User(''), new Actions(0,'', 0, 0)];
        this.n--;
        
        this.sink(1); // reestructuración del árbol AVL
        return max;
    }

    private sink(i:number): void {
        while (2*i <= this.n ){
            let j: number = 2*i;//hijo izquierdo 
            if (j < this.n && this.heap[j][1].getPrice() > this.heap[j+1][1].getPrice())
                j++;
            if (this.heap[i][1].getPrice() <= this.heap[j][1].getPrice())
                break;
            let temp : [User,Actions] = this.heap[i];
            this.heap[i] = this.heap[j];
            this.heap[j] = temp;
            i = j;
        }
    }

    //funcion para realizar la compra directamente si existieran ya ventas con los requerimientos necesarios
    public makeBuy(buyActions:Actions,nameUserBuy:string):[HistoryActions[],number]{
        //variable para verificar que se va hacer con las acciones que pasen las condiciones
        let arrActions : Array<[number,string,number]> = [];
        //variable para de volver el historial de acciones con exito que se realizaron con la compra
        let historial:HistoryActions[] = []
        //variable para verificar que se esten descontando las acciones que se ejecuten
        let actionsQuantity = buyActions.getQuantityActions()
        //coincidencias de ventas sobre la compra
        let sameSales = this.searchSale(buyActions);
        if(sameSales.length >= 1){
            for(const i in sameSales){
                let index = sameSales[i]
                if(actionsQuantity>0){
                    //si las acciones de la venta son mayores a la de la compra
                    if(this.heap[index][1].getQuantityActions() > actionsQuantity) {
                        let quantityDefault = this.heap[index][1].getQuantityActions()
                        const newQuantity:number = (this.heap[index][1].getQuantityActions() - buyActions.getQuantityActions());
                        arrActions.push([index,'update',newQuantity]);
                        actionsQuantity = 0
                        //variables para realizar el historial si la compra fue realizada exitosamente
                        let name: string = this.heap[index][1].getCompanyName()
                        let price: number = this.heap[index][1].getPrice()
                        let quantityHistori = quantityDefault - newQuantity;
                        let usuario1 = nameUserBuy
                        let usuario2 = this.heap[index][0].getName()
                        const newHistory:HistoryActions = new HistoryActions(name,price,quantityHistori,usuario1,usuario2)
                        historial.push(newHistory);
                        break;
                    // si las acciones son iguales
                    }else if(this.heap[index][1].getQuantityActions() === actionsQuantity){
                        actionsQuantity =0 
                        //variables para realizar el historial si la compra fue realizada exitosamente
                        let name: string = this.heap[index][1].getCompanyName()
                        let price: number = this.heap[index][1].getPrice()
                        let quantityHistori = this.heap[index][1].getQuantityActions()
                        let usuario1 = nameUserBuy
                        let usuario2 = this.heap[index][0].getName()
                        const newHistory:HistoryActions = new HistoryActions(name,price,quantityHistori,usuario1,usuario2)
                        historial.push(newHistory);
                        arrActions.push([index,'delete',0]);
                        break
                    // si las acciones de la venta son menores que la de la compra
                    }else if(this.heap[index][1].getQuantityActions() < actionsQuantity){
                        actionsQuantity = actionsQuantity - this.heap[index][1].getQuantityActions();
                        //variables para realizar el historial si la compra fue realizada exitosamente
                        let name: string = this.heap[index][1].getCompanyName()
                        let price: number = this.heap[index][1].getPrice()
                        let quantityHistori = this.heap[index][1].getQuantityActions()
                        let usuario1 = nameUserBuy
                        let usuario2 = this.heap[index][0].getName()
                        const newHistory:HistoryActions = new HistoryActions(name,price,quantityHistori,usuario1,usuario2)
                        historial.push(newHistory);
                        arrActions.push([index,'delete',0]);
                    }
                }
            }
        }

        //para actualizar o eliminar las acciones que se utilizaron para realizar la compra
        if(arrActions.length > 0){
            for(const a in arrActions){
                if(arrActions[a][1]==='update'){
                    this.updateSale(arrActions[a][0],arrActions[a][2])
                }else{
                    this.deleteSale(arrActions[a][0])
                }
            }
        }
        //retornamos las transacciones exitosas y si sobra acciones de la compra tambien las mandamos
        return [historial,actionsQuantity]

    }

    //funcion principal para verificar si existe una venta igual a los requerimientos de la compra
    public searchSale(searchcompra: Actions, i: number=1): number[] {
        //fuera de los límites del heap o nodo inexistente
        if (i > this.n || this.heap[i] === undefined) {
            return [];
        }
        let results: number[] = [];

        if ( this.heap[i][1].getPrice() <= searchcompra.getPrice() && this.heap[i][1].getCompanyName() === searchcompra.getCompanyName()) {
            results.push(i);  // Almacenar el índice actual, ya que coincide
        }

        results = results.concat(this.searchSale(searchcompra, i * 2));  // Hijo izquierdo
        results = results.concat(this.searchSale(searchcompra, (i * 2) + 1));  // Hijo derecho

        return results;//devuelve todas las posiciones donde coinciden
    }


    // se encarga de actualizar la cantidad de acciones si sobraran de alguna venta
    public updateSale(index:number,quantityNew:number):void{
        this.heap[index][1].setQuantity(quantityNew);
    }

    //funcion para eliminar la accion si se llegara a vender por completa 
    public deleteSale(index:number):[User,Actions] | null{
       this.heap[index][1].resetActions();
       this.swap(index);
       return this.getMin();
    }

    public viewHeap(): Array<[User,Actions]> {
        return this.heap;
    }

    public viewLength():number{
        return this.heap.length;
    }

}

