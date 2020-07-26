let totalUser = [];
let allSearch = [];

let countMaleGender = 0;
let countFeminineGender = 0;
let sumaryAge = 0;
let avarageAge = 0;

let input_search = null;
let btnSearch = null;
let tabUsers = null;
let tabStatitics = null;
let headerUsers = null;
let headerStatitics = null;

let formaterNumber = null;

window.addEventListener("load", () => {
  input_search = document.querySelector("#name-user");
  input_search.addEventListener("keyup", (event) => {
    if (event.key === "Enter") doSearch();
  });

  btnSearch = document.querySelector("#btn-search");
  btnSearch.addEventListener("click", () => doSearch());

  tabUsers = document.querySelector("#tabUsers");
  tabStatitics = document.querySelector("#tabStatistics");

  headerUsers = document.querySelector("#headerUsers");
  headerStatitics = document.querySelector("#headerStatistics");

  formaterNumber = Intl.NumberFormat("pt-BR");

  doFetch();
});

function doSearch() {
  const nameSearch = input_search.value.toLowerCase();
  allSearch = totalUser.filter((user) => {
    return user.name.toLowerCase().indexOf(nameSearch) > -1;
  });

  allSearch.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  rander();
}

async function doFetch() {
  try {
    const res = await fetch(
      "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
    );

    const json = await res.json();

    totalUser = json.results.map((user) => {
      const { name, picture, dob, gender } = user;
      return {
        name: name.first + " " + name.last,
        img: picture.medium,
        age: dob.age,
        gender: gender,
      };
    });
  } catch (error) {
    console.log("ERROR IN FETCH" + error);
  }
}

function rander() {
  randerFilteredUser();
  randerStatitics();
}

function randerFilteredUser() {
  function randerHeader() {
    headerUsers.textContent = allSearch.length + " usuário(s) encontrado(s)";
  }

  function randerBody() {
    let usersHTML = "<div>";

    allSearch.forEach((search) => {
      const { name, img, age, gender } = search;

      const searchHTML = `
      <div class="row valign-wrapper">
        <div class="col">
          <img src="${img}" alt="${name}">
        </div>
        <div class="col">
          <span>${name}</span>
        </div>
        <div class="col">
          <span>${age} anos</span>
        </div>
      </div>
      `;
      usersHTML += searchHTML;
    });

    tabUsers.innerHTML = usersHTML + "</div>";
  }

  randerHeader();
  randerBody();
}

function randerStatitics() {
  function randerHeader() {
    headerStatitics.textContent = "Estatísticas";
  }
  function randerBody() {
    countMaleGender = allSearch.reduce((accumulator, current) => {
      if (current.gender === "male") {
        return ++accumulator;
      } else {
        return accumulator;
      }
    }, 0);

    countFeminineGender = allSearch.reduce((accumulator, current) => {
      if (current.gender === "female") {
        return ++accumulator;
      } else {
        return accumulator;
      }
    }, 0);

    sumaryAge = allSearch.reduce((accumulator, current) => {
      return accumulator + current.age;
    }, 0);

    if (allSearch.length !== 0) avarageAge = sumaryAge / allSearch.length;

    sumaryAge = formatNumber(sumaryAge);
    avarageAge = formatNumber(avarageAge);

    const statiticsHTML = `
    <div>
      <div class="row valign-wrapper">
          <span>Sexo masculino: ${countMaleGender}</span>
      </div>
      <div class="row valign-wrapper">
          <span>Sexo feminino: ${countFeminineGender}</span>
      </div>
      <div class="row valign-wrapper">
          <span>Soma das idade: ${sumaryAge}</span>
      </div>
      <div class="row valign-wrapper">
          <span>Média das idade: ${avarageAge}</span>
      </div>
    </div>
    `;

    tabStatitics.innerHTML = statiticsHTML;
  }

  randerHeader();
  randerBody();
}

//FORMATA O NUMERO PASSADO POR ARGUMENTO
const formatNumber = (number) => {
  return formaterNumber.format(number);
};
