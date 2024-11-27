import Candidate from "../Candidate";

describe("Candidate class unit tests",()=>{
    const instance  = new Candidate("4 201 Kopasz Misi ZEP")
    it("Candidate instance check", async ()=>{
        expect(instance).toBeInstanceOf(Candidate);
    });
    it("Testing \"candidatesFullName\" property return value",async()=> {
        expect(instance.candidatesFullName).toBe("Kopasz Misi");
    });
    it("Testing \"candidatesVote\" property return value",async()=>{
        expect(typeof(instance.candidatesVote)).toBe("number");
        expect(instance.candidatesVote).toBe(201);
    });
    it("Testing \"candidatesParty\" property return value", async()=>{
        expect(typeof(instance.candidateParty)).toBe("string");
        expect(instance.candidateParty).toBe("ZEP");
    });
    it("Testing \"candidateElectroliteID\" property return value", async()=>{
        expect(typeof(instance.candidateElectroliteID)).toBe("number");
        expect(instance.candidateElectroliteID).toBe(4);
    });
})