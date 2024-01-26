let section = document.getElementById("my_div2");

fetch("https://fakestoreapi.com/products")
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

        div.appendChild(img);
        div.appendChild(heading);
        section.appendChild(div);
    }
})