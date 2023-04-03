//Create inventory and sale table
//---------------------------SALE------------------------//
var MyOrderSum = [];
const PageSize = 6;
let curPage = 1;
let start = 0;
let itemsCount = 0;
let jsondata = [];
let parsedData = [];

let jsondataI = {
    "inv": [
      {
        "Code": "A4SW6645",
        "Item": "Nut",
        "QuantityInStock": 20,
        "Price": 0.5
      },
      {
        "Code": "POI7896AS",
        "Item": "Oil",
        "QuantityInStock": 12,
        "Price": 13.5
      },
      {
        "Code": "PA5485APE",
        "Item": "Blade",
        "QuantityInStock": 7,
        "Price": 30
      },
      {
        "Code": "LLAI78AWJIOIA",
        "Item": "Wheel",
        "QuantityInStock": 50,
        "Price": 10
      },
      {
        "Code": "QQISOW78975",
        "Item": "Recoil Starter",
        "QuantityInStock": 3,
        "Price": 80
      },
      {
        "Code": "WQEIJ4542",
        "Item": "Bolt",
        "QuantityInStock": 150,
        "Price": 0.02
      },
      {
        "Code": "TTPOASD78555",
        "Item": "Belt",
        "QuantityInStock": 40,
        "Price": 15
      },
      {
        "Code": "QWEASCSCQWE123",
        "Item": "Motor",
        "QuantityInStock": 10,
        "Price": 100
      },
      {
        "Code": "PQEWSDNOWQ45648",
        "Item": "Gas canister",
        "QuantityInStock": 65,
        "Price": 10
      },
      {
        "Code": "MONASDBIWI45628",
        "Item": "Spark plug",
        "QuantityInStock": 43,
        "Price": 5
      },
      {
        "Code": "CNSAIDWB1238",
        "Item": "Fan",
        "QuantityInStock": 78,
        "Price": 7.25
      },
      {
        "Code": "VBNIKPQ1232",
        "Item": "Gas valve",
        "QuantityInStock": 12,
        "Price": 30
      },
      {
        "Code": "CNSAhwu38238",
        "Item": "Extension Cords",
        "QuantityInStock": 128,
        "Price": 3.25
      },
      {
        "Code": "CNSAmfie4329",
        "Item": "Ladders",
        "QuantityInStock": 18,
        "Price": 50.25
      },
      {
        "Code": "WKFIIDWB4329",
        "Item": "Measuring Tape",
        "QuantityInStock": 103,
        "Price": 4.5
      },
      {
        "Code": "LFPEIDWB4723",
        "Item": "Power Drill",
        "QuantityInStock": 37,
        "Price": 23.75
      },
      {
        "Code": "SMERADWB1238",
        "Item": "Basic Toolkit",
        "QuantityInStock": 38,
        "Price": 10.35
      },
      {
        "Code": "CHSMEDWB4868",
        "Item": "Hand Saw",
        "QuantityInStock": 19,
        "Price": 27.8
      },
      {
        "Code": "LQOIWDWB1578",
        "Item": "Wheelbarrow",
        "QuantityInStock": 34,
        "Price": 37.25
      },
      {
        "Code": "SHOVILEB6434",
        "Item": "Shovel",
        "QuantityInStock": 53,
        "Price": 17
      },
      {
        "Code": "ACPRSOWB4632",
        "Item": "Air Compressor",
        "QuantityInStock": 21,
        "Price": 237.45
      },
      {
        "Code": "BSAAIDWB1238",
        "Item": "Belt Sander",
        "QuantityInStock": 13,
        "Price": 95.99
      },
      {
        "Code": "CNSFGODA4538",
        "Item": "Work Bench",
        "QuantityInStock": 9,
        "Price": 368.85
      },
      {
        "Code": "CNAFWDW21238",
        "Item": "Bench Vise",
        "QuantityInStock": 24,
        "Price": 46
      },
      {
        "Code": "CARJIDCA1518",
        "Item": "Car Jack",
        "QuantityInStock": 16,
        "Price": 416.55
      },
      {
        "Code": "RACAIDHE1246",
        "Item": "Ratchets",
        "QuantityInStock": 42,
        "Price": 41.25
      },
      {
        "Code": "FUNLIDWB9541",
        "Item": "Funnel",
        "QuantityInStock": 69,
        "Price": 13.45
      }
    ],
    "Provider": [
      {
        "Name": "Canadian Tire",
        "OrderDetails": [
          {
            "OrderDate": "2022/12/11 1:24:58",
            "Total": 0.07,
            "Parts": [
              {
                "Quantity": 7,
                "Name": "Nut"
              }
            ]
          }
        ],
        "PartsAndPrices": [
          {
            "Part": "Nut",
            "Price": 0.01
          },
          {
            "Part": "Blade",
            "Price": 20
          }
        ]
      },
      {
        "Name": "HomeHardware",
        "OrderDetails": [
          {
            "OrderDate": "2022/12/14 3:47:48",
            "Total": 50,
            "Parts": [
              {
                "Quantity": 1,
                "Name": "Recoil Starter"
              }
            ]
          }
        ],
        "PartsAndPrices": [
          {
            "Part": "Bolt",
            "Price": 0.1
          },
          {
            "Part": "Belt",
            "Price": 10
          },
          {
            "Part": "Recoil Starter",
            "Price": 50
          },
          {
            "Part": "Oil",
            "Price": 5
          }
        ]
      },
      {
        "Name": "Home Depot",
        "OrderDetails": [
          {
            "OrderDate": "2022/11/15 12:03:48",
            "Total": 18,
            "Parts": [
              {
                "Quantity": 3,
                "Name": "Wheel"
              }
            ]
          }
        ],
        "PartsAndPrices": [
          {
            "Part": "Nut",
            "Price": 0.2
          },
          {
            "Part": "Wheel",
            "Price": 6
          },
          {
            "Part": "Blade",
            "Price": 30
          }
        ]
      },
      {
        "Name": "Lowes",
        "OrderDetails": [
        ],
        "PartsAndPrices": [
          {
            "Part": "Motor",
            "Price": 80
          },
          {
            "Part": "Gas canister",
            "Price": 7.4
          },
          {
            "Part": "Spark plug",
            "Price": 2.8
          },
          {
            "Part": "Fan",
            "Price": 4.75
          },
          {
            "Part": "Recoil Starter",
            "Price": 68.5
          },
          {
            "Part": "Power Drill",
            "Price": 19.5
          }
        ]
      },
      {
        "Name": "Menards",
        "OrderDetails": [
        ],
        "PartsAndPrices": [
          {
            "Part": "Spark plug",
            "Price": 4.2
          },
          {
            "Part": "Fan",
            "Price": 5.3
          },
          {
            "Part": "Extension Cords",
            "Price": 2.75
          },
          {
            "Part": "Ladders",
            "Price": 42.75
          },
          {
            "Part": "Measuring Tape",
            "Price": 3.6
          },
          {
            "Part": "Power Drill",
            "Price": 19.65
          },
          {
            "Part": "Basic Toolkit",
            "Price": 10
          },
          {
            "Part": "Shovel",
            "Price": 12.45
          },
          {
            "Part": "Gas valve",
            "Price": 24
          },
          {
            "Part": "Oil",
            "Price": 4
          },
          {
            "Part": "Wheel",
            "Price": 7
          }
        ]
      },
      {
        "Name": "True Value",
        "OrderDetails": [
        ],
        "PartsAndPrices": [
          {
            "Part": "Ratchets",
            "Price": 34.8
          },
          {
            "Part": "Funnel",
            "Price": 8.75
          },
          {
            "Part": "Car Jack",
            "Price": 350
          },
          {
            "Part": "Work Bench",
            "Price": 315
          },
          {
            "Part": "Air Compressor",
            "Price": 200
          },
          {
            "Part": "Belt Sander",
            "Price": 75
          }
        ]
      },
      {
        "Name": "ILDC",
        "OrderDetails": [
          {
            "OrderDate": "2019/9/16 16:21:08",
            "Total": 100,
            "Parts": [
              {
                "Quantity": 2,
                "Name": "Shovel"
              }
            ]
          }
        ],
        "PartsAndPrices": [
          {
            "Part": "Bench Vise",
            "Price": 39
          },
          {
            "Part": "Funnel",
            "Price": 10
          },
          {
            "Part": "Car Jack",
            "Price": 380
          },
          {
            "Part": "Work Bench",
            "Price": 340
          },
          {
            "Part": "Shovel",
            "Price": 50
          },
          {
            "Part": "Wheelbarrow",
            "Price": 28
          },
          {
            "Part": "Hand Saw",
            "Price": 21.5
          }
        ]
      },
      {
        "Name": "Ace Hardware",
        "OrderDetails": [
          {
            "OrderDate": "2021/5/24 11:37:10",
            "Total": 15,
            "Parts": [
              {
                "Quantity": 2,
                "Name": "Gas canister"
              }
            ]
          }
        ],
        "PartsAndPrices": [
          {
            "Part": "Gas valve",
            "Price": 25
          },
          {
            "Part": "Gas canister",
            "Price": 7.5
          },
          {
            "Part": "Blade",
            "Price": 21
          },
          {
            "Part": "Bolt",
            "Price": 0.01
          },
          {
            "Part": "Ladders",
            "Price": 41
          },
          {
            "Part": "Basic Toolkit",
            "Price": 8.25
          },
          {
            "Part": "Air Compressor",
            "Price": 199
          }
        ]
      }
    ],
    "Orders": [
      {
        "USP": 1,
        "CustName": "John White",
        "EmpName": "Wendy",
        "OrderDetails": [
          {
            "DateOrdered": "2020/2/14 15:47:10",
            "TotalSpent": 42.94,
            "Items": [
              {
                "Quantity": 2,
                "Name": "Wheel"
              },
              {
                "Quantity": 4,
                "Name": "Measuring Tape"
              }
            ]
          }
        ]
      },
      {
        "USP": 2,
        "CustName": "Walter Graaff",
        "EmpName": "Dave Kendell",
        "OrderDetails": [
          {
            "DateOrdered": "2020/2/14 15:47:10",
            "TotalSpent": 125.43,
            "Items": [
              {
                "Quantity": 1,
                "Name": "Blade"
              },
              {
                "Quantity": 6,
                "Name": "Oil"
              }
            ]
          }
        ]
      }
    ],
    "Customers":[
      {
        "ID":1,
        "firstName":"John",
        "lastName":"White",
        "Phone":"(365)-789-1234",
        "email":"jWhite@gmail.com",
        "province":"Ontario",
        "city":"Tillsonburg",
        "street":"3364 9th Avenue",
        "postal":"N4G 4H2"
      },
      {
        "ID":2,
        "firstName":"Walter",
        "lastName":"Graaff",
        "Phone":"(289)-654-7894",
        "email":"wGraff@gmail.com",
        "province":"British Columbia",
        "city":"Vernon",
        "street":"173 Coldstream Avenue",
        "postal":"V1T 6N1"
      },
      {
        "ID":3,
        "firstName":"Kris",
        "lastName":"Barker",
        "Phone":"(250)-262-1770",
        "email":"KrisBa@gmail.com",
        "province":" Ontario",
        "city":"Toronto",
        "street":"1397 Glen Long Avenue",
        "postal":"M6B 1J8"
      },
      {
        "ID":4,
        "firstName":"Loc",
        "lastName":"Pham",
        "Phone":"(289)-969-1827",
        "email":"okayimfine@gmail.com",
        "province":"Alberta",
        "city":"Edmonton",
        "street":"4267 184th Street",
        "postal":"T5J 2R4"
      },
      {
        "ID":5,
        "firstName":"Haroon",
        "lastName":"Decker",
        "Phone":"(905)-548-5435",
        "email":"HarDeck@gmail.com",
        "province":"Alberta",
        "city":"Edmonton",
        "street":"368 184th Street",
        "postal":"T5J 2R4"
      },
      {
        "ID":6,
        "firstName":"Carlos",
        "lastName":"Gilbert",
        "Phone":"(403)-297-7537",
        "email":"Carlos40@gmail.com",
        "province":"Alberta",
        "city":"Granum",
        "street":"1169 Port Washington Road",
        "postal":"T0L 1A0"
      },
      {
        "ID":7,
        "firstName":"Rikki",
        "lastName":"Ward",
        "Phone":"(905)-906-9580",
        "email":"RikkiWa@gmail.com",
        "province":"Ontario",
        "city":"Newmarket",
        "street":"2360 Leslie Street",
        "postal":"L3Y 2A3"
      },
      {
        "ID":8,
        "firstName":"Sanjeev",
        "lastName":"Camacho",
        "Phone":"(613)-565-4183",
        "email":"SanJeeCama@gmail.com",
        "province":"Quebec",
        "city":"Montreal",
        "street":"2784 rue de la Gauchetière",
        "postal":"H3B 2M3"
      },
      {
        "ID":9,
        "firstName":"Yosef",
        "lastName":"Mcmillan",
        "Phone":"(604)-374-2810",
        "email":"YoseMcMil@gmail.com",
        "province":"Prince Edward Island",
        "city":"Tignish",
        "street":"721 Church Street",
        "postal":"C0B 2B0"
      },
      {
        "ID":10,
        "firstName":"Korban",
        "lastName":"Ellis",
        "Phone":"(604)-649-2213",
        "email":"KorbanElli@gmail.com",
        "province":"Saskatchewan",
        "city":"Lake Alma",
        "street":"4646 St. John Street",
        "postal":"S4P 3Y2"
      },
      {
        "ID":11,
        "firstName":"Reegan",
        "lastName":"Morley",
        "Phone":"(416)-824-1839",
        "email":"ReeMorley@gmail.com",
        "province":"Prince Edward Island",
        "city":"Freetown",
        "street":"3263 Kelvin Road",
        "postal":"C0B 1L0"
      },
      {
        "ID":12,
        "firstName":"Zeynep",
        "lastName":"Oconnell",
        "Phone":"(418)-210-8735",
        "email":"ZeZakConell@gmail.com",
        "province":"British Columbia",
        "city":"Freetown",
        "street":"4904 Carlson Road",
        "postal":"V2L 5E5"
      }
    ],
    "Employee":[
      {
        "empName":"Dave Kendell",
        "role":"Admin",
        "username":"Dave Kendell",
        "password":"Prog1180",
        "logs":[
          {"01/12/2022":["07:45:01", "16:01:14"]}, {"01/04/2022":["10:20:00","11:20:55"]}, {"04/04/2022":["12:30:00","16:10:55"]}, {"06/04/2022":["9:26:00","10:25:56"]}
        ]
      },
      {
        "empName":"Wendy",
        "role":"Sales",
        "username":"Wendy",
        "password":"Prog1180",
        "logs":[
          {"01/12/2022":["07:40:50", "16:01:00"]}, {"13/04/2022":["9:30:14","10:20:55"]}, {"06/04/2022":["9:30:14","10:22:55"]}, {"14/04/2022":["9:30:14","10:22:55"]}
        ] 
      },
      {
        "empName":"Sam",
        "role":"Orders",
        "username":"Sam",
        "password":"Prog1180",
        "logs":[
          {"01/12/2022":["07:30:01", "16:00:40"]}, {"19/04/2022":["9:35:14","10:25:54"]}, {"23/05/2022":["9:35:14","10:25:54"]}, {"06/06/2022":["9:35:14","10:25:54"]}
        ]
      },
      {
         "empName":"Cristhian Copete",
          "role":"Admin",
          "username":"Siko",
          "password":"Prog1180",
          "logs":[
            {"11/12/2022":["07:27:45", "16:00:15"]}, {"21/06/2022":["9:10:14","10:25:10"]}, {"18/08/2022":["9:10:14","10:25:10"]}
          ]
        },
        {
          "empName":"Loc Pham",
          "role":"Admin",
          "username":"Loc Pham",
          "password":"Prog1180",
          "logs":[
            {"12/12/2022":["07:34:10", "16:00:14"]}, {"14/10/2022":["9:04:14","10:26:15"]}, {"09/11/2022":["9:04:14","10:26:15"]}
          ]
        },
        {
          "empName":"Carlos Santana",
          "role":"Orders",
          "username":"Cartan",
          "password":"Prog1180",
          "logs":[
            {"02/12/2022":["07:45:10", "16:00:24"]}, {"03/01/2022":["9:30:14","10:29:30"]}, {"17/11/2022":["9:30:14","10:29:30"]}
          ]
        },
        {
          "empName":"John Smith",
          "role":"Sales",
          "username":"JohSth",
          "password":"Prog1180",
          "logs":[
            {"03/12/2022":["07:35:01", "16:00:54"]}, {"14/11/2022":["9:25:59","10:30:45"]}, {"10/01/2022":["9:25:59","10:30:45"]}, {"13/01/2022":["9:25:59","10:30:45"]}
          ]
        },
        {
          "empName":"Morgan Livingston",
          "role":"Orders",
          "username":"MrLiving",
          "password":"Prog1180",
          "logs":[
            {"03/12/2022":["07:49:01", "16:00:57"]}, {"09/11/2022":["9:20:59","10:27:14"]}, {"17/11/2022":["9:20:59","10:27:14"]}
          ]
        },
        {
          "empName":"Tabitha Boyle",
          "role":"Sales",
          "username":"TabBoyle",
          "password":"Prog1180",
          "logs":[
            {"03/12/2022":["10:01:05", "14:03:14"]}, {"10/01/2022":["9:19:59","10:21:14"]}, {"14/11/2022":["9:19:59","10:21:14"]}
          ]
        },
        {
          "empName":"Mohammad Marquez",
          "role":"Orders",
          "username":"MarqueMohha",
          "password":"Prog1180",
          "logs":[
            {"03/12/2022":["10:02:44", "14:24:54"]}, {"31/01/2022":["9:15:40","10:16:14"]}, {"17/11/2022":["9:15:40","10:16:14"]}
          ]
        },
        {
          "empName":"Lexie Palmer",
          "role":"Orders",
          "username":"Lexie Palmer",
          "password":"Prog1180",
          "logs":[
            {"04/12/2022":["10:05:01", "14:01:21"]}, {"31/01/2022":["9:14:40","10:16:56"]}, {"05/05/2022":["9:14:40","10:16:56"]}
          ]
        },
        {
          "empName":"Ada Montoya",
          "role":"Orders",
          "username":"Ada Montoya",
          "password":"Prog1180",
          "logs":[
            {"05/12/2022":["10:01:34", "14:05:40"]}, {"09/12/2022":["9:12:40","10:14:56"]}, {"05/05/2022":["9:12:40","10:14:56"]}
          ]
        },
        {
          "empName":"Gideon Cross",
          "role":"Orders",
          "username":"Gideon Cross",
          "password":"Prog1180",
          "logs":[
            {"06/12/2022":["07:50:01", "16:04:00"]}, {"07/01/2022":["9:12:44","10:26:56"]}, {"26/05/2022":["9:12:44","10:26:56"]}
          ]
        },
        {
          "empName":"Idris Hampton",
          "role":"Orders",
          "username":"IdHpt",
          "password":"Prog1180",
          "logs":[
            {"06/12/2022":["07:27:15", "16:04:01"]}, {"09/12/2022":["9:10:44","10:36:56"]}, {"26/05/2022":["9:10:44","10:36:56"]}
          ]
        },
        {
          "empName":"Demi Moreno",
          "role":"Orders",
          "username":"Dmno",
          "password":"Prog1180",
          "logs":[
            {"06/12/2022":["07:45:01", "16:00:00"]}, {"10/06/2022":["9:20:44","10:10:56"]}, {"30/06/2022":["9:20:44","10:10:56"]}
          ]
        },
        {
          "empName":"Milton Christian",
          "role":"Orders",
          "username":"Milton Christian",
          "password":"Prog1180",
          "logs":[
            {"08/12/2022":["07:14:10", "16:01:14"]}, {"09/12/2022":["9:22:44","10:25:56"]}
          ]
        }
    ]
  };    

  var currentdate = new Date(); 
  var datetime =    currentdate.getFullYear() + "/"
                  + (currentdate.getMonth()+1)  + "/" 
                  + currentdate.getDate() + " "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":" 
                  + currentdate.getSeconds();

