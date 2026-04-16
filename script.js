// FADE IN
document.addEventListener("DOMContentLoaded", ()=>{
    document.body.classList.add("show");
});

/* ========================
   NAVIGATION
======================== */
function nextPage(){
    document.body.classList.remove("show");
    setTimeout(()=>{
        window.location.href = "menu.html";
    },300);
}

function goGallery(id){
    document.body.classList.remove("show");
    setTimeout(()=>{
        window.location.href = "gallery.html?id=" + id;
    },300);
}

/* ========================
   MENU GENERATE
======================== */
const PeopleContainer = document.getElementById("menuContainer");

if(PeopleContainer){

    const namaButton = [
        "Rehan",
        "Daman",
        "Leony",
        "Ninis",
        "Ehsan",
        "Suway",
        "Jidun",
        "Cesta",
        "Sanjaya",
        "Claudya"
    ];

    for(let i=1;i<=10;i++){
        let btn = document.createElement("button");
        btn.innerText = namaButton[i-1]; // <<< DIUBAH DI SINI SAJA
        btn.className = "menu-btn";
        btn.style.animationDelay = (i * 0.1) + "s";

        btn.onclick = ()=>goGallery(i);

        menuContainer.appendChild(btn);
    }
}

/* ========================
   GALLERY
======================== */
const gallery = document.getElementById("gallery");

if(gallery){
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    for(let i=1;i<=10;i++){
        let box = document.createElement("div");
        box.className = "img-placeholder";

        box.innerText = "Add Image";

        gallery.appendChild(box);
    }
}

/* ========================
   POPUP
======================== */
function showPopup(src){
    const popup = document.getElementById("popup");
    popup.style.display = "flex";
    document.getElementById("popupImg").src = src;
}

function closePopup(){
    document.getElementById("popup").style.display = "none";
}
function goBack(){
    document.body.classList.remove("show");
    setTimeout(()=>{
        window.location.href = "menu.html";
    },300);
}