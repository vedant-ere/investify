import { addMatchedOrders } from "./SQLconnections.js";

class PriorityQueue {
    constructor(comparator) {
        this.items = [];
        this.comparator = comparator;
    }
    enqueue(item) {
        this.items.push(item);
        this.bubbleUp();
    }
    dequeue() {
        if (this.items.length === 0) return null;
        if (this.items.length === 1) return this.items.pop();
        const root = this.items[0];
        this.items[0] = this.items.pop();
        this.bubbleDown();
        return root;
    }
    peek() {
        return this.items[0] || null;
    }
    isEmpty() {
        return this.items.length === 0;
    }
    bubbleUp() {
        let index = this.items.length - 1;
        const element = this.items[index];
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.items[parentIndex];
            if (this.comparator(element, parent) >= 0) break;
            this.items[index] = parent;
            index = parentIndex;
        }
        this.items[index] = element;
    }
    bubbleDown() {
        let index = 0;
        const length = this.items.length;
        const element = this.items[0];
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;
            if (leftChildIndex < length) {
                leftChild = this.items[leftChildIndex];
                if (this.comparator(leftChild, element) < 0) {
                    swap = leftChildIndex;
                }
            }
            if (rightChildIndex < length) {
                rightChild = this.items[rightChildIndex];
                if (
                    (swap === null && this.comparator(rightChild, element) < 0) ||
                    (swap !== null && this.comparator(rightChild, leftChild) < 0)
                ) {
                    swap = rightChildIndex;
                }
            }
            if (swap === null) break;
            this.items[index] = this.items[swap];
            index = swap;
        }
        this.items[index] = element;
    }
}

export default class OrderBook {
    constructor() {
        this.sellBook = new PriorityQueue((a, b) => a.price - b.price);
        this.buyBook = new PriorityQueue((a, b) => b.price - a.price);
    }
    addSellOrder(price, qty, shareName, userID) {
        const order = { price, qty, share: shareName, time: new Date(), userID };
        this.sellBook.enqueue(order);
        this.matchOrders();
    }
    addBuyOrder(price, qty, shareName, userID) {
        const order = { price, qty, share: shareName, time: new Date(), userID };
        this.buyBook.enqueue(order);
        this.matchOrders();
        // console.log(this.buyBook);
    }
    matchOrders() {
        while (!this.sellBook.isEmpty() && !this.buyBook.isEmpty() && this.buyBook.peek().price >= this.sellBook.peek().price) {
            const sellOrder = this.sellBook.dequeue();
            const buyOrder = this.buyBook.dequeue();
            // console.log(sellOrder);
            // console.log(buyOrder);
            if (sellOrder.share == buyOrder.share){
                const matchedQty = Math.min(sellOrder.qty, buyOrder.qty);
                const matchedPrice = sellOrder.price;
                const date_of_orders = new Date().toISOString().split('T')[0];
                console.log({buyID: buyOrder.userID,sellID: sellOrder.userID,price: matchedPrice,qty: matchedQty,shareName:sellOrder.share,date_of_orders})
                addMatchedOrders({buyID: buyOrder.userID,sellID: sellOrder.userID,price: matchedPrice,qty: matchedQty,shareName:sellOrder.share,date_of_orders});
                sellOrder.qty -= matchedQty;
                buyOrder.qty -= matchedQty;
                if (sellOrder.qty > 0) this.sellBook.enqueue(sellOrder);
                if (buyOrder.qty > 0) this.buyBook.enqueue(buyOrder);
                console.log(`Matched ${matchedQty} shares of ${sellOrder.share} at price ${matchedPrice}`);
            }
        }
    }
    getCurrentMarketValue(shareName, uppercirc, lowercirc) { 
        const lowestSellOrder = this.sellBook.items.find(order => order.share === shareName);
        const highestBuyOrder = this.buyBook.items.find(order => order.share === shareName);
        if (!lowestSellOrder && !highestBuyOrder) {
            return lowercirc;
        }
        return lowestSellOrder ? lowestSellOrder.price : uppercirc;
    }
        
}