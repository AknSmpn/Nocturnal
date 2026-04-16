/* ========================
   FADE IN
======================== */
document.addEventListener("DOMContentLoaded", ()=>{
    document.body.classList.add("show");
});

/* ========================
   NAVIGATION (FIX MODULE)
======================== */
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

window.goBack = function(){
    document.body.classList.remove("show");
    setTimeout(()=>{
        window.location.href = "menu.html";
    },300);
}

/* ========================
   MENU GENERATE
======================== */
const menuContainer = document.getElementById("menuContainer");

if(menuContainer){

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
        "Claudya",
        "Arya"
    ];

    for(let i=1;i<=11;i++){
        let btn = document.createElement("button");
        btn.innerText = namaButton[i-1];
        btn.className = "menu-btn";
        btn.style.animationDelay = (i * 0.1) + "s";

        btn.onclick = ()=>goGallery(i);

        menuContainer.appendChild(btn);
    }
}

/* ========================
   GALLERY (FIREBASE REMOVED)
   -> SEKARANG KOSONG / STATIC ONLY
======================== */
const gallery = document.getElementById("gallery");

if(gallery){
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    gallery.innerHTML = `
        <p style="text-align:center; width:100%;">
            Gallery mode aktif (tanpa database)
        </p>
    `;
}

/* ========================
   UPLOAD BOX (DISABLED)
======================== */
function createUploadBox(){
    let gallery = document.getElementById("gallery");
    if(!gallery) return;

    let box = document.createElement("div");
    box.className = "img-placeholder";
    box.innerText = "Upload disabled";

    gallery.appendChild(box);
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