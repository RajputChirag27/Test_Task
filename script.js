


const addDataBtn = document.getElementById("add-data-btn");
const eduTable = document.getElementById('edu-table');
const eduTableForm = document.getElementById('edu-table-form');
const resultTable = document.getElementById('result-table');
const registerBtn = document.getElementById("register-btn");
const myModal = new bootstrap.Modal(document.getElementById('myModal'));
const firstName = document.getElementById('fname');
const lastName = document.getElementById('lname');
const dateOfBirth = document.getElementById('dob');
const email = document.getElementById('email');
const address = document.getElementById('address')
const updateBtn = document.getElementById('update-btn');
const hiddenId = document.getElementById('hidden-id');
let table = new DataTable('#result-table');
let data;
let eduId;
let eduObjArr = [];
let fdO;


//
const checkRow = () => {
    // Check if the table has any remaining rows
    if (table.rows().count() === 0) {
        // If no rows are left, clear the DataTable and hide the table
        table.clear().draw();
        document.getElementById("collTableDiv").classList.add('hidden')
    }
    else {
        document.getElementById("collTableDiv").classList.remove('hidden')
    }
}


// 


registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const formdata = new FormData(eduTableForm);
    fdO = Object.fromEntries(formdata);
    const eduArray = Array.from(formdata.values());
    console.log(fdO);
    const actions = `
    <button
        type="button"
        class="btn btn-success"
        onclick = "editRow(this)"
    >
        Edit
    </button>
    &nbsp;
    <button
        type="button"
        class="btn btn-danger"
        onclick = "deleteRow(this)"
    >
        Delete
    </button>
    `
    eduObjArr = [
        [
            ` <button
            type="button"
            class="btn btn-success"
            onclick = 'addChildRow(this)'
        >
            +
        </button>`,
            fdO.fname,
            fdO.lname,
            fdO.dob,
            fdO.email,
            fdO.address,
            actions
        ]
    ]
    console.log(eduObjArr);
    localStorage.setItem('data', JSON.stringify(eduObjArr));
    data = JSON.parse(localStorage.getItem("data"));
    console.log(data)
    addIntoDataTable(eduObjArr);
    eduTableForm.reset();
    myModal.hide();
})

const addIntoDataTable = (eduObjArr) => {

    for (let i = 0; i < eduObjArr.length; i++) {
        table.row.add(eduObjArr[i]).draw();
        checkRow();
    }
}

const editRow = (e) => {
    let row = e.closest('tr');
    let columns = row.getElementsByTagName('td');
    updateBtn.classList.remove('hidden');
    registerBtn.classList.add('hidden');

    firstName.value = columns[1].textContent;
    lastName.value = columns[2].textContent;
    dateOfBirth.value = columns[3].textContent;
    email.value = columns[4].textContent;
    address.value = columns[5].textContent;

    myModal.show();

    // Define updateRow function
    const updateRow = () => {
        row.cells[1].textContent = firstName.value;
        row.cells[2].textContent = lastName.value;
        row.cells[3].textContent = dateOfBirth.value;
        row.cells[4].textContent = email.value;
        row.cells[5].textContent = address.value;

        myModal.hide();

        // Reset the form
        eduTableForm.reset();

        // Hide/show buttons
        updateBtn.classList.add('hidden');
        registerBtn.classList.remove('hidden');
        table.draw();

        // Remove the event listener after execution
        updateBtn.removeEventListener('click', updateRow);
    };

    // Add event listener to updateBtn
    updateBtn.addEventListener('click', updateRow);
};



const deleteRow = (e) => {
    let rowIdx = e.closest('tr');
    table.row(rowIdx).remove().draw()
    checkRow();
}

const addChildRow = (e) => {
    var tr = $(e).parents('tr');
    var row = table.row(tr);

if(row.child.isShown()){
    row.child.hide();
    tr.removeClass('shown');
}
else{
    row.child(format(fdO)).show();
    tr.addClass('shown');
}
}

const  format = ()=>{
return (
    '<div class="education-row d-flex justify-content-evenly">' +
    '<dl>' +
    '<dt class="fs-3">Education 1 </dt>' +
    '<dt class="fs-4">Degree:</dt>' +
    '<dd  class="fs-5">' +
    fdO.degree +
    '</dd>' +
    '<dt class="fs-4">School:</dt>' +
    '<dd class="fs-5">' +
    fdO.college +
    '</dd>' +
    '<dt class="fs-4">Start Year:</dt>' +
    '<dd class="fs-5">' +
    fdO.start +
    '</dd>' +
    '<dt class="fs-4">Passout Year:</dt>' +
    '<dd class="fs-5">' +
    fdO.passout +
    '</dd>' +
    '<dt class="fs-4">Percentage:</dt>' +
    '<dd class="fs-5">' +
    fdO.percentage +
    '</dd>' +
    '<dt class="fs-4">Backlog:</dt>' +
    '<dd class="fs-5">' +
    fdO.backlog +
    '</dd>' +
    '</dl>' +

    '<dl>' +
    '<dt class="fs-3">Education 2 </dt>' +
    '<dt class="fs-4">Degree:</dt>' +
    '<dd  class="fs-5">' +
    fdO.degree1 +
    '</dd>' +
    '<dt class="fs-4">School:</dt>' +
    '<dd class="fs-5">' +
    fdO.college1 +
    '</dd>' +
    '<dt class="fs-4">Start Year:</dt>' +
    '<dd class="fs-5">' +
    fdO.start1 +
    '</dd>' +
    '<dt class="fs-4">Passout Year:</dt>' +
    '<dd class="fs-5">' +
    fdO.passout1 +
    '</dd>' +
    '<dt class="fs-4">Percentage:</dt>' +
    '<dd class="fs-5">' +
    fdO.percentage1 +
    '</dd>' +
    '<dt class="fs-4">Backlog:</dt>' +
    '<dd class="fs-5">' +
    fdO.backlog1 +
    '</dd>' +
    '</dl>' + 
    '</div>'
)
}



// addDataBtn.addEventListener()
