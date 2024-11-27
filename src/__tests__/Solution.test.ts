import Solution from "../Solution"
import fs from "fs"

describe("Solution class tests", ()=>{
    const instance = new Solution("szavazatok.txt");
    
    it("Solution instance test", ()=>{
        expect(instance).toBeInstanceOf(Solution);
    });
    it("Testing \"inputVotesNumber\" method return value", ()=>{
        expect(instance.inputVotesNumber("Alma", "Dalma")).toBe("Alma Dalma 120 db szavazatot kapott");
        expect(instance.inputVotesNumber("Gémes", "")).toBe("Ilyen nevű képviselőjelölt nem szerepela nyilvántartásban!");
    });
    it("Testing \"getAllVotes\" method return value",()=>{
        expect(instance.getAllVotes()).toBe(4713);
        expect(typeof(instance.getAllVotes())).toBe("number");
        expect(typeof(instance.getAllVotes)).toBe("function");
    });
    
});
