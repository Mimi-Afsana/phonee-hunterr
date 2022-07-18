// get all data by name
const searchButton = () => {
  console.log("eertt");
  const searchText = document.getElementById("search-input").value;
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displySearchData(data.data));
  document.getElementById("search-input").value = "";
};

const displySearchData = (searchs) => {
  console.log(searchs);
  const searchFirst20 = searchs.slice(0, 20);
  const appendDiv = document.getElementById("append-div");
  appendDiv.textContent = "";
  const error = document.getElementById("error");
  error.textContent = "";
  if (searchFirst20.length == 0) {
    document.getElementById("error").textContent = "no phone found";
  } else {
    for (const search of searchFirst20) {
      console.log(search);
      const div = document.createElement("div");
      div.classList.add("post");
      div.innerHTML = `
  <div class="col border border-light rounded">
      <div class="card">
      <div>
        <img class='w-75 mt-5 ms-5' src="${search.image}" class="card-img-top" alt="..."/>
        </div>
        <div class="card-body">
          <h5 class="card-title"><span class='fw-bold text-primary' >Phone name: </span>${search.phone_name}</h5>
          <p class="card-text fw-bold"><span class='fw-bold text-primary' >Brand: </span>
            ${search.brand}
          </p>
        </div>
        <button onclick="getDEtails('${search.slug}')" class="btn btn-outline-secondary bg-primary text-white fw-bold w-75 mb-4 ms-5 border border-primary rounded-pill">Details</button>
      </div>
    </div>
  `;
      appendDiv.appendChild(div);
    }
  }
  // clear details information when search anthing
  clearDetails();
};

// clear details
const clearDetails = () => {
  const appendDiv = document.getElementById("append-id");
  appendDiv.textContent = "";
};
// show data when click details by using id
const getDEtails = (id) => {
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => getIdByClick(data.data));
};

const getIdByClick = (click) => {
  console.log(click);
  const appendDiv = document.getElementById("append-id");
  appendDiv.textContent = "";

  const div = document.createElement("div");
  div.innerHTML = `
  
  <div class="col-12 col-lg-6 mx-auto pb-5 bg-gradient">
  <div class="card">
  <div >
  <img class='w-50 mt-5 ms-5 ps-5'  src="${
    click.image
  }" class="card-img-top" alt="..." />
  </div>   
  <div class=" card-body mb-5">
          <h5 class="card-title">${click.name}</h5>
          <p class="card-text fw-bold"> <span class='fw-bold text-primary' >Releasedate :</span><br> ${
            click.releaseDate ? click.releaseDate : "no release date found"
          }
          </p>
          <div class="card-text "><span class='fw-bold text-primary' > Mainfeatures Information:</span> <br>
         <p> <span class='fw-bold' >storage: </span> ${
           click.mainFeatures.storage
         }</p>
         <p> <span class='fw-bold' >chipSet: </span>  ${
           click.mainFeatures.chipSet
         } </p>
         <p> <span class='fw-bold' >displaySize: </span>   ${
           click.mainFeatures.displaySize
         } </p>
         <p> <span class='fw-bold' >memory: </span>   ${
           click.mainFeatures.memory
         }</p>
          </div>

          <p class="col-8 card-text"> <span class='fw-bold text-primary' > Sensors Information: </span> <br>
            ${click.mainFeatures.sensors[0]} <br>
            ${click.mainFeatures.sensors[1]}<br>
            ${click.mainFeatures.sensors[2]}<br>
            ${click.mainFeatures.sensors[3]}<br>
            ${click.mainFeatures.sensors[4]}<br>
            ${click.mainFeatures.sensors[5]}
          </p>

          <div class="card-text"> <span class='fw-bold text-primary'> Others Information:</span> <br>
          <p>  <span class='fw-bold'>Bluetooth: 
           </span>${
             click.others?.Bluetooth ? click.others.Bluetooth : "no data found"
           }</p>
              
       <p >  <span class='fw-bold' > GPS:
       </span> 
       ${click.others?.GPS ? click.others.GPS : "no data found"}
       </p>
              
       <p >   <span class='fw-bold'>NFC: 
        </span>${click.others?.NFC ? click.others.NFC : "no data found"} </p>
        <p >  <span class='fw-bold'> Radio:
        </span>${
          click.others?.Radio ? click.others.Radio : "no data found"
        } </p>
               
        <p >  <span class='fw-bold' >USB: 
        </span> ${click.others?.USB ? click.others.USB : "no data found"}</p>
  
        <p >  <span class='fw-bold'> WLAN: 
        </span>${click.others?.WLAN ? click.others.WLAN : "no data found"}</p>
          </div>
        </div>
        </div>

  `;
  appendDiv.appendChild(div);
};
