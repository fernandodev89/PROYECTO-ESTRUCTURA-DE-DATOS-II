//clase para las acciones 
class Actions{
    private nameUser:string;
    private companyName:string;
    private price:number;
    private quantity:number

    constructor(nameUser:string, companyName:string, price:number, quantity:number){
        this.nameUser = nameUser;
        this.companyName = companyName;
        this.price = price;
        this.quantity = quantity;
    }

    public getNameUser(){
        return this.nameUser;
    }

    public getCompanyName(){
        return this.companyName
    }

    public getPrice(){
        return this.price;
    }

    public getQuantityActions(){
        return this.quantity;
    }

    public setQuantity(i:number){
        this.quantity = i;
    }
    

}

export {Actions}