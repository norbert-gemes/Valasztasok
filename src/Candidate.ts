export default class Candidate {
    #electorateid: number;
    #votes: number;
    #firstname: string;
    #lastname: string;
    #party: string;

    get candidatesFullName(): string {
        return this.#firstname + " " + this.#lastname;
    }

    get candidatesVote(): number {
        return this.#votes;
    }

    get candidateParty():string{
        return this.#party;
    }

    get candidateElectroliteID():number{
        return this.#electorateid;
    }

    constructor(row: string) {
        const d: string[] = row.split(" ");
        this.#electorateid = parseInt(d[0]);
        this.#votes = parseInt(d[1]);
        this.#firstname = d[2];
        this.#lastname = d[3];
        this.#party = d[4];
    }
}
