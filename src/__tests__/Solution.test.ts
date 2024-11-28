import Solution from "../Solution";
import fs from "fs";



describe("Solution class tests", () => {
    const instance = new Solution("szavazatok.txt");

    it("Solution instance test", () => {
        expect(instance).toBeInstanceOf(Solution);
    });
    it('Testing "inputVotesNumber" method return value', () => {
        expect(instance.inputVotesNumber("Alma", "Dalma")).toBe("Alma Dalma 120 db szavazatot kapott");
        expect(instance.inputVotesNumber("Gémes", "")).toBe("Ilyen nevű képviselőjelölt nem szerepela nyilvántartásban!");
    });
    it('Testing "getAllVotes" method return value', () => {
        expect(instance.getAllVotes()).toBe(4713);
        expect(typeof instance.getAllVotes()).toBe("number");
        expect(typeof instance.getAllVotes).toBe("function");
    });
    it('Testing "votesPercentageOfParties" method', () => {
        expect(typeof instance.votesPercentageOfParties()).toBe("string");
        expect(typeof instance.votesPercentageOfParties).toBe("function");
        expect(instance.votesPercentageOfParties().trim().split("\n").length).toBe(5);
    });
    it('testing "FirstOfAllElectorate" method', () => {
        expect(typeof instance.FirstOfAllElectorate()).toBe("string");
        expect(typeof instance.FirstOfAllElectorate).toBe("function");
        expect(instance.FirstOfAllElectorate().split("\n").length).toBe(9);
    });
    it('Testing "WriteToFile" method and kepviselok.txt and kepviselokOH.txt files compare', () => {
        instance.WriteToFile("kepviselok.txt", instance.FirstOfAllElectorate());
        expect(fs.readFileSync("kepviselok.txt").toString()).toStrictEqual(fs.readFileSync("kepviselokOH.txt").toString());
    });
    it("2. feladat tesztelése", () => {
        expect(typeof instance.KettesFeladat()).toBe("number");
        expect(instance.KettesFeladat()).toBe(40);
    });
    it("4. feladat tesztelése", () => {
        expect(typeof instance.sziatokhalohalo()).toBe("string");
        expect(typeof instance.sziatokhalohalo).toBe("function");
        expect(instance.sziatokhalohalo()).toContain("4713");
        expect(instance.sziatokhalohalo()).toContain("38.18%");
    });
    it("6. feladat tesztelése", () => {
        expect(typeof instance.hatodikfeladat()).toBe("string");
        expect(typeof instance.hatodikfeladat).toBe("function");
        expect(instance.hatodikfeladat()).toContain('Név: Joghurt Jakab Párt: TISZ');
        expect(instance.hatodikfeladat()).toContain('Név: Narancs Edmond Párt: GYEP');
        expect(instance.hatodikfeladat()).toContain('Név: Vadas Marcell Párt: HEP');
    });
});
