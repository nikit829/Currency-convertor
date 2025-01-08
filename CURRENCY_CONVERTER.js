const BASE_URL="https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api"

const dropdowns=document.querySelectorAll(".dropdown select")
let btn=document.querySelector("button")
let fromCurr=document.querySelector(".from select")
let toCurr=document.querySelector(".to select")
let msg=document.querySelector(".msg")

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption=document.createElement("option")
        newOption.value=currCode;
        newOption.innerText=`${currCode} - ${currencyWithCountry[currCode]}`;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected"
        }
        else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected"
        }
        select.append(newOption);
    }
    select.addEventListener("change",(event)=>{
        updateFlag(event.target);
    })
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode]
    let newSource=`https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSource;
};


btn.addEventListener("click",(event)=>{
    event.preventDefault(); // to shut renew of atb and we can completely now perform operation
    let amount=document.querySelector(".amount input")
    let amountValue=amount.value
    if(amountValue===""||amountValue<1){
        amountValue=null
        amount.value=null
    }

    const URL=`${BASE_URL}/${toCurr.value}_${fromCurr.value}.json`
    convertRate(URL,amountValue);
})

async function convertRate(URL, amount) {
    try {
        let response = await fetch(URL);
        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        let Rate = parseFloat((data.rate) * amount).toFixed(2);
        showMessage(Rate, amount);
    } catch (error) {
        // Log the error and show an error message
        console.error("Error fetching data:", error);
        showErrorMessage("Failed to fetch the conversion rate. Please try diff currency.");
    }
}

const showMessage=(Rate,amount)=>{
    msg.classList.remove("hide")
    msg.innerHTML = `${amount} ${fromCurr.value} = <b>${Rate}</b> ${toCurr.value}`;
}
const showErrorMessage = (message) => {
    msg.classList.remove("hide");
    msg.innerHTML = `<span style="color: red;"> ${message}</span>`;
};
