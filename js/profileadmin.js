window.addEventListener("load",function(){
    //******************************Handling open Page without Login Will not Open  *****************/
    if(!JSON.parse(localStorage.getItem("current_user")).username){
        alert("Please Login First!!")
        window.open("Login.html","_self")
    }
// ********************************Open With login *************************/ 
else{    
//****
    //*******************Add Name of admin *************************************/

    let all_user = JSON.parse(localStorage.getItem("employees"));
    let c_user =all_user[0]; 
    let usernamefield = document.getElementById("username");
        usernamefield.innerText =`${c_user.fname} ${c_user.lname}`; 
        
    //*************************** Selection of Tables  *************************/
        let confirmationtable = document.getElementById("confirmationtable");
        let reporttable = document.getElementById("reporttable");

    //*************************** Event on confirmation Button *************************/
        let btnconfirmation=document.getElementById("confirmation");
        btnconfirmation.addEventListener("click",function(){
            confirmationtable.classList.toggle("d-none"); 
            reporttable.classList.add("d-none"); 
        });

    //*************************** Event on Report Button *************************/

    let btnReports=document.getElementById("Reports");
    btnReports.addEventListener("click",function(){
        reporttable.classList.toggle("d-none"); 
        confirmationtable.classList.add("d-none"); 
    });

    //***************************** Employees in table for confirmation  *********************/
    tableconfirmemployee =document.getElementById('confirmemployee');
    let creattbody1 =document.createElement("tbody");
   // let all_employess =all_user.slice(1);
    all_user.forEach( (val,i) => {
            let creattr1 =document.createElement("tr");
            let createtd10 = document.createElement("td");
                createtd10.innerText = val.fname
                    creattr1.appendChild(createtd10);
            let createtd20 = document.createElement("td");
                createtd20.innerText = val.lname
                    creattr1.appendChild(createtd20);
            let createtd30 = document.createElement("td");
                createtd30.innerText = val.email
                    creattr1.appendChild(createtd30);
            let createtd40 = document.createElement("td");
                createtd40.innerText = val.role
                creattr1.appendChild(createtd40);
            let createtd50 = document.createElement("td");
                createtd50.innerHTML = `<button class="btn btn-danger mt-2 btnconfirm " id="${val.ID}">Confirm</button>`
                    creattr1.appendChild(createtd50);
                    creattbody1.appendChild(creattr1) 
                    
                });
    tableconfirmemployee.appendChild(creattbody1);
    //*****************************Add Event on btn confirm******************************/

    let allbtnconfirm =document.getElementsByClassName("btnconfirm");    
    for (let i = 0; i < all_user.length; i++) {
        if((all_user[i].login) ){
            allbtnconfirm[i].classList.add("disabled");
            allbtnconfirm[i].classList.remove("btn-danger");
            allbtnconfirm[i].classList.add("btn-success");
            allbtnconfirm[i].innerText="Confirmed";
        }
        else{
            allbtnconfirm[i].addEventListener("click",function(){
                allbtnconfirm[i].classList.add("disabled");
                allbtnconfirm[i].classList.remove("btn-danger");
                allbtnconfirm[i].classList.add("btn-success");
                allbtnconfirm[i].innerText="Confirmed";
                all_user[i].login=true;
                localStorage.setItem("employees",JSON.stringify(all_user));
            })
        }
    }
    
    //*****************************Add All Employees in table *********************/
    let mytable =document.getElementById('allemployees');
    let creattbody =document.createElement("tbody");
        all_user.forEach(val => {
            let creattr =document.createElement("tr");
            let createtd1 = document.createElement("td");
                createtd1.innerText = val.fname
                    creattr.appendChild(createtd1);
            let createtd2 = document.createElement("td");
                createtd2.innerText = val.lname
                    creattr.appendChild(createtd2);
            let createtd3 = document.createElement("td");
                createtd3.innerText = val.address
                    creattr.appendChild(createtd3);
            let createtd4 = document.createElement("td");
                createtd4.innerText = val.Age
                    creattr.appendChild(createtd4);
            let createtd5 = document.createElement("td");
                createtd5.innerText = val.email
                    creattr.appendChild(createtd5);
            let createtd6 = document.createElement("td");
                createtd6.innerText = val.role
                    creattr.appendChild(createtd6);
                    creattbody.appendChild(creattr)      

        });
        mytable.appendChild(creattbody);

    //***************************Function to */
        
    }
    });// the end of Load