let dataS = localStorage.getItem('GetJson')
parsedData = JSON.parse(dataS);

if(parsedData.length < 1){
    jsondata = jsondataI;
}
else{
    jsondata = parsedData;
}

//Without any interaction, after 0.15s, function will be called.
setTimeout(renderTable, 150);
        
function sendJson(){
    localStorage.setItem("GetJson", JSON.stringify(jsondata));
}

//Create table on page load
async function GenerateTable(){
    //Select table body
    let table = document.querySelector('#myTable tbody');
    document.getElementById("allChecked").disabled = false;
    document.getElementById("pageNum").disabled = false;
    document.getElementById("btnPrevPage").disabled = false;
    document.getElementById("btnNextPage").disabled = false;
    document.getElementById("allChecked").disabled = false;
    document.getElementById('searchbarInventory').disabled = false;
    document.getElementById('search_price').disabled = false;
    document.getElementById('price_help').disabled = false;
    document.getElementById('invClear').disabled = false;

    let result = '';
    for (let i = 0; i < jsondata.inv.length; i++)
    {
            result += `<tr>
            <td><input value="${jsondata.inv[i].Price}" id="checkedItem${i}" class="checkedItem${i}" name="checkedItem" type="checkbox"></td>
            <td id="Code_Row${i}">${jsondata.inv[i].Code}</td>
            <td id="Item_Row${i}">${jsondata.inv[i].Item}</td>
            <td id="Quantity_Row${i}">${jsondata.inv[i].QuantityInStock}</td>
            <td id="Price_Row${i}">${jsondata.inv[i].Price}</td>
            <td><input value="0" id="orderQuantity${i}" name="ItemQuantity" type="number" min="0"></td>
            <td>
            <input id="inven_edit${i}" type="button" class="InvenEdit" value="Edit" onclick="EditInventory('${i}')">
            <input type="button" id="save_Inven${i}" value="Save" class="InvenSave" style="display: none" onclick="SaveInventory('${i}')">
            <input type="button" id="Cancel_InvenUpdate${i}" value="Cancel" class="InvenCancel" style="display: none" onclick="CancelInvenUpdate('${i}')">
            </td>
            </tr>`     
    };
    document.getElementById("pageNum").innerHTML = curPage;
    table.innerHTML = result;

    let str = "";
    for (let i = 0; i < jsondata.Customers.length; i++){
      str += '<option value="'+ jsondata.Customers[i].firstName + ' ' + jsondata.Customers[i].lastName +'" />'
    }
    document.getElementById("custList").innerHTML = str;
}

