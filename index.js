let myLeads = []
let myNames = []
const nameEl = document.getElementById("name-el")
// const inputEl = document.getElementById("input-el")
// const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const namesFromLocalStorage = JSON.parse( localStorage.getItem("myNames") )
const tabBtn = document.getElementById("tab-btn")


if (leadsFromLocalStorage, namesFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    myNames = namesFromLocalStorage
    render(myLeads, myNames)
}

tabBtn.addEventListener("click", function(){   
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        if (nameEl.value){
            myLeads.push(tabs[0].url)
            myNames.push(nameEl.value)
            nameEl.value=""
            localStorage.setItem("myLeads", JSON.stringify(myLeads) )
            localStorage.setItem("myNames", JSON.stringify(myNames) )
        }else{
            myLeads.push(tabs[0].url)
            myNames.push(tabs[0].title)
            localStorage.setItem("myLeads", JSON.stringify(myLeads) )
            localStorage.setItem("myNames", JSON.stringify(myNames) )
        }
        render(myLeads, myNames)
    })
})

function render(leads, names) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${names[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    myNames = []
    render(myLeads, myNames)
})

// inputBtn.addEventListener("click", function() {
//     myLeads.push(inputEl.value)
//     myNames.push(nameEl.value)
//     inputEl.value = ""
//     nameEl.value = ""
//     localStorage.setItem("myLeads", JSON.stringify(myLeads) )
//     localStorage.setItem("myNames", JSON.stringify(myNames) )
//     render(myLeads, myNames)
// })