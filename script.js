import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
   GALLERY FIREBASE
======================== */
const gallery = document.getElementById("gallery");

if(gallery){
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const colRef = collection(db, "gallery_" + id);

    onSnapshot(colRef, (snapshot)=>{
        gallery.innerHTML = "";

        snapshot.forEach(doc=>{
            let img = document.createElement("img");
            img.src = doc.data().url;

            img.onclick = ()=>showPopup(img.src);

            gallery.appendChild(img);
        });

        createUploadBox(colRef);
    });
}

/* ========================
   UPLOAD BOX
======================== */
function createUploadBox(colRef){
    let box = document.createElement("div");
    box.className = "img-placeholder";
    box.innerText = "Add Image";

    let input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.style.display = "none";

    box.onclick = ()=>input.click();

    input.onchange = async function(e){
        const file = e.target.files[0];

        if(file){
            const storageRef = ref(storage, "images/" + Date.now());

            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);

            await addDoc(colRef, { url });
        }
    };

    gallery.appendChild(box);
    gallery.appendChild(input);
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