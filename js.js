//global variables

let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,
                email,location,phone,dob,&noinfo&nat=US`;
                
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");


// const mWindow = document.querySelector(".Modal");
const prevCard =document.querySelector(".prev");
const nextCard = document.querySelector(".next");



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
        filterCards();
    })

function displayEmployees (employeeData) {
   
    employees = employeeData;
    // store the employee HTML as we create it
    let employeeHTML = '';

    // loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

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
    gridContainer.innerHTML = employeeHTML;
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

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}


gridContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) 
    {
        // select the card element based on its proximity to actual element
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        displayModal(index);
        
        //stores the incomming index
        let incommingIndex = index;

        /*
            Increments and Decrements the the incomming index when clicked nextCard 
            and prevCard respectivey before it triges displayModal function.
        */
        prevCard.addEventListener('click', ()=>
        {
            if (incommingIndex >= 1 ) 
            {
                incommingIndex --;
                displayModal(incommingIndex);
            } else {
                incommingIndex = 0;
            }
        });+
        nextCard.addEventListener( "click", () => 
        {
            if ( incommingIndex <= 10){
                 incommingIndex++;
                 displayModal(incommingIndex);
            } else {
                incommingIndex = 11;
            }
        });

    }
});


// closes the modal window.
modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});


/* 
    filters throught the cards by checking if employee names  matches the input fields values,
     if there is a match, dislays the matches and hides rest of the cards. 
     if the input values is cleared then it brings back the hiden cards. 
*/ 

const filterCards = ()=> {
         
          const card = document.querySelectorAll(".card");
          const SearchInput = document.querySelector('.inputBox');
          const valueInput = document.querySelector(".myInput");
          const name = document.querySelectorAll(".text-container h2");
  
          SearchInput.addEventListener( "input", () => 
          {
              for(let i = 0; i < name.length; i++)
                  {  
                      let targetValue = valueInput.value;
                      let targetContents = targetValue.toLowerCase();
  
                      let cardList = name[i].innerHTML;
                      let cardElements = cardList.toLowerCase();
  
                      if (!cardElements.includes(targetContents) ) {
                          card[i].classList.add("hidden");
                      } else {
                          card[i].classList.remove("hidden");
                      }
                  }    
          });
};

    