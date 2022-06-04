let productos = [{
    nombre: "Milkybar",
    foto: "milkybar.jpg",
    descripcion: "Chocolate blanco Nestlé Milkybar 100 g.",
    precio: 1.20,
    descuento: "10%",
}, {
    nombre: "Crunch",
    foto: "crunch.jpg",
    descripcion: "Chocolate crujiente Crunch Nestlé sin gluten 100 g.",
    precio: 1.32,
    descuento: "20%",
}, {
    nombre: "Croissants - La Bella Easo",
    foto: "croissant.jpg",
    descripcion: "Croissants 0% azucares La Bella Easo 360 g.",
    precio: 2.59,
    descuento: "",
}, {
    nombre: "Nesquik",
    foto: "nesquik.jpg",
    descripcion: "Chocolate con leche con relleno cremoso Nestlé Nesquik 100 g.",
    precio: 1.31,
    descuento: "30%",
}];

/** Products that user has chosen.*/
let specialProducts = [];

let subtotal = 0.0;

function createProducts() {
   for (let i = 0; i < 4; i++){
       var pArticle = document.createElement("article");
       pArticle.classList.add("articulo");
       document.getElementById("productos").appendChild(pArticle);
       var pDiv = document.createElement("div");
       document.getElementsByClassName("articulo")[i].appendChild(pDiv);
       var firstP = document.createElement("p");
       firstP.classList.add("nombre","w50");
       document.getElementsByClassName("articulo")[i].getElementsByTagName("div")[0].appendChild(firstP);
       var secondP = document.createElement("p");
       secondP.classList.add("descuento");
       document.getElementsByClassName("articulo")[i].getElementsByTagName("div")[0].appendChild(secondP);
       var img = new Image();
       img.src = ""
       document.getElementsByClassName("articulo")[i].appendChild(img);
       var thirdP = document.createElement("p");
       document.getElementsByClassName("articulo")[i].appendChild(thirdP);
       var firstSpan = document.createElement("span");
       document.getElementsByClassName("articulo")[i].getElementsByTagName("p")[2].appendChild(firstSpan);
       var fourthP = document.createElement("p");
       document.getElementsByClassName("articulo")[i].appendChild(fourthP);
       var fifthP = document.createElement("p");
       document.getElementsByClassName("articulo")[i].appendChild(fifthP);
       var firstInput = document.createElement("input");
       firstInput.setAttribute("type","number");
       firstInput.setAttribute("step","1");
       firstInput.setAttribute("min","0");
       firstInput.setAttribute("value","0")
       document.getElementsByClassName("articulo")[i].getElementsByTagName("p")[4].appendChild(firstInput);
   }
   showProducts()
   createButton()
}

function showProducts(){
    var articles = document.getElementsByClassName("articulo");
    for (let i = 0; i < articles.length; i++){
        let article = articles[i];
        let product = productos[i];
        article.getElementsByClassName("nombre")[0].innerHTML = product.nombre;
        article.getElementsByClassName("descuento")[0].innerHTML = product.descuento;
        article.getElementsByTagName("img")[0].src = "src/" + product.foto;
        article.getElementsByTagName("span")[0].innerHTML = product.precio + "€";
        article.getElementsByTagName("p")[3].innerHTML = product.descripcion;
        article.getElementsByTagName("input")[0].id = product.nombre
    }
}

function createButton(){
    let newDiv = document.createElement("div");
    newDiv.classList.add("center");
    document.getElementsByClassName("w100")[0].appendChild(newDiv);
    let specialButton = document.createElement("button");
    specialButton.innerHTML = "Añadir Productos";
    document.getElementsByClassName("center")[0].appendChild(specialButton);
    document.getElementsByTagName("button")[0].addEventListener("click",createCells)
}

/** With this function we add the products that the user has choosen to an array called SpecialProducts. */
function analizeInputs(){
    specialProducts.length = 0;
    let productsArticle = document.getElementsByClassName("articulo");
    for ( let i = 0; i < productsArticle.length; i++){
        let quantity = productsArticle[i].getElementsByTagName("input")[0].value;
        if (quantity != 0){
            specialProducts.push(productsArticle[i]);
        }
    }
}

function createCells() {
    vaciaCarro();
    analizeInputs();
    for (let i = 0; i < specialProducts.length; i++){
        var newTr = document.createElement("tr");
        document.getElementById("tablebody").appendChild(newTr);
        for (let j = 0; j < 5; j++){
            var newTd = document.createElement("td");
            document.getElementById("tablebody").getElementsByTagName("tr")[i].appendChild(newTd);
        }
    }
    addProducts();
}

function addProducts() {
    var rows = document.getElementById("tablebody").getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++){
        let cells = rows[i].getElementsByTagName("td");
        let product = specialProducts[i];
        let discount = 0;
        cells[1].innerHTML = product.getElementsByTagName("span")[0].innerHTML;
        if (product.getElementsByClassName("descuento")[0].innerHTML == ""){
            cells[2].innerHTML = discount.toFixed(2);
            cells[0].innerHTML = product.getElementsByClassName("nombre")[0].innerHTML;
        } else {
            discount = ((parseFloat(product.getElementsByClassName("descuento")[0].innerHTML) * parseFloat(cells[1].innerHTML)) / 100).toFixed(2);
            cells[2].innerHTML = discount;
            cells[0].innerHTML = product.getElementsByClassName("nombre")[0].innerHTML + "**";
        }
        cells[3].innerHTML = product.getElementsByTagName("input")[0].value;
        cells[4].innerHTML = ((parseFloat(product.getElementsByTagName("span")[0].innerHTML) - cells[2].innerHTML) * product.getElementsByTagName("input")[0].value).toFixed(2) +" €";
    }
    calculateFinalPrize(rows);
}

function calculateFinalPrize(rows){
    subtotal = 0.0;
    for (let i = 0; i < rows.length; i++){
        subtotal += parseFloat(rows[i].getElementsByTagName("td")[4].innerHTML);
    }
    document.getElementById("subtotal").innerHTML = subtotal.toFixed(2);
}

function vaciaCarro() {
    let tabla = document.getElementById("tablebody");
    while (tabla.hasChildNodes()) {
        let child = tabla.removeChild(tabla.firstChild)
    }
}