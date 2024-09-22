import {Actions} from "./actions";
export class MinHeap {
    private heap: Actions[];
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

    public insert(value: Actions): void {
        if (this.n == this.heap.length - 1) {
            this.resize(2*this.heap.length);
        }
        this.n++;
        this.heap[this.n] = value;
        this.swap(this.n);
    }

    private swap(i:number): void{
        let father: number = Math.floor(i / 2)
        while(i > 1 && this.heap[father].getPrice() > this.heap[i].getPrice()) {
            let temp: Actions = this.heap[father];
            this.heap[father] = this.heap[i];
            this.heap[i] = temp
            i = father;
            father = Math.floor(i / 2);
        }
    }

    private resize(newSise:number): void {
        let newHeap:Actions[] = new Array(newSise);
        newHeap = [...this.heap];
        this.heap = newHeap;
    }


    public getMin():Actions {
        let max: Actions = this.heap[1];
        this.heap[1] = this.heap[this.n];
        this.heap[this.n] = new Actions('','',0,0);
        this.n--;
        this.sink(1);//procedimiento de restructura el arbol AVL
        return max
    }

    private sink(i:number): void {
        while (2*i <= this.n ){
            let j: number = 2*i;//hijo izquierdo 
            if (j < this.n && this.heap[j].getPrice() > this.heap[j+1].getPrice())
                j++;
            if (this.heap[i].getPrice() <= this.heap[j].getPrice())
                break;
            let temp : Actions = this.heap[i];
            this.heap[i] = this.heap[j];
            this.heap[j] = temp;
            i = j;
        }
    }

    public viewMin():Actions {
        return this.heap[1];
    }

    public viewHeap(): Array<Actions> {
        return this.heap;
    }

    public viewLength(): number {
        return this.heap.length;
    }

}

const compra = new MinHeap(4);
compra.insert(new Actions('Fercho','Tigo',45,5))
compra.insert(new Actions('Duglas','Claro',44,3))
compra.insert(new Actions('Medina','Coca Cola',20,4))
compra.insert(new Actions('Ferpa','Grapete',22,4))
compra.insert(new Actions('Afre','India Quiche',99,4))
compra.insert(new Actions('Maria','Shucos El pepe',5,4))

const valor = compra.viewHeap()

console.log(valor)
console.log('Este es el valor maximo',compra.getMin())
console.log(valor)