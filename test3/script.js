let container = document.getElementById('container');
let countryTitle = document.getElementById('countryTitle')

let sendBtn = document.getElementById('send');
let clearFormBtn = document.getElementById('clearForm');
let checkedUni = document.getElementById('checkedUni')

// window.reload = function() {
//     let countryFromStorage = localStorage.getItem('countryValuess') ;
//     if (countryFromStorage == null) {
//         return;
//     }else{
//         let currentCountry = JSON.parse(countryFromStorage)
//         console.log(currentCountry)
//         country.value = currentCountry
//         console.log(country.value)
//     }

//     // onloadCountry.innerHTML = JSON.parse(localStorage.getItem('country'))
// }


let country = document.getElementById('searchUni');

// let countryValues = country.value;
sendBtn.addEventListener('click', searchUniversities, false) 
function searchUniversities() {
    if (country.value == "") {
        alert("Введите название страны");
        return
    }
    let search = country.value;
    search = search.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    let requestURL = "search.json";
    const xhr = new XMLHttpRequest();
    xhr.open('GET', requestURL, true);
    container.innerHTML = "";
    // console.log( localStorage.getItem('countryValuess'))
    xhr.onload = () => {
        countryTitle.innerHTML = `Университеты в ${country.value}:`
        let result = [];
        let parsedResult = JSON.parse(xhr.response);
        for (let i = 0; i < parsedResult.length; i++) {
            if(parsedResult[i]['country'] !== search) {
                continue;
            } else {
            result.push(parsedResult[i]);
            }
        }
        if (result.length == 0) {
        countryTitle.innerHTML = "Похоже в названии ошибка!"
        return;
        }
        // setLocalSrtingToLocalStorage();
            for (let i=0; i < result.length; i++){
            let eachResult = document.createElement("div");
            eachResult.className = "UniString";
            eachResult.innerHTML = `<strong>${[i+1]}. AlphaTwo Code:</strong> <div>${result[i]['alpha_two_code']}</div>, 
            <strong>domains:</strong> ${result[i]['domains']}, <strong>name:</strong> <div>${result[i]['name']}</div>,
            <strong>web-site:</strong> <a href="${result[i]['web_pages']}">${result[i]['web_pages']}</a><input class="select" type="checkbox"><hr>`;
            container.appendChild(eachResult);
            
        }
        // localStorage.setItem('tableWithUni', JSON.stringify(.container.eachResult))
        let checkboxesLen = document.querySelectorAll('.select');
        for (let i=0; i<checkboxesLen.length; i++) {
            checkboxesLen[i].addEventListener('click', checkboxesLength, false);
            function checkboxesLength() {
                let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
                checkedUni.innerHTML = checkboxes.length;
            }
        }
        // console.log( localStorage.getItem('countryValuess'))
    }
    xhr.send();
}

clearFormBtn.addEventListener('click', clearAll, false);
function clearAll() {
    container.innerHTML = null
    countryTitle.innerHTML = null
    country.value = ""
    // JSON.stringify(country.value, function(value) {
    //     if(value !== "") {
    //         country.value = "";
    //         setLocalSrtingToLocalStorage()
    //     }
    // })
}
// function setLocalSrtingToLocalStorage() {
//     localStorage.setItem("countryValuess", JSON.stringify(country.value))
// }