//Show table data
async function renderTable(){
    //Select table body
    let table = document.querySelector('#myTable tbody');
    let tr = table.getElementsByTagName('tr');

    let start = (curPage-1)*PageSize;
    let end = curPage*PageSize;
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
    document.getElementById("pageNum").innerHTML = curPage;
    sendJson();
}


function UpdateCustomerOrder(){
  let customName = document.getElementById("custNameSelected").value;
  let TotalSpent = 0

  for (let i = 0; i < jsondata.Orders.length; i++){
    if (jsondata.Orders[i].CustName.toUpperCase().indexOf(customName.toUpperCase()) > -1){
      TotalSpent = 0
      for (var t = 0; t < jsondata.inv.length; t++){
        if (document.getElementById("checkedItem"+t).checked){
          TotalSpent += parseFloat(document.getElementById("Price_Row"+t).innerHTML) * parseFloat(document.getElementById("orderQuantity"+t).value)
        }
      }
      jsondata.Orders[i].OrderDetails.push(
        {
          "DateOrdered": datetime,
          "TotalSpent": TotalSpent,
          "Items": [
          ]
        }
      )
        for ( var k = 0; k < jsondata.inv.length; k++){
          if (document.getElementById("checkedItem"+k).checked){
            jsondata.Orders[i].OrderDetails[parseInt(jsondata.Orders[i].OrderDetails.length) - 1].Items.push(
              {
                "Quantity": parseFloat(document.getElementById("orderQuantity"+k).value),
                "Name": document.getElementById("Item_Row"+k).innerHTML
              }
            )
          }
        }
        break;
    }
    else{
      TotalSpent = 0
      for (var t = 0; t < jsondata.inv.length; t++){
        if (document.getElementById("checkedItem"+t).checked){
          TotalSpent += parseFloat(document.getElementById("Price_Row"+t).innerHTML) * parseFloat(document.getElementById("orderQuantity"+t).value)
        }
      }
      jsondata.Orders.push(
        {
          "USP": parseFloat(jsondata.Orders[parseInt(jsondata.Orders.length) - 1].USP + 1),
          "CustName": customName,
          "EmpName": document.getElementById('User').innerHTML,
          "OrderDetails": [
            {
              "DateOrdered": datetime,
              "TotalSpent": TotalSpent,
              "Items": [
              ]
            }
          ]
        }
      )
      for (var k = 0; k < jsondata.inv.length; k++){
        if (document.getElementById("checkedItem"+k).checked){
          jsondata.Orders[parseInt(jsondata.Orders.length) - 1].OrderDetails[0].Items.push(
            {
              "Quantity": parseFloat(document.getElementById("orderQuantity"+k).value),
              "Name": document.getElementById("Item_Row"+k).innerHTML
            }
          )
        }
      }
      break;
    }
  }
}

