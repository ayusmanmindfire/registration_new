let data = [
    {
    id: 1,
    name: "Ayusman",
    email: "ays@gmail.com",
    phone: 8342983389,
    state: "Odisha"
    },
];
populateTable(data)
const nameRegex = /^[A-Za-z\s]+$/;
const phoneRegex = /^[0-9]{10}$/;
const emailRegex = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/;
let editIndex = null;
let isError=false

const nameField = document.getElementById('nameField');
const emailField = document.getElementById('emailField');
const phoneField = document.getElementById('phoneField');
const stateField = document.getElementById('stateField');

nameField.addEventListener('change',(e)=>{    
    if(!nameRegex.test(e.target.value))
        errorResponse("Should contain letters only.",'nameError')
    else
        hideResponse('nameError')
})
emailField.addEventListener('change',(e)=>{    
    if(!emailRegex.test(e.target.value))
        errorResponse("Invalid email",'emailError')  
    else
        hideResponse('emailError')
})
phoneField.addEventListener('change',(e)=>{    
    if(!phoneRegex.test(e.target.value))
        errorResponse("Number must be 10 digits.",'phoneError')
    else
        hideResponse('phoneError')  
})
stateField.addEventListener('change',(e)=>{    
    if (e.target.value === "default")
        errorResponse("Please select a valid state.",'stateError')
    else
        hideResponse('stateError')  
})
// Handle form submission
function handleSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('nameField').value;
    const email = document.getElementById('emailField').value;
    const phone = document.getElementById('phoneField').value;
    const state = document.getElementById('stateField').value;

    // if (!nameRegex.test(name)) {
    // errorResponse("Invalid name. Should contain letters only","nameError")
    // // alert("Invalid name. Should contain letters only.");
    // return;
    // }

    // if (!emailRegex.test(email)) {
    // alert("Invalid email");
    // return;
    // }

    // if (!phoneRegex.test(phone)) {
    // alert("Invalid phone number. Must be 10 digits.");
    // return;
    // }

    // if (state === "default") {
    // alert("Invalid state selection. Please select a valid state.");
    // return;
    // }
   if(document.querySelectorAll('.error[style="display: block;"]').length>0||name==""||email==""||phone==""||state=="default"){
        alert("Invalid input")
        return
   }

    const confirmSubmission = confirm("Are you sure you want to submit?");

    if (confirmSubmission) {
    let lastUser = data[data.length - 1];
    let newUserId = lastUser ? lastUser.id + 1 : 1;

    // console.log(data)
    data.push({
        id: newUserId,
        name: name,
        email: email,
        phone: phone,
        state: state
    });

    populateTable(data);
    clearFields();
    }
}

// Clear form fields
function clearFields() {
    document.getElementById('nameField').value = "";
    document.getElementById('emailField').value = "";
    document.getElementById('phoneField').value = "";
    document.getElementById('stateField').value = "";
}

// Populate the table
function populateTable(data) {
    let tableBody = document.querySelector('#tableDiv');
    tableBody.innerHTML = "";
    //inserting all header elements
    const headerRow = document.createElement('tr');
    const headers = ['Name', 'Email', 'Mobile', 'State', 'Actions'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    tableBody.appendChild(headerRow);
    // data.forEach((user)=>{
    //     let row= document.createElement('tr');

    //     Object.values(user).forEach((value)=>{
    //         const cell=document.createElement('td');
    //         cell.textContent=value;
    //         row.appendChild(cell)
    //     })
    // })
    // tableBody.appendChild(row)

    data.forEach((user, index) => {
    const row = document.createElement('tr');
    // console.log(user.name)
    row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.state}</td>
        <td>
        <button onclick="editData(${index})" id="edit">Edit</button>
        <button onclick="deleteData(${index})" id="delete">Delete</button>
        </td>
    `;

    tableBody.appendChild(row);
    });
}

// Delete data
function deleteData(index) {
    const confirmDelete = confirm("Do you want to delete this entry?");

    if (confirmDelete) {
    data.splice(index, 1);
    populateTable(data); 
    }
}

// Edit data
function editData(index) {
    const user = data[index];
    // console.log(user+"--------y")
    document.getElementById('nameField').value = user.name;
    document.getElementById('emailField').value = user.email;
    document.getElementById('phoneField').value = user.phone;
    document.getElementById('stateField').value = user.state;

    document.getElementById('submit').style.display = 'none';
    document.getElementById('update').style.display = 'block';

    editIndex = index;
}

// Update data
function handleUpdate() {
    if (editIndex != null) {
    const updatedName = document.getElementById('nameField').value;
    const updatedEmail = document.getElementById('emailField').value;
    const updatedPhone = document.getElementById('phoneField').value;
    const updatedState = document.getElementById('stateField').value;

    data[editIndex] = {
        id: data[editIndex].id,
        name: updatedName,
        email: updatedEmail,
        phone: updatedPhone,
        state: updatedState
    };

    editIndex = null;
    populateTable(data);
    clearFields();

    document.getElementById('submit').style.display = 'block';
    document.getElementById('update').style.display = 'none';
    }
}


function errorResponse(message, id) {
    const errorMessage = document.querySelector(`#${id}`);
    errorMessage.style.display = 'block';
    errorMessage.textContent = message;
  }

  function hideResponse(id) {
    const errorMessage = document.querySelector(`#${id}`);
    errorMessage.style.display = 'none';
  }
