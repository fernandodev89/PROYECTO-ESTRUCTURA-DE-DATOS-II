import { Actions } from "./actions";
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

}