document.getElementById("Process_Items").style.display = "none";
document.getElementById("ItemInven_Confirm").style.display = "none";

function ReduceInvent(){
  let PaymentS = document.getElementsByName("PaymentType");
  let NOofRadio = 0
  let divPay = document.getElementById('paymenInfo');
  let customNames = document.getElementById("custNameSelected").value;
  let tableSa = document.querySelector('#myTable tbody');
  trSa = tableSa.getElementsByTagName('tr');

  for (let i = 0 ; i < PaymentS.length; i++){
    if (PaymentS[i].checked == false){
      NOofRadio++   
    }
  }

  if (document.getElementById("Sales_Items").value != "" && document.getElementById("TotalPrice").innerText != "$0.00" &&
   NOofRadio < 3 && divPay.innerHTML != "" && customNames != ""){ 
    var x, y, z, l
    l = GetCustData();
        if (l == 0){
          x = localStorage.getItem("CardInfo");
          y = localStorage.getItem("CCVInfo");
        }
        else{
          x = "";
          y = "";
        }
        if (l == 1){
          z = localStorage.getItem("Card2Info");
        }
        else{
          z = "";
        }

      if ((x != "" && y != "") || (z != "") || (l == 2))
       {
          for (let z = 0; z < jsondata.inv.length; z++){
            for (let i = 0; i < jsondata.inv.length; i++){
                if (document.getElementById("checkedItem"+i).checked)
                {
                    if ( jsondata.inv[z].Item == document.getElementById("Item_Row"+i).innerHTML){
                      jsondata.inv[z].QuantityInStock -= parseFloat(document.getElementById("orderQuantity"+i).value)
                    }
                }
            }
          }
          UpdateCustomerOrder();
        
          sendJson();
          let Data = localStorage.getItem('GetJson')
          jsondata = JSON.parse(Data);

          //Show and hide buttons
          document.getElementById("Get_Items").style.display = "none";
          document.getElementById("Process_Items").style.display = "inline-block";
          setTimeout(() => {
              document.getElementById("Process_Items").style.display = "none";
              document.getElementById("ItemInven_Confirm").style.display = "inline-block";
              alert(`Items Ordered, Updating Inventory... Please proceed to the invoice `)
              for (let i = 0 ; i < trSa.length; i++){
                trSa[i].style.display = "none";
              }
              document.getElementById("pageNum").disabled = true;
              document.getElementById("btnPrevPage").disabled = true;
              document.getElementById("btnNextPage").disabled = true;
              document.getElementById("allChecked").disabled = true;
              document.getElementById('searchbarInventory').disabled = true;
              document.getElementById('search_price').disabled = true;
              document.getElementById('price_help').disabled = true;
              document.getElementById('invClear').disabled = true;
          }, 1700);
       }
       else{
          alert(`Again, choose Items + amount you want to purchase and fill your payment information please @_@`)
       }
    }
    else {
        alert(`Choose Items + amount you want to purchase and select customer/payment option please :((`)
    }
    
}

