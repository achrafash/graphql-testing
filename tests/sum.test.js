function sum(a, b) {
    return a + b;
}

describe("sum", () => {
    it("should add two integers", () => {
        expect(sum(1, 2)).toBe(3);
    });
});
