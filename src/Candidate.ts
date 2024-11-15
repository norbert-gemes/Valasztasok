export default class Candidate{
    #electorateid: number;
    #votes: number;
    #firstname: string;
    #lastname: string;
    #party: string;


    constructor(row: string){
        const d: string[] = row.split(" ");
        this.#electorateid = parseInt(d[0]);
        this.#votes = parseInt(d[1]);
        this.#firstname = d[2];
        this.#lastname = d[3];
        this.#party = d[4];
    }
}