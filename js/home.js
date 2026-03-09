

const cardContainer = document.getElementById("card-container");
const issuesCount = document.getElementById("Issues-count");
const loadingSpinner = document.getElementById("loading-spinner");
// buttons
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

const cardDetailsModel=document.getElementById('my_modal_1')

function showLoading() {
  loadingSpinner.classList.remove("hidden");
  cardContainer.innerHTML = ``;
}

function hideLoading() {
  loadingSpinner.classList.add("hidden");
}
async function loadCards() {
  showLoading();
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  hideLoading();
  displayCards(data.data);
  
}

function displayCards(cards) {
    
  cards.forEach((element) => {
    const card = document.createElement("div");
    card.className = "card bg-base-100 shadow-sm ";
    card.innerHTML = `<div onclick="openModal(${element.
id
})"  class="card-body">
                <!-- card top part -->
                <div class="flex justify-between">
                    <img src="./assets/Open-Status.png" alt="">
                    <div class="badge badge-soft badge-error rounded-full">${element.priority}</div>
                    
                </div>
                <!-- card middle part -->
              <h2 class="card-title">${element.title}</h2>
              <p class="line-clamp-2">
                ${element.description}
              </p>
              <div class="flex gap-2 lg:flex-col py-2 space-y-1">
                <div class="badge badge-soft badge-error border-red-300 rounded-full"><i class="fa-solid fa-bug"></i>${
                  element.labels[0]
                }</div>
                    <div class="badge badge-soft badge-warning border-yellow-300 rounded-full"><i class="fa-regular fa-life-ring"></i>${
                      element.labels[1]
                    }</div>
              </div>
              

            </div>
            <hr class="text-neutral/10">
            <!-- footer part -->
            <div  class="p-4 space-y-2">
             <p class="text-[12px] text-[#64748B]">#<span>${element.id}</span> By <span>${element.author}</span></p>
             <p class="text-[12px] text-[#64748B]">${element.updatedAt}</p>
            </div>`;
    cardContainer.appendChild(card);
    console.log();
    
  });
}

async function openModal(cardId){
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${cardId}`);
    const data= await res.json();
    const cardDetails=data.data;

     cardDetailsModel.innerHTML = `
    <div class="modal-box">

    <h3 class="text-2xl font-bold">${cardDetails.title}</h3>

    <div class="flex space-x-2 items-center py-3">
        <div class="badge badge-success rounded-full text-[12px] text-white">${cardDetails.status}</div>
        <p class="text-[12px] text-[#64748B]"> by <span>${cardDetails.author}</span></p>
        <p class="text-[12px] text-[#64748B]">${cardDetails.updatedAt}</p>
    </div>

    <div class="space-x-2">
        <div class="badge badge-soft badge-error">${cardDetails.labels[0]}</div>
        <div class="badge badge-soft badge-warning">${cardDetails.labels[1]}</div>
    </div>

    <p class="text-[#64748B] py-4">${cardDetails.description}</p>

    <div class="bg-base-200 p-2 rounded-lg flex gap-20">
        <div>
            <p class="text-[#64748B]">Assignee:</p>
            <h5 class="font-semibold">${cardDetails.author}</h5>
        </div>

        <div>
            <p class="text-[#64748B]">Priority:</p>
            <div class="badge badge-error text-white rounded-full">${cardDetails.priority}</div>
        </div>
    </div>

    <div class="modal-action">
      <form method="dialog">
        <button class="btn btn-primary">Close</button>
      </form>
    </div>

    </div>
    `;
    

    cardDetailsModel.showModal()
}


loadCards();
