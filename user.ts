import { Actions } from "./actions";
//clase para usuarios
export class User{
    private nameUser: string;
    private actionsUser:Actions[]

    constructor(name:string){
        this.nameUser = name;
        this.actionsUser = []
    }

    public getName():string{
        return this.nameUser;
    }

    public getActions():Actions[]{
        return this.actionsUser;
    }

    public addAction(action:Actions):void{
        this.actionsUser.push(action);
    }

    public viewActions():void{
        if(this.actionsUser.length>0){
            console.log('Estas son todas las acciones que posee el usuario:');
            console.log('-------------------------------------')
            for(const a in this.actionsUser){
                console.log(this.actionsUser[a])
            }
        }else{
            console.log('El usuario no cuenta con ninguna accion al momento!')
        }

    }

}