
import { Request } from "./request";
import { UI } from "./ui";

const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const deparmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeesList = document.getElementById("employees");

const updateEmployeeButton = document.getElementById("update");

const request = new Request("http://localhost:3000/employees");
const ui = new UI();

let updateState = null;

// request.get()
// .then(emp =>console.log(emp))
// .catch(err=>console.log(err));

// request.post({name: "Mansur Ates",department: "Pazarlara",salary: 14500,})
// .then(emp=>console.log(emp))
// .catch(err=>console.log(err));

//request.put(1,{name: "Mansur Ates",department: "Pazarlara",salary: 14500,})
// .then(emp=>console.log(emp))
// .catch(err=>console.log(err));


// request.delete(17)
// .then(mes=>console.log(mes))
// .catch(err=>console.log(err));

eventListener();

function eventListener() {
    document.addEventListener("DOMContentLoaded", getAllEmployees);
    form.addEventListener("submit", addEmployee);
    employeesList.addEventListener("click", UpdateOrDelete);
    updateEmployeeButton.addEventListener("click", updateEmployee)
}

function getAllEmployees() {
    request.get()
        .then(emp => {
            ui.addAllEmployeeToUI(emp);
        })
        .catch(err => console.log(err))
}


function addEmployee(e) {

    const employeeName = nameInput.value.trim();
    const employeeDepartment = deparmentInput.value.trim();
    const employeeSalary = salaryInput.value.trim();
    if (employeeName === "" || employeeName === "" || employeeSalary === "") {
        alert("Lutfen tum alanlari doldurun");
    } else {
        request.post({ name: employeeName, department: employeeDepartment, salary: Number(employeeSalary) })
            .then(emp => {
                ui.addEmployeeToUI(emp);
            })
            .catch(err => console.log(err));
    }
    ui.clearInput();
    e.preventDefault();
}

function UpdateOrDelete(e) {

    if (e.target.id === "delete-employee") {
        //silme islemi
        deleteEmployee(e.target);
    }
    else if (e.target.id === "update-employee") {
        //guncelleme
        updateEmployeeController(e.target.parentElement.parentElement)
    }
}

function deleteEmployee(targetEmployee) {
    const id = targetEmployee.parentElement.previousElementSibling.previousElementSibling.textContent;
    request.delete(id)
        .then(message => {
            ui.deleteEmployeeFromUI(targetEmployee.parentElement.parentElement);
        })
        .catch(err => console.log(err))
}

function updateEmployeeController(targetEmployee) {

    ui.toggleUpdateButton(targetEmployee);
    if (updateState === null) {

        updateState = {
            updateId: targetEmployee.children[3].textContent,
            updateParent: targetEmployee
        }

    } else {
        updateState = null;
    }
}

function updateEmployee() {

    if (updateState) {
        //guncelleme
        const data = { name: nameInput.value.trim(), department: deparmentInput.value.trim(), salary: Number(salaryInput.value.trim()) };
        request.put(updateState.updateId, data)
            .then(updateEmployee => {
                ui.updateEmployeeOnUI(updateEmployee,updateState.updateParent)
            })
            .catch(err => console.log(err))
    } 

}



