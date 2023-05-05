import http from "node:http";
import fs from "node:fs";

http
.createServer(function(request, response){
    const petRegExp = /^\/pets\/(\d+)$/;
    // get request method
    console.log(request.method);
    //get request path
    console.log(request.url);

    // if GET to /pets, return pets
    if(request.method === "GET" && request.url === "/pets"){
        fs.readFile("pets.json", "utf-8", (error, string) => {
          response.setHeader("Content-Type", "application/json");
          response.end(string);
        });
    }else if(request.method === "GET" && petRegExp.test(request.url)){
     const petIndex = request.url.match((petRegExp)[1]);
      // read pets.json
     fs.readFile("pets.json", "utf-8", (error, string) => {
        response.setHeader("Content-Type", "application/json");
        // handel out of bounds indexs
        const pets = JSON.parse(string);
        const pet = pets[petIndex];
        //respond with request pet
        response.end(JSON.stringify(pet));

     console.log(petIndex);
     response.end();
    });
    }else{
    response.write("Hello World!");
    response.end();
    }
})
.listen(3000, function (){
    console.log("Listening on port 3000");
});


