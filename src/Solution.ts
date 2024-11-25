import fs from "fs";
import Candidate from "./Candidate";

export default class Solution {
    #candidates: Candidate[] = [];

    #partiesShort: Map<string, string> = new Map<string, string>([
        ["ZEP", "Zöldségevők Pártja"],
        ["HEP","Húsevők Pártja" ],
        ["GYEP", "Gyümölcsevők Pártja"],
        ["TISZ", "Tejivók Szövetsége"],
        ["-","Független jelöltek"]
    ]);

    constructor(source: string) {
        fs.readFileSync(source)
            .toString()
            .trim()
            .split("\n")
            .forEach(row => {
                const actualRow: string = row.trim();
                this.#candidates.push(new Candidate(actualRow));
            });
    }

    inputVotesNumber(firstname: string, lastname: string): string {
        for (const can of this.#candidates) {
            if (can.candidatesFullName.toLowerCase() == (firstname + " " + lastname).toLowerCase()) {
                return `${can.candidatesFullName} ${can.candidatesVote} db szavazatot kapott`;
            }
        }
        return "Ilyen nevű képviselőjelölt nem szerepela nyilvántartásban!";
    }

    getAllVotes():number{
        let allvote:number = 0;
        for (const c of this.#candidates) {
            allvote += c.candidatesVote;
        }
        return allvote;
    }


    votesPercentageOfParties():string{
        let partiesVotes:Map<string, number> = new Map<string, number>();
        let finalString:string = "";
        for (const c of this.#candidates) {
            if (!partiesVotes.has(c.candidateParty)) {
                partiesVotes.set(c.candidateParty, c.candidatesVote)
            }
            else{
                let old = partiesVotes.get(c.candidateParty);
                partiesVotes.set(c.candidateParty, (Number(old) + c.candidatesVote));
            }
        }
        for (const p of partiesVotes) {
            for (const z of this.#partiesShort) {
                if (p[0] == z[0]) {
                    finalString += `\n\t${z[1]} = ${((p[1]/this.getAllVotes())*100).toFixed(2)}%`;
                }
            }
        }
        return finalString;
    }
}
