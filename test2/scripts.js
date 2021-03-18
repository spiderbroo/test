
DandQ()
window.onload = function() {
    let listFromStorage = localStorage.getItem('localList');
    if (listFromStorage == null) {
        return;
    }
    console.log(listFromStorage)
    let deletedDivs = JSON.parse(listFromStorage);
    console.log(deletedDivs)
    for (let i = 0; i < deletedDivs.length; i++ ) {
        
        let divForDeleting = document.querySelector("#"+deletedDivs[i])
        divForDeleting.remove()

        DandQ()
    }
}

function DandQ() {
    let imgQuantity = document.getElementsByTagName("IMG").length;
    document.getElementById("QuantityOfImg").innerHTML = imgQuantity;
    let nowDate = new Date();
    document.getElementById("Today").innerHTML = nowDate.getDate() +"."+ nowDate.getMonth()+"."+ nowDate.getFullYear() +" "+
    nowDate.getHours() +":"+ nowDate.getMinutes();

}


let localList = [];
let saveAllBlocksNodes = document.querySelectorAll("#cover div");
let allBlocks = Array.from(document.querySelectorAll("#cover div")); // find all blocks we need
allBlocks.forEach(block => {
    let blockId = block.id
    const del = block.querySelector('.del'); //find '.del' button inside blocks

    if (del) { // if there is button, do
        del.addEventListener('click', function() { //onclick
        block.parentElement.removeChild(block); //delete block
        let onLoadNewArray = JSON.parse(localStorage.getItem('localList'));
        onLoadNewArray.push(blockId);
        localList = onLoadNewArray;
        setLocalListAtLocalStorage();
        console.log(JSON.parse(localStorage.getItem('localList')))
        DandQ()
        });
    }

    let closeGalleryButton = document.createElement('button'); //create close button for fullImg

    block.addEventListener('click', AddClassAndButtonToElem, false);  //click on block
    function AddClassAndButtonToElem(event) {
        if (event.target.tagName == 'BUTTON') {           //if target button - skip
            return;
        }

        block.classList.add("fullImg");                         //add class to our block
        let openedGallery = document.querySelector(".fullImg")  
        openedGallery.appendChild(closeGalleryButton);          //add child button to class of our block 
        closeGalleryButton.id = "closeGallery";
        closeGalleryButton.innerHTML = "Close"
    }
    closeGalleryButton.addEventListener('click', closeThisGallery, false)
    function closeThisGallery(event) {
        block.classList.remove("fullImg")
        closeGalleryButton.remove()
    }
})

const returnButton = document.querySelector("#returnBlocks");
allBlocks.forEach(block => {
    returnButton.addEventListener('click', function() {
        if (block.parentElement != null) {
            block.parentElement.removeChild(block);
        }
        for (let i = 0; i < saveAllBlocksNodes.length; i++) {
            document.getElementById("cover").appendChild(saveAllBlocksNodes[i])
        };
        DandQ()
})
})

returnButton.addEventListener('click', function() {
        JSON.stringify(localList, function(value) {
            if(value != null) {
                localList = [];
                setLocalListAtLocalStorage();
                console.log(JSON.parse(localStorage.getItem('localList')));
            }
        });
        
    
})

function setLocalListAtLocalStorage() {
    return localStorage.setItem("localList", JSON.stringify(localList))
}