document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("show"); // 🔥 FADE IN
    init();
});

/* ========================
   BACK BUTTON (FIX GLOBAL)
======================== */
window.goBack = function(){
    document.body.classList.remove("show");

    setTimeout(()=>{
        window.location.href = "menu.html";
    },300);
};

/* ========================
   INIT
======================== */
function init(){

    const gallery = document.getElementById("gallery");

    if(!gallery){
        console.error("Gallery tidak ditemukan");
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const folder = params.get("id") || "default";

    loadImages(folder);

    /* ========================
       LOAD IMAGES
    ======================== */
    async function loadImages(folder){
        gallery.innerHTML = "";

        try {
            const { data, error } = await supabase
                .storage
                .from("images")
                .list(folder);

            if(error){
                console.warn("LIST ERROR:", error);
            }

            if(data){
                data.forEach(file => {
                    if(!file.name) return;

                    const { data: urlData } = supabase
                        .storage
                        .from("images")
                        .getPublicUrl(folder + "/" + file.name);

                    const img = document.createElement("img");
                    img.src = urlData.publicUrl;
                    img.onclick = () => showPopup(urlData.publicUrl);

                    gallery.appendChild(img);
                });
            }

        } catch (err) {
            console.warn("SUPABASE ERROR:", err);
        }

        createUploadBox(folder);
    }

    /* ========================
       UPLOAD BOX
    ======================== */
    function createUploadBox(folder){

        const box = document.createElement("div");
        box.className = "img-placeholder";
        box.innerText = "add image";

        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.style.display = "none";

        box.onclick = () => input.click();

        input.onchange = async (e) => {
            const file = e.target.files[0];
            if(!file) return;

            const fileName = Date.now() + "-" + file.name;

            try {
                const { error } = await supabase
                    .storage
                    .from("images")
                    .upload(folder + "/" + fileName, file);

                if(error){
                    console.error(error);
                    alert("Upload gagal");
                    return;
                }

                loadImages(folder);

            } catch (err) {
                console.error("UPLOAD ERROR:", err);
            }
        };

        gallery.appendChild(box);
        gallery.appendChild(input);
    }

    /* ========================
       POPUP
    ======================== */
    window.showPopup = function(src){
        document.getElementById("popup").style.display = "flex";
        document.getElementById("popupImg").src = src;
    }

    window.closePopup = function(){
        document.getElementById("popup").style.display = "none";
    }
}