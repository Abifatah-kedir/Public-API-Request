//global variables
// https://randomuser.me/api/
let employees = [];
const createGallery = document.querySelector(".gallery");
let incommingIndex;

let modalContainer = document.createElement("div");
modalContainer.className = "modal-container";
modalContainer.style.display = "none";
createGallery.insertAdjacentElement("afterend", modalContainer);

// const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,
//                 email,location,phone,dob,&noinfo&nat=US`;

// Search field.
const searchContainer = `<form action="#" method="get">
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                        </form>
                        `;
document.querySelector(".search-container").insertAdjacentHTML('beforeend',searchContainer);
                    

/*
    accepts the fetched data and displays on the page.
*/
function displayEmployees(employeeData){
        employees = employeeData;
        let employeeHTML = '';
        employees.forEach((employee, index) => {
            let name = employee.name;
            let email = employee.email;
            let picture = employee.picture;
            let location = employee.location;
    
            employeeHTML += `<div class="card" data-index="${index}">
                                <img class="avatar" src="${picture.large}" />
    
                                <div class="text-container">
                                    <h2 class="name">${name.first} ${name.last}</h2>
    
                                    <p class="email">${email}</p>
                                    <p class="address">${location.city}, ${location.state}</p>
                                </div>
                             </div> `;
         });
         createGallery.insertAdjacentHTML('beforeend', employeeHTML);
    }

/*
    accepts the index of the selected employee card and pops the modal window with more information.
*/
const displayModal = (index)=> {
    // use object destructuring make our template literal cleaner
    let { name, dob,  phone, email, location: { city, street, state, postcode }, picture} = employees[index];
    let date = new Date(dob.date);
    const modalHTML = 
        `
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>

                <div class="modal-info-container">

                    <img class = "avatar" src = "${picture.large}"  alt="profile picture"/>
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                    <hr>
                    <p>${phone}</p>
                    <p class="address"> ${street.number} ${street.name}, ${state} ${postcode} </p>
                    <p>Birthday: ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}</p>

                </div>

            </div>

            // IMPORTANT: Below is only for exceeds tasks 
            <div class="modal-btn-container">

                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>

            </div>
        `;

        incommingIndex = index;

        return modalHTML;
}

/*
    ignites the the modal window based user clicked event.
*/
const OpentheModalView = (event)=> {
    let card = event.target.closest(".card");
    let index = card.getAttribute('data-index');
    modalContainer.style.display = "block";
    modalContainer.innerHTML = displayModal(index);
}

/*
    closes the modal window. this function also toggles back and forth the employee cards based on user click event.
*/
const modalbuttons = (event)=> {
    let closeButton = document.querySelector(".modal-close-btn").firstChild;
    let nextButton = document.querySelector(".modal-next");
    let prevButton = document.querySelector(".modal-prev");

    if(event.target === closeButton) {
        modalContainer.style.display = "none";
    } else if((event.target === prevButton) && (incommingIndex > 0) ) {
        incommingIndex--;
        modalContainer.innerHTML = displayModal(incommingIndex);
    }else if((event.target === nextButton) && (incommingIndex < 11)) {
        incommingIndex++;
        modalContainer.innerHTML = displayModal(incommingIndex);
    }
}

/* 
    filters throught the cards by checking if employee names  matches the input fields values,
     if there is a match, dislays the matches and hides rest of the cards. 
     if the input values is cleared then it brings back the hiden cards. 
*/ 
const filterCards = ()=> {
    const card = document.querySelectorAll(".card");
    const valueInput = document.querySelector(".search-input");
    const name = document.querySelectorAll(".text-container h2");

    for(let i = 0; i < name.length; i++)
    {  
        let targetValue = valueInput.value;
        let targetContents = targetValue.toLowerCase();

        let cardList = name[i].innerHTML;
        let cardElements = cardList.toLowerCase();

        if (!cardElements.includes(targetContents) ) {
            card[i].style.display = "none";
        } else {
            card[i].style.display = "flex";
        }
    }  
};

/*
    Event listeners
*/
const createdGallery = createGallery.addEventListener('click', (event) => {OpentheModalView(event)});
const ButtonEvent = modalContainer.addEventListener("click", (event)=> {modalbuttons(event)});
const searchInput = document.querySelector(".search-input").addEventListener( "input", () => {filterCards()});

/*
    Fetches data form API
*/
fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(res =>res.json())
    .then(r => r.results)
    .then(displayEmployees)
    .then(createdGallery)