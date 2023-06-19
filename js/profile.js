window.addEventListener("load",function(){
//******************************Handling open Page without Login Will not Open  *****************/
if(!JSON.parse(localStorage.getItem("current_user")).username){
        alert("Please Login First!!")
        window.open("Login.html","_self")
}
// ********************************Open With login *************************/ 
else{    
//********************select Current user ******************************/
let c_user = JSON.parse(localStorage.getItem("current_user"));

//********************Show Employee Name on side ************************/
let usernamefield = document.getElementById("username");
usernamefield.innerText =`${c_user.fname} ${c_user.lname}`;
 //*************************** Event on confirmation Button *************************/
let profiletable = document.getElementById("profiletable");
let btnconfirmation=document.getElementById("profileofemployee");
btnconfirmation.addEventListener("click",function(){
    profiletable.classList.toggle("d-none"); 
    reporttable.classList.add("d-none"); 
});
//*************************Add Event on Button Report*********************/
let reporttable = document.getElementById("reporttable");
let btnReports=document.getElementById("Reports");
btnReports.addEventListener("click",function(){
    reporttable.classList.toggle("d-none"); 
    profiletable.classList.add("d-none"); 

});
//**************************Working on Profile ****************************/
employee =document.getElementById('confirmemployee');
    let creattbody1 =document.createElement("tbody");
    let creattr =document.createElement("tr");
    let createtd1 = document.createElement("td");
        createtd1.innerText = c_user.fname
            creattr.appendChild(createtd1);
    let createtd2 = document.createElement("td");
        createtd2.innerText = c_user.lname
            creattr.appendChild(createtd2);
    let createtd3 = document.createElement("td");
        createtd3.innerText = c_user.address
            creattr.appendChild(createtd3);
    let createtd4 = document.createElement("td");
        createtd4.innerText = c_user.Age
            creattr.appendChild(createtd4);
    let createtd5 = document.createElement("td");
        createtd5.innerText = c_user.email
            creattr.appendChild(createtd5);
    let createtd6 = document.createElement("td");
        createtd6.innerText = c_user.role
            creattr.appendChild(createtd6);
            creattbody1.appendChild(creattr)     
                    
    employee.appendChild(creattbody1);
//**************************Working on Daily Report  **********************/
    let dailytable =document.getElementById("dailytable");
    dailytable.appendChild(CreateTheader("Today","Attendance Time","Departure Time"));
    dailytable.appendChild(CreateTbodyForDailyReport(c_user,"Rest"));
//**************************Working on Monthly Report  **********************/
    let monthyreporttable =document.getElementById("monthyreport");
    let selectmyselectionbutton =document.getElementById("months");
//***************************Adding Event on my selection list of monthes */
    let attendance =c_user.attendancearray;
    let departure =c_user.departurearray;
    selectmyselectionbutton.addEventListener("change",function(e){
        const tbody = monthyreporttable.getElementsByTagName("tbody")[0];
        monthyreporttable.removeChild(tbody);
        monthyreporttable.appendChild(CreateTbodyFormonthly(attendance,departure,e.target.value));
        })
// monthyreporttable.appendChild(CreateTheader(monthString ,"Attendance Time","Departure Time"));

//**************************functions Area ***********************************/
    function CreateTheader(t1,t2,t3){
        let createdthead =document.createElement('thead');
            let createdtr =document.createElement('tr');
                let createdth1 =document.createElement('th');
                    createdth1.innerText=t1;
                    createdtr.appendChild(createdth1);
                let createdth2 =document.createElement('th');
                    createdth2.innerText=t2;
                    createdtr.appendChild(createdth2);
                let createdth3 =document.createElement('th');
                    createdth3.innerText=t3;
                    createdtr.appendChild(createdth3);
        createdthead.appendChild(createdtr);
        return createdthead;           
    }
//*****************************************function for to create body for DAliy report */
    function CreateTbodyForDailyReport(user ,t1){
        const today = new Date();
        const options = { weekday: 'long' };
        const dayOfWeekString = today.toLocaleString('en-US', options);
        let createdtbody =document.createElement('tbody');
            let createdtr =document.createElement('tr');
                let createdtd1 =document.createElement('td');
                    createdtd1.innerText=`${dayOfWeekString+' '+new Date().toLocaleDateString()}`
                    createdtr.appendChild(createdtd1);
                let createdtd2 =document.createElement('td');
                if(user.attendancearray[new Date().toLocaleDateString()] == undefined ){
                    createdtd2.innerText=t1;
                }
                else{
                    createdtd2.innerText=user.attendancearray[new Date().toLocaleDateString()];
                }
                    createdtr.appendChild(createdtd2);
                let createdtd3 =document.createElement('td');
                if(user.departurearray[new Date().toLocaleDateString()] == undefined ){
                    createdtd3.innerText=t1;
                }
                else{
                    createdtd3.innerText=user.departurearray[new Date().toLocaleDateString()];
                }
                    createdtr.appendChild(createdtd3);
        createdtbody.appendChild(createdtr);
        return createdtbody;           
    }
//***********************************For function monthly Table ******************************/
    function CreateTbodyFormonthly(objone,objtwo, value){
        let createdtbody =document.createElement('tbody');
        for (let Date in objone ){
            if(Date.slice(0,1) == value ){
                let createdtr =document.createElement('tr');
                    let createdtd1 =document.createElement('td');
                        createdtd1.innerText= Date
                    createdtr.appendChild(createdtd1);
                    let createdtd2 =document.createElement('td');
                        createdtd2.innerText=objone[Date];
                    createdtr.appendChild(createdtd2);
                    let createdtd3 =document.createElement('td');
                        createdtd3.innerText=objtwo[Date];;
                    createdtr.appendChild(createdtd3);
                    createdtbody.appendChild(createdtr);
                }
                }
        return createdtbody;           
    }
}
});