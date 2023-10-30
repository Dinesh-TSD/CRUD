let data = [
    { "name": "dinesh", "age": 25 },
    { "name": "dhiney", "age": 20 }
]

function displayData() {
    let datarows = document.getElementById("dataRows")
    datarows.innerHTML="";
    data.forEach((value, index) => {
let row = `
    <tr>
        <td>${value.name}</td>
        <td>${value.age}</td>
        <td>
            <button type="button" class="btn btn-warning edit-btn" data-index = ${index}>Edit</button>
            <button type="button" class="btn btn-danger delete-btn">Delete</button>
        </td>
    </tr>
    `;
 datarows.insertAdjacentHTML("beforeend",row)
    })
    
   
}
displayData();
// Function to display data in the table
function handleFormSubmit(event){
    event.preventDefault();
    const nameInput = document.getElementById("name");
    const ageInput = document.getElementById("age");

    const name = nameInput.value;
    const age = ageInput.value;

    data.push({ name, age});

    nameInput.value = "";
    ageInput.value = "";

    displayData();
}

document.getElementById("crudForm")
.addEventListener("submit", handleFormSubmit);


// Function to delete a data row
function handleDeleteClick(event) {
    const rowIndex = event.target.closest("tr").rowIndex - 1;
    if (rowIndex >= 0) {
        data.splice(rowIndex, 1);
        displayData();
    }
}


// Function to edit a data row using prompt
function handleEditClick(event) {
    const index = event.target.getAttribute("data-index");
    if (index !== null) {
        const dataIndex = parseInt(index, 10);
        const newName = prompt("Enter the new name:", data[dataIndex].name);
        const newAge = prompt("Enter the new age:", data[dataIndex].age);

        if (newName !== null && newAge !== null) {
            data[dataIndex].name = newName;
            data[dataIndex].age = parseInt(newAge, 10);
            displayData();
        }
    }
}

document.getElementById("dataRows").addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        handleDeleteClick(event);
    } else if (event.target.classList.contains("edit-btn")) {
        handleEditClick(event);
    }
});