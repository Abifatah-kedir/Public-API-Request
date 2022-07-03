//global variables
// https://randomuser.me/api/
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,
                email,location,phone,dob,&noinfo&nat=US`;
// fetch data from API
fetch(urlAPI)
    .then(res =>res.json())
    .then(res => res.results)
    .then(displayEmployees);
    // .catch(err => {
    //     console.log("something went wrong");
    //     console.log(err);
    // });
    // .finally(() => {
    //     filterCards();
    // });


function displayEmployees(employeeData){
        employees = employeeData;
        // store the employee HTML as we create it
        let employeeHTML = '';
    
        // loop through each employee and create HTML markup
        employees.forEach((employee, index) => {
            let name = employee.name;
            let email = employee.email;
            let city = employee.location.city;
            let picture = employee.picture;
            let location = employee.location;
    
            // template literals make this so much cleaner!
            employeeHTML += `<div class="card" data-index="${index}">
                                <img class="avatar" src="${picture.large}" />
    
                                <div class="text-container">
                                    <h2 class="name">${name.first} ${name.last}</h2>
    
                                    <p class="email">${email}</p>
                                    <p class="address">${city}</p>
                                </div>
                             </div> `;
         });
         console.log(document.querySelector(".grid-container") );
       document.querySelector(".grid-container").insertAdjacentHTML('beforeend', employeeHTML);
    }

    console.log(employees);