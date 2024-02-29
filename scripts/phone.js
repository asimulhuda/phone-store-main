const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = `p-6 text-center space-y-6 rounded-lg border-[1px] border-[#CFCFCF]`;
    phoneCard.innerHTML = `
          <div class="flex justify-center py-10 bg-[#0D6EFD0D] rounded-lg">
            <img
              src="${phone.image}"
              alt="" />
          </div>
    
            <h3 class="text-2xl font-bold">${phone.phone_name}</h3>
            <button onClick="handelShowDetail('${phone.slug}')"
              class="py-2 px-6 text-xl text-white font-semibold bg-[#0D6EFD] rounded-lg"
            >
              Show Details
            </button>
    `;
    phoneContainer.appendChild(phoneCard);
  });
  tiggleLoadingSpinner(false);
};

const handelShowDetail = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  console.log(phone);
  showPhoneDetail(phone);
};

const showPhoneDetail = (phone) => {
  const allPhoneVariation = document.getElementById("all-phone-variation");
  allPhoneVariation.innerHTML = `
  <div class="flex justify-center py-10 px-auto bg-[#0D6EFD0D]">
              <img src="${phone.image}" alt="" />
            </div>
            <div class="space-y-2">
              <h3 class="font-bold text-3xl">${phone?.name}</h3>
              <div class="*:text-xl">
                <p><b>Storage: </b>${phone?.mainFeatures?.storage}y</p>
                <p><b>Display Size: </b>${phone?.mainFeatures.displaySize}</p>
                  <p><b>Chipset: </b>${phone?.mainFeatures?.chipset}</p>
                  <p><b>Memory: </b>${phone?.mainFeatures?.memory}</p>
                  <p><b>Slug: </b>${phone?.slug}</p>
                  <p><b>Release date: </b>${phone?.others?.releaseDate}</p>
                  <p><b>Brand: </b>${phone?.brand}</p>
                  <p><b>GPS: </b>${phone?.others?.GPS}</p>
                </div>  
            </div>
            <div class="modal-action">
              <form method="dialog">
                <button class="btn text-white bg-[#DC3545]">Close</button>
              </form>
            </div>
  `;

  my_detail_modal.showModal();
};

const handelSearch = (isShowAll) => {
  tiggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value.toLowerCase();
  loadPhone(searchText, isShowAll);
};

const tiggleLoadingSpinner = (isloading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isloading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

const showAll = () => {
  handelSearch(true);
};