function ReduceInvent2(){
  let tableSa = document.querySelector('#myTable tbody');
  trSa = tableSa.getElementsByTagName('tr');

  if (document.getElementById("Sales_Items").value != "" && document.getElementById("TotalPrice").innerText != "$0.00"){ 
    for (let z = 0; z < jsondata.inv.length; z++){
      for (let i = 0; i < jsondata.inv.length; i++){
          if (document.getElementById("checkedItem"+i).checked)
          {
              if ( jsondata.inv[z].Item == document.getElementById("Item_Row"+i).innerHTML){
                jsondata.inv[z].QuantityInStock -= parseFloat(document.getElementById("orderQuantity"+i).value)
              }
          }
      }
    }
  
    sendJson();
    let Data = localStorage.getItem('GetJson')
    jsondata = JSON.parse(Data);

    //Show and hide buttons
    document.getElementById("Get_Items").style.display = "none";
    document.getElementById("Process_Items").style.display = "inline-block";
    setTimeout(() => {
        document.getElementById("Process_Items").style.display = "none";
        document.getElementById("ItemInven_Confirm").style.display = "inline-block";
        alert(`Items Ordered, Updating Inventory... Please proceed to the invoice `)
        for (let i = 0 ; i < trSa.length; i++){
          trSa[i].style.display = "none";
        }
        document.getElementById("pageNum").disabled = true;
        document.getElementById("btnNextPage").disabled = true;
        document.getElementById("allChecked").disabled = true;
        document.getElementById('searchbarInventory').disabled = true;
        document.getElementById('search_price').disabled = true;
        document.getElementById('price_help').disabled = true;
        document.getElementById('invClear').disabled = true;
    }, 1700);    
  }
  else {
    alert(`Choose Items + amount you want to purchase please :((`)
  }
    
}

