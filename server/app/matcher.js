import SortedList from "./sortedList";
import {buyComparator, sellComparator} from "./order";

export default class Matcher{
    #buys = SortedList(buyComparator);
    #sells = SortedList(sellComparator);

    constructor(){

    };
}
