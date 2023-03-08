//---------------------------REPORT------------------------//
let jsondata = [];
let areatxt = document.getElementById('txtReport');
let areatxt2 = document.getElementById('txtReport2');
let areatxt3 = document.getElementById('txtReport3');
let areatxt4 = document.getElementById('txtReport4');

let dataR = localStorage.getItem('GetJson')
jsondata = JSON.parse(dataR);

//----------------------CustomerReport Tables--------------//
//Customer_order Table//
const COPageSize = 2;
let COcurPage = 1;
let COstart = 0;
let COitemsCount = 0;

//Most Purchased Item table//
const MIPageSize = 2;
let MIcurPage = 1;
let MIstart = 0;
let MIitemsCount = 0;

//Order Item table//
const ROPageSize = 2;
let ROcurPage = 1;
let ROstart = 0;
let ROitemsCount = 0;

//For customer report

//Log table//
const LPageSize = 5;
let LcurPage = 1;
let Lstart = 0;
let LitemsCount = 0;

//Create table on page load
async function COGenerateTable(){
  let Cochk = document.getElementById("Customer_Order");
  if (Cochk.checked){
    document.getElementById("COtablediv").style.display = "block";
  }
  else{
    document.getElementById("COtablediv").style.display = "none";
  }  
  //Select table body
  let table = document.querySelector('#cust_OrderR tbody');

  let result = '';
  for (let i = 0; i < jsondata.Orders.length; i++)
  {
    for (let j = 0; j < jsondata.Orders[i].OrderDetails.length; j++)
    {
      for (let k = 0; k < jsondata.Orders[i].OrderDetails[j].Items.length; k++)
      {
          result += `<tr>
          <td>${jsondata.Orders[i].CustName}</td>
          <td>${jsondata.Orders[i].OrderDetails[j].DateOrdered}</td>
          <td>${jsondata.Orders[i].OrderDetails[j].Items[k].Name}</td>
          <td>${jsondata.Orders[i].OrderDetails[j].Items[k].Quantity}</td>
          </tr>`
      }
    }     
  };
  document.getElementById("CopageNum").innerHTML = COcurPage;
  table.innerHTML = result;

  //Apply paging
  setTimeout(COrenderTable, 150);
}

//Show table data
async function COrenderTable(){
  //Select table body
  let table = document.querySelector('#cust_OrderR tbody');
  let tr = table.getElementsByTagName('tr');
  document.getElementById("pagingCO").style.display="block";

  let start = (COcurPage-1)*COPageSize;
  let end = COcurPage*COPageSize;
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
  document.getElementById("CopageNum").innerHTML = COcurPage;
}

//FILTER
//Filter table
function filteredAllCO(){
  COitemsCount = 0;
  COcurPage = 1;
  COstart = 0;
  filterTableCO();
}

