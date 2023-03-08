//CREATE CUSTOMER TABLE
//---------------------------CUSTOMER------------------------//

//Send back json files
function sendJsonData1(){
    localStorage.setItem("GetJson", JSON.stringify(JsonData));
}

//CREATE CUSTOMER TABLE
//---------------------------CUSTOMER------------------------//
const CustPageSize = 6;
let CustcurPage = 1;
let Custstart = 0;
let CustitemsCount = 0;

//Without any interaction, after 0.15s, function will be called.
setTimeout(CustrenderTable, 100);

//Create table on page load
async function CustGenerateTable(){
    //Select table body
    let table = document.querySelector('#custList tbody');

    let result = '';
    for (let i = 0; i < JsonData.Customers.length; i++)
    {
            result += `<tr>
            <td id="FName_Row${i}">${JsonData.Customers[i].firstName}</td>
            <td id="LName_Row${i}">${JsonData.Customers[i].lastName}</td>
            <td id="Phone_Row${i}">${JsonData.Customers[i].Phone}</td>
            <td id="Email_Row${i}">${JsonData.Customers[i].email}</td>
            <td id="custaddress${i}">
                <select id="CustAddress${i}" name="address" style="width: 450px" value="${JsonData.Customers[i].province}">
                <option value="" disabled selected hidden>Address Details</option>               
                    <option value ="${JsonData.Customers[i].province}">
                        ${JsonData.Customers[i].street} | ${JsonData.Customers[i].city} | 
                        ${JsonData.Customers[i].province} | ${JsonData.Customers[i].postal}
                    </option>
                </select>
            </td>
            <td>
            <input id="Cust_edit${i}" type="button" value="Edit" onclick="EditCustomer('${i}')">
            <input type="button" id="save_Cust${i}" value="Save" class="save" style="display: none" onclick="SaveCustomer('${i}')">
            <input type="button" id="Cancel_CustUpdate${i}" value="Cancel" class="cancel" style="display: none" onclick="CancelCustUpdate('${i}')">
            </td>
            </tr>`     
    };
    document.getElementById("CustpageNum").innerHTML = CustcurPage;
    table.innerHTML = result;
    //sendJsonData1()
}

//Show table data
async function CustrenderTable(){
    //Select table body
    let Custtable = document.querySelector('#custList tbody');
    tr = Custtable.getElementsByTagName('tr');

    let start = (CustcurPage-1)*CustPageSize;
    let end = CustcurPage*CustPageSize;
    for (i = 0; i < tr.length; i++){
        for (j = start; j < end; j++){
            if (i == j){
                tr[i].style.display = "";
                break;
            }
            else{
                tr[i].style.display = "none";
            }
        }
    }
    document.getElementById("CustpageNum").innerHTML = CustcurPage;
    sendJsonData1()
}

//Edit Json
function EditCustomer(index){
    document.getElementById("Cust_edit"+index).style.display="none";
    document.getElementById("save_Cust"+index).style.display="block";
    document.getElementById("Cancel_CustUpdate"+index).style.display="block";

    //Disable inputs during edit
    document.getElementById('searchbarCustFirst').disabled = true;
    document.getElementById('searchbarCustPhone').disabled = true;
        
    var FName = document.getElementById("FName_Row"+index);
    var LName= document.getElementById("LName_Row"+index);
    var Phone = document.getElementById("Phone_Row"+index);
    var Email = document.getElementById("Email_Row"+index);
    var Address = document.getElementById("custaddress"+index);
        
    var FName_data = FName.innerHTML;
    var LName_data = LName.innerHTML;
    var Phone_data = Phone.innerHTML;
    var Email_data = Email.innerHTML;
        
    FName.innerHTML="<input type='text' id='FName_text"+index+"' style='width: 120px' value='"+FName_data+"'>";
    LName.innerHTML="<input type='text' id='LName_text"+index+"' style='width: 120px' value='"+LName_data+"'>";
    Phone.innerHTML="<input type='text' id='Phone_text"+index+"' style='width: 170px' value='"+Phone_data+"'>";
    Email.innerHTML="<input type='text' id='Email_text"+index+"' style='width: 200px' value='"+Email_data+"'>";
    Address.innerHTML = "<input type='text' id='Street_text"+index+"' placeholder='street name' style='display: inline-block; width: 230px' value='"+JsonData.Customers[index].street+"'>&nbsp" +
    "<input type='text' id='Postal_text"+index+"' placeholder='postal code' style='display: inline-block; width: 120px' value='"+JsonData.Customers[index].postal+"'></br>" +
    "<input type='text' id='City_text"+index+"' placeholder='city name' style='display: inline-block; width: 230px' value='"+JsonData.Customers[index].city+"'>&nbsp" +
    "<input type='text' id='Province_text"+index+"' placeholder='province/state' style='display: inline-block; width: 120px' value='"+JsonData.Customers[index].province+"'>&nbsp";
}

