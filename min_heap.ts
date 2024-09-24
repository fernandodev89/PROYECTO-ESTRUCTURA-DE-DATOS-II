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


    public getMin():[User,Actions] {
        if (this.n < 1) {
        throw new Error("Heap underflow"); // Manejo de error si heap está vacío
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
    public makeBuy(buyActions:Actions):void{

        let sameSales = this.searchSale(buyActions);
        if(sameSales.length > 1){
            for(const i in sameSales){
                let index = sameSales[i]
                if(this.heap[index][1].getQuantityActions() > buyActions.getQuantityActions()){
                    const newQuantity:number = (this.heap[index][1].getQuantityActions() - buyActions.getQuantityActions());
                    this.updateSale(index,newQuantity);
                    break;
                }else if(this.heap[index][1].getQuantityActions() === buyActions.getQuantityActions()){
                    this.deleteSale(index);
                }
            }
        }

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
    public deleteSale(index:number):[User,Actions]{
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
//Para hacer pruebas de la clase
const compra = new MinHeap(7);
compra.insert(new User('Fercho'),new Actions(18,'Tigo',5,5))
compra.insert(new User('Duglas'),new Actions(12,'Tigo',44,3))
compra.insert(new User('Medina'),new Actions(1,'Coca Cola',20,4))
compra.insert(new User('Portillo'),new Actions(23,'Grapete',22,4))
compra.insert(new User('Afre'),new Actions(89,'India Quiche',99,4))
compra.insert(new User('Dominik'),new Actions(28,'Tigo',54,2))
compra.insert(new User('Ferpa'),new Actions(33,'claro',99,88))
compra.insert(new User('Maria'),new Actions(11,'Tigo',87,22))
compra.insert(new User('Dalia'),new Actions(2,'Tigo',87,533))
//
const valor = compra.viewHeap()
//console.log(valor)
console.log('----------------------------------------------------------------')
let searchResult = compra.searchSale(new Actions(12, 'Tigo', 54, 3));
console.log('Resultados:', searchResult);
console.log('----------------------------------------------------------------')
//compra.makeBuy(new Actions(12, 'Tigo', 54, 3));
//compra.deleteSale(8)
//const identicos = compra.viewLength()
console.log(valor)