let msg = document.querySelector(".msg");
let addbtn = document.getElementById("AddBtn");
let zeroEmployee = document.querySelector(".addEmp0");
zeroEmployee.style.color = "grey";
msg.innerText = "";
zeroEmployee.innerText="You have 0 Employee";
console.log(zeroEmployee.innerText);
var employeeData = [];

// Setting the attributes(IDs) orderwise
let setCountFromOne = () => {
  employeeData.forEach((EachEmployee, index) => {
    EachEmployee.id = index + 1;
  });
};

// checking form if input are valid then save in a array of objects
let checkForm = (e) => {
  e.preventDefault();
  var name = document.getElementById("name").value;
  var age = document.getElementById("age").value;
  var profession = document.getElementById("profession").value;
  // console.log(profession);
  if (name == "" || age == "" || profession == "") {
    msg.innerText =
      "Error : Please Make sure All the fields are filled before adding in an employee !";
    msg.style.color = "red";
    // resetData();
    return;
  } else {
    employeeNo = 0;
    msg.innerText = "";
    employeeData.push({
      id: employeeNo,
      name: name,
      profession: profession,
      age: age,
    });
    console.log(employeeData);
  }
  setCountFromOne();
  localStorage.setItem("employeeData", JSON.stringify(employeeData));
  zeroEmployee.innerText="";
  //   call to show data of  employees
  showEmployeeData();
  //   resetting the input values of input
  resetData();
};

let resetData = () => {
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("profession").value = "";
};

let showEmployeeData = () => {
  console.log(employeeData);
  let AddEmployeeSuccess = document.querySelector(".insertEmplyoee");
  console.log(AddEmployeeSuccess);
  AddEmployeeSuccess.innerHTML = "";

  employeeData.forEach((EachEmployee) => {
    return (AddEmployeeSuccess.innerHTML += `<div class="addedEmp">

    <ul class="list">
    <li>${EachEmployee.id} </li>
    <li>Name :${EachEmployee.name}</li>
    <li>Profession:${EachEmployee.profession}</li>
    <li>Age :${EachEmployee.age}</li>
    </ul>
    <button class="AddBtn" onclick="DeleteEmployee(${EachEmployee.id})">Delete User</button>
    </div>
    `);
  });

  msg.innerText = "Success : Employee Added!";
  msg.style.color = "#43FF78";

  // console.log(AddEmployeeSuccess.innerHTML);
};

let DeleteEmployee = (id) => {
  //   console.log(e);

  employeeData.forEach((EachEmployee, index) => {
    if (EachEmployee.id == id) {
      employeeData.splice(index, 1);
      setCountFromOne();

      localStorage.setItem("employeeData", JSON.stringify(employeeData));
      showEmployeeData();
      msg.innerText = "";
      if (employeeData.length == 0) {
        zeroEmployee.innerText="You have 0 Employee";
      }

      return;
    }
  });
};

addbtn.addEventListener("click", checkForm);

// self invoke function to get Data from local
// storage and showing the employee data on window load or refresh
(() => {
  employeeData = JSON.parse(localStorage.getItem("employeeData")) || [];
  console.log(employeeData);
  showEmployeeData();
  msg.innerText = "";
})();
