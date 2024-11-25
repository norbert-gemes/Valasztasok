import fs from "fs"; // https://nodejs.org/docs/latest-v14.x/api/fs.html
import http from "http"; // https://nodejs.org/docs/latest-v14.x/api/http.html
import url from "url"; // https://nodejs.org/docs/latest-v14.x/api/url.html
import Solution from "./Solution";

export default function content(req: http.IncomingMessage, res: http.ServerResponse): void {
    // favicon.ico kérés kiszolgálása:
    if (req.url === "/favicon.ico") {
        res.writeHead(200, { "Content-Type": "image/x-icon" });
        fs.createReadStream("favicon.ico").pipe(res);
        return;
    }
    // Weboldal inicializálása + head rész:
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<!DOCTYPE html>");
    res.write("<html lang='hu'>");
    res.write("<head>");
    res.write("<meta charset='utf-8'>");
    res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
    res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
    res.write("<title>Jedlik Ts Template</title>");
    res.write("</head>");
    res.write("<body><form><pre>");
    const params = new url.URL(req.url as string, `http://${req.headers.host}/`).searchParams;

    // Kezd a kódolást innen -->
    const s: Solution = new Solution("szavazatok.txt");

    // 2. feladat (kaplon)
    // res.write(`A helyhatósági választáson ${s.KettesFeladat()} képviselőjelölt indult.`);
    // 3-as feladat (Norbi)
    let inputFirstName: string = params.get("firstname") as string;
    if (inputFirstName == null) inputFirstName = "";
    res.write(`3. feladat:\n\tKérem a képviselőjelölt vezetéknevét: <input type='text' name='firstname' value='${inputFirstName}' style='max-width:100px;' onChange='this.form.submit();'>\n`);

    let inputLastName: string = params.get("lastname") as string;
    if (inputLastName == null) inputLastName = "";
    res.write(`\tKérem a képviselőjelölt keresztnevét: <input type='text' name='lastname' value='${inputLastName}' style='max-width:100px;' onChange='this.form.submit(); '>\n`);

    let thirdWrite = res.write("");
    if (inputFirstName != "" && inputLastName != "") {
        thirdWrite = res.write(`\n3.feladat: \n\t${s.inputVotesNumber(inputFirstName, inputLastName)} `);
    } else {
        thirdWrite = res.write("");
    }
    // 5.feladat (Norbi)
    res.write("\n5.feladat:");
    res.write(`\t${s.votesPercentageOfParties()}`);

    // <---- Fejezd be a kódolást

    res.write("</pre></form></body></html>");
    res.end();
}
