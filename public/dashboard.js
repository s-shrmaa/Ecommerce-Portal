let div1 = document.createElement("div");
div1.setAttribute("id", "my_div");

fetch("https://fakestoreapi.com/products")
.then(function(response){
    return response.json();
})
.then(function(jsonData){
    for(items in jsonData){
        var imgSource = jsonData[items].image;

        let div2 = document.createElement("div");
        div2.setAttribute("class", "container");

        let img = document.createElement("img");
        img.setAttribute("src", imgSource);

        let anc = document.createElement("a");
        anc.setAttribute("href", "product.html");
        anc.innerHTML = "View More ➡️";

        div2.append(img);
        div2.append(anc);
        div1.append(div2);
        document.body.appendChild(div1);
    }
})