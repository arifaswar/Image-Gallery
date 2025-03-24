const gallery = document.getElementById('gallery');

const images = [
    "https://shopee.co.id/inspirasi-shopee/wp-content/uploads/2018/05/Bella.jpg",
    "https://static.promediateknologi.id/crop/0x141:1080x854/750x500/webp/photo/p1/1064/2024/07/28/laudyacynthiabelaa-20240728-0002-1487618211.jpg",
    "https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/ayobandung/images-bandung/post/articles/2019/12/08/72516/laudya_cynthia_bella.jpg",
    "https://lh3.googleusercontent.com/proxy/FfQMK4YUbZ4ZPVRAA_OQOafbVyZm0-71c48jf7tqkh1aQ_ugXZ6Rf1p72S_llLS3NuIqNogzAE-CwklT5kIkkgpxu0MYYMseAf_bS-m_8iE_vkPcVUOgufsPKJeoGcp9I8bi2kV4CzKek8k-_urnJCHZDSxs3sI4SLesM03HNCvcpeMNX5DpgE6RDaDJmq7BWyZp7uLrBATR8n73ckoayOIlbaQu-qLT0U4PSzQ",
    "https://i.pinimg.com/736x/89/0c/b9/890cb9b58489128d045b21d75232efda.jpg",
    "https://cdn.timesmedia.co.id/images/2020/07/06/Laudya-Chintya-Bella.jpg"
];
images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.onclick = () => openModal(src);
    gallery.appendChild(img);
});
function openModal(src) {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('modalImg').src = src;
}
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}
async function generateAIImage(){
    const prompt = document.getElementById('prompt').value;
    if(!prompt) return alert('Masukkan deskripsi gambar terlebih dahulu!');

    try {
        const response = await fetch("http://localhost:3000/generate-image", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt})
        });
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error.message);
        }
        const aiImage = data.imageUrl

        const img = document.getElementById("img");
        img.src = aiImage;
        img.onclick = () => openModal(aiImage);
        gallery.appendChild(img);
    } catch (error) {
        console.log(error);
        alert('Terjadi kesalahan saat mengambil gambar dari AI!');
    }
}