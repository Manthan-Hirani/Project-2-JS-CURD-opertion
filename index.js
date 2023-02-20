var Name = document.getElementById("name");
var Address = document.getElementById("address");
var Dob = document.getElementById("date");
var Email = document.getElementById("email");
var Gender = document.querySelector('input[name="gender"]:checked');


function vF() {
    var name = document.getElementById("name").value;
    var address = document.getElementById("address").value;
    var date = document.getElementById("date").value;
    var email = document.getElementById("email").value;

    if (name == "") {
        return false;
    }
    if (address == "") {
        return false;
    }
    if (date == "") {
        return false;
    }
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) {
        return true;
    }
    else {
        return false;
    }

}

// Display Data
function showData() {

    hideUpdateBtn();

    var userDataList;

    if (localStorage.getItem("userDataList") == null) {
        document.getElementById("dnf").innerHTML = `<td colspan='6' class='text-center'> Data Not Found </td> `
        userDataList = [];
    }
    else {
        if (userDataList == []) {
            document.getElementById("dnf").innerHTML = `<td colspan='6' class='text-center'> Data Not Found </td> `
        }
        // document.getElementById("dnf").innerHTML = "" 
        userDataList = JSON.parse(localStorage.getItem("userDataList"));

        var html = "";
        userDataList.forEach(function (element, index) {
            html += "<tr>";
            html += "<td>" + element.name + "</td>";
            html += "<td>" + element.address + "</td>";
            html += "<td>" + element.email + "</td>";
            html += "<td>" + element.gender + "</td>";
            html += "<td>" + element.date + "</td>";
            html +=
                '<td><button onclick="deleteData(' +
                index +
                ')"class="btn btn-success mx-1">delete</button><button data-bs-toggle="modal" onclick="updateData(' +
                index +
                ')"class="btn btn-warning mx-3">Edit</button>';
            html += "</tr>";
        });

        document.querySelector("#displayDataTable tbody").innerHTML = html;

    }


}

//add data
function addData() {

    if (vF() == true) {

        // console.log("true");

        var name = document.getElementById("name").value;
        var address = document.getElementById("address").value;
        var email = document.getElementById("email").value;
        var gender = document.querySelector('input[name=gender]:checked').value;
        var date = document.getElementById("date").value;

        var userDataList;

        if (localStorage.getItem("userDataList") == null) {
            userDataList = [];
        } else {
            userDataList = JSON.parse(localStorage.getItem("userDataList"));
        }

        userDataList.push({
            name: name,
            address: address,
            email: email,
            gender: gender,
            date: date,
        });

        localStorage.setItem("userDataList", JSON.stringify(userDataList));

        alert("Data added sucessfully");
        showData();

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("address").value = "";
        document.querySelector('input[name=gender]:checked').value = "";
        document.getElementById("date").value = "";

        location.reload();
    }
    else {
        
        nameV();
        addressV();
        dateV();
        emailV();
        genderV();
        // console.log(Gender.value);        
    }
}

// Delete data
function deleteData(index) {

    conf = confirm("Delete the Data ?");
    if (conf) {
        var userDataList;
        userDataList = JSON.parse(localStorage.getItem("userDataList"));

        userDataList.splice(index, 1);
        localStorage.setItem("userDataList", JSON.stringify(userDataList));
        showData();
    }
    location.reload();
}

// Edit data
function updateData(index) {

    console.log("Inside updateData");

    document.getElementById("saveBtn").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var userDataList;
    userDataList = JSON.parse(localStorage.getItem("userDataList"));

    document.getElementById("name").value = userDataList[index].name;
    document.getElementById("address").value = userDataList[index].address;
    document.getElementById("email").value = userDataList[index].email;
    document.querySelector('input[name=gender]:checked').value = userDataList[index].gender;
    document.getElementById("date").value = userDataList[index].date;

    document.querySelector("#Update").onclick = function () {

        if (vF() == true) {

            userDataList[index].name = document.getElementById("name").value;
            userDataList[index].address = document.getElementById("address").value;
            userDataList[index].email = document.getElementById("email").value;
            userDataList[index].gender = document.querySelector('input[name=gender]:checked').value;
            userDataList[index].date = document.getElementById("date").value;

            localStorage.setItem("userDataList", JSON.stringify(userDataList));
            alert("Data Updated");
            showData();
            document.getElementById("name").value = "";
            document.getElementById("address").value = "";
            document.getElementById("email").value = "";
            document.querySelector('input[name=gender]:checked').value = "";
            document.getElementById("date").value = "";

            document.getElementById("saveBtn").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }
    location.reload();
}

function hideUpdateBtn() {
    document.getElementById("Update").style.display = "none";
}

function nameV() {
    if (Name.value == "") {
        document.getElementById("errorName").style.display = "block"
        document.getElementById("errorName").style.color = "red"
    }
    else {
        document.getElementById("errorName").style.display = "none"
    }
}
function addressV() {
    if (Address.value == "") {
        document.getElementById("errorAddress").style.display = "block"
        document.getElementById("errorAddress").style.color = "red"
    }
    else {
        document.getElementById("errorAddress").style.display = "none"
    }
}
function emailV() {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (Email.value == "" || (Email.match(validRegex) == false)) {
        document.getElementById("errorEmail").style.display = "block"
        document.getElementById("errorEmail").style.color = "red"
    }
    else {
        document.getElementById("errorEmail").style.display = "none"
    }
}
function dateV() {
    if (Dob.value == "") {
        document.getElementById("errorDate").style.display = "block"
        document.getElementById("errorDate").style.color = "red"
    }
    else {
        document.getElementById("errorDate").style.display = "none"
    }
}
function genderV() {
    if (Gender == null) {
        document.getElementById("errorGender").style.display = "block"
        document.getElementById("errorGender").style.color = "red"     
    }
    else if (Gender.value == "Male" || Gender.value == "Female") {        
        document.getElementById("errorGender").style.display = "none"
    }
    else {
        document.getElementById("errorGender").style.display = "none"
    }
}

function removeError() {
    document.getElementById("errorGender").style.display = "none"
}

// Clear this