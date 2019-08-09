// Create a list of fruits with their properties (name, color, pricePerKg)
// and convert it into a format so that for a given fruit name
// retrieval of its color and pricePerKg value is fast


// Write your code here

let fruits;
let storeFruits;
let fruitDetails;

fruits = [
    { name: 'Orange', color: 'orange', pricePerkg: 70 },
    { name: 'Apple', color: 'red', pricePerkg: 80 },
    { name: 'Guava', color: 'green', pricePerkg: 60 },
    { name: 'Banana', color: 'yellow', pricePerkg: 50 }
];

storeFruits = {};

for (let item of fruits) {
    storeFruits[item.name] = item;
}

function getFruitDetail(fruitName) {
    fruitDetails = storeFruits[fruitName];
    if (fruitDetails) {
        let fruitcolor = 'Fruit color is ' + fruitDetails.color;
        let fruitprice = 'and its Price is Rs ' + fruitDetails.pricePerkg;
        return fruitcolor + fruitprice;
    } 
}

getFruitDetail('Orange');