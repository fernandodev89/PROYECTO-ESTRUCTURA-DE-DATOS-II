//clase para las acciones 
class Actions{
    private id:number;
    private companyName:string;
    private price:number;
    private quantity:number

    constructor( id:number,companyName:string, price:number, quantity:number){
        this.id = id;
        this.companyName = companyName;
        this.price = price;
        this.quantity = quantity;
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

    public resetActions():void{
        this.companyName = '';
        this.price = 0;
        this.quantity = 0;

    }
    

}

export {Actions}