//Show filtered table data
function filterTableCO(){
  var input, filter, table, tr, td, td2, i, filterarr;
  input = document.getElementById('search_CO');
  filter = input.value.toUpperCase();
  table = document.getElementById('cust_OrderR');
  tr = table.getElementsByTagName('tr');
  filterarr = [];
  
  for(i = 1; i < tr.length; i++){
      td = tr[i].getElementsByTagName('td')[0];
      if(td){
          txtValue = td.textContent || td.innerText;
          if(txtValue.toUpperCase().indexOf(filter) > -1){
              filterarr.push(i);
          }
      }
  }

  for (i = 1; i < tr.length; i++){
      tr[i].style.display = "none";
  }

  if (filterarr.length > 0){
      for (i = 1; i <= tr.length - 1; i++){
          if(COitemsCount < COcurPage*COPageSize){
              for (j = filterarr.indexOf(COstart) + 1; j < filterarr.length; j++){
                  if (i == filterarr[j]){
                      tr[i].style.display = "";
                      COstart = i;
                      COitemsCount ++;
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
  document.getElementById("CopageNum").innerHTML = COcurPage;
}

//Paging click event for COtable
//NEXT AND PREVIOUS BUTTONS CLICKS EVENTS
document.getElementById('COPrevPage').addEventListener('click', COpreviousPage, false);
document.getElementById('CONextPage').addEventListener('click', COnextPage, false);

//Previous page event
function COpreviousPage(){
  if(document.getElementById("search_CO") == ""){
    if(COcurPage > 1)
    {
      COcurPage--;
      COrenderTable();
    }
  }
  else{
    if(COcurPage > 1)
    {
        COitemsCount = 0;
        COstart = 0;
        let PageNow = COcurPage - 1;
        COcurPage=1;
        for (i = 0; i < PageNow; i++){
            filterTableCO();
            if (COcurPage < PageNow){
                COcurPage++
            }
        }
    }
  }
}

//next events
async function COnextPage(){

  let COrowCount = 0;

  for (let i = 0; i < jsondata.Orders.length; i++)
  {
    for (let j = 0; j < jsondata.Orders[i].OrderDetails.length; j++)
    {
      for (let k = 0; k < jsondata.Orders[i].OrderDetails[j].Items.length; k++)
      {
          COrowCount += 1;
      }
    }     
  };
  if(document.getElementById("search_CO") == ""){
    if((COcurPage * COPageSize) < COrowCount) COcurPage++;
    COrenderTable();
  }
  else{
    var input, filter, table, tr, td, td2, i, filterarr;
    input = document.getElementById('search_CO');
    filter = input.value.toUpperCase();
    table = document.getElementById('cust_OrderR');
    tr = table.getElementsByTagName('tr');
    filterarr = [];
    
    for(i = 1; i < tr.length; i++){
        td = tr[i].getElementsByTagName('td')[0];
        if(td){
            txtValue = td.textContent || td.innerText;
            if(txtValue.toUpperCase().indexOf(filter) > -1){
                filterarr.push(i);
            }
        }
    }
    if((COcurPage * COPageSize) < filterarr.length)
    {
        COcurPage++;
        filterTableCO();
    }
  }
}


/////////////////////////////////////////////////////////////////////////////

//////////////////////ORDER REPORT TABLES//////////////////////////
//Create table on page load
async function ROGenerateTable(){
  let Cochk = document.getElementById("Order_RO");
  if (Cochk.checked){
    document.getElementById("ORtablediv").style.display = "block";
  }
  else{
    document.getElementById("ORtablediv").style.display = "none";
  }  
  //Select table body
  let table = document.querySelector('#OR_OrderR tbody');

  let result = '';
  for (let i = 0; i < jsondata.Provider.length; i++)
  {
    if (JsonData.Provider[i].OrderDetails.length > 0)
    {
      for (let j = 0; j < jsondata.Provider[i].OrderDetails.length; j++)
      {
        for (let k = 0; k < jsondata.Provider[i].OrderDetails[j].Parts.length; k++)
        {
            result += `<tr>
            <td>${jsondata.Provider[i].Name}</td>
            <td>${jsondata.Provider[i].OrderDetails[j].OrderDate}</td>
            <td>${jsondata.Provider[i].OrderDetails[j].Total}</td>
            <td>${jsondata.Provider[i].OrderDetails[j].Parts[k].Name}</td>
            <td>${jsondata.Provider[i].OrderDetails[j].Parts[k].Quantity}</td>
            </tr>`
        }
      }    
    } 
  };
  document.getElementById("ROpageNum").innerHTML = ROcurPage;
  table.innerHTML = result;

  //Apply paging
  setTimeout(ROrenderTable, 150);
}

//Show table data
async function ROrenderTable(){
  //Select table body
  let table = document.querySelector('#OR_OrderR tbody');
  let tr = table.getElementsByTagName('tr');
  document.getElementById("pagingRO").style.display="block";

  let start = (ROcurPage-1)*ROPageSize;
  let end = ROcurPage*ROPageSize;
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
  document.getElementById("ROpageNum").innerHTML = ROcurPage;
}

//FILTER
//Filter table
function filteredAllRO(){
  ROitemsCount = 0;
  ROcurPage = 1;
  ROstart = 0;
  filterTableRO();
}

//Show filtered table data
function filterTableRO(){
  var input, filter, table, tr, td, td2, i, filterarr, txtValue, txtValue2;
  input = document.getElementById('search_OR');
  filter = input.value.toUpperCase();
  table = document.getElementById('OR_OrderR');
  tr = table.getElementsByTagName('tr');
  filterarr = [];
  
  for(i = 1; i < tr.length; i++){
      td = tr[i].getElementsByTagName('td')[0];
      td2 = tr[i].getElementsByTagName('td')[3];
      if(td || td2){
          txtValue = td.textContent || td.innerText;
          txtValue2 = td2.textContent || td2.innerText;
          if(txtValue.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1){
              filterarr.push(i);
          }
      }
  }

  for (i = 1; i < tr.length; i++){
      tr[i].style.display = "none";
  }

  if (filterarr.length > 0){
      for (i = 1; i < tr.length; i++){
          if(ROitemsCount < ROcurPage*ROPageSize){
              for (j = filterarr.indexOf(ROstart) + 1; j < filterarr.length; j++){
                  if (i == filterarr[j]){
                      tr[i].style.display = "";
                      ROstart = i;
                      ROitemsCount ++;
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
  document.getElementById("ROpageNum").innerHTML = ROcurPage;
}

//Paging click event for COtable
//NEXT AND PREVIOUS BUTTONS CLICKS EVENTS
document.getElementById('ROPrevPage').addEventListener('click', ROpreviousPage, false);
document.getElementById('RONextPage').addEventListener('click', ROnextPage, false);

//Previous page event
function ROpreviousPage(){
  if(document.getElementById("search_OR") == ""){
    if(ROcurPage > 1)
    {
      ROcurPage--;
      ROrenderTable();
    }
  }
  else{
    if(ROcurPage > 1)
    {
        ROitemsCount = 0;
        ROstart = 0;
        let PageNow = ROcurPage - 1;
        ROcurPage=1;
        for (i = 0; i < PageNow; i++){
            filterTableRO();
            if (ROcurPage < PageNow){
                ROcurPage++
            }
        }
    }
  }
}

//next events
async function ROnextPage(){

  let ROrowCount = 0;

  for (let i = 0; i < jsondata.Provider.length; i++)
  {
    if (JsonData.Provider[i].OrderDetails.length > 0)
    {
      for (let j = 0; j < jsondata.Provider[i].OrderDetails.length; j++)
      {
        for (let k = 0; k < jsondata.Provider[i].OrderDetails[j].Parts.length; k++)
        {
          ROrowCount ++
        }
      }    
    } 
  };
  if(document.getElementById("search_RO") == ""){
    if((ROcurPage * ROPageSize) < ROrowCount) ROcurPage++;
    ROrenderTable();
  }
  else{
    var input, filter, table, tr, td, td2, i, filterarr;
    input = document.getElementById('search_OR');
    filter = input.value.toUpperCase();
    table = document.getElementById('OR_OrderR');
    tr = table.getElementsByTagName('tr');
    filterarr = [];
    
    for(i = 1; i < tr.length; i++){
        td = tr[i].getElementsByTagName('td')[0];
        if(td){
            txtValue = td.textContent || td.innerText;
            if(txtValue.toUpperCase().indexOf(filter) > -1){
                filterarr.push(i);
            }
        }
    }
    if((ROcurPage * ROPageSize) < filterarr.length)
    {
        ROcurPage++;
        filterTableRO();
    }
  }
}

//Grab Order report-----------/////////
function GetOrderReport(){
  let OrderTotal = 0;
  let totalOrderSpent = 0;
  let totalOrdertItems = 0;
  let MostOrderSpent = 0;
  let FavorSupp = "";
  let output = "";
  let output2 = "";

  document.getElementById("SelectedReport").innerHTML = "Order Report";
  document.getElementById("spanDisplay").style.display = "none";
  document.getElementById("CustReport_Options").style.display = "none";
  document.getElementById("OrderReport_Options").style.display = "block";
  document.getElementById("COtablediv").style.display = "none";
  document.getElementById("MPIdiv").style.display = "none";
  document.getElementById("textReport").style.display = "block";
  document.getElementById("txtReport2").style.display = "inline-block";
  document.getElementById("txtReport3").style.display = "none";
  document.getElementById("txtReport4").style.display = "none";
  document.getElementById("Print_report").style.display = "block";
  document.getElementById("LOGtablediv").style.display = "none";

  for(var i = 0; i < jsondata.Provider.length; i++){
    if (jsondata.Provider[i].OrderDetails.length > 0){
      for (var j = 0; j < jsondata.Provider[i].OrderDetails.length; j++){
        OrderTotal ++;
      }
      for( var j = 0; j < jsondata.Provider[i].OrderDetails.length; j++)
      {
        totalOrderSpent += jsondata.Provider[i].OrderDetails[j].Total;
        if(jsondata.Provider[i].OrderDetails[j].Total > MostOrderSpent)
        {
          MostOrderSpent = jsondata.Provider[i].OrderDetails[j].Total;
          FavorSupp = jsondata.Provider[i].Name
        }
        
        for (var k = 0; k < jsondata.Provider[i].OrderDetails[j].Parts.length; k++)
        {
          totalOrdertItems += jsondata.Provider[i].OrderDetails[j].Parts[k].Quantity;
        }
      }
    }
  }
  output += "----ORDER REPORT SUMMARY-----\n\n"
  output += `Total Items bought: ${totalOrdertItems} items\nNumber of Orders: ${OrderTotal} orders\nTotal spent: $${totalOrderSpent}`;

  output2 += "----○ Top Supplier-----\n\n"
  output2 += `Favourite Provider: *${FavorSupp}*\nTotal used: $${MostOrderSpent}`;
  
  areatxt.textContent = output;
  areatxt2.textContent = output2;

}

function GetOrderReport2(){
  let HighestpItem = 0;
  let MostPurchasedItem = "";
  let MIjson = {
    "items": [
    ]
  };

  let Ochk = document.getElementById("Order_RO2");
  if (Ochk.checked){
    document.getElementById("ROlogdiv").style.display = "block";
  }
  else{
    document.getElementById("ROlogdiv").style.display = "none";
  }  

  document.getElementById("OrderReport_Options").style.display = "block";
  document.getElementById("Print_report").style.display = "block";

  for(var i = 0; i < jsondata.Provider.length; i++){
    if (jsondata.Provider[i].OrderDetails.length > 0){
      for( var j = 0; j < jsondata.Provider[i].OrderDetails.length; j++)
      {
        for (var k = 0; k < jsondata.Provider[i].OrderDetails[j].Parts.length; k++)
        {
          if(MIjson.items.length > 0){
            for (var z = 0; z < MIjson.items.length; z++){
  
                if(MIjson.items[z].item == jsondata.Provider[i].OrderDetails[j].Parts.Name){
                  MIjson.items[z].amountsold += jsondata.Provider[i].OrderDetails[j].Parts[k].Quantity;
                }
                else{
                  MIjson.items.push({
                    "item": jsondata.Provider[i].OrderDetails[j].Parts[k].Name,
                    "amountsold": jsondata.Provider[i].OrderDetails[j].Parts[k].Quantity
                  })
                  break;
                }         
            }
          }
          else{
            MIjson.items.push(
              {
                "item": jsondata.Provider[i].OrderDetails[j].Parts[k].Name,
                "amountsold": jsondata.Provider[i].OrderDetails[j].Parts[k].Quantity
              }
            )
          }
        }
      }
    }
    }

  for (var r = 0; r < MIjson.items.length; r++){
    if(MIjson.items[r].amountsold > HighestpItem){
      HighestpItem = MIjson.items[r].amountsold;
      MostPurchasedItem = MIjson.items[r].item;
    }
  }

  //Text boxes field 2
  let ORDMostPurchase = "";
  let ORDMostAPurchase = 0;
  let totalMI = 0;
  let MIArr = [];
  let MOstPI = 0;
  let indexofMI = 0;


  for(var i = 0; i < jsondata.Provider.length; i++){
    totalMI = 0;
    for( var j = 0; j < jsondata.Provider[i].OrderDetails.length; j++)
    {
      for (var k = 0; k < jsondata.Provider[i].OrderDetails[j].Parts.length; k++)
      {
        totalMI += jsondata.Provider[i].OrderDetails[j].Parts[k].Quantity
      }
    }
    MIArr.push(totalMI);
  }

  for(var g = 0; g < MIArr.length; g++){
    if(MIArr[g] > MOstPI){
      MOstPI = MIArr[g];
    }
  }
  indexofMI = MIArr.indexOf(MOstPI);
  ORDMostPurchase = jsondata.Provider[indexofMI].Name;
  ORDMostAPurchase = MOstPI;


  document.getElementById("MostPOItem").value = MostPurchasedItem;
  document.getElementById("OAPurchased").value = HighestpItem;

  document.getElementById("OrdCust").value = ORDMostPurchase ;
  document.getElementById("OAmountP").value = ORDMostAPurchase;
}


////////////////////////////////////////////////////////////////////////////


//---------------------Grab Customer report------------------------//
function GetCustomerReport(){
  let customerTotal = 0;
  let totalCustSpent = 0;
  let totalCustItems = 0;
  let MostCustSpent = 0;
  let CustwithMostSpent = "";
  let output = "";
  let output2 = "";

  document.getElementById("SelectedReport").innerHTML = "Customer Report";
  document.getElementById("spanDisplay").style.display = "none";
  document.getElementById('LOGtablediv').style.display = "none";
  document.getElementById('OrderReport_Options').style.display = "none";
  document.getElementById('ORtablediv').style.display = "none";
  document.getElementById("CustReport_Options").style.display = "block";
  document.getElementById("textReport").style.display = "block";
  document.getElementById("txtReport2").style.display = "inline-block";
  document.getElementById("txtReport3").style.display = "none";
  document.getElementById("txtReport4").style.display = "none";
  document.getElementById("Print_report").style.display = "block";

  for(var i = 0; i < jsondata.Orders.length; i++){
    customerTotal += 1;
    for( var j = 0; j < jsondata.Orders[i].OrderDetails.length; j++)
    {
      custFn = jsondata.Orders[i].CustName;
      totalCustSpent += jsondata.Orders[i].OrderDetails[j].TotalSpent;
      if(jsondata.Orders[i].OrderDetails[j].TotalSpent > MostCustSpent)
      {
        MostCustSpent = jsondata.Orders[i].OrderDetails[j].TotalSpent;
        CustwithMostSpent = jsondata.Orders[i].CustName
      }
      
      for (var k = 0; k < jsondata.Orders[i].OrderDetails[j].Items.length; k++)
      {
        totalCustItems += jsondata.Orders[i].OrderDetails[j].Items[k].Quantity;
      }
    }
  }
  output += "----CUSTOMER REPORT SUMMARY-----\n\n"
  output += `Total Items sold: ${totalCustItems} items\nNumber of customers: ${customerTotal} customers\nTotal sales: $${totalCustSpent}`;

  output2 += "----○ Honored Customer-----\n\n"
  output2 += `Biggest payment: *${CustwithMostSpent}*\nTotal Money spent: $${MostCustSpent}`;
  
  areatxt.textContent = output;
  areatxt2.textContent = output2;

}

//Most purchased item
//Create table on page load
async function MIGenerateTable(){
  let MIchk = document.getElementById("Customer_Order2");
  if (MIchk.checked){
    document.getElementById("MPIdiv").style.display = "block";
  }
  else{
    document.getElementById("MPIdiv").style.display = "none";
  }  
  //Select table body
  let table = document.querySelector('#Item_Invens tbody');

  let result = '';
  for (let i = 0; i < jsondata.inv.length; i++)
  {
          result += `<tr>
          <td id="Item_Row${i}">${jsondata.inv[i].Item}</td>
          <td>
          <input id="select_item${i}" type="button" class="InvenEdit" value="Pick" onclick="ShowHonoredCust('${i}')">
          </td>
          </tr>`     
  };
  document.getElementById("IpageNum").innerHTML = MIcurPage;
  table.innerHTML = result;

    //Apply paging
    setTimeout(MIrenderTable, 150);
}

//Show table data
async function MIrenderTable(){
  //Select table body
  let table = document.querySelector('#Item_Invens tbody');
  let tr = table.getElementsByTagName('tr');

  let start = (MIcurPage-1)*MIPageSize;
  let end = MIcurPage*MIPageSize;
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
  document.getElementById("IpageNum").innerHTML = MIcurPage;
}

//FILTER
//Filter table
function filteredAllMI(){
  MIitemsCount = 0;
  MIcurPage = 1;
  MIstart = 0;
  filterTableMI();
}

//Show filtered table data
function filterTableMI(){
  var input, filter, table, tr, td, i, filterarr;
  input = document.getElementById('search_MI');
  filter = input.value.toUpperCase();
  table = document.getElementById('Item_Invens');
  tr = table.getElementsByTagName('tr');
  filterarr = [];
  
  for(i = 1; i < tr.length; i++){
      td = tr[i].getElementsByTagName('td')[0];
      if(td){
          txtValue = td.textContent || td.innerText;
          if(txtValue.toUpperCase().indexOf(filter) > -1){
              filterarr.push(i);
          }
      }
  }

  for (i = 1; i < tr.length; i++){
      tr[i].style.display = "none";
  }

  if (filterarr.length > 0){
      for (i = 1; i < tr.length; i++){
          if(MIitemsCount < MIcurPage*MIPageSize){
              for (j = filterarr.indexOf(MIstart) + 1; j < filterarr.length; j++){
                  if (i == filterarr[j]){
                      tr[i].style.display = "";
                      MIstart = i;
                      MIitemsCount ++;
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
  document.getElementById("IpageNum").innerHTML = MIcurPage;
}

//Paging click event for COtable
//NEXT AND PREVIOUS BUTTONS CLICKS EVENTS
document.getElementById('IPrevPage').addEventListener('click', MIpreviousPage, false);
document.getElementById('INextPage').addEventListener('click', MInextPage, false);

//Previous page event
function MIpreviousPage(){
  if(document.getElementById("search_MI") == ""){
    if(MIcurPage > 1)
    {
      MIcurPage--;
      MIrenderTable();
    }
  }
  else{
    if(MIcurPage > 1)
    {
        MIitemsCount = 0;
        MIstart = 0;
        let PageNow = MIcurPage - 1;
        MIcurPage=1;
        for (i = 0; i < PageNow; i++){
            filterTableMI();
            if (MIcurPage < PageNow){
                MIcurPage++
            }
        }
    }
  }
}

//next events
async function MInextPage(){

  if(document.getElementById("search_MI") == ""){
    if((MIcurPage * MIPageSize) < jsondata.inv.length) MIcurPage++;
    MIrenderTable();
  }
  else{
    var input, filter, table, tr, td, i, filterarr;
    input = document.getElementById('search_MI');
    filter = input.value.toUpperCase();
    table = document.getElementById('Item_Invens');
    tr = table.getElementsByTagName('tr');
    filterarr = [];
    
    for(i = 1; i < tr.length; i++){
        td = tr[i].getElementsByTagName('td')[0];
        if(td){
            txtValue = td.textContent || td.innerText;
            if(txtValue.toUpperCase().indexOf(filter) > -1){
                filterarr.push(i);
            }
        }
    }
    if((MIcurPage * MIPageSize) < filterarr.length)
    {
        MIcurPage++;
        filterTableMI();
    }
  }
}

function ShowHonoredCust(index){
  let custMostPurchase = "";
  let custMostAPurchase = 0;
  let totalMI = 0;
  let MIArr = [];
  let MOstPI = 0;
  let indexofMI = 0;

  var item = document.getElementById("Item_Row"+index).innerText;

  for(var i = 0; i < jsondata.Orders.length; i++){
    totalMI = 0;
    for( var j = 0; j < jsondata.Orders[i].OrderDetails.length; j++)
    {
      for (var k = 0; k < jsondata.Orders[i].OrderDetails[j].Items.length; k++)
      {
        if(jsondata.Orders[i].OrderDetails[j].Items[k].Name == item){
          totalMI += jsondata.Orders[i].OrderDetails[j].Items[k].Quantity;
          break;
        }
      }
    }
    MIArr.push(totalMI);
  }

  for(var g = 0; g < MIArr.length; g++){
    if(MIArr[g] > MOstPI){
      MOstPI = MIArr[g];
    }
  }
  indexofMI = MIArr.indexOf(MOstPI);
  custMostPurchase = jsondata.Orders[indexofMI].CustName;
  custMostAPurchase = MOstPI;

  document.getElementById("HoCust").value = custMostPurchase;
  document.getElementById("AmountP").value = custMostAPurchase + " items";
}


function GetCustomerReport2(){
  MIGenerateTable();

  let HighestpItem = 0;
  let MostPurchasedItem = "";
  let MIjson = {
    "items": [
    ]
  };

  document.getElementById("CustReport_Options").style.display = "block";
  document.getElementById("Print_report").style.display = "block";

  for(var i = 0; i < jsondata.Orders.length; i++){
    for( var j = 0; j < jsondata.Orders[i].OrderDetails.length; j++)
    {
      for (var k = 0; k < jsondata.Orders[i].OrderDetails[j].Items.length; k++)
      {
        if(MIjson.items.length > 0){
          for (var z = 0; z < MIjson.items.length; z++){

              if(MIjson.items[z].item == jsondata.Orders[i].OrderDetails[j].Items.Name){
                MIjson.items[z].amountsold += jsondata.Orders[i].OrderDetails[j].Items[k].Quantity;
              }
              else{
                MIjson.items.push({
                  "item": jsondata.Orders[i].OrderDetails[j].Items[k].Name,
                  "amountsold": jsondata.Orders[i].OrderDetails[j].Items[k].Quantity
                })
                break;
              }         
          }
        }
        else{
          MIjson.items.push(
            {
              "item": jsondata.Orders[i].OrderDetails[j].Items[k].Name,
              "amountsold": jsondata.Orders[i].OrderDetails[j].Items[k].Quantity
            }
          )
        }
      }
    }
  }

  for (var r = 0; r < MIjson.items.length; r++){
    if(MIjson.items[r].amountsold > HighestpItem){
      HighestpItem = MIjson.items[r].amountsold;
      MostPurchasedItem = MIjson.items[r].item;
    }
  }
  document.getElementById("MostPItem").value = MostPurchasedItem;
  document.getElementById("APurchased").value = HighestpItem;

}


function GetCustomerReport2(){
  MIGenerateTable();

  let HighestpItem = 0;
  let MostPurchasedItem = "";
  let MIjson = {
    "items": [
    ]
  };

  document.getElementById("CustReport_Options").style.display = "block";
  document.getElementById("Print_report").style.display = "block";

  for(var i = 0; i < jsondata.Orders.length; i++){
    for( var j = 0; j < jsondata.Orders[i].OrderDetails.length; j++)
    {
      for (var k = 0; k < jsondata.Orders[i].OrderDetails[j].Items.length; k++)
      {
        if(MIjson.items.length > 0){
          for (var z = 0; z < MIjson.items.length; z++){

              if(MIjson.items[z].item == jsondata.Orders[i].OrderDetails[j].Items.Name){
                MIjson.items[z].amountsold += jsondata.Orders[i].OrderDetails[j].Items[k].Quantity;
              }
              else{
                MIjson.items.push({
                  "item": jsondata.Orders[i].OrderDetails[j].Items[k].Name,
                  "amountsold": jsondata.Orders[i].OrderDetails[j].Items[k].Quantity
                })
                break;
              }         
          }
        }
        else{
          MIjson.items.push(
            {
              "item": jsondata.Orders[i].OrderDetails[j].Items[k].Name,
              "amountsold": jsondata.Orders[i].OrderDetails[j].Items[k].Quantity
            }
          )
        }
      }
    }
  }

  for (var r = 0; r < MIjson.items.length; r++){
    if(MIjson.items[r].amountsold > HighestpItem){
      HighestpItem = MIjson.items[r].amountsold;
      MostPurchasedItem = MIjson.items[r].item;
    }
  }
  document.getElementById("MostPItem").value = MostPurchasedItem;
  document.getElementById("APurchased").value = HighestpItem;

}
/////////////////////////////////////////////////////////////////////////////////////////////////

function invReport(){

  document.getElementById("SelectedReport").innerHTML = "Inventory Report";
  document.getElementById("spanDisplay").style.display = "none";
  document.getElementById("CustReport_Options").style.display = "none";
  document.getElementById("OrderReport_Options").style.display = "none";
  document.getElementById("COtablediv").style.display = "none";
  document.getElementById("MPIdiv").style.display = "none";
  document.getElementById("ORtablediv").style.display = "none";
  document.getElementById("ROlogdiv").style.display = "none";
  document.getElementById("textReport").style.display = "block";
  document.getElementById("txtReport2").style.display = "none";
  document.getElementById("txtReport3").style.display = "none";
  document.getElementById("txtReport4").style.display = "none";
  document.getElementById("Print_report").style.display = "block";
  document.getElementById("LOGtablediv").style.display = "none";
  let output = "";
  
  output += "Inventory:\n"
  for(let i = 0; i < jsondata.inv.length; i++){
    output += `--------------------------------\n
    •Code: ${jsondata.inv[i].Code}\n
    •Item: ${jsondata.inv[i].Item}\n
    •Stock: ${jsondata.inv[i].QuantityInStock}\n
    •Price: $${jsondata.inv[i].Price}\n
--------------------------------\n\n`;
                
  }
  areatxt.textContent = output;
}

function salesReport(){
  document.getElementById("spanDisplay").style.display = "none";

  document.getElementById("textReport").style.display = "block";
  let income = 0;
  let output = "";

  for(let i = 0; i < jsondata.Orders.length; i++){
    for(let j = 0; j < jsondata.Orders[i].OrderDetails; j++)
      income += parseInt(jsondata.Orders[i].OrderDetails[j].TotalSpent);
  }
  output += "Orders:\n"

  output += `Number of orders: ${jsondata.Orders.length}\n
  General income: $${income}\n`

  for(let i = 0; i < jsondata.Orders.length; i++){
    output += `--------------------------------\n
    •USP: ${jsondata.Orders[i].USP}\n
    •Customer: ${jsondata.Orders[i].CustName}\n
    •Made by employee: ${jsondata.Orders[i].EmpName}\n
    •Total Sale: $${jsondata.Orders[i].Price}\n
    •Items ordered:\n`;
                

    for(let j = 0; j < jsondata.Orders[i].Items; j++){
      output += `                 •• ${jsondata.Orders[i].Items[j].Quantity}x - ${jsondata.Orders[i].Items[j].Name}\n`
      console.log(output);
    }

    output += `--------------------------------\n\n`
  }
  

  areatxt.textContent = output;
}

async function LoginTable(){
  let output = ""
  document.getElementById("textReport").style.display = "block";
  document.getElementById("txtReport2").style.display = "none";
  document.getElementById("txtReport3").style.display = "none";
  document.getElementById("txtReport4").style.display = "none";
  document.getElementById("SelectedReport").innerHTML = "Login History";
  document.getElementById("LOGtablediv").style.display = "block";
  document.getElementById("Print_report").style.display = "block";
  document.getElementById("spanDisplay").style.display = "none";
  document.getElementById('OrderReport_Options').style.display = "none";
  document.getElementById('CustReport_Options').style.display = "none";
  document.getElementById('ORtablediv').style.display = "none";
  document.getElementById('MPIdiv').style.display = "none";
  document.getElementById('COtablediv').style.display = "none";
  document.getElementById("ROlogdiv").style.display = "none";
  //Select table body
  let table = document.querySelector('#logs_report tbody');
  let result = '';
  let time;
  for (let i = 0; i < jsondata.Employee.length; i++)
  {
    for (let j = 0; j < jsondata.Employee[i].logs.length; j++)
    {
          time = Object.values(jsondata.Employee[i].logs[j]);
          result += `<tr>
          <td>${jsondata.Employee[i].empName}</td>
          <td>${Object.keys(jsondata.Employee[i].logs[j])}</td>
          <td>${time[0][0]}</td>
          <td>${time[0][1]}</td>
          </tr>`
          console.log(result)
      
    }     
  };
  document.getElementById("LpageNum").innerHTML = LcurPage;
  table.innerHTML = result;

  let str = "";
  for (let i = 0; i < jsondata.Employee.length; i++){
    str += `<option value="${jsondata.Employee[i].empName}"/>`
  }
  document.getElementById("empList").innerHTML = str;

  output += "----Login REPORT SUMMARY-----\n\n"
  output += `Total Employees: ${jsondata.Employee.length}\nAverage days worked: 5\nAverage hours worked: 40`;

  areatxt.textContent = output;

  //Apply paging
  setTimeout(LOrenderTable, 150);
}
async function LOrenderTable(){
  //Select table body
  let table = document.querySelector('#logs_report tbody');
  let tr = table.getElementsByTagName('tr');

  let start = (LcurPage-1)*LPageSize;
  let end = LcurPage*LPageSize;
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
  document.getElementById("LpageNum").innerHTML = LcurPage;
}

//Login paging
document.getElementById('LPrevPage').addEventListener('click', LpreviousPage, false);
document.getElementById('LNextPage').addEventListener('click', LnextPage, false);

//Previous page event
function LpreviousPage(){
  if(document.getElementById("empNameSelected").value == ""){
    if(LcurPage > 1)
    {
      LcurPage--;
      LOrenderTable();
    }
  }
  else(LcurPage > 1)
    {
        LitemsCount = 0;
        Lstart = 0;
        let PageNow = LcurPage - 1;
        LcurPage=1;
        for (i = 0; i < PageNow; i++){
          filterTableLogin()
            if (LcurPage < PageNow){
                LcurPage++
            }
        }
    }
  }


//next events
async function LnextPage(){
  let aux = 0;
  for (let i = 0; i < jsondata.Employee.length; i++)
  {
    for (let j = 0; j < jsondata.Employee[i].logs.length; j++)
    {
            aux++;
    }     
  }
  if (document.getElementById('empNameSelected').value == ""){
    if((LcurPage * LPageSize) < aux){
      LcurPage++;
      LOrenderTable();
    }
  }
  else{
    var input, filter, table, tr, td, td2, i, filterarr;
    input = document.getElementById('empNameSelected');
    filter = input.value.toUpperCase();
    table = document.getElementById('logs_report');
    tr = table.getElementsByTagName('tr');
    filterarr = [];
    
    for(i = 1; i < tr.length; i++){
        td = tr[i].getElementsByTagName('td')[0];
        if(td){
            txtValue = td.textContent || td.innerText;
            if(txtValue.toUpperCase().indexOf(String(filter)) > -1){
                filterarr.push(i);
            }
        }
    }
      if((LcurPage * LPageSize) < filterarr.length)
      {
          LcurPage++;
          filterTableLogin();
      }
    }
}

//FILTER
//Filter table
function filteredAllLOG(){
  LitemsCount = 0;
  LcurPage = 1;
  Lstart = 0;
  filterTableLogin();
}

function filterTableLogin(){
  var input, filter, table, tr, td, td2, i, filterarr;
  input = document.getElementById('empNameSelected');
  filter = input.value.toUpperCase();
  table = document.getElementById('logs_report');
  tr = table.getElementsByTagName('tr');
  filterarr = [];
  
  for(i = 1; i < tr.length; i++){
      td = tr[i].getElementsByTagName('td')[0];
      if(td){
          txtValue = td.textContent || td.innerText;
          if(txtValue.toUpperCase().indexOf(String(filter)) > -1){
              filterarr.push(i);
          }
      }
  }

  for (i = 1; i < tr.length; i++){
      tr[i].style.display = "none";
  }

  if (filterarr.length > 0){
      for (i = 1; i <= tr.length - 1; i++){
          if(LitemsCount < LcurPage*LPageSize){
              for (j = filterarr.indexOf(Lstart) + 1; j < filterarr.length; j++){
                  if (i == filterarr[j]){
                      tr[i].style.display = "";
                      Lstart = i;
                      LitemsCount ++;
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
  document.getElementById("LpageNum").innerHTML = LcurPage;
}

function loginReport(){
  areatxt.textContent = "No records found";
}

function salesReport(){
  document.getElementById("spanDisplay").style.display = "none";

  document.getElementById("textReport").style.display = "block";
  let income = 0;
  let output = "";

  for(let i = 0; i < jsondata.Orders.length; i++){
    for(let j = 0; j < jsondata.Orders[i].OrderDetails.length; j++){
      income += jsondata.Orders[i].OrderDetails[j].TotalSpent;
    }
  }
  output += "Orders:\n"

  output += `Number of orders: ${jsondata.Orders.length}\nGeneral income: $${income}\n`

  for(let i = 0; i < jsondata.Orders.length; i++){
    output += `--------------------------------\n•USP: ${jsondata.Orders[i].USP}\n•Customer: ${jsondata.Orders[i].CustName}\n•Made by employee: ${jsondata.Orders[i].EmpName}\n•Total Sale:`;

    for(let a = 0; a < jsondata.Orders[i].OrderDetails.length; a++){
      output += `${jsondata.Orders[i].OrderDetails[a].TotalSpent}\n\n` ;
    }

    output +=    `•Items ordered:\n`;


    for(let j = 0; j < jsondata.Orders[i].OrderDetails.length; j++){
      for(let k = 0; k < jsondata.Orders[i].OrderDetails[j].Items.length; k++){
        output +=                  `•• ${jsondata.Orders[i].OrderDetails[j].Items[k].Quantity}x - ${jsondata.Orders[i].OrderDetails[j].Items[k].Name}\n`
      }
    }

    output += `--------------------------------\n\n`
  }


  areatxt.textContent = output;
}

function getAllReport(){
  document.getElementById("spanDisplay").style.display = "none";

  document.getElementById("textReport").style.display = "block";
  document.getElementById("txtReport2").style.display = "inline-block";
  document.getElementById("txtReport3").style.display = "inline-block";
  document.getElementById("txtReport4").style.display = "inline-block";
  document.getElementById("textReport").style.display = "block";
  document.getElementById("SelectedReport").innerHTML = "All Reports";
  document.getElementById("LOGtablediv").style.display = "none";
  document.getElementById("Print_report").style.display = "block";
  document.getElementById("spanDisplay").style.display = "none";
  document.getElementById('OrderReport_Options').style.display = "none";
  document.getElementById('CustReport_Options').style.display = "none";
  document.getElementById('ORtablediv').style.display = "none";
  document.getElementById('MPIdiv').style.display = "none";
  document.getElementById('COtablediv').style.display = "none";
  document.getElementById("ROlogdiv").style.display = "none";

  let output = "";
  let output2 = "";
  let output3 = "";
  let output4 = "";

  output += "Customers:\n"
  for(let i = 0; i < jsondata.Customers.length; i++){
    output += `--------------------------------\n
    •FullName: ${jsondata.Customers[i].firstName} ${jsondata.Customers[i].lastName}\n
    •Phone: ${jsondata.Customers[i].Phone}\n
    •email: ${jsondata.Customers[i].email}\n
    •Address: ${jsondata.Customers[i].street}, ${jsondata.Customers[i].city}, ${jsondata.Customers[i].province}, (${jsondata.Customers[i].postal})\n
    --------------------------------\n\n`;

  }

  output2 += "Inventory:\n"
  for(let i = 0; i < jsondata.inv.length; i++){
    output2 += `--------------------------------\n
    •Code: ${jsondata.inv[i].Code}\n
    •Item: ${jsondata.inv[i].Item}\n
    •Stock: ${jsondata.inv[i].QuantityInStock}\n
    •Price: $${jsondata.inv[i].Price}\n
--------------------------------\n\n`;

  }


  output3 += "Orders:\n"
  for(let i = 0; i < jsondata.Orders.length; i++){
    output3 += `--------------------------------\n
    •USP: ${jsondata.Orders[i].USP}\n•Customer: ${jsondata.Orders[i].CustName}\n•Made by employee: ${jsondata.Orders[i].EmpName}\n•Total Sale:` ;

    for(let a = 0; a < jsondata.Orders[i].OrderDetails.length; a++){
      output3 += `${jsondata.Orders[i].OrderDetails[a].TotalSpent}\n\n` ;
    }

    output3 += `•Items ordered:\n`;


    for(let j = 0; j < jsondata.Orders[i].OrderDetails.length; j++){
      for(let k = 0; k < jsondata.Orders[i].OrderDetails[j].Items.length; k++){
        output3 +=                 `•• ${jsondata.Orders[i].OrderDetails[j].Items[k].Quantity}x - ${jsondata.Orders[i].OrderDetails[j].Items[k].Name}\n`
      }
    }

    output3 += `--------------------------------\n\n`
  }

  output4 += "Logins:\n";
  
  for (let i = 0; i < jsondata.Employee.length; i++)
  {
    output4 += `•Employye Name: ${jsondata.Employee[i].empName}\n\n`
    for (let j = 0; j < jsondata.Employee[i].logs.length; j++)
    {
      time = Object.values(jsondata.Employee[i].logs[j]);
      output4 += `•Date: ${Object.keys(jsondata.Employee[i].logs[j])}\n
      •LogIn: ${time[0][0]}\n
      •LogOut${time[0][1]}\n\n`
      
      
    }     
    output4 += `--------------------------------\n\n`
  };

  areatxt.textContent = output;
  areatxt2.textContent = output2;
  areatxt3.textContent = output3;
  areatxt4.textContent = output4;
}

//FUNCTION PRINT REPORT WITH CSS APPLIED
  function createPopup( data ) {
      var mywindow = window.open( "", "newdiv", "height=4000,width=3000" );
      mywindow.document.write( "<html><head><h1><title>PRINT REPORT FORM</title></h1>" );
      mywindow.document.write( "<link rel=\"stylesheet\" href=\"styles.css\" type=\"text/css\"/><link rel=\"stylesheet\" href=\"Report.css\" type=\"text/css\"/>" );
      mywindow.document.write( "</head><body ></br>" );
      mywindow.document.write( data );
      mywindow.document.write( "</body></html>" );

      setTimeout(function () {
        mywindow.document.close();
        mywindow.focus();
        mywindow.print();
        mywindow.close(); 
    }, 1000);
      return true;
  
  }
  document.addEventListener( "DOMContentLoaded", function() {
      document.getElementById( "Print_report" ).addEventListener( "click", function() {
        document.getElementById('pagingLOG').style.display = "none";
        document.getElementById("pagingCO").style.display="none";
        document.getElementById("pagingMI").style.display="none";
        document.getElementById("pagingRO").style.display="none";
          createPopup( document.getElementById( "printForm" ).innerHTML );
          let selectedR =  document.getElementById("SelectedReport").innerHTML
          if(selectedR == "Customer Report")
          {
            document.getElementById("pagingCO").style.display="block";
            document.getElementById("pagingMI").style.display="block";
          }
          else if(selectedR == "Login History"){
            document.getElementById('pagingLOG').style.display = "block";
          }
          else if(selectedR == "Order Report"){
            document.getElementById("pagingRO").style.display = "block";
          }
      }, false );
  
  });

  
