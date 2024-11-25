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

    FirstOfAllElectorateWriteFile(FileName:string):void{
        let electorates: number[] = [];
        let maxVotes: number[] = [];
        let maxNames: string[] = [];
        let maxParties: string[] =[];
        // electorates = electorates.sort((a,b) => a - b);
        for (const c of this.#candidates) {
            // electorates = electorates.sort((a,b) => a - b);

            if (!electorates.includes(c.candidateElectroliteID)) {
                electorates.push(c.candidateElectroliteID);
                maxVotes.push(c.candidatesVote);
                maxNames.push(c.candidatesFullName);
                maxParties.push(c.candidateParty);
            }
            else{
                if (c.candidatesVote > maxVotes[electorates.indexOf(c.candidateElectroliteID)]) {
                    maxVotes[electorates.indexOf(c.candidateElectroliteID)] = c.candidatesVote;
                    maxNames[electorates.indexOf(c.candidateElectroliteID)] = c.candidatesFullName;
                    maxParties[electorates.indexOf(c.candidateElectroliteID)] = c.candidateParty;
                }
            }
        }
        console.log(electorates);
        console.log(maxVotes);
        console.log(maxNames);
        console.log(maxParties);

    //    for (const c of this.#candidates) {
    //         if (maxNames.includes(c.candidatesFullName)) {
    //             fs.writeFileSync(FileName, `${electorates[maxNames.indexOf(c.candidatesFullName)]} ${c.candidatesFullName.split(' ')[0]} ${c.candidatesFullName.split(' ')[1]} ${c.candidateParty} `)
    //         }
    //    }
    }
}
