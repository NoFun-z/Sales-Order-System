let JsonData;

let data = localStorage.getItem('GetJson')
JsonData = JSON.parse(data);

var selectedRow = null

//Error Validaton, garabbing the customers fields
const custFirst = document.getElementById("custFirst");
const custLast = document.getElementById("custLast");
const custPhone = document.getElementById("custPhone");
const custEmail = document.getElementById("custEmail");
const custStreet = document.getElementById("custStreet");
const custCity = document.getElementById("custCity");
const custProvince = document.getElementById("custProvince");
const custPostal = document.getElementById("custPostal");


//Retrieve search bar
const searchbar = document.querySelector("[data-search]")

//Fetch json data and populate to the supp dropdown list
const url = "JSON/jsonformatter.json"

//retrieve 2 dropdownlist selected value in supplier page
let suppitemSelect = "";
let selectedsupp = "";

//retrieve dropdownlist selected value in inventory page
let selectedinven = "";

//onchange events
function getsuppitem(){
    getItemsNPrice()
}
function getsuppName(){
    fetchjsondata()
}

//fetch json data
async function GrabJason (data){
    let grabjson = await fetch (data);
    if (grabjson.ok != true){
        throw new Error(grabjson.statusText);
    }
    return await grabjson.json();
} 


function setErrorFor(input, message){
    const formControl = input.parentElement; // .form-control
    const small = formControl.querySelector("small");

    small.innerText = message;

    formControl.className = "form-control-sales error";
}

function setSuccessFor(input){
    const formControl = input.parentElement;
    formControl.className = "form-control-sales success";
}


//-------------------ORDER PAGE-------------------//
//dropdown list for orders
const dropdowns = document.querySelectorAll('.dropdownlist')

dropdowns.forEach(dropdownlist => {
    const select = dropdownlist.querySelector('.select');
    const caret = dropdownlist.querySelector('.caret');
    const menu = dropdownlist.querySelector('.menu');
    const options = dropdownlist.querySelectorAll('.menu li');
    const selected = dropdownlist.querySelector('.selected');

    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');

            options.forEach(option => {
                option.classList.remove('active');
            });
            option.classList.add('active');
        });
    });
});

//Occupying ul
function FillUl(){
    var ul = document.getElementById("Omenuid");
    let result = "";
        for (var i = 0; i < JsonData.Orders.length; i++){
            result += '<option value="' + JsonData.Orders[i].USP + '">' + JsonData.Orders[i].USP + '</option>'
        }

    ul.innerHTML = result;
}

//Show order elements
function showorders(){
    let stri = "";
    arrays = [];
        console.log(JsonData.Orders[JsonData.Orders.length - 1])
        var ul = document.getElementById("Omenuid");
        let selecteditem = ul.options[ul.selectedIndex].text

                for(row of JsonData.Orders){
                    if(row.USP == parseInt(selecteditem)){
                        stri += "Code: " + row.USP + "\nCustomer Name: " + row.CustName + "\nEmployee Name: "
                        + row.EmpName
                        for (k of row.OrderDetails){
                            stri += "\n\nOrder Date: " + k.DateOrdered + " -- Total Spent: " + k.TotalSpent
                            for (z of k.Items){
                                stri += "\nItem Ordered: " + z.Quantity+"x " + z.Name
                            }
                        }
                        break;
                    }
                }
                
        
        document.getElementById("txtOrders").textContent = stri

}

// //Print the order info items
function passordervalue(){
    //grab the data
    let orderitem = document.getElementById("txtOrders").textContent;
    localStorage.setItem("ordervalue", orderitem)
    return false
}
//----------------------------------------------------------------------------------------------


//------------------------SALES PAGE-------------------//
function ShowHidePriceHelp(){
    let pricehelp = document.getElementById("price_help")
    if(pricehelp.checked == true){
        document.getElementById("LblPrice").style.display="inline";
    }
    else{
        document.getElementById("LblPrice").style.display="none";
    }
}

//--------------------------------------------------------------------------------------



//----------------------------------CUSTOMER PAGE-------------------------------//
document.getElementById("customerform").addEventListener("submit", (e) => {
    e.preventDefault();

    checkInputs();

    if(custFirst.value != "" && custLast.value != "" && custPhone.value != "" && 
    custEmail.value != "" && custStreet.value != "" && custCity.value != "" && custProvince.value != "" && custPostal.value != ""){
        AddNewCust();
        ShowCustomerForm();
    }
});

