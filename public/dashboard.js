let div1 = document.getElementById("my_div");

fetch("https://fakestoreapi.com/products")
.then(function(response){
    return response.json();
})
.then(function(jsonData){
    console.log(jsonData)
    for(items in jsonData){
        var imgSource = jsonData[items].image;
        let productPrice = jsonData[items].price;

        let div2 = document.createElement("div");
        div2.setAttribute("class", "container");

        let img = document.createElement("img");
        img.setAttribute("src", imgSource);

        let price = document.createElement("h3");
        price.innerHTML = "$" + productPrice;

        let anc = document.createElement("a");
        anc.setAttribute("href", "product.html");
        anc.innerHTML = "View More ➡️";

        div2.appendChild(img);
        
        div2.appendChild(price);
        div2.appendChild(anc);
        div1.appendChild(div2);
    }
})