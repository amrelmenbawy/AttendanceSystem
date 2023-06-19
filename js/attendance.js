window.addEventListener("load",function(){  
//******************************Handling open Page without Login Will not Open  *****************/
if(!JSON.parse(localStorage.getItem("current_user")).username){
    alert("Please Login First!!")
    window.open("Login.html","_self")
}
// ********************************Open With login *************************/ 
else{
//***********************Selection Area ***********************************/
let usernameinput =document.querySelector("input[name=username]");
let btnConfirmAttendance =document.querySelector("#ConfirmAttendance");
let btnConfirmdeparture =document.querySelector("#Confirmdeparture");
let divattendance =document.querySelector("#attendance");
let divdeparture =document.querySelector("#departure");
let Current_user=JSON.parse(localStorage.getItem("current_user"));
usernameinput.value=Current_user.username;
if(Current_user.move==2){
    btnConfirmAttendance.innerText="Confirm Departure";
    btnConfirmAttendance.classList.remove("btn-primary");
    btnConfirmAttendance.classList.add("btn-danger"); 
}
// if(localStorage.getItem('users') == null)
// {
//     localStorage.setItem('users',localStorage.getItem("employees"));
// }
// let users =JSON.parse(localStorage.getItem("users"));
let users =JSON.parse(localStorage.getItem("employees"));
// if(localStorage.getItem('count') == null)
// {
//     localStorage.setItem("count",'1');
// }
// let count =JSON.parse(localStorage.getItem("count"));
//let count = Current_user.move;
//***************************event area  ************************************/

// btnConfirmAttendance.addEventListener("click",function(e){
//     e.preventDefault();
//     divdeparture.classList.remove("d-none");
//     divattendance.classList.add("d-none");
//     // add in the main locastorage 
//     AttendanceMethod(Current_user.username);
//     localStorage.setItem("users",JSON.stringify(users));
//     localStorage.setItem("current_user",JSON.stringify(Current_user));
// });
// btnConfirmdeparture.addEventListener("click",function(e){
//     e.preventDefault();
//     divdeparture.classList.add("d-none");
//     divattendance.classList.remove("d-none");
//     DepartureMethod(Current_user.username);
//     localStorage.setItem("users",JSON.stringify(users));
//     localStorage.setItem("current_user",JSON.stringify(Current_user));
// });
    
btnConfirmAttendance.addEventListener("click",function(e){
    e.preventDefault();
    // add in the main locastorage
    Current_user=JSON.parse(localStorage.getItem("current_user"));
    switch (Current_user.move) {
        case 1:
            console.log("before add ")
            console.log(Current_user.move)
            AttendanceMethod(Current_user.username);
           // localStorage.setItem("users",JSON.stringify(users));
            localStorage.setItem("employees",JSON.stringify(users));
            console.log("after add ")
            Current_user.move=2;
            console.log(Current_user.move)
            this.innerText="Confirm Departure";
            this.classList.remove("btn-primary");
            this.classList.add("btn-danger");  
           // localStorage.setItem("current_user",JSON.stringify(Current_user));
            // count++;
            // localStorage.setItem("count",JSON.stringify(count));
            break;
        case 2:
            console.log(Current_user.move)
            DepartureMethod(Current_user.username);
            this.innerText="Confirm Attendance";
            this.classList.remove("btn-danger");
            this.classList.add("btn-primary");
            Current_user.move=1;     
                //localStorage.setItem("users",JSON.stringify(users));
            localStorage.setItem("employees",JSON.stringify(users));
                // localStorage.setItem("current_user",JSON.stringify(Current_user));
                // count--;
                // localStorage.setItem("count",JSON.stringify(count));
            break;
    }
    
});

//*******************************************functions Areas****************************************************/
    //******************************************AttendanceMethod************************** */
function AttendanceMethod(username){
    users.forEach(val => {
        if(val?.username == Current_user.username){
            let key  =(new Date()).toLocaleDateString();
            let value =(new Date()).toLocaleTimeString();
            console.log(key);
            console.log(value);
            if(val.attendancearray[key]!=undefined){
                val.attendancearray[key].push(value);
            }
            else{
                val.attendancearray[key]=[value];
            }
            //val.attendancearray.push(new Date(Date.now()).toLocaleString());
            val.move=2;
            localStorage.setItem("current_user",JSON.stringify(val));
           // Current_user.attendancearray.push(new Date(Date.now()));   
           // Current_user.move++;
        }
    });
}
    //******************************************DepartureMethod************************** */
function DepartureMethod(username){
    users.forEach(val => {
        if(val?.username == Current_user.username){
            let key  =(new Date()).toLocaleDateString();
            let value =(new Date()).toLocaleTimeString();
            if(val.departurearray[key]!=undefined){
                val.departurearray[key].push(value);
            }
            else{
                val.departurearray[key]=[value];
            }
           // val.departurearray.push(new Date(Date.now()).toLocaleString());
            val.move=1;
            localStorage.setItem("current_user",JSON.stringify(val));
            //Current_user.departurearray.push(new Date(Date.now()));
            //val.move--;
            return val ;

        }
    });
}
//**************************Automatic Departure For all employees *****************************
function AutomaticDeparture(){
    users.forEach(val => {
        if(val.move == 2){
            DepartureMethod(val.username);
            val.move=1;
        }    
    });
    localStorage.setItem("employees",JSON.stringify(users));
}
    setInterval(AutomaticDeparture,28800000);
}
});