function AddNewCust(){
    if(custFirst.value != "" && custLast.value != "" && custPhone.value != "" && 
    custEmail.value != "" && custStreet.value != "" && custCity.value != "" && custProvince.value != "" && custPostal.value != ""){
       for (var i = 0; i < JsonData.Customers.length; i++){
                if (i == JsonData.Customers.length-1){
                    JsonData.Customers.push(
                        {
                            "ID": parseInt(JsonData.Customers[i].ID) + 1,
                            "firstName": custFirst.value,
                            "lastName": custLast.value,
                            "Phone": custPhone.value,
                            "email": custEmail.value,
                            "province": custProvince.value,
                            "city": custCity.value,
                            "street": custStreet.value,
                            "postal": custPostal.value
                        }
                    )
                    sendJsonData1();
                    ClearCustOrder();
                    break;
                }
        }
    }
}

function checkInputs(){
    const custFirstValue = custFirst.value.trim();
    const custLastValue = custLast.value.trim();
    const custPhoneValue = custPhone.value.trim();
    const custEmailValue = custEmail.value.trim();
    const custStreetValue = custStreet.value.trim();
    const custCityValue = custCity.value.trim();
    const custProvinceValue = custProvince.value.trim();
    const custPostalValue = custPostal.value.trim();

    if(custFirstValue === ""){
        //It will show the error
        //Add the error to the class
        setErrorFor(custFirst, "First name cannot be blank");
    } else {
        setSuccessFor(custFirst);
    }
    if(custLastValue === ""){
        //It will show the error
        //Add the error to the class
        setErrorFor(custLast, "Last name cannot be blank");
    } else {
        setSuccessFor(custLast);
    }
    if(custPhoneValue === ""){
        //It will show the error
        //Add the error to the class
        setErrorFor(custPhone, "Phone cannot be blank");
    } else {
        setSuccessFor(custPhone);
    }
    if(custEmailValue === ""){
        //It will show the error
        //Add the error to the class
        setErrorFor(custEmail, "Email cannot be blank");
    } else {
        setSuccessFor(custEmail);
    }
    if(custStreetValue === ""){
        //It will show the error
        //Add the error to the class
        setErrorFor(custStreet, "Street cannot be blank");
    } else {
        setSuccessFor(custStreet);
    }
    if(custCityValue === ""){
        //It will show the error
        //Add the error to the class
        setErrorFor(custCity, "City cannot be blank");
    } else {
        setSuccessFor(custCity);
    }
    if(custProvinceValue === ""){
        //It will show the error
        //Add the error to the class
        setErrorFor(custProvince, "Province cannot be blank");
    } else {
        setSuccessFor(custProvince);
    }
    if(custPostalValue === ""){
        //It will show the error
        //Add the error to the class
        setErrorFor(custPostal, "Postal Code cannot be blank");
    } else {
        setSuccessFor(custPostal);
    }
}

//Reset the data
function resetFormC() {
    document.getElementById("custFirst").value = '';
    document.getElementById("custLast").value = '';
    document.getElementById("custPhone").value = '';
    document.getElementById("custEmail").value = '';
    document.getElementById("custStreet").value = '';
    document.getElementById("custCity").value = '';
    document.getElementById("custProvince").value = '';
    document.getElementById("custPostal").value = '';
    selectedRow = null;
    ShowCustomerForm();
}

var AddCustbtn = 1;

function ChangeCustBtn(){
    if(AddCustbtn == 1){
        document.getElementById("Add_Customer").value="Enter Valid Customer";
        document.getElementById("Add_Customer").disabled= true;
        return AddCustbtn = 0;
    }
    else{
        document.getElementById("Add_Customer").value="Add New Customer";
        document.getElementById("Add_Customer").disabled= false;
        return AddCustbtn = 1
    }
}

document.getElementById("customerform").style.display="none";
var cusForm = 1;

function ShowCustomerForm(){
    ChangeCustBtn()
    if(cusForm == 1){
        document.getElementById("customerform").style.display="inline";
        return cusForm = 0;
    }
    else{
        document.getElementById("customerform").style.display="none";
        return cusForm = 1
    }
}

//----------------------------------------------------------------------------------------
