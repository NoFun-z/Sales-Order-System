let mode = 2;

let dark = document.getElementById('Dark');
let light = document.getElementById('light');
let sat = document.getElementById('satu');
let sls = document.getElementById('saleImg');
let cs = document.getElementById('custImg');
//let inb = document.getElementById('folderImg');
//let sp = document.getElementById('supImg');
let od = document.getElementById('orderImg');
let logo = document.getElementById('logoImg');
let nB = document.getElementById('navBar');
//let rp = document.getElementById('reportImg');

function ChangeMode(){
    var path = window. location. pathname;
    var page = path. split("/"). pop();

    if(page == "WendyHome.html"){
        if(mode == 1){
            light.media = "none";
            sat.media = "none";
            dark.media = "";
            sls.src = "images/Sales/big-price-tag-white.png";
            cs.src = "images/Customer/white-customer.png";
            //inb.src = "images/Inventory/white-folderBig.png";
            //sp.src = "images/Supplier/white-delivery-box-big.png";
            od.src = "images/Orders/white-tracking.png";
            //rp.src = "images/reports/white-sales.png";
            logo.src = "images/logo2.png";
            nB.style.backgroundColor = "#494172";
            mode = 2;
        }
        else if(mode == 2){
            light.media = "";
            sls.src = "images/Sales/price-tag-black.png";
            cs.src = "images/Customer/customer.png";
            //inb.src = "images/Inventory/folderBig.png";
            //sp.src = "images/Supplier/delivery-box-big.png";
            //rp.src = "images/reports/sales.png";
            od.src = "images/Orders/tracking.png";
            logo.src = "images/logo.png"
            nB.style.backgroundColor = "#494172";
            sat.media = "none";
            dark.media = "none";
            mode = 3;
        }
        else if(mode == 3){
            sat.media = "";
            sls.src = "images/Sales/price-tag-black.png";
            cs.src = "images/Customer/customer.png";
            //inb.src = "images/Inventory/folderBig.png";
            //sp.src = "images/Supplier/delivery-box-big.png";
            //rp.src = "images/reports/sales.png";
            od.src = "images/Orders/tracking.png";
            logo.src = "images/logo.png"
            nB.style.backgroundColor = "#8800f7";
            light.media = "none";
            dark.media = "none";
            mode = 1;
        }
    }
    else if(page == "sales.html"){
        if(mode == 1){
            light.media = "none";
            sat.media = "none";
            dark.media = "";
            logo.src = "images/logo2.png";
            nB.style.backgroundColor = "#494172";
            mode = 2;
        }
        else if(mode == 2){
            light.media = "";
            nB.style.backgroundColor = "#494172";
            logo.src = "images/logo.png"
            sat.media = "none";
            dark.media = "none";
            mode = 3;
        }
        else if(mode == 3){
            light.media = "none";
            logo.src = "images/logo.png"
            nB.style.backgroundColor = "#8800f7";
            sat.media = "";
            dark.media = "none";
            mode = 1;
        }
    }
    else if(page == "Customer.html"){
        if(mode == 1){
            light.media = "none";
            sat.media = "none";
            dark.media = "";
            logo.src = "images/logo2.png";
            nB.style.backgroundColor = "#494172";
            mode = 2;
        }
        else if(mode == 2){
            light.media = "";
            nB.style.backgroundColor = "#494172";
            logo.src = "images/logo.png"
            sat.media = "none";
            dark.media = "none";
            mode = 3;
        }
        else if(mode == 3){
            light.media = "none";
            logo.src = "images/logo.png"
            nB.style.backgroundColor = "#8800f7";
            sat.media = "";
            dark.media = "none";
            mode = 1;
        }
    }
    else if(page == "inv.html"){
        if(mode == 1){
            light.media = "none";
            sat.media = "none";
            dark.media = "";
            logo.src = "images/logo2.png";
            nB.style.backgroundColor = "#494172";
            mode = 2;
        }
        else if(mode == 2){
            light.media = "";
            nB.style.backgroundColor = "#494172";
            logo.src = "images/logo.png"
            sat.media = "none";
            dark.media = "none";
            mode = 3;
        }
        else if(mode == 3){
            light.media = "none";
            logo.src = "images/logo.png"
            nB.style.backgroundColor = "#8800f7";
            sat.media = "";
            dark.media = "none";
            mode = 1;
        }
    }
    else if(page == "supModify.html"){
        if(mode == 1){
            light.media = "none";
            sat.media = "none";
            dark.media = "";
            logo.src = "images/logo2.png";
            nB.style.backgroundColor = "#494172";
            mode = 2;
        }
        else if(mode == 2){
            light.media = "";
            nB.style.backgroundColor = "#494172";
            logo.src = "images/logo.png"
            sat.media = "none";
            dark.media = "none";
            mode = 3;
        }
        else if(mode == 3){
            light.media = "none";
            logo.src = "images/logo.png"
            nB.style.backgroundColor = "#8800f7";
            sat.media = "";
            dark.media = "none";
            mode = 1;
        }
    }
    else if(page == "orders.html"){
        if(mode == 1){
            light.media = "none";
            sat.media = "none";
            dark.media = "";
            logo.src = "images/logo2.png";
            nB.style.backgroundColor = "#494172";
            mode = 2;
        }
        else if(mode == 2){
            light.media = "";
            nB.style.backgroundColor = "#494172";
            logo.src = "images/logo.png"
            sat.media = "none";
            dark.media = "none";
            mode = 3;
        }
        else if(mode == 3){
            light.media = "none";
            logo.src = "images/logo.png"
            nB.style.backgroundColor = "#8800f7";
            sat.media = "";
            dark.media = "none";
            mode = 1;
        }
    }
    else if(page == "Report.html"){
        if(mode == 1){
            light.media = "none";
            sat.media = "none";
            dark.media = "";
            logo.src = "images/logo2.png";
            nB.style.backgroundColor = "#494172";
            mode = 2;
        }
        else if(mode == 2){
            light.media = "";
            nB.style.backgroundColor = "#494172";
            logo.src = "images/logo.png"
            sat.media = "none";
            dark.media = "none";
            mode = 3;
        }
        else if(mode == 3){
            light.media = "none";
            logo.src = "images/logo.png"
            nB.style.backgroundColor = "#8800f7";
            sat.media = "";
            dark.media = "none";
            mode = 1;
        }
    }
}