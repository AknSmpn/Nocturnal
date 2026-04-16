/* ========================
   BACK
======================== */
window.goBack = function(){
    window.location.href = "menu.html";
}

/* ========================
   GALLERY
======================== */
const gallery = document.getElementById("gallery");

if(gallery){
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    loadImages(id);
}

/* ========================
   LOAD IMAGES
======================== */
async function loadImages(folder){
    gallery.innerHTML = "";

    const { data } = await supabase
        .storage
        .from("images")
        .list(folder);

    if(data){
        data.forEach(file=>{
            const url = supabase
                .storage
                .from("images")
                .getPublicUrl(folder + "/" + file.name).data.publicUrl;

            let img = document.createElement("img");
            img.src = url;

            img.onclick = ()=>showPopup(url);

            gallery.appendChild(img);
        });
    }

    createUploadBox(folder);
}

/* ========================
   UPLOAD
======================== */
function createUploadBox(folder){
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
            const fileName = Date.now() + "-" + file.name;

            await supabase.storage
                .from("images")
                .upload(folder + "/" + fileName, file);

            loadImages(folder);
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