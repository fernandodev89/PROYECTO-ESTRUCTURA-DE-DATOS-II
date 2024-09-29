import { MaxHeap } from './max_heap';
import { MinHeap } from './min_heap';
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

function viewHistory():void{
    for(const a in historyActionsFitechLabs){
        console.log('-----------------------------------------------------------------');
        console.log('Historial de la compra de la siguiente accion:')
        historyActionsFitechLabs[a][1].viewAction()
        console.log('**********************************************')
        for(const b in historyActionsFitechLabs[a][0]){
            historyActionsFitechLabs[a][0][b].viewHistory()
        }
        console.log('-----------------------------------------------------------------');
    }
}

//funcion encargada de hacer emparejamiento automatico de ordenes:
function pairingOrders():void{
    if(compras.getQuantityy()===1){
        const maxValue = compras.getMax();

        if (maxValue) {
            const [userCopy, actionCopy] = maxValue;
            let historial = ventas.makeBuy(actionCopy,userCopy.getName());
            console.log(historial)
            if(historial[0].length ===0 && historial[1]=== actionCopy.getQuantityActions()) {
                console.log('No hay ventas que coincidan con la orden de compra!\nVerificar en otro momento\nSe agregara a las ordenes de espera');
                compras.insert(userCopy,actionCopy);

            }else if(historial[0].length>0 && historial[1]===0){
                console.log(`La compra fue realizada correctamente!!\nEstas son las acciones con el precio que se compraron:\n${historial[0]}`);
                historyActionsFitechLabs.push([historial[0],actionCopy]);
            }else if(historial[0].length>0 && historial[1]>0){
                console.log(`No se pudieron comprar todas las acciones solicitadas, pero si una parte!!\nEstas fueron las acciones y el precio pagado:${historial[0]}\nEstas son la cantidad de acciones que se pondran en las ordenes de espera:${historial[1]}`);
                historyActionsFitechLabs.push([historial[0],actionCopy]);
                actionCopy.setQuantity(historial[1]);
                compras.insert(userCopy,actionCopy);
            }

        } else {
            console.log("No hay elementos en el heap.");
        }

    }
    else if(compras.getQuantityy()>1){

        let totalCompras = compras.getQuantityy()
        const temporalCompras = new MaxHeap(totalCompras)
        for(let i = 1; i<=totalCompras;i++){
            const valueMax =  compras.getMax();
            if(valueMax){

                const [user,actionCreate] = valueMax
                let historial = ventas.makeBuy(actionCreate,user.getName());
                if(historial[0].length ===0 && historial[1]=== actionCreate.getQuantityActions()) {
                    console.log('-------------------------------------------------------------------------------------------');
                    console.log('| No hay ventas que coincidan con la orden de compra, Se agregara a las ordenes de espera! |');
                    console.log('-------------------------------------------------------------------------------------------');
                    temporalCompras.insert(user,actionCreate);

                }else if(historial[0].length>0 && historial[1]===0){
                    console.log('--------------------------------------------------------------------------------------------------');
                    console.log(`| La compra fue realizada correctamente!, Estas son las acciones con el precio que se compraron: |`);
                    for(const a in historial[0]){
                        historial[0][a].viewHistory()
                    }
                    console.log('--------------------------------------------------------------------------------------------------');
                    historyActionsFitechLabs.push([historial[0],actionCreate]);

                }else if(historial[0].length>0 && historial[1]>0){
                    console.log('-------------------------------------------------------------------------------------------------------------------------');
                    console.log(`| No se pudieron comprar todas las acciones solicitadas, pero si una parte, las demas se pondran en una orden de espera! |\n| Estas fueron las acciones y el precio pagado:                                                                          | `);
                    for(const a in historial[0]){
                        historial[0][a].viewHistory()
                    }
                    console.log('-------------------------------------------------------------------------------------------------------------------------');
                    historyActionsFitechLabs.push([historial[0],actionCreate]);
                    actionCreate.setQuantity(historial[1]);
                    temporalCompras.insert(user,actionCreate);

                }
            }
        }
        let totalComprasTempo = temporalCompras.getQuantityy()
        for(let i = 1; i<= totalComprasTempo; i++){
            const maxValue = temporalCompras.getMax();
            if (maxValue){
                const [user,action]  = maxValue
                compras.insert(user,action);
            }
        }

    }

}


