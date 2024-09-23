import {Actions} from "./actions";
import { User } from "./user";
export class MaxHeap {
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
        while(i > 1 && this.heap[father][1].getPrice() < this.heap[i][1].getPrice()) {
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


    public getMax():[User,Actions] {
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
            if (j < this.n && this.heap[j][1].getPrice() < this.heap[j+1][1].getPrice())
                j++;
            if (this.heap[i][1].getPrice() >= this.heap[j][1].getPrice())
                break;
            let temp : [User,Actions] = this.heap[i];
            this.heap[i] = this.heap[j];
            this.heap[j] = temp;
            i = j;
        }
    }

    public viewMax():[User,Actions] {
        return this.heap[1];
    }

    public viewHeap(): Array<[User,Actions]> {
        return this.heap;
    }

    public viewLength(): number {
        return this.heap.length;
    }

}

//const compra = new MaxHeap(9);
//compra.insert(new User('Fercho'),new Actions(18,'Tigo',45,5))
//compra.insert(new User('Duglas'),new Actions(12,'Claro',44,3))
//compra.insert(new User('Medina'),new Actions(1,'Coca Cola',20,4))
//compra.insert(new User('Portillo'),new Actions(23,'Grapete',22,4))
//compra.insert(new User('Afre'),new Actions(89,'India Quiche',99,4))
//compra.insert(new User('Dominik'),new Actions(83,'Shucos El pepe',5,4))
//
//const valor = compra.viewHeap()
//
//console.log(valor)
//console.log('Este es el valor maximo',compra.getMax())
//console.log(valor)