//Edit Json
function EditInventory(index){
    document.getElementById("inven_edit"+index).style.display="none";
    document.getElementById("save_Inven"+index).style.display="block";
    document.getElementById("Cancel_InvenUpdate"+index).style.display="block";

    //Disable inputs during edit
    document.getElementById('searchbarInventory').disabled = true;
    document.getElementById('search_price').disabled = true;
    document.getElementById('checkedItem'+index).disabled = true;
    document.getElementById('orderQuantity'+index).disabled = true;
    document.getElementById('price_help').disabled = true;
        
    var Code = document.getElementById("Code_Row"+index);
    var Item = document.getElementById("Item_Row"+index);
    var Quantity = document.getElementById("Quantity_Row"+index);
    var Price = document.getElementById("Price_Row"+index);
        
    var Code_data = Code.innerHTML;
    var Item_data = Item.innerHTML;
    var Quantity_data = Quantity.innerHTML;
    var Price_data = Price.innerHTML;
        
    Code.innerHTML="<input type='text' id='Code_text"+index+"' value='"+Code_data+"'>";
    Item.innerHTML="<input type='text' id='Item_text"+index+"' value='"+Item_data+"'>";
    Quantity.innerHTML="<input type='number' id='Quantity_text"+index+"' min='0' value='"+Quantity_data+"'>";
    Price.innerHTML="<input type='number' id='Price_text"+index+"' min='0' value='"+Price_data+"'>";
}

//Save data to json
function SaveInventory(index){
    var Code_val = document.getElementById("Code_text"+index).value;
    var Item_val = document.getElementById("Item_text"+index).value;
    var Quantity_val = document.getElementById("Quantity_text"+index).value;
    var Price_val = document.getElementById("Price_text"+index).value;

    if (Code_val != "" && Item_val != "" && Quantity_val != "" && Price_val != ""){
        jsondata.inv[index].Code = Code_val;
        jsondata.inv[index].Item = Item_val;
        jsondata.inv[index].QuantityInStock = Quantity_val;
        jsondata.inv[index].Price = Price_val;

        
        GenerateTable();
        setTimeout(renderTable, 100);
        
        document.getElementById("inven_edit"+index).style.display="block";
        document.getElementById("save_Inven"+index).style.display="none";
        document.getElementById("Cancel_InvenUpdate"+index).style.display="none";
        document.getElementById('searchbarInventory').disabled = false;
        document.getElementById('search_price').disabled = false;
        document.getElementById('checkedItem'+index).disabled = false;
        document.getElementById('orderQuantity'+index).disabled = false;
        document.getElementById('price_help').disabled = false;
    }
    else if (Code_val == "" || Item_val == "" || Quantity_val == "" || Price_val == ""){
        alert(`NO FIELDS SHOULD BE LEFT EMPTY BEFORE SAVING`);
        if (Code_val == ""){
            document.getElementById("Code_text"+index).value = jsondata.inv[index].Code;
        }
        if (Item_val == ""){
            document.getElementById("Item_text"+index).value = jsondata.inv[index].Item;
        }
        if (Quantity_val == ""){
            document.getElementById("Quantity_text"+index).value = jsondata.inv[index].QuantityInStock;
        }
        if (Price_val == ""){
            document.getElementById("Price_text"+index).value = jsondata.inv[index].Price;
        }
    }
    sendJson();
}

//Cancel inven update
function CancelInvenUpdate(index){
    var Code = document.getElementById("Code_Row"+index);
    var Item = document.getElementById("Item_Row"+index);
    var Quantity = document.getElementById("Quantity_Row"+index);
    var Price = document.getElementById("Price_Row"+index);

    Code.innerHTML = `<td id="Code_Row${index}">${jsondata.inv[index].Code}</td>`
    Item.innerHTML = `<td id="Item_Row${index}">${jsondata.inv[index].Item}</td>`
    Quantity.innerHTML = `<td id="Quantity_Row${index}">${jsondata.inv[index].QuantityInStock}</td>`
    Price.innerHTML = `<td id="Price_Row${index}">${jsondata.inv[index].Price}</td>`
    
    document.getElementById("inven_edit"+index).style.display="block";
    document.getElementById("save_Inven"+index).style.display="none";
    document.getElementById("Cancel_InvenUpdate"+index).style.display="none";
    document.getElementById('searchbarInventory').disabled = false;
    document.getElementById('search_price').disabled = false;
    document.getElementById('checkedItem'+index).disabled = false;
    document.getElementById('orderQuantity'+index).disabled = false;
    document.getElementById('price_help').disabled = false;
}

//NEXT AND PREVIOUS BUTTONS CLICKS EVENTS
document.getElementById('btnPrevPage').addEventListener('click', previousPage, false);
document.getElementById('btnNextPage').addEventListener('click', nextPage, false);

