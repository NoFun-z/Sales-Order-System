let user = document.getElementById('User');
let name = localStorage.getItem("Charge");

user.innerHTML = name;
///////////////////
let invSideLink = document.getElementById('invSide');
let reportSideLink = document.getElementById('repSide');
let supSideLink = document.getElementById('supSide');
let custSideLink = document.getElementById('custSide');
let saleSideLink = document.getElementById('saleSide');
let invDiv = document.getElementById('invdiv');
let repDiv = document.getElementById('repDiv');
let supDiv = document.getElementById('supDiv');
let custDiv = document.getElementById('custDiv');
let salesDiv = document.getElementById('saleDiv');

if(name == "Wendy"){
    invSideLink.style.display = "none";
    reportSideLink.style.display = "none";
    supSideLink.style.display = "none";
    invDiv.style.display = "none";
    repDiv.style.display = "none";
    supDiv.style.display = "none";
}
else if(name == "Sam"){
    custSideLink.style.display = "none";
    reportSideLink.style.display = "none";
    saleSideLink.style.display = "none";
    salesDiv.style.display = "none";
    custDiv.style.display = "none";
    repDiv.style.display = "none";
}
/////////////////////////////////
//let orderLink = document.getElementById('ordLink');
//let customerLink = document.getElementById('customerLink');
let invLink = document.getElementById('invLink');
let reportLink = document.getElementById('repLink');
let supLink = document.getElementById('supLink');
let customerLink = document.getElementById('customerLink');
let saleLink = document.getElementById('salesLink');
//let salesLink = document.getElementById('salesLink');

if(name == "Wendy"){
    invLink.style.display = "none";
    reportLink.style.display = "none";
    supLink.style.display = "none";
}
else if(name == "Sam"){
    reportLink.style.display = "none";
    customerLink.style.display = "none";
    saleLink.style.display = "none";
}