//funcion encargada de crear una venta
function createSale(user:User,id:number,nameCompany:string,price:number,quantity:number):void {
    const actionCreate = new Actions(id,nameCompany,price,quantity);
    ventas.insert(user,actionCreate);
}

//funcion encargada de hacer una compra 
//si la compra existe la ejecuta inmediatamente si no la almacena en ventas en espera
function createBuys(user:User,id:number,nameCompany:string,price:number,quantity:number):void {
    const actionCreate = new Actions(id,nameCompany,price,quantity);
    let historial = ventas.makeBuy(actionCreate,user.getName());
    if(historial[0].length ===0 && historial[1]=== actionCreate.getQuantityActions()) {
        console.log('-------------------------------------------------------------------------------------------');
        console.log('| No hay ventas que coincidan con la orden de compra, Se agregara a las ordenes de espera! |');
        console.log('-------------------------------------------------------------------------------------------');
        compras.insert(user,actionCreate);

    }else if(historial[0].length>0 && historial[1]===0){
        console.log('--------------------------------------------------------------------------------------------------');
        console.log(`| La compra fue realizada correctamente!!\nEstas son las acciones con el precio que se compraron: |`);
        for(const a in historial[0]){
            historial[0][a].viewHistory()
        }
        console.log('--------------------------------------------------------------------------------------------------');
        historyActionsFitechLabs.push([historial[0],actionCreate]);
    }else if(historial[0].length>0 && historial[1]>0){
        console.log('-------------------------------------------------------------------------------------------------------------------------');
        console.log(`| No se pudieron comprar todas las acciones solicitadas, pero si una parte, las demas se pondran en una orden de espera! |\n| Estas fueron las acciones y el precio pagado:                                                                          | `);
        for(const a in historial[0]){
            historial[0][a].viewHistory()
        }
        console.log('-------------------------------------------------------------------------------------------------------------------------');
        historyActionsFitechLabs.push([historial[0],actionCreate]);
        actionCreate.setQuantity(historial[1]);
        compras.insert(user,actionCreate);
    }

}

//creamos las ventas
createSale(user1,18,'Tigo',5,5);
createSale(user2,12,'Tigo',44,3);
createSale(user3,1,'Coca Cola',20,50);

//console.log(ventas.viewHeap())
console.log('-----------------------------------------------------------------');

//creamos y comprobamos el funcionamiento cuando alguien realiza la compra
createBuys(user1,1,'Coca Cola',22,65);
createBuys(user1,8,'Pepsi',22,65);
createBuys(user1,7,'Amazon',22,65);
createBuys(user1,7,'Amazon',22,65);
createBuys(user1,7,'Amazon',22,65);
/*
console.log('-----------------------------------------------------------------')
console.log(compras.viewHeap())
console.log('-----------------------------------------------------------------')
console.log(ventas.viewHeap())
console.log('-----------------------------------------------------------------')
console.log(ventas.viewHeap())
console.log('-----------------------------------------------------------------')
*/
//creamos otra venta para que haga el auto emparejamiento 
createSale(user3,1,'Coca Cola',20,50);
pairingOrders()
viewHistory()
createSale(user3,7,'Amazon',22,55);
createSale(user3,7,'Amazon',22,65);
//Deje esto para que mire las diferencias de los historiales y que verifique que el emparejamiento fuciona correctamente
console.log('777777777777777777777777777777777777777777777777777777777777777777777')
pairingOrders()
viewHistory()