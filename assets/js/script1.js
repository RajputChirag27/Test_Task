let table;
let data;
let dataArr = [];


$(document).ready(() => {
    // Initializing datatable
    table = $("#result-table").DataTable();
    checkRow();

    $("#register-btn").on('click', function (e) {
        e.preventDefault(); // prevent form submit
        let eduForm = document.getElementById("edu-table-form")
        let formData = new FormData(eduForm);
        data = Object.fromEntries(formData);

        const dobArr = data.dob.toString().split('-');
        console.log(dobArr)


        const nameValidator = nameValidation(data.fname, data.lname);
        const emailValidator = emailValidation(data.email)
        const dobValidator = dobValidation(Number(dobArr[0]), Number(dobArr[1]));
        if (!nameValidator || !emailValidator || !dobValidator) {
            $('#formValidId').removeClass('hidden');
            e.preventDefault();
            return;
        }

        $('#formValidId').addClass('hidden');
        $('#collTableDiv').removeClass("hidden");

        table.row.add(
            [
                `<button class="btn btn-success" type="button" onclick="addRow(this)">+</button>`,
                data.fname,
                data.lname,
                data.dob,
                data.email,
                data.address,
                `<button class="btn btn-success edit-btn" type="button" onclick="editRow(this)">Edit</button>
                <button class="btn btn-danger" type="button" onclick="deleteRow(this)">Delete</button>` ,
            ]
        ).child([
            `
                <tr>
                <th>Degree&nbsp;</th>
                <th>School&nbsp;</th>
                <th>StartYear&nbsp;</th>
                <th>PassoutYear&nbsp;</th>
                <th>Percentage&nbsp;</th>
                <th>Backlog&nbsp;</th>
                </tr>
                <tr> <td>${data.degree}&nbsp;</td>
                <td>${data.college}&nbsp;</td>
                <td>${data.start}&nbsp;</td>
                <td>${data.passout}&nbsp;</td>
                <td>${data.percentage}&nbsp;</td>
                <td>${data.backlog}&nbsp;</td>

                </tr>

                <tr> <td>${data.degree1}&nbsp;</td>
                <td>${data.college1}&nbsp;</td>
                <td>${data.start1}&nbsp;</td>
                <td>${data.passout1}&nbsp;</td>
                <td>${data.percentage1}&nbsp;</td>
                <td>${data.backlog1}&nbsp;</td>

                </tr>
            `
        ]).draw()
        $("#myModal").modal('hide');
        $("#edu-table-form")[0].reset()
    });

    $("#add-data-btn").on('click', () => {
        $(`
        <tr>
                                                <td>
                                                    <input type="text" name="degree-${Date.now()}" class="form-control" placeholder="Degree" required>
                                                </td>
                                                <td>
                                                    <input type="text" name="college-${Date.now()}" class="form-control" placeholder="School" required>
                                                </td>
                                                <td>
                                                    <input type="month" name="start-${Date.now()}" class="form-control" required>
                                                </td>
                                                <td>
                                                    <input type="month" name="passout-${Date.now()}" class="form-control" required>
                                                </td>
                                                <td>
                                                    <input type="number" name="percentage-${Date.now()}" class="form-control" placeholder="Don't use %" required>
                                                </td>
                                                <td>
                                                    <input type="number" name="backlog-${Date.now()}" class="form-control" placeholder="Backlogs" required>
                                                </td>
                                                <td>
                                                    <button class="btn btn-danger" name="remove-btn-1" type="button" onclick="deleteRows(this)">-</button>
                                                </td>
                                            </tr>
        `).appendTo('#edu-table');
    })

});


// Delete Row Function for result table
const deleteRow = (button) => {
    const row = $(button).closest('tr');
    table.row(row).remove().draw();
    checkRow();
}
// Delete Row function for form
const deleteRows = (button) => {
    const row = $(button).closest('tr');
    row.remove();
}

// Edit Row Function
const editRow = async (button) => {
    // Fetching tr of current element and its data
    let tr = $(button).parent().parent();
    let fname = $(tr).find('td:eq(1)').text();
    let lname = $(tr).find('td:eq(2)').text();
    let dob = $(tr).find('td:eq(3)').text();
    let email = $(tr).find('td:eq(4)').text();
    let address = $(tr).find('td:eq(5)').text();



    // Class Handling
    $("#register-btn").addClass('hidden');
    $("#update-btn").removeClass('hidden');


    // Add Value to the modal
    $("#myModal").modal('show');
    $("#fname").val(fname);
    $("#lname").val(lname);
    $("#dob").val(dob);
    $("#email").val(email);
    $("#address").val(address);

    // Bind click event handler to #update-btn
    $('#update-btn').off('click').on('click', () => {
        $(tr).find('td:eq(1)').text($("#fname").val());
        $(tr).find('td:eq(2)').text($("#lname").val());
        $(tr).find('td:eq(3)').text($("#dob").val());
        $(tr).find('td:eq(4)').text($("#email").val());
        $(tr).find('td:eq(5)').text($("#address").val());
        $("#myModal").modal('hide'); // Hide modal after updating

        $("#edu-table-form")[0].reset();
        $("#register-btn").removeClass('hidden');
        $("#update-btn").addClass('hidden');
    });

    $('#close-btn , #btn-close').off('click').on('click', function () {
        $("#edu-table-form")[0].reset();
        $("#register-btn").removeClass('hidden');
        $("#update-btn").addClass('hidden');
    });

}

// Child Row Function

const addRow = (e) => {
    var tr = $(e).parents('tr');
    var row = table.row(tr);

    if (row.child.isShown()) {
        row.child.hide();
        tr.removeClass('shown');
    }
    else {
        if (row.child() && row.child().length) {
            row.child.show();
            tr.addClass('shown');
        }
        else {
            row.child().show();
            tr.addClass('shown');
        }
    }
}




// Row Checking Function
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

// Form Validation

// Name Validation
const nameValidation = (fname, lname) => {
    const regexName = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
    if (regexName.test(fname) && regexName.test(lname)) {
        $('#fnameHelpId').addClass('hidden')
        $('#lnameHelpId').addClass('hidden')
        return true;
    }
    else {
        if (!regexName.test(fname)) {
            $('#fnameHelpId').removeClass('hidden')
        }
        if (!regexName.test(lname)) {
            $('#lnameHelpId').removeClass('hidden')
        }
        return false;
    }

}


// EmailValidation
const emailValidation = (email) => {
    const regexName = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexName.test(email)) {
        $('#emailHelpId').removeClass('hidden');
        console.log('Email is invalid!')
        return false;
    } else {
        $('#emailHelpId').addClass('hidden');
        console.log('Email is valid');
        return true;
    }

}


// Dob Validation

const dobValidation = (dob, month) => {
    let currYear = Number(new Date().getFullYear().toString());
    let currMonth = Number(new Date().getMonth()) + 1;
    console.log(currYear);

    if (month < currMonth) {
        currYear++;
    }

    if (currYear - dob >= 18) {
        $('#dobHelpId').addClass('hidden');
        return true;
    }
    else {
        $('#dobHelpId').removeClass('hidden');
        return false;
    }


}

