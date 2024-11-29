import fs from "fs";
import Candidate from "./Candidate";

export default class Solution {
    #candidates: Candidate[] = [];

    #partiesShort: Map<string, string> = new Map<string, string>([
        ["ZEP", "Zöldségevők Pártja"],
        ["HEP", "Húsevők Pártja"],
        ["GYEP", "Gyümölcsevők Pártja"],
        ["TISZ", "Tejivók Szövetsége"],
        ["-", "Független jelöltek"],
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
    KettesFeladat(): number{
        return this.#candidates.length;
    }

    inputVotesNumber(firstname: string, lastname: string): string {
        for (const can of this.#candidates) {
            if (can.candidatesFullName.toLowerCase() == (firstname + " " + lastname).toLowerCase()) {
                return `${can.candidatesFullName} ${can.candidatesVote} db szavazatot kapott`;
            }
        }
        return "Ilyen nevű képviselőjelölt nem szerepela nyilvántartásban!";
    }

    sziatokhalohalo(){
        let szavazatSzam: number = 0;
            for (const c of this.#candidates) {
                szavazatSzam += c.candidatesVote;
            }
        let szazalek = ((szavazatSzam/12345)*100).toFixed(2);
        return `A választáson ${szavazatSzam} állampolgár, a jogosultak ${szazalek}%-a vett részt.`;
    }

    getAllVotes():number{
        let allvote:number = 0;
        for (const c of this.#candidates) {
            allvote += c.candidatesVote;
        }
        return allvote;
    }

    votesPercentageOfParties(): string {
        let partiesVotes: Map<string, number> = new Map<string, number>();
        let finalString: string = "";
        for (const c of this.#candidates) {
            if (!partiesVotes.has(c.candidateParty)) {
                partiesVotes.set(c.candidateParty, c.candidatesVote);
            } else {
                let old = partiesVotes.get(c.candidateParty);
                partiesVotes.set(c.candidateParty, Number(old) + c.candidatesVote);
            }
        }
        for (const p of partiesVotes) {
            for (const z of this.#partiesShort) {
                if (p[0] == z[0]) {
                    finalString += `\n\t${z[1]} = ${((p[1] / this.getAllVotes()) * 100).toFixed(2)}%`;
                }
            }
        }
        return finalString;
    }

    #districtMaxVote(dist: number): Candidate {
        let maxVote:number = this.#candidates[0].candidatesVote;
        let maxCandidate:Candidate = this.#candidates[0];
        for (const c of this.#candidates) {
            if (c.candidateElectroliteID == dist && c.candidatesVote > maxVote) {
                maxVote = c.candidatesVote;
                maxCandidate = c;
            }
        }
        return maxCandidate;
    };

    FirstOfAllElectorate(): string {
        let electorates:number[] = [];
        let maxCandidates:Candidate[] = [];
        for (const c of this.#candidates) {
            if (!electorates.includes(c.candidateElectroliteID)) {
                electorates.push(c.candidateElectroliteID);
                electorates.sort((a,b)=> a -b);
            }
        }
        for (const e of electorates) {
            maxCandidates.push(this.#districtMaxVote(e));
        }
        let Content: string = "";
        for (const mc of maxCandidates) {
            if (mc.candidateParty == "-") {
                Content += `${mc.candidateElectroliteID} ${mc.candidatesFullName.split(" ")[0]} ${mc.candidatesFullName.split(" ")[1]} független\r\n`;
            }
            else{
                Content += `${mc.candidateElectroliteID} ${mc.candidatesFullName.split(" ")[0]} ${mc.candidatesFullName.split(" ")[1]} ${mc.candidateParty}\r\n`;
            }
        }
        return Content;
    }

    WriteToFile(FileName: string, Content: string) {
        if (FileName == "kepviselok.txt") {
            fs.writeFileSync(FileName, Content);
        }
        else{
            throw new Error("Rossz nevet adott a fájlnak! (A helyes fájlnév kepviselok.txt)");
        }
    }

    hatodikfeladat(){
        let maxSzavazatok = 0;
        let maxNames: string[] = [];
        let maxParties: string[] = [];
        for (const c of this.#candidates) {
            if (c.candidatesVote > maxSzavazatok) {
                maxSzavazatok = c.candidatesVote;
            }
        }
        for (const a of this.#candidates) {
            if(a.candidatesVote == maxSzavazatok){
                maxNames.push(a.candidatesFullName);
                if(a.candidateParty == "-"){
                    maxParties.push("független");
                }
                else{
                    maxParties.push(a.candidateParty);
                }
            }
        }
        let result = "";
        for (let i = 0; i < maxNames.length; i++) {
            result += `\n\tNév: ${maxNames[i]} Párt: ${maxParties[i]}`;
        }
        return result;
    }
}
