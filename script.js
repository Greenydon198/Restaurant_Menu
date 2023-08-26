
let url = "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json";
/*
let sam = [
    {id:1,imgSrc:"burger.svg",name:"apple",price:10},
    {id:2,imgSrc:"burger.svg",name:"apple",price:10},
    {id:3,imgSrc:"burger.svg",name:"apple",price:10},
    {id:4,imgSrc:"burger.svg",name:"apple",price:10},
    {id:5,imgSrc:"burger.svg",name:"apple",price:10},
    {id:6,imgSrc:"burger.svg",name:"apple",price:10}
]
function getMenu() {
      let menu = document.getElementsByClassName("menu")[0];
      for (let i = 1; i <= 6; i++) {
        let card = sam.find((item) => item.id === i);

        let card_div = document.createElement("div");
        card_div.classList.add("card");

        let pic = document.createElement("img");
        pic.src = card.imgSrc;
        card_div.appendChild(pic);

        let price = document.createElement("div");
        price.innerHTML = `
            <p><b> ${card.name} </b><br>$${card.price}/-</p>
            <img class ="plus" src="plus.svg">
        `;
        card_div.append(price);

        menu.appendChild(card_div);
      }
}
*/

function getMenu() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let menu = document.getElementsByClassName("menu")[0];
      for (let i = 1; i <= 6; i++) {
        let card = data.find((item) => item.id === i);

        let card_div = document.createElement("div");
        card_div.classList.add("card");

        let pic = document.createElement("img");
        pic.src = card.imgSrc;
        card_div.appendChild(pic);

        let price = document.createElement("div");
        price.innerHTML = `
            <p><b> ${card.name} </b><br>$${card.price}/-</p>
            <img class ="plus" src="plus.svg">
        `;
        card_div.append(price);

        menu.appendChild(card_div);
      }
    })
    .catch((error) => {
      console.log("ERROR!!!:", error);
    });
}

function takeOrder() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          let orders = [];
          let len = data.length;
          for (let i = 0; i < 3; i++) {
            let rand = Math.floor(Math.random() * len);
            orders.push(data[rand]);
          }
          resolve(orders);
        })
        .catch((error) => reject(error));
    }, 2500);
  });
  return promise;
}

function orderPrep() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ orders_status: true, paid: false });
    }, 1500);
  });
  return promise;
}

function payOrder() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
  return promise;
}

function thankyouFnc() {
  alert("Thank you for eating with us today!");
}

window.onload = () => {
  getMenu();
  takeOrder().then((order) => {
    //   console.log("Orders:", order);
      return orderPrep();
    })
    .then((status) => {
    //   console.log("Order status:", status);
      return payOrder();
    })
    .then((paymentStatus) => {
    //   console.log("Payment Status", paymentStatus);
      if (paymentStatus.paid) {
        thankyouFnc();
      }
    })
    .catch((error) => {
      console.log("Error during order booking:", error);
    });
};
