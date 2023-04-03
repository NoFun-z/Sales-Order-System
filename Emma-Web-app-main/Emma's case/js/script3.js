//------------------------Supp Modify Page-----------------------------//

//SuppModify Page

let JsonDataP;

let data = localStorage.getItem('GetJson')
JsonDataP = JSON.parse(data);

var currentdate = new Date(); 
var datetime =    currentdate.getFullYear() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getDate() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

//Error Validation, grabbing the suppModify fields
const supplierName = document.getElementById("supplierName");
const product = document.getElementById("product");
const perPrice = document.getElementById("perPrice");

//JsonDataP.Provider[2].PartsAndPrices.splice(3, 1);

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

document.getElementById("suppForm").addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputsS();
    
    if(supplierName.value != "" && product.value != "" && perPrice.value != ""){
        AddNewSup();
        ShowSupplierForm();
        ClearSupOrder();
    }
});

function AddNewSup(){
    if(supplierName.value != "" && product.value != "" && perPrice.value != ""){
       for (var i = 0; i < JsonDataP.Provider.length; i++){
        if (String(JsonDataP.Provider[i].Name).toUpperCase() == supplierName.value.toUpperCase()){
            for (var j = 0; j < JsonDataP.Provider[i].PartsAndPrices.length; j++){
                if(String(JsonDataP.Provider[i].PartsAndPrices[j].Part).toUpperCase() == product.value.toUpperCase()){
                    alert(`${JsonDataP.Provider[i].Name} already had this item`)
                    break;
                }
                else{
                    JsonDataP.Provider[i].PartsAndPrices.push(
                        {
                            "Part": product.value,
                            "Price": perPrice.value
                        }
                    )
                    sendJsonData2();
                    break;
                }
            }
        }
        else{
            if (i == JsonDataP.Provider.length){
                JsonDataP.Provider.push(
                    {
                        "Name": supplierName.value,
                        "PartsAndPrices": [
                          {
                            "Part": product.value,
                            "Price": perPrice.value
                          }
                        ]
                    }
                )
                sendJsonData2();
                break;
            }
        }
       }
    }
}

function checkInputsS(){
    const supplierNameValue = supplierName.value.trim();
    const productValue = product.value.trim();
    const perPriceValue = perPrice.value.trim();

    if(supplierNameValue === ""){
        //It will show the error
        //Add the error to the class
        setErrorFor(supplierName, "Supplier name cannot be blank");
    } else {
        setSuccessFor(supplierName);
    }
    if(productValue === ""){
        //It will show the error
        //Add the error to the class
        setErrorFor(product, "product name cannot be blank");
    } else {
        setSuccessFor(product);
    }
    if(perPriceValue === "" || perPriceValue === 0){
        //It will show the error
        //Add the error to the class
        setErrorFor(perPrice, "Price cannot be blank or 0");
    } else {
        setSuccessFor(perPrice);
    }
}


//Reset the data
function resetForm() {
    document.getElementById("supplierName").value = '';
    document.getElementById("product").value = '';
    document.getElementById("perPrice").value = '';
    selectedRow = null;
    ShowSupplierForm();
}

var AddSupbtn = 1;

function ChangeSupBtn(){
    if(AddSupbtn == 1){
        document.getElementById("Add_Supplier").value="Enter Valid Supplier";
        document.getElementById("Add_Supplier").disabled= true;
        AddSupbtn = 0;
    }
    else{
        document.getElementById("Add_Supplier").value="Add New Supplier";
        document.getElementById("Add_Supplier").disabled= false;
        AddSupbtn = 1
    }
}

function HideSalebtn(){
    let name2 = localStorage.getItem("Charge");
    if (name2 == "Sam"){
        document.getElementById("Salebtn").style.display = "none";
    }
    else{
        document.getElementById("Salebtn").style.display = "inline-block";
    }
}


document.getElementById("suppForm").style.display="none";

var suppForm = 1;

function ShowSupplierForm(){
    ChangeSupBtn()
    if(suppForm == 1){
        document.getElementById("suppForm").style.display="inline";
        suppForm = 0;
    }
    else{
        document.getElementById("suppForm").style.display="none";
        suppForm = 1
    }
}

function ShowHideSpPriceHelp(){
    let pricehelp = document.getElementById("Spprice_help")
    if(pricehelp.checked == true){
        document.getElementById("LblSpPrice").style.display="inline";
    }
    else{
        document.getElementById("LblSpPrice").style.display="none";
    }
}
//-----------------------------------------------------------------------