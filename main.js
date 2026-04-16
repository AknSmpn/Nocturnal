document.addEventListener("DOMContentLoaded", ()=>{
    document.body.classList.add("show");
});

/* NAVIGATION */
window.nextPage = function(){
    window.location.href = "menu.html";
}

window.goGallery = function(id){
    window.location.href = "gallery.html?id=" + id;
}

/* MENU BUTTON */
const menuContainer = document.getElementById("menuContainer");

if(menuContainer){
    const namaButton = [
        "Rehan","Daman","Leony","Ninis","Ehsan",
        "Angga","Wildan","Cesta","Sanjaya","Claudya","Arya","Vivi"
    ];

    for(let i=1;i<=12;i++){
        let btn = document.createElement("button");
        btn.innerText = namaButton[i-1];
        btn.className = "menu-btn";

        btn.onclick = ()=>goGallery(i);

        menuContainer.appendChild(btn);
    }
}