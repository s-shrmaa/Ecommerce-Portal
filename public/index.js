let section = document.createElement("section");
section.setAttribute("id", "my_div2");

fetch("https://fakestoreapi.com/products?limit=4")
.then(function(response){
    return response.json();
})
.then(function(jsonData){
    for(items in jsonData){
        var imgSource = jsonData[items].image;

        let div = document.createElement("div");
        div.setAttribute("class", "container");

        let img = document.createElement("img");
        img.setAttribute("src", imgSource);

        let heading = document.createElement("h3");
        heading.innerHTML = "50% OFF";

        div.append(img);
        div.append(heading);
        section.append(div);
        document.body.appendChild(section);
    }
})

let div1 = document.createElement("div");
div1.setAttribute("class", "grid-container");

let div2 = document.createElement("div");
div2.setAttribute("class", "grid-item");

fetch("https://fakestoreapi.com/products?limit=8")
.then(function(response){
    return response.json();
})
.then(function(jsonData){
    for(items in jsonData){
        var imgSource = jsonData[items].image;

        let div3 = document.createElement("div");
        div3.setAttribute("class", "grid-items");

        let img = document.createElement("img");
        img.setAttribute("src", imgSource);

        div3.append(img);
        div2.append(div3);
        div1.append(div2);
        document.body.appendChild(div1);
    }
})