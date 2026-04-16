document.addEventListener("DOMContentLoaded", ()=>{
    document.body.classList.add("show");
});

/* NAVIGATION */
window.nextPage = function(){
    document.body.classList.remove("show");
    setTimeout(()=>{
        window.location.href = "menu.html";
    },300);
}

window.goGallery = function(id){
    document.body.classList.remove("show");
    setTimeout(()=>{
        window.location.href = "gallery.html?id=" + id;
    },300);
}

/* MENU */
const menuContainer = document.getElementById("menuContainer");

if(menuContainer){
    const namaButton = [
        "Rehan","Daman","Leony","Ninis","Ehsan",
        "Suway","Jidun","Cesta","Sanjaya","Claudya"
    ];

    for(let i=1;i<=10;i++){
        let btn = document.createElement("button");
        btn.innerText = namaButton[i-1];
        btn.className = "menu-btn";

        btn.onclick = ()=>goGallery(i);

        menuContainer.appendChild(btn);
    }
}