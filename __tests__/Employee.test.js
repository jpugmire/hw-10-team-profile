const Employee = require("../lib/Employee");

test("Can make new employee", () => {
    const employee = new Employee();
    expect(typeof(employee)).toBe("object");
});

test("Can set name", () => {
    const name = 'Bob';
    const employee = new Employee(name);
    expect(employee.name).toBe(name);
});

test("Can set id", () => {
    const id = 1;
    const employee = new Employee(id);
    expect(employee.id).toBe(id);
});