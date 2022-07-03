//global variables
// https://randomuser.me/api/

const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,
                email,location,phone,dob,&noinfo&nat=US`;

// fetch data from API
fetch(urlAPI)
    .then(res =>res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => {
        console.log("something went wrong");
        console.log(err);
    })
    .finally(() => {
        // filterCards();
    });


function displayEmployees(employeeData){
        console.log(employeeData);
        // store the employee HTML as we create it
        let employeeHTML = "";
        // loop through each employee and create HTML markup
        employeeData.forEach((employee, index) => {
            let name = employee.name;
            let email = employee.email;
            let location = employee.location;
            let picture = employee.picture;
            // let location = employee.location;
    
            // template literals make this so much cleaner!
            employeeHTML = `<div class="card" data-index="${index}">
                                <img class="avatar" src="${picture.large}" />
    
                                <div class="text-container">
                                    <h2 class="name">${name.first} ${name.last}</h2>
    
                                    <p class="email">${email}</p>
                                    <p class="address">${location.city}, ${location.state}</p>
                                </div>
                             </div> `;
            document.querySelector(".gallery").insertAdjacentHTML('beforeend', employeeHTML);
         });
    }



    function displayModal(index) {
        // use object destructuring make our template literal cleaner
        let { 
            name, 
            dob, 
            phone, 
            email, 
            location: { city, street, state, postcode }, picture
         } = employees[index];
    
        let date = new Date(dob.date);    
        const modalHTML = `
                            <img class = "avatar" src = "${picture.large}"/>
                            <div class="text-container">
                                <h2 class="name">${name.first} ${name.last}</h2>
                                <p class="email">${email}</p>
                                <p class="address">${city}</p>
                                <hr>
                                <p>${phone}</p>
                                <p class="address"> ${street.number}, ${state} ${postcode} </p>
                                <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
                            </div>
                        `;

        document.querySelector(".gallery").insertAdjacentHTML('beforeend', modalHTML);
    }
    
    