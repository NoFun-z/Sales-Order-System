//CREATE SUPPLIER TABLE
//---------------------------SUPPLIER------------------------//
// let JsonDataP;

// let data = localStorage.getItem('GetJson')
// JsonDataP = JSON.parse(data);

//Send back json files
function sendJsonData2(){
    localStorage.setItem("GetJson", JSON.stringify(JsonDataP));
}

//CREATE SUPPLIER TABLE
//---------------------------SUPPLIER------------------------//
const SupPageSize = 5;
let SupcurPage = 1;
let Supstart = 0;
let SupitemsCount = 0;
let rows = 0;

//Without any interaction, after 0.15s, function will be called.
setTimeout(SuprenderTable, 100);

//Create table on page load
async function SupGenerateTable(){
    //Select table body
    let table = document.querySelector('#storeList tbody');
    rows = 0;

    document.getElementById("SuppageNum").disabled = false;
    document.getElementById("SupbtnPrevPage").disabled = false;
    document.getElementById("SupbtnNextPage").disabled = false;
    document.getElementById("allCheckeds").disabled = false;
    document.getElementById('searchbarSupName').disabled = false;
    document.getElementById('searchbarSupParts').disabled = false;
    document.getElementById('searchbarSupPrice').disabled = false;
    document.getElementById('Add_Supplier').disabled = false;
    document.getElementById('supClear').disabled = false;  

    let result = '';
    for (let i = 0; i < JsonDataP.Provider.length; i++)
    {
        for (let j = 0; j < JsonDataP.Provider[i].PartsAndPrices.length; j++)
        {
            rows ++
            result += `<tr>
            <td><input value="${JsonDataP.Provider[i].PartsAndPrices[j].Price}" id="checkedItems${rows}" name="checkedItems" type="checkbox"></td>
            <td id="SpName_Row${rows}">${JsonDataP.Provider[i].Name}</td>
            <td id="Part_Row${rows}">${JsonDataP.Provider[i].PartsAndPrices[j].Part}</td>
            <td id="Price_Row${rows}">${JsonDataP.Provider[i].PartsAndPrices[j].Price}</td>
            <td><input value="0" id="SuporderQuantity${rows}" name="ItemQuantity" type="number" style='width: 150px;' min="0"></td>
            <td>
            <input id="sup_edit${rows}" type="button" class="InvenEdit" value="Edit" onclick="EditSup(${rows})">
            <input type="button" id="save_sup${rows}" value="Save" class="InvenSave" style="display: none" onclick="SaveSup(${rows}, ${i}, ${j})">
            <input type="button" id="Cancel_supUpdate${rows}" value="Cancel" class="InvenCancel" style="display: none" onclick="CancelSupUpdate(${rows},
             ${i}, ${j})">
            </td>
            <td>
            <input id="Availability${rows}" type="button" class="InvenEdit" value="On Stock" onclick="ShowAvail(${rows})">
            <input id="CancelShow${rows}" type="button" class="InvenEdit" value="Hide" style="display: none" onclick="CancelAvail(${rows})">
            </td>
            </tr>`
        }      
    };
    document.getElementById("SuppageNum").innerHTML = SupcurPage;
    table.innerHTML = result;
}   

//Show table data
async function SuprenderTable(){
    //Select table body
    let Suptable = document.querySelector('#storeList tbody');
    tr = Suptable.getElementsByTagName('tr');

    let start = (SupcurPage-1)*SupPageSize;
    let end = SupcurPage*SupPageSize;
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
    document.getElementById("SuppageNum").innerHTML = SupcurPage;
    sendJsonData2()
}