//Previous page event
function previousPage(){
    input = document.getElementById('searchbarInventory').value;
    inputprice = document.getElementById('search_price').value;
    if(input == "" && inputprice == ""){
        if(curPage > 1)
        {
            curPage--;
            renderTable();
        }
    }
    else{
        if(curPage > 1)
        {
            itemsCount = 0;
            start = 0;
            let PageNow = curPage - 1;
            curPage=1;
            for (i = 0; i < PageNow; i++){
                filterTableSales();
                if (curPage < PageNow){
                    curPage++
                }
            }
        }
    }
}

//next events
async function nextPage(){
    input = document.getElementById('searchbarInventory').value;
    inputprice = document.getElementById('search_price').value;
 
    if (input == "" && inputprice == ""){
        if((curPage * PageSize) < jsondata.inv.length) curPage++;
        renderTable();
    }
    else{
        var input, inputprice, filter, filterprice, filteredPrice, table, tr, td, td2, i, txtValue, txtValuePrice, filterarr;
        input = document.getElementById('searchbarInventory');
        inputprice = document.getElementById('search_price');
        filter = input.value.toUpperCase();
        filterprice = inputprice.value;
        table = document.getElementById('myTable');
        tr = table.getElementsByTagName('tr');
        filterarr = [];
    
        if(filterprice == ""){
            filteredPrice = 9999999;
        }
        else{
            filteredPrice = parseFloat(filterprice);
        }
        
        for(i = 0; i < tr.length; i++){
            td = tr[i].getElementsByTagName('td')[2];
            td2 = tr[i].getElementsByTagName('td')[4];
            if(td || td2){
                txtValue = td.textContent || td.innerText;
                txtValuePrice = td2.textContent || td2.innerText;
                if(txtValue.toUpperCase().indexOf(filter) > -1 && parseFloat(txtValuePrice) <= parseFloat(filteredPrice)){
                    filterarr.push(i);
                }
            }
        }
        if((curPage * PageSize) < filterarr.length)
        {
            curPage++;
            filterTableSales();
        }
    }
}

//Filter table
function filteredAll(){
    itemsCount = 0;
    curPage = 1;
    start = 0;
    filterTableSales();
}

