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

    inputVotesNumber(firstname:string, lastname:string){
        for (const can of this.#candidates) {
            if (can.candidatesFullName.includes(firstname + lastname)) {
                return can.candidatesVote;
            }
        }
        return -1;
    }

    inputVotesString(votes: number):string{
        return "";
    }
}