function UpdateProviderOrder(){
    let TotalSpent = 0
  
    for (let i = 0; i < JsonDataP.Provider.length; i++){
        TotalSpent = 0
        for(let j = 1; j < rows.length; j++){
            if (document.getElementById("checkedItems"+j).checked){
                if (document.getElementById("SpName_Row"+j).innerText == JsonDataP.Provider[i].Name){
                    TotalSpent += parseFloat(document.getElementById("Price_Row"+j).innerHTML) * parseFloat(document.getElementById("SuporderQuantity"+j).value)
                }
            }
        }
        for(let k = 1; k < rows.length; k++){
            if (document.getElementById("checkedItems"+k).checked){
                if (document.getElementById("SpName_Row"+k).innerText == JsonDataP.Provider[i].Name){
                    JsonDataP.Provider[i].OrderDetails.push({
                        "OrderDate": datetime,
                        "Total": TotalSpent,
                        "Parts": [
                        ]
                    })
                    break;
                }
            }
        }
        for(let z = 1; z < rows.length; z++){
            if (document.getElementById("checkedItems"+z).checked){
                if (document.getElementById("SpName_Row"+z).innerText == JsonDataP.Provider[i].Name){
                    JsonDataP.Provider[i].OrderDetails[JsonDataP.Provider[i].OrderDetails.length - 1].Parts.push({
                        "Quantity": document.getElementById("SuporderQuantity"+z).value,
                        "Name": document.getElementById("Part_Row"+z).innerText
                    })
                }
            }
        }
    }  

}

document.getElementById("Process_order").style.display = "none";
document.getElementById("Submit_Confirm").style.display = "none";

function AddToInvent(){
    if (document.getElementById("Sup_Items").value != "" && document.getElementById("TotalSupPrice").value != "$0.00"){
        let tableP = document.getElementById('storeList');
        trP = tableP.getElementsByTagName('tr');
    
        for (let z = 0; z < JsonDataP.inv.length; z++){
            for (let i = 1; i < trP.length; i ++){
                if (document.getElementById("checkedItems"+i).checked)
                {
                    if ( JsonDataP.inv[z].Item == document.getElementById("Part_Row"+i).innerHTML){
                        JsonDataP.inv[z].QuantityInStock += parseFloat(document.getElementById("SuporderQuantity"+i).value)
                    }
                }
            }
        }

        UpdateProviderOrder();
        sendJsonData2();
        console.log(JsonDataP.Provider[0].OrderDetails)

        //Show and hide buttons
        document.getElementById("Get_Order").style.display = "none";
        document.getElementById("Process_order").style.display = "inline-block";
        setTimeout(() => {
            document.getElementById("Process_order").style.display = "none";
            document.getElementById("Submit_Confirm").style.display = "inline-block";
            alert(`Items Ordered, Items added to iventory `)
            for (let i = 0 ; i < trP.length; i++){
                trP[i].style.display = "none";
            }
            document.getElementById("SuppageNum").disabled = true;
            document.getElementById("SupbtnPrevPage").disabled = true;
            document.getElementById("SupbtnNextPage").disabled = true;
            document.getElementById("allCheckeds").disabled = true;
            document.getElementById('searchbarSupName').disabled = true;
            document.getElementById('searchbarSupParts').disabled = true;
            document.getElementById('searchbarSupPrice').disabled = true;
            document.getElementById('Add_Supplier').disabled = true;
            document.getElementById('supClear').disabled = true;          
        }, 1500);
    }
    else {
        alert(`Please Choose Items and the amount you want to purchase :)`)
    }
}

document.getElementById("AvailForm").style.display="none";

function ShowAvail(index){
    let NoStock = 0
    let ItemName = ""
    for (let i = 0; i < JsonDataP.inv.length; i++){
        if (JsonDataP.inv[i].Item == document.getElementById("Part_Row"+index).innerHTML){
            NoStock = JsonDataP.inv[i].QuantityInStock;
            ItemName = JsonDataP.inv[i].Item;
        }
    }

    let Ptable = document.getElementById('storeList');
    Ptr = Ptable.getElementsByTagName('tr');
    for (let i = 1; i < Ptr.length; i ++){
        if ( i == index){
            document.getElementById("Availability"+i).style.display="none";
            document.getElementById("CancelShow"+i).style.display="block";
        }
        else{
            document.getElementById("Availability"+i).style.display="block";
            document.getElementById("CancelShow"+i).style.display="none";
        }
    }

    document.getElementById("AvailForm").style.display="inline-block";
    document.getElementById("Availability"+index).style.display="none";
    document.getElementById("CancelShow"+index).style.display="block";

    document.getElementById("ItemAvail").innerHTML=`${document.getElementById("Part_Row"+index).innerHTML}`;
    document.getElementById("ItemOnStock").value =`${NoStock} ${ItemName} left on stock`;
}
function CancelAvail(index){
    document.getElementById("AvailForm").style.display="none";
    document.getElementById("Availability"+index).style.display="block";
    document.getElementById("CancelShow"+index).style.display="none";

    document.getElementById("ItemAvail").innerHTML=`Item Availability`;
    document.getElementById("ItemOnStock").value = "";
}