//Show filtered table data
function filterTableSales(){
    var input, inputprice, filter, filterprice, filteredPrice, table, tr, td, td2, i, txtValue, txtValuePrice, filterarr;
    input = document.getElementById('searchbarInventory');
    inputprice = document.getElementById('search_price');
    filter = input.value.toUpperCase();
    filterprice = inputprice.value;
    table = document.getElementById('myTable');
    tr = table.getElementsByTagName('tr');
    filterarr = [];

    if(filterprice == ""){
        filteredPrice = 9999999;
    }
    else{
        filteredPrice = parseFloat(filterprice);
    }
    
    for(i = 1; i < tr.length; i++){
        td = tr[i].getElementsByTagName('td')[2];
        td2 = tr[i].getElementsByTagName('td')[4];
        if(td || td2){
            txtValue = td.textContent || td.innerText;
            txtValuePrice = td2.textContent || td2.innerText;
            if(txtValue.toUpperCase().indexOf(filter) > -1 && parseFloat(txtValuePrice) <= parseFloat(filteredPrice)){
                filterarr.push(i);
            }
        }
    }

    for (i = 1; i < tr.length; i++){
        tr[i].style.display = "none";
    }

    if (filterarr.length > 0){
        for (i = 1; i < tr.length; i++){
            if(itemsCount < curPage*PageSize){
                for (j = filterarr.indexOf(start) + 1; j < filterarr.length; j++){
                    if (i == filterarr[j]){
                        tr[i].style.display = "";
                        start = i;
                        itemsCount ++;
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
    document.getElementById("pageNum").innerHTML = curPage;
}


function CheckAll(){
    let chkAll = document.getElementById('allChecked');
    let chkbox = document.getElementsByName('checkedItem');
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

document.getElementById("Sale_Submit").addEventListener("click", function(){
    CalculateSale()
});

function ClearSaleOrder(){
    GenerateTable()
    setTimeout(renderTable, 100);

    document.getElementById("allChecked").checked = false;
    document.getElementById("searchbarInventory").value = '';
    document.getElementById("search_price").value = '';
    document.getElementById("TotalPrice").innerHTML = 0;
    //document.getElementById("Card").checked = true;
    document.getElementById("Sales_Items").value = "";
    document.getElementById("Order_Sum").value = "";

    document.getElementById('searchbarInventory').disabled = false;
    document.getElementById('search_price').disabled = false;
    document.getElementById('price_help').disabled = false;
}

function ClearInvenOrder(){
    GenerateTable()
    setTimeout(renderTable, 100);

    document.getElementById("allChecked").checked = false;
    document.getElementById("searchbarInventory").value = '';
    document.getElementById("search_price").value = '';
    document.getElementById("TotalPrice").innerHTML = 0;
    document.getElementById("Sales_Items").value = "";

    document.getElementById('searchbarInventory').disabled = false;
    document.getElementById('search_price').disabled = false;
    document.getElementById('price_help').disabled = false;
}
async function CalculateSelected(){
    let itemList = document.getElementById('Sales_Items');
    let orderSum = document.getElementById('Order_Sum');
    let items = document.getElementsByName('checkedItem');
    let total = document.getElementById('TotalPrice');
    let OrderSummary = "";

    let Payment = document.getElementsByName("PaymentType");
    let PayType = Array.from(Payment).find((radio) => radio.checked);
    let pType = "";

    let auxPrice = 0;
    let auxTaxes = 0;
    let prc = 0;
    let aux = 0;
    let itms = [];
    itemList.value = "";
    orderSum.value = "";
    total.innerHTML = "";

    for(var i = 0; i < items.length; i++){
        if(items[i].checked){
            var row = items[i].parentNode.parentNode;

            if(row.cells[1].innerText == "Code"){
                continue
            }

            if(row.cells[5].children[0].value > parseFloat(row.cells[3].innerText)){
                alert(`Quantity placed for ${row.cells[2].innerText} exceeded quantity in stock\nAvailable ${row.cells[2].innerText}: ${row.cells[3].innerText}`)
                row.cells[5].children[0].value = parseFloat(row.cells[3].innerText)
                listOrder += `• ${row.cells[2].innerText} - Quantity: ${row.cells[5].children[0].value}\n`; 
                itemList.innerHTML = listOrder;   
            }
            else{
                itemList.value += `• ${row.cells[2].innerText} - Quantity: ${row.cells[5].children[0].value}\n`;  
            }
            itms.push(`${row.cells[5].children[0].value}x ${row.cells[2].innerText}`); 
            let price = items[i].value * row.cells[5].children[0].value;
            auxPrice += price;
            let taxes = Math.round(price * 0.13 * 100) / 100;
            aux += taxes;
            auxTaxes = aux.toFixed(2);
            OrderSummary = `Items:  $${auxPrice}\nEstimated GST/HST: $${auxTaxes}`;
            total.innerText = `$${(auxPrice + aux).toFixed(2)}`;
            orderSum.value = OrderSummary;
            prc = (auxPrice + aux).toFixed(2);   
        }
    }

    
    localStorage.setItem('total', auxPrice);
    localStorage.setItem('taxes', auxTaxes);
    localStorage.setItem('items', itms);
    localStorage.setItem('price', prc);
    
    if(PayType.value == undefined){
        pType = "error";
    }
    else if(PayType.value == "Card"){
        pType = "Debit/Credit";
    }
    else if(PayType.value == "PayPal"){
        pType = "PayPal";
    }
    else if(PayType.value == "Checking"){
        pType = "Checking";
    }
    
    localStorage.setItem('payment', pType);
    
    setTimeout(GetCustData(), 125);   
}

function CalculateSelectedInv(){
    let itemList = document.getElementById('Sales_Items');
    let items = document.getElementsByName('checkedItem');
    let total = document.getElementById('TotalPrice');

    let itm = [];
    let auxPrice = 0;
    itemList.value = "";
    total.innerHTML = "";

    for(var i = 0; i < items.length; i++){
        if(items[i].checked){
            var row = items[i].parentNode.parentNode;

            if(row.cells[1].innerText == "Code"){
                continue
            }

            if(row.cells[5].children[0].value > parseFloat(row.cells[3].innerText)){
                alert(`Quantity placed for ${row.cells[2].innerText} exceeded quantity in stock\nAvailable ${row.cells[2].innerText}: ${row.cells[3].innerText}`)
                row.cells[5].children[0].value = parseFloat(row.cells[3].innerText)
                itemList.value += `• ${row.cells[2].innerText} - Quantity: ${row.cells[5].children[0].value}\n`;  
            }
            else{
                itemList.value += `• ${row.cells[2].innerText} - Quantity: ${row.cells[5].children[0].value}\n`;  
            }
            itm.push(`${row.cells[5].children[0].value}x ${row.cells[2].innerText}`); 
            let price = items[i].value * row.cells[5].children[0].value;
            auxPrice += price;
            total.innerHTML = `$${auxPrice.toFixed(2)}`;

            localStorage.setItem("totals", auxPrice);
            localStorage.setItem('item', itm);
        }
    }
}

function invInvoice(){
    var x = localStorage.getItem('totals');
    var z = localStorage.getItem('item').split(',');
    
    let itemz = document.getElementById('itemsINV');
    let iepricez = document.getElementById('itemsPriceINV');
    let totalz = document.getElementById('totalPriceINV');

    z.forEach(e => {
        itemz.innerText += `| ${e} |`
    });
    iepricez.innerText = `$${x}`;
    totalz.innerText = `Total: $${x}`;
}


function GetPaymentInfo(){
    let Payment = document.getElementsByName("PaymentType");
    let divAux = document.getElementById('paymenInfo');

    let lable1 = document.createElement('label');
    let lable2 = document.createElement('label');
    let Card = document.createElement('input');
    let ctv = document.createElement('input');
    Card.setAttribute('type', 'text');
    Card.setAttribute('id', 'cardInfo');
    Card.setAttribute('name', 'cardInfo');
    Card.setAttribute('maxlength', '16');
    Card.setAttribute('placeholder', 'xxxx-xxxx-xxxx-xxxx');
    ctv.setAttribute('type', 'text');
    ctv.setAttribute('id', 'ctv');
    ctv.setAttribute('name', 'ctv');
    ctv.setAttribute('maxlength', '3');
    ctv.setAttribute('placeholder', 'xxx');
    //Card.setAttribute('value', 'cardInfo');

    divAux.innerHTML = "";
    for(let i = 0; i < Payment.length; i++){
        if(Payment[i].checked){
            if(Payment[i].value == "Debit/Credit"){
                lable1.innerHTML = `<strong>Card: </strong><br>`;
                lable2.innerHTML = `<strong>CCV: </strong><br>`
                divAux.appendChild(lable1);
                divAux.appendChild(Card);
                divAux.innerHTML += "<br>";
                divAux.appendChild(lable2);
                divAux.appendChild(ctv);
                divAux.innerHTML += "<br>";
            }
            else if(Payment[i].value == "PayPal"){
                lable1.innerHTML = `<strong>PayPal Account: </strong><br>`;
                divAux.appendChild(lable1);
                divAux.appendChild(Card);
                divAux.innerHTML += "<br>";
            }
            else if(Payment[i].value == "Checking"){
                divAux.innerHTML = `<input value="0" id="payCheck" type="checkbox"> Received check?`
            }
        }
    }
}
  

var cust = document.getElementsByName('custNameSelected')[0];
    // Adding Event Listener to get the value	
cust.addEventListener('input', function() {
    localStorage.setItem("CustName", this.value);
});
//---------------------------------------------------------------------------------------------------------------