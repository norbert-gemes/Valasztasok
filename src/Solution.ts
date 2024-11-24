import fs from "fs"
import Candidate from "./Candidate";

export default class Solution{
    #candidates: Candidate[] = [];

    

    constructor(source: string){
        fs.readFileSync(source)
        .toString()
        .split("\n")
        .forEach(row => {
            const actualRow: string = row.trim();
            this.#candidates.push(new Candidate(actualRow));
        })
    }
    KettesFeladat(): number {
        return this.#candidates.length;
    }
}