//Edit Json
function EditSup(index){
    console.log(index);
    document.getElementById("sup_edit"+index).style.display="none";
    document.getElementById("save_sup"+index).style.display="block";
    document.getElementById("Cancel_supUpdate"+index).style.display="block";

    //Disable inputs during edit
    document.getElementById('searchbarSupName').disabled = true;
    document.getElementById('searchbarSupParts').disabled = true;
    document.getElementById('searchbarSupPrice').disabled = true;
    document.getElementById('checkedItems'+index).disabled = true;
    document.getElementById('SuporderQuantity'+index).disabled = true;
        
    var Parts = document.getElementById("Part_Row"+index);
    var SupPrice= document.getElementById("Price_Row"+index);
        
    var Parts_data = Parts.innerHTML;
    var SupPrice_data = SupPrice.innerHTML;
        
    Parts.innerHTML="<input type='text' id='Parts_text"+index+"' style='width: 120px' value='"+Parts_data+"'>";
    SupPrice.innerHTML="<input type='number' id='SupPrice_text"+index+"' style='width: 120px' value='"+SupPrice_data+"' min='0'>";
}

//Save data to json
function SaveSup(index, i, j){
    var Parts_val = document.getElementById("Parts_text"+index).value;
    var SupPrice_val = document.getElementById("SupPrice_text"+index).value;
    var SupName_val = document.getElementById("SpName_Row"+index);

    if (Parts_val != "" && SupPrice_val != ""){
        for (let z = 0 ; z < JsonDataP.Provider.length; z ++)
        {
            if (JsonDataP.Provider[z].Name == SupName_val.innerHTML){
                JsonDataP.Provider[i].PartsAndPrices[j].Part = Parts_val;
                JsonDataP.Provider[i].PartsAndPrices[j].Price = SupPrice_val;
            }
        }

        
        SupGenerateTable();
        setTimeout(SuprenderTable, 100);

        setTimeout(() => {
            document.getElementById('searchbarSupName').disabled = false;
            document.getElementById('searchbarSupParts').disabled = false;
            document.getElementById('searchbarSupPrice').disabled = false;
            document.getElementById('checkedItems'+index).disabled = false;
            document.getElementById('SuporderQuantity'+index).disabled = false;
            document.getElementById("sup_edit"+index).style.display="block";
            document.getElementById("save_sup"+index).style.display="none";
            document.getElementById("Cancel_supUpdate"+index).style.display="none";
        }, 100);
        sendJsonData2()
    }
    else if (Parts_val == "" || SupPrice_val == ""){
        alert(`NO FIELDS SHOULD BE LEFT EMPTY BEFORE SAVING`);
        if (Parts_val == ""){
            document.getElementById("Parts_text"+index).value = JsonDataP.Provider[i].PartsAndPrices[j].Part;
        }
        if (SupPrice_val == ""){
            document.getElementById("SupPrice_text"+index).value = JsonDataP.Provider[i].PartsAndPrices[j].Price;
        }
    }
}