//Save data to json
function SaveCustomer(index){
    var FName_val = document.getElementById("FName_text"+index).value;
    var LName_val = document.getElementById("LName_text"+index).value;
    var Phone_val = document.getElementById("Phone_text"+index).value;
    var Email_val = document.getElementById("Email_text"+index).value;
    var Street_val = document.getElementById("Street_text"+index).value;
    var City_val = document.getElementById("City_text"+index).value;
    var Province_val = document.getElementById("Province_text"+index).value;
    var Postal_val = document.getElementById("Postal_text"+index).value;

    if (FName_val != "" && LName_val != "" && Phone_val != "" && Email_val != "" && Street_val != "" && City_val != "" && Province_val != "" && Postal_val != ""){
        JsonData.Customers[index].firstName = FName_val;
        JsonData.Customers[index].lastName = LName_val;
        JsonData.Customers[index].Phone = Phone_val;
        JsonData.Customers[index].email = Email_val;
        JsonData.Customers[index].street = Street_val;
        JsonData.Customers[index].city = City_val;
        JsonData.Customers[index].province = Province_val;
        JsonData.Customers[index].postal = Postal_val;

        
        CustGenerateTable();
        setTimeout(CustrenderTable, 100);

        setTimeout(() => {
            document.getElementById('searchbarCustFirst').disabled = false;
            document.getElementById('searchbarCustPhone').disabled = false;
            document.getElementById("inven_edit"+index).style.display="block";
            document.getElementById("save_Inven"+index).style.display="none";
            document.getElementById("Cancel_InvenUpdate"+index).style.display="none";
        }, 100);
        sendJsonData1()
    }
    else if (FName_val == "" || LName_val == "" || Phone_val == "" || Email_val == "" || Street_val == "" || City_val == "" || Province_val == "" || Postal_val == ""){
        alert(`NO FIELDS SHOULD BE LEFT EMPTY BEFORE SAVING`);
        if (FName_val == ""){
            document.getElementById("FName_text"+index).value = JsonData.Customers[index].firstName;
        }
        if (LName_val == ""){
            document.getElementById("LName_text"+index).value = JsonData.Customers[index].lastName;
        }
        if (Phone_val == ""){
            document.getElementById("Phone_text"+index).value = JsonData.Customers[index].Phone;
        }
        if (Email_val == ""){
            document.getElementById("Email_text"+index).value = JsonData.Customers[index].email;
        }
        if (Street_val == ""){
            document.getElementById("Street_text"+index).value = JsonData.Customers[index].street;
        }
        if (City_val == ""){
            document.getElementById("City_text"+index).value = JsonData.Customers[index].city;
        }
        if (Province_val == ""){
            document.getElementById("Province_text"+index).value = JsonData.Customers[index].province;
        }
        if (Postal_val == ""){
            document.getElementById("Postal_text"+index).value = JsonData.Customers[index].postal;
        }
    }
}

//Cancel inven update
function CancelCustUpdate(index){
    var FName = document.getElementById("FName_Row"+index);
    var LName = document.getElementById("LName_Row"+index);
    var Phone = document.getElementById("Phone_Row"+index);
    var Email = document.getElementById("Email_Row"+index);
    var Address = document.getElementById("custaddress"+index);

    FName.innerHTML = `<td id="FName_Row${index}">${JsonData.Customers[index].firstName}</td>`
    LName.innerHTML = `<td id="LName_Row${index}">${JsonData.Customers[index].lastName}</td>`
    Phone.innerHTML = `<td id="Phone_Row${index}">${JsonData.Customers[index].Phone}</td>`
    Email.innerHTML = `<td id="Email_Row${index}">${JsonData.Customers[index].email}</td>`
    Address.innerHTML = `<td id="custaddress${index}">
                            <select id="CustAddress${index}" name="adress" style="width: 450px" value="Address Details">
                            <option value="" disabled selected hidden>Address Details</option>
                                <option>
                                    ${JsonData.Customers[index].street} | ${JsonData.Customers[index].city} | 
                                    ${JsonData.Customers[index].province} | ${JsonData.Customers[index].postal}
                                </option>
                            </select>
                        </td>`
    
    document.getElementById("Cust_edit"+index).style.display="block";
    document.getElementById("save_Cust"+index).style.display="none";
    document.getElementById("Cancel_CustUpdate"+index).style.display="none";
    document.getElementById('searchbarCustFirst').disabled = false;
    document.getElementById('searchbarCustPhone').disabled = false;
    document.getElementById('searchbarCustProvince').disabled = false;
}

