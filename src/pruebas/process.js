import { Express } from "express";

console.log("Directorio del script:", process.cwd());
console.log("ID del proceso:", process.pid);
console.log("Desde donde ejecuto el script:", process.title);
console.log("S.O.:", process.platform);

console.log(process.env); 
console.log("Argumentos que vienen por consola:", process.argv);