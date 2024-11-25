import fs from "fs";
import Candidate from "./Candidate";

export default class Solution {
    #candidates: Candidate[] = [];

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

    // OsszesSzavazat(): number {
    //     let szavazatSzam: number = 0;
    //     for (const c of this.#candidates) {
    //         szavazatSzam += c.candidatesVote;
    //     }
    //     return szavazatSzam;
    // }

    // szavazatSzazalek() {
    //     return ((this.OsszesSzavazat()/ 12345) *100).toFixed(2);
    // }
    sziatokhalohalo(){
        let szavazatSzam: number = 0;
            for (const c of this.#candidates) {
                szavazatSzam += c.candidatesVote;
            }
        let szazalek = ((szavazatSzam/12345)*100).toFixed(2);
        return `A választáson ${szavazatSzam} állampolgár, a jogosultak ${szazalek}%-a vett részt.`
    }
}