//NEXT AND PREVIOUS BUTTONS CLICKS EVENTS
document.getElementById('CustbtnPrevPage').addEventListener('click', previousPage, false);
document.getElementById('CustbtnNextPage').addEventListener('click', nextPage, false);

//Previous page event
function previousPage(){
    inputFirst = document.getElementById('searchbarCustFirst').value;
    inputPhone = document.getElementById('searchbarCustPhone').value;

    if(inputFirst == "" && inputPhone == ""){
        if(CustcurPage > 1)
        {
            CustcurPage--;
            CustrenderTable();
        }
    }
    else{
        if(CustcurPage > 1)
        {
            CustitemsCount = 0;
            Custstart = 0;
            let PageNow = CustcurPage - 1;
            CustcurPage=1;
            for (i = 0; i < PageNow; i++){
                filterTableCustomer();
                if (CustcurPage < PageNow){
                    CustcurPage++
                }
            }
        }
    }
}

//next events
async function nextPage(){
    inputFirst = document.getElementById('searchbarCustFirst').value.toUpperCase();
    inputPhone = document.getElementById('searchbarCustPhone').value;

    if (inputFirst == "" && inputPhone == ""){
        if((CustcurPage * CustPageSize) < JsonData.Customers.length) CustcurPage++;
        CustrenderTable();
    }
    else{
        var table, tr, td, td2, txtFirst, txtPhone, filterarr;
        table = document.getElementById('custList');
        tr = table.getElementsByTagName('tr');
        filterarr = [];
        
        for(let i = 1; i < tr.length; i++){
            td = tr[i].getElementsByTagName('td')[0];
            td2 = tr[i].getElementsByTagName('td')[2];
            if(td || td2){
                txtFirst = td.textContent || td.innerText;
                txtPhone = td2.textContent || td2.innerText;
                if(txtFirst.toUpperCase().indexOf(inputFirst) > -1 && txtPhone.indexOf(inputPhone) > -1){
                    filterarr.push(i);
                }
            }
        }
        if((CustcurPage * CustPageSize) < filterarr.length)
        {
            CustcurPage++;
            filterTableCustomer();
        }
    }
}

//Filter table
function filteredAll(){
    CustitemsCount = 0;
    CustcurPage = 1;
    Custstart = 0;
    filterTableCustomer();
}

//Show filtered table data
function filterTableCustomer(){
    inputFirst = document.getElementById('searchbarCustFirst').value.toUpperCase();
    inputPhone = document.getElementById('searchbarCustPhone').value;

    var table, tr, td, td2, txtFirst, txtPhone, filterarr;
    table = document.getElementById('custList');
    tr = table.getElementsByTagName('tr');
    filterarr = [];
    
    for(let i = 1; i < tr.length; i++){
        td = tr[i].getElementsByTagName('td')[0];
        td2 = tr[i].getElementsByTagName('td')[2];
        if(td || td2){
            txtFirst = td.textContent || td.innerText;
            txtPhone = td2.textContent || td2.innerText;
            if(txtFirst.toUpperCase().indexOf(inputFirst) > -1 && txtPhone.indexOf(inputPhone) > -1){
                filterarr.push(i);
            }
        }
    }
    for (i = 1; i < tr.length; i++){
        tr[i].style.display = "none";
    }

    if (filterarr.length > 0){
        for (i = 1; i < tr.length; i++){
            if(CustitemsCount < CustcurPage*CustPageSize){
                for (j = filterarr.indexOf(Custstart) + 1; j < filterarr.length; j++){
                    if (i == filterarr[j]){
                        tr[i].style.display = "";
                        Custstart = i;
                        CustitemsCount ++;
                        break;
                    }
                    else{
                        tr[i].style.display = "none";
                    }
                }
            }
            else{
                tr[i].style.display = "none";
            }
        }
    }
    else{
        for (i = 1; i < tr.length; i++){
            tr[i].style.display = "none";
        }
    }
    document.getElementById("CustpageNum").innerHTML = CustcurPage;
}

function ClearCustOrder(){
    CustGenerateTable();
    setTimeout(CustrenderTable, 100);

    document.getElementById('searchbarCustFirst').value = "";
    document.getElementById('searchbarCustPhone').value = "";

    document.getElementById('searchbarCustFirst').disabled = false;
    document.getElementById('searchbarCustPhone').disabled = false;
}

//---------------------------------------------------------------------------------------------------------------