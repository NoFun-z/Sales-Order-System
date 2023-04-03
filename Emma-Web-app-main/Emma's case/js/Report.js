function ShowHideCustomerHelp(){
    let customerhelp = document.getElementById("customer_help")
    if(customerhelp.checked == true){
        document.getElementById("lblcustomer").style.display="inline";
    }
    else{
        document.getElementById("lblcustomer").style.display="none";
    }
}

function ShowHideInventoryHelp(){
    let inventoryhelp = document.getElementById("inventory_help")
    if(inventoryhelp.checked == true){
        document.getElementById("lblinventory").style.display="inline";
    }
    else{
        document.getElementById("lblinventory").style.display="none";
    }
}

function ShowHideOrderHelp(){
    let orderhelp = document.getElementById("order_help")
    if(orderhelp.checked == true){
        document.getElementById("lblorder").style.display="inline";
    }
    else{
        document.getElementById("lblorder").style.display="none";
    }
}

function ShowHideAllHelp(){
    let allhelp = document.getElementById("all_help")
    if(allhelp.checked == true){
        document.getElementById("lblall").style.display="inline";
    }
    else{
        document.getElementById("lblall").style.display="none";
    }
}

function ShowHideLoginHelp(){
    let loginhelp = document.getElementById("Login_help")
    if(loginhelp.checked == true){
        document.getElementById("lblLogin").style.display="inline";
    }
    else{
        document.getElementById("lblLogin").style.display="none";
    }
}