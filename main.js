
let ingredientsArr = [
  {
    group: "protein",
    name: "chicken",
    price100gr: 0.7,
    kcal: 190,
    pc: 1500
  },
  {
    group: "protein",
    name: "eggs",
    price100gr: 0.3,
    kcal: 157,
    pc: 55
  },
  {
    group: "protein",
    name: "fish",
    price100gr: 0.8,
    kcal: 140
  },
  {
    group: "greenVeg",
    name: "lettuce",
    price100gr: 0.2,
    kcal: 14
  },
  {
    group: "greenVeg",
    name: "peas",
    price100gr: 0.5,
    kcal: 42,
    pc:135
  },
  {
    group: "greenVeg",
    name: "broccoli",
    price100gr: 0.5,
    kcal: 28
  },
  {
    group: "crispy",
    name: "cucumber",
    price100gr: 0.4,
    kcal: 15,
    pc:100
  },
  {
    group: "crispy",
    name: "paper",
    price100gr: 0.5,
    kcal: 27,
    pc:40
  },
  {
    group: "crispy",
    name: "carrot",
    price100gr: 0.3,
    kcal: 32,
    pc:75
  },
  {
    group: "sweet",
    name: "raisins",
    price100gr: 1.2,
    kcal: 264
  },
  {
    group: "sweet",
    name: "apple",
    price100gr: 0.2,
    kcal: 165
  },
  {
    group: "seasoning",
    name: "garlic",
    price100gr: 0.9,
    kcal: 143
  },
  {
    group: "gravy",
    name: "raisins",
    price100gr: 1.0,
    kcal: 899
  },
];

//заполнение ul
let proteinList = document.querySelector('.left .protein');
let greenVegList = document.querySelector('.left .greenVeg');
let crispyList = document.querySelector('.left .crispy');
let sweetList = document.querySelector('.left .sweet');
let seasoningList = document.querySelector('.left .seasoning');
let gravyList = document.querySelector('.left .gravy');
function fillUl(arr){
  arr.forEach(function(item){
    let liElement = document.createElement('li');
    liElement.innerHTML = item.name;
    switch(item.group){
      case 'protein': 
        proteinList.append(liElement);
        break;
      case 'greenVeg': 
        greenVegList.append(liElement);
        break;
      case 'crispy': 
        crispyList.append(liElement);
        break;
      case 'sweet': 
        sweetList.append(liElement);
        break;
      case 'seasoning': 
        seasoningList.append(liElement);
        break;
      case 'gravy': 
        gravyList.append(liElement);
        break;
    }
  });
}

fillUl(ingredientsArr);

//добавление продуктов в поле added products
let ingredients = document.querySelectorAll('.left li');
let productList = document.querySelector('.right-fix .added');

function addProduct(prodName){
      //найти объект с таким именем в БД
      let elOfArr = ingredientsArr.find(el => el.name == prodName);
      let product = document.createElement('p');
      product.classList.add(prodName);
      let contentProduct = ``;
      //если продукт поштучный, добавить подсказку
      if(elOfArr.hasOwnProperty('pc'))
        contentProduct += `data-tooltip="1pc-${elOfArr.pc}gr"`;
  
      contentProduct =  `<b>${prodName}</b><br>  
      gr: <input id = "${prodName}" `+ contentProduct + `>
      <div class="remove-product"></div>` 
  
      product.innerHTML = contentProduct;
      productList.append(product);
  
      productList.scrollBy(0, product.offsetTop);
}

ingredients.forEach(element => element.addEventListener('click', function(){
    //не добавлять, если уже в списке
    let exist = document.querySelector('.added .'+ element.textContent)
    if(exist){
        productList.scrollTo(0, exist.offsetTop);
        exist.style.backgroundColor = 'rgba(86, 97, 44, 0.7)';
        setTimeout(() => exist.style.backgroundColor = 'rgba(243, 230, 113, 0.9)', 1000);
        return;
    }

    addProduct(element.textContent);
}));

//при нажатии на крестик удалить из списка
productList.addEventListener('click', function(event){
    if (event.target.className != 'remove-product') 
        return;
    event.target.closest('p').remove(); 
});

//подсказка: сколько грамм в штуке "1 apple-165pc"
let tooltipElem;

