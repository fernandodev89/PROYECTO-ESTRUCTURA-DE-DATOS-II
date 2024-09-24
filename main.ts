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
    let ventasIguales = ventas.searchSale(actionCreate);
    console.log(ventasIguales)
    //compras.insert(user,actionCreate)

}

//creamos las ventas
createSale(user1,18,'Tigo',5,5);
createSale(user2,12,'Tigo',44,3);
createSale(user3,1,'Coca Cola',20,90);

//creamos y comprobamos el funcionamiento cuando alguien realiza la compra
createBuys(user1,1,'Coca Cola',20,65);