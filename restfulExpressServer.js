import express from "express";
import fs from "fs/promises";

const server = express();
const PORT = 4000;


server.use(express.json());

server.get("/pets", (req, res) =>{
    fs.readFile("pets.json", "utf-8").then((data) => {
        res.send(JSON.parse(data));
    })
    
});

server.post("/pets", (req, res) => {
    const { age, name, kind } = req.body;
    const pet = { age, name, kind};


    if (!kind || !age || !name){
        res.sendStatus(422);
        return;
    }

    fs.readFile("pets.json", "utf-8")
    .then((data) =>{
        const pets = JSON.parse(data);
        pets.push(pet);
        return fs.writeFile("pets.json", JSON.stringify(pets))
    })
    .then(() => {
        res.status(201).send(pet);
    });
});

server.patch("/pets/:petIndex", (req, res) => {
    const petIndex = Number(req.params.petIndex);
    const {name, age, kind} = req.body;
    const ageNum = Number(age);
    if(!age && !name && !kind || (age && Number.isNaN(ageNum)) || Number.isNaN(petIndex) || ageNum < 0) {
        res.sendStatus(422);
        return;
    }

    fs.readFile("pets.json", "utf-8").then(data => {
        const pets = JSON.parse(data);

        if(petIndex < 0 && petIndex >= pets.length) {
            res.sendStatus(404);
        return;
        }
        const petToUpdate = pets[petIndex];
        if (name !== undefined){
            petToUpdate.name = name;
        } 
        if (age !== undefined){
            petToUpdate.age = ageNum;
        }
        if (kind !== undefined){
            petToUpdate.kind = kind;
        }
        return fs.writeFile("pets.json", JSON.stringify(pets));
        res.send(petToUpdate)
    });
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});