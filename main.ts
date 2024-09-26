import{MaxHeap} from './max_heap';
import{MinHeap} from './min_heap';
import { Actions } from './actions';
import { User } from './user';
import { HistoryActions } from './history';

//punteros
// objetos de compra y venta 
const compras = new MaxHeap(3);
const ventas = new MinHeap(2);

//usuarios que manipularan las pruebas
const user1 = new User('Fernando Contreras');
const user2 = new User('Duglas Portillo');
const user3 = new User('Alejandro Soto');

//Variable para Historial de transacciones exitosas
const historyActionsFitechLabs:Array<[HistoryActions[],Actions]> = []

//funcion encargada de hacer emparejamiento automatico de ordenes:
function pairingOrders():void{
    if(compras.getQuantityy()===1){
        const actionsCopy = compras.getMax();    
        let historial = ventas.makeBuy(actionsCopy[1],actionsCopy[0].getName());
        console.log(historial)
        if(historial[0].length ===0 && historial[1]=== actionsCopy[1].getQuantityActions()) {
            console.log('No hay ventas que coincidan con la orden de compra!\nVerificar en otro momento\nSe agregara a las ordenes de espera');
            compras.insert(actionsCopy[0],actionsCopy[1]);

        }else if(historial[0].length>0 && historial[1]===0){
            console.log(`La compra fue realizada correctamente!!\nEstas son las acciones con el precio que se compraron:\n${historial[0]}`);
            historyActionsFitechLabs.push([historial[0],actionsCopy[1]]);
        }else if(historial[0].length>0 && historial[1]>0){
            console.log(`No se pudieron comprar todas las acciones solicitadas, pero si una parte!!\nEstas fueron las acciones y el precio pagado:${historial[0]}\nEstas son la cantidad de acciones que se pondran en las ordenes de espera:${historial[1]}`);
            historyActionsFitechLabs.push([historial[0],actionsCopy[1]]);
            actionsCopy[1].setQuantity(historial[1]);
            compras.insert(actionsCopy[0],actionsCopy[1]);
        }
    }

}

//funcion encargada de crear una venta
function createSale(user:User,id:number,nameCompany:string,price:number,quantity:number):void {
    const actionCreate = new Actions(id,nameCompany,price,quantity)
    ventas.insert(user,actionCreate)
}

//funcion encargada de hacer una compra 
//si la compra existe la ejecuta inmediatamente si no la almacena en ventas en espera
function createBuys(user:User,id:number,nameCompany:string,price:number,quantity:number):void {
    const actionCreate = new Actions(id,nameCompany,price,quantity)
    let historial = ventas.makeBuy(actionCreate,user.getName());
    console.log(historial)
    if(historial[0].length ===0 && historial[1]=== actionCreate.getQuantityActions()) {
        console.log('No hay ventas que coincidan con la orden de compra!\nVerificar en otro momento\nSe agregara a las ordenes de espera')
        compras.insert(user,actionCreate)

    }else if(historial[0].length>0 && historial[1]===0){
        console.log(`La compra fue realizada correctamente!!\nEstas son las acciones con el precio que se compraron:\n${historial[0]}`)
        historyActionsFitechLabs.push([historial[0],actionCreate])
    }else if(historial[0].length>0 && historial[1]>0){
        console.log(`No se pudieron comprar todas las acciones solicitadas, pero si una parte!!\nEstas fueron las acciones y el precio pagado:${historial[0]}\nEstas son la cantidad de acciones que se pondran en las ordenes de espera:${historial[1]}`)
        historyActionsFitechLabs.push([historial[0],actionCreate])
        actionCreate.setQuantity(historial[1])
        compras.insert(user,actionCreate)
    }

}

//creamos las ventas
createSale(user1,18,'Tigo',5,5);
createSale(user2,12,'Tigo',44,3);
createSale(user3,1,'Coca Cola',20,50);

console.log(ventas.viewHeap())
console.log('-----------------------------------------------------------------')

//creamos y comprobamos el funcionamiento cuando alguien realiza la compra
createBuys(user1,1,'Coca Cola',22,65);
console.log('-----------------------------------------------------------------')
console.log(compras.viewHeap())
console.log('-----------------------------------------------------------------')
console.log(ventas.viewHeap())
createSale(user3,1,'Coca Cola',20,50);
console.log('-----------------------------------------------------------------')
console.log(ventas.viewHeap())