document.onmouseover = function(event) {
  let target = event.target;

  let tooltipHtml = target.dataset.tooltip;
  if (!tooltipHtml) return;

  tooltipElem = document.createElement('div');
  tooltipElem.className = 'tooltip';
  tooltipElem.innerHTML = tooltipHtml;
  productList.append(tooltipElem);

  let coords = target.getBoundingClientRect();

  let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
  if (left < 0) left = 0;

  let top = coords.top - tooltipElem.offsetHeight - 5;
  if (top < 0) { 
    top = coords.top + target.offsetHeight + 5;
  }

  tooltipElem.style.left = left + 'px';
  tooltipElem.style.top = top + 'px';
};

document.onmouseout = function(e) {
  if (tooltipElem) {
    tooltipElem.remove();
    tooltipElem = null;
  }
};

let resListProduct = ``;
let countButton = document.querySelector('.count-btn');

function countRes(){
  let pList = document.querySelectorAll('.right-fix p');
  let resGr=0;
  let resKcal=0;
  let resPrice=0;

  pList.forEach(function(element){
    let object = ingredientsArr.find(curr => curr.name == element.firstElementChild.innerHTML)
    let inputField = document.querySelector(`.`+ element.className + ` input`);


    resGr += Number(inputField.value);
    resKcal += Number(inputField.value) * object.kcal / 100;
    resPrice += Number(inputField.value) * object.price100gr / 100;
  });

  resGr = resGr;
  resKcal = resKcal.toFixed(2);
  resPrice = resPrice.toFixed(2);

  document.querySelector('.results #a').innerHTML = String(resGr);
  document.querySelector('.results #b').innerHTML = String(resKcal);
  document.querySelector('.results #c').innerHTML =String(resPrice);
}

//при нажатии на кнопку count подсчитать все поля
countButton.addEventListener('click', countRes);

//окно при нажатии на кнопку COOK
let cookButton = document.querySelector('.cook-btn');
let cookWindow = document.querySelector('.cook-window');
let filter = document.querySelector('.filter');
let closeButton = document.querySelector('.close');
let orderField = document.querySelector('.order .info');

cookButton.addEventListener('click', function(){
    //показать в окне весь заказ
    let pList = document.querySelectorAll('.right-fix p');
    let strIngredients = ``;
    let localName = [];
    let localInput = [];
    let localResults = [];

    countRes();

    pList.forEach(function(element){
      strIngredients += `${element.firstElementChild.innerHTML}<br>`;
      localName.push(element.firstElementChild.innerHTML);

      let inputVal = document.querySelector(`.`+ element.className + ` input`).value;
      localInput.push(inputVal);
    });

    document.querySelector('.result-salad-ingredients').innerHTML = strIngredients;

    let a = document.querySelector('.results #a').innerHTML;
    let b = document.querySelector('.results #b').innerHTML;
    let c = document.querySelector('.results #c').innerHTML;

    let strResults = `
            ${a} gr<br>
            ${b} kcal<br>
            $${c}<br>
           `
    localResults.push(a, b, c);

    document.querySelector('.windowRes').innerHTML = strResults;    

    //показать окно
    cookWindow.style.display = 'block';
    filter.style.display = 'block';

    localStorage.setItem("lsName", JSON.stringify(localName));
    localStorage.setItem("lsInput", JSON.stringify(localInput));
    localStorage.setItem("lsResults", JSON.stringify(localResults));
});

closeButton.addEventListener('click', function(){
    cookWindow.style.display = 'none';
    filter.style.display = 'none';
});

//показать последний заказ
let lastButton = document.querySelector('.last-btn');
lastButton.addEventListener('click', function(){
  document.querySelector('.added').innerHTML = '';

  let namesFromLS = JSON.parse(localStorage.getItem("lsName"));
  let inputsFromLS = JSON.parse(localStorage.getItem("lsInput"));
  let resultsFromLS = JSON.parse(localStorage.getItem("lsResults"));

  namesFromLS.forEach(name =>  addProduct(name));

  let inList = document.querySelectorAll('.right-fix input');
  let i = 0;
  inList.forEach(el => {el.value = inputsFromLS[i]; i++;})

  document.querySelector('.results #a').innerHTML = resultsFromLS[0];
  document.querySelector('.results #b').innerHTML = resultsFromLS[1];
  document.querySelector('.results #c').innerHTML = resultsFromLS[2];
});



