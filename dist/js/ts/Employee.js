var Employee = (function () {
    function Employee(name) {
        this.name = name;
    }
    Employee.prototype.getName = function () {
        return this.name;
    };
    return Employee;
}());
;
var emp = new Employee("Sunil");
console.log(emp.getName());
