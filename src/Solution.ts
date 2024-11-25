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

    FirstOfAllElectorate(): string {
        let electorates: number[] = [];
        let maxVotes: number[] = [];
        let maxNames: string[] = [];
        let maxParties: string[] = [];
        for (const c of this.#candidates) {
            // electorates = electorates.sort((a, b) => a - b);
            if (!electorates.includes(c.candidateElectroliteID)) {
                electorates.push(c.candidateElectroliteID);
                maxVotes.push(c.candidatesVote);
                maxNames.push(c.candidatesFullName);
                maxParties.push(c.candidateParty);
            } else {
                if (c.candidatesVote > maxVotes[electorates.indexOf(c.candidateElectroliteID)]) {
                    maxVotes[electorates.indexOf(c.candidateElectroliteID)] = c.candidatesVote;
                    maxNames[electorates.indexOf(c.candidateElectroliteID)] = c.candidatesFullName;
                    maxParties[electorates.indexOf(c.candidateElectroliteID)] = c.candidateParty;
                }
            }
        }
        for (let i = 0; i < maxParties.length; i++) {
            if (maxParties[i] == "-") {
                maxParties[i] = "Független";
            } else {
                for (const p of this.#partiesShort) {
                    if (maxParties[i] == p[0]) {
                        maxParties[i] = p[1];
                    }
                }
            }
        }
        let Content: string = "";
        for (let i = 0; i < electorates.length; i++) {
            Content += `${electorates[i]} ${maxNames[i].split(" ")[0]} ${maxNames[i].split(" ")[1]} ${maxParties[i]}\r\n`;
        }
        return Content;
    }

    WriteToFile(FileName: string, Content: string) {
        try {
            fs.writeFileSync(FileName, Content);
        } catch (error) {
            console.error("Error writing to file:", error);
        }
    }
}