//Cancel inven update
function CancelSupUpdate(index, i, j){
    var Parts = document.getElementById("Part_Row"+index);
    var SupPrice = document.getElementById("Price_Row"+index);

    Parts.innerHTML = `<td id="Part_Row${index}">${JsonDataP.Provider[i].PartsAndPrices[j].Part}</td>`;
    SupPrice.innerHTML = `<td id="Price_Row${index}">${JsonDataP.Provider[i].PartsAndPrices[j].Price}</td>`;
    
    document.getElementById('searchbarSupName').disabled = false;
    document.getElementById('searchbarSupParts').disabled = false;
    document.getElementById('searchbarSupPrice').disabled = false;
    document.getElementById('checkedItems'+index).disabled = false;
    document.getElementById('SuporderQuantity'+index).disabled = false;
    document.getElementById("sup_edit"+index).style.display="block";
    document.getElementById("save_sup"+index).style.display="none";
    document.getElementById("Cancel_supUpdate"+index).style.display="none";
}

//NEXT AND PREVIOUS BUTTONS CLICKS EVENTS
document.getElementById('SupbtnPrevPage').addEventListener('click', SupbtnPrevPage, false);
document.getElementById('SupbtnNextPage').addEventListener('click', SupbtnNextPage, false);

//Previous page event
function SupbtnPrevPage(){
    inputName = document.getElementById('searchbarSupName').value;
    inputParts = document.getElementById('searchbarSupParts').value;
    inputPrice = document.getElementById('searchbarSupPrice').value;

    if(inputName == "" && inputParts == "" && inputPrice == ""){
        if(SupcurPage > 1)
        {
            SupcurPage--;
            SuprenderTable();
        }
    }
    else{
        if(SupcurPage > 1)
        {
            SupitemsCount = 0;
            Supstart = 0;
            let PageNow = SupcurPage - 1;
            SupcurPage=1;
            for (i = 0; i < PageNow; i++){
                filterTableSupp();
                if (SupcurPage < PageNow){
                    SupcurPage++
                }
            }
        }
    }
}

//next events
async function SupbtnNextPage(){
    inputName = document.getElementById('searchbarSupName').value.toUpperCase();
    inputParts = document.getElementById('searchbarSupParts').value.toUpperCase();
    inputPrice = document.getElementById('searchbarSupPrice').value;

    if (inputName == "" && inputParts == "" && inputPrice == ""){
        if((SupcurPage * SupPageSize) < rows) SupcurPage++;
        SuprenderTable();
    }
    else{
        var table, tr, td, td2, td3, i, txtName, txtParts, txtPrice, filterPrice, filteredPrice, filterarr;
        table = document.getElementById('storeList');
        tr = table.getElementsByTagName('tr');
        filterPrice = inputPrice;
        filterarr = [];

        if(filterPrice == ""){
            filteredPrice = 9999999;
        }
        else{
            filteredPrice = parseFloat(filterPrice);
        }
        
        for(i = 0; i < tr.length; i++){
            td = tr[i].getElementsByTagName('td')[1];
            td2 = tr[i].getElementsByTagName('td')[2];
            td3 = tr[i].getElementsByTagName('td')[3];
            if(td || td2 || td3){
                txtName = td.textContent || td.innerText;
                txtParts = td2.textContent || td2.innerText;
                txtPrice = td3.textContent || td3.innerText;
                if(txtName.toUpperCase().indexOf(inputName) > -1 && txtParts.toUpperCase().indexOf(inputParts) > -1 && parseFloat(txtPrice) <= parseFloat(filteredPrice)){
                    filterarr.push(i);
                }
            }
        }
        if((SupcurPage * SupPageSize) < filterarr.length)
        {
            SupcurPage++;
            filterTableSupp();
        }
    }
}

//Filter table
function filteredAll(){
    SupitemsCount = 0;
    SupcurPage = 1;
    Supstart = 0;
    filterTableSupp();
}

