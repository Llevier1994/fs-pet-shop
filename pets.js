import process from "node:process";
import fs from "node:fs";

const subcommand = process.argv[2];

if (subcommand === "read") {
  const petIndex = process.argv[3];
  fs.readFile("pets.json", "utf8", (error, string) => {
    if (error) {
      throw error;
    }

    const pets = JSON.parse(string);
    if (petIndex === undefined) {
      console.log(pets);
    } else {
      console.log(pets[petIndex]);
    }
  });
} else if (subcommand === "create") {
  const age = Number(process.argv[3]);
  const kind = process.argv[4];
  const name = process.argv[5];
  
if(
    Number.isNaN(age)||
    typeof kind !== "string" ||
    typeof name !== "string"
){
    console.error("Must add: age kind name");
    process.exit(1);
}
  
const newPet = { age, kind, name };

  fs.readFile("pets.json", "utf8", (error, string) => {
    if (error) {
      throw error;
    }

    const pets = JSON.parse(string);
    pets.push(newPet);

    fs.writeFile("pets.json", JSON.stringify(pets), "utf8", (error) => {
      if (error) {
        throw error;
      }

      console.log(newPet);
    });
  });
} else {
  console.error("Usage: node pets.js [read | create | update | destroy]");
  process.exit(1);
}



  

