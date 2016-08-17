class Employee {

	

    constructor(public name: string) { 
    	
    }
    getName() {
        return this.name;
    }
};

var emp = new Employee("Sunil");
    
console.log(emp.getName());