//Show filtered table data
function filterTableSupp(){
    inputName = document.getElementById('searchbarSupName').value.toUpperCase();
    inputParts = document.getElementById('searchbarSupParts').value.toUpperCase();
    inputPrice = document.getElementById('searchbarSupPrice').value;

    var table, tr, td, td2, td3, i, txtName, txtParts, txtPrice, filterPrice, filteredPrice, filterarr;
    table = document.getElementById('storeList');
    tr = table.getElementsByTagName('tr');
    filterPrice = inputPrice;
    filterarr = [];

    if(filterPrice == ""){
        filteredPrice = 9999999;
    }
    else{
        filteredPrice = parseFloat(filterPrice);
    }
    
    for(i = 0; i < tr.length; i++){
        td = tr[i].getElementsByTagName('td')[1];
        td2 = tr[i].getElementsByTagName('td')[2];
        td3 = tr[i].getElementsByTagName('td')[3];
        if(td || td2 || td3){
            txtName = td.textContent || td.innerText;
            txtParts = td2.textContent || td2.innerText;
            txtPrice = td3.textContent || td3.innerText;
            if(txtName.toUpperCase().indexOf(inputName) > -1 && txtParts.toUpperCase().indexOf(inputParts) > -1 && parseFloat(txtPrice) <= parseFloat(filteredPrice)){
                filterarr.push(i);
            }
        }
    }

    for (i = 1; i < tr.length; i++){
        tr[i].style.display = "none";
    }

    if (filterarr.length > 0){
        for (i = 1; i < tr.length; i++){
            if(SupitemsCount < SupcurPage*SupPageSize){
                for (j = filterarr.indexOf(Supstart) + 1; j < filterarr.length; j++){
                    if (i == filterarr[j]){
                        tr[i].style.display = "";
                        Supstart = i;
                        SupitemsCount ++;
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
    document.getElementById("SuppageNum").innerHTML = SupcurPage;
}

function CalculateSelectedSup(){
    let itemList = document.getElementById('Sup_Items');
    let items = document.getElementsByName('checkedItems');
    let total = document.getElementById('TotalSupPrice');

    let itm = [];
    let auxPrice = 0;
    itemList.value = "";
    total.innerHTML = "";

    for(var i = 0; i < items.length; i++){
        if(items[i].checked){
            var row = items[i].parentNode.parentNode;

            if(row.cells[1].innerText == "Provider Name"){
                continue
            }
            itemList.value += `• ${row.cells[1].innerText} | ${row.cells[2].innerText} - Quantity: ${row.cells[4].children[0].value}\n`;  

            itm.push(`${row.cells[4].children[0].value}x ${row.cells[2].innerText} (${row.cells[1].innerText})`); 
            let price = items[i].value * row.cells[4].children[0].value;
            auxPrice += price;
            total.innerText = `$${(auxPrice).toFixed(2)}`;

            localStorage.setItem("Suptotals", auxPrice);
            localStorage.setItem('Supitem', itm);
        }
    }
}

function CheckAlls(){
    let chkAll = document.getElementById('allCheckeds');
    let chkbox = document.getElementsByName('checkedItems');
    if(chkAll.checked == true){
        chkbox.forEach(element => {
            element.checked = true;
        });
        chkbox.checked = true;
    }
    else{
        chkbox.forEach(element => {
            element.checked = false;
        });
        chkbox.checked = false;
    }
}

function SupInvoice(){
    var x = localStorage.getItem('Suptotals');
    var z = localStorage.getItem('Supitem').split(',');
    
    let itemz = document.getElementById('itemsSup');
    let iepricez = document.getElementById('itemsPriceSup');
    let totalz = document.getElementById('totalPriceSup');

    z.forEach(e => {
        itemz.innerText += `| ${e} |`
    });
    iepricez.innerText = `$${x}`;
    totalz.innerText = `Total: $${x}`;
}

function ClearSupOrder(){
    SupGenerateTable()
    setTimeout(SuprenderTable, 100);

    document.getElementById("allCheckeds").checked = false;
    document.getElementById("TotalSupPrice").innerHTML = 0;
    document.getElementById("Sup_Items").value = "";

    document.getElementById('searchbarSupName').disabled = false;
    document.getElementById('searchbarSupParts').disabled = false;
    document.getElementById('searchbarSupPrice').disabled = false;
    document.getElementById('searchbarSupName').value = "";
    document.getElementById('searchbarSupParts').value= "";
    document.getElementById('searchbarSupPrice').value = "";
}

//---------------------------------------------------------------------------------------------------------------