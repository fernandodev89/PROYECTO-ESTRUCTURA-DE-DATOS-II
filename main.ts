import{MaxHeap} from './max_heap';
import{MinHeap} from './min_heap';
import { Actions } from './actions';
import { User } from './user';
import { HistoryActions } from './history';

// objetos de compra y venta 
const compras = new MaxHeap(3);
const ventas = new MinHeap(2);

//usuarios que manipularan las pruebas
const user1 = new User('Fernando Contreras');
const user2 = new User('Duglas Portillo');
const user3 = new User('Alejandro Soto');

//Variable para Historial de transacciones exitosas
const historyActionsFitechLabs = []

function pairingOrders(user:User,actions:Actions):void{

}

function createSale(user:User,id:number,nameCompany:string,price:number,quantity:number):void {
    const actionCreate = new Actions(id,nameCompany,price,quantity)
    ventas.insert(user,actionCreate)
}

function createBuys(user:User,id:number,nameCompany:string,price:number,quantity:number):void {
    const actionCreate = new Actions(id,nameCompany,price,quantity)
    compras.insert(user,actionCreate)

}