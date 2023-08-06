/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import fs from 'fs';

inquirer
    .prompt({
        type:"input",
        name:"url", // user input value(url) is stored in the "url"
        message:"Enter the URL"
    }) //{}→describe a javascript object
    .then(answer=>{
        console.log("User's url is ", answer.url);
        const data = answer.url;
        const qrCode = qr.image(data, {type:"png"}); // here thhe qrCode is an object
        qrCode.pipe(fs.createWriteStream('qrcode.png')); //qrCode pipe is connection between readable(the url we provide) and writeable(the qrcode it generated) stream here we can 
        fs.writeFile('Url.txt', answer.url, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        }); 
        console.log("QR Code is generated");
    })


