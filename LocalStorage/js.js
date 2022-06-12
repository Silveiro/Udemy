
const carrito = {
    precio:1000,
    tamano:"100 inch",
    peso:40,
}
var carritoString = JSON.stringify(carrito);
console.log(typeof(carrito));
console.log(carrito);

console.log(carritoString);

localStorage.setItem("producto",carritoString);
localStorage.setItem("produccto", carrito);
localStorage.removeItem("produccto");