export default class Trade{
    constructor(buyer, seller, units, unitPrice){
        if(units <= 0) throw `Units must be > 0. Actual: ${units}`;

        this.buyer = buyer;
        this.seller = seller;
        this.units = units;
        this.unitPrice = unitPrice;
    };
};