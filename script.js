function toggleMenu() {
    document.querySelector(".navbar").classList.toggle("active");
}

// ================= CART =================
function openCart() {
    document.getElementById("cartPanel").classList.add("active");
}

function closeCart() {
    document.getElementById("cartPanel").classList.remove("active");
}

// ================= TOAST =================
function showToast(msg) {
    let toast = document.getElementById("toast");
    toast.innerText = msg;
    toast.style.display = "block";

    setTimeout(() => {
        toast.style.display = "none";
    }, 1300);
}

// ================= TOTAL =================
let total = 0;

function updateTotal() {
    document.getElementById("totalPrice").innerText = "Total: $" + total.toFixed(2);
}

// ================= ADD TO CART =================
document.querySelectorAll(".cart-btn").forEach(btn => {
    btn.addEventListener("click", function(e) {
        e.preventDefault();

        let product = this.closest(".box");

        let name = product.querySelector("h3").innerText;
        let priceText = product.querySelector(".price").innerText;
        let img = product.querySelector("img").src;

        // ✅ FIXED: remove everything except numbers and dot
        let price = parseFloat(priceText.replace(/[^0-9.]/g, ""));

        total += price;
        updateTotal();

        document.getElementById("emptyMsg").style.display = "none";

        let cartItem = document.createElement("div");
        cartItem.classList.add("item");

        cartItem.innerHTML = `
            <img src="${img}">
            <div style="flex:1;">
                <h4>${name}</h4>
                <p>$${price.toFixed(2)}</p>
            </div>
            <button class="remove-btn">❌</button>
        `;

        cartItem.querySelector(".remove-btn").addEventListener("click", function() {
            cartItem.remove();
            total -= price;
            updateTotal();

            if (document.getElementById("cartItems").children.length === 1) {
                document.getElementById("emptyMsg").style.display = "block";
            }
        });

        document.getElementById("cartItems").appendChild(cartItem);

        showToast("Added to cart 🛒");
        openCart();
    });
});

// ================= FAVORITES =================
document.querySelectorAll(".fa-heart").forEach(btn => {
    btn.addEventListener("click", function(e) {
        e.preventDefault();

        let popup = document.getElementById("favPopup");
        popup.classList.add("show");

        setTimeout(() => {
            popup.classList.remove("show");
        }, 800);
    });
});

// ================= CHECKOUT =================
function checkout() {
    let loading = document.getElementById("loading");
    let success = document.getElementById("successPopup");

    loading.style.display = "block";

    setTimeout(() => {
        loading.style.display = "none";

        if (success) {
            success.classList.add("show");
        }

        setTimeout(() => {
            if (success) {
                success.classList.remove("show");
            }
        }, 1200);

        document.getElementById("cartItems").innerHTML =
            '<p id="emptyMsg">Your cart is empty 😭</p>';

        total = 0;
        updateTotal();

        closeCart();

    }, 1000);
}

function sendMessage() {
    alert("Message sent successfully!");
}

let currentReview = 0;
const reviews = document.querySelectorAll(".review-box");

function showReview(index){
    reviews.forEach(r => r.classList.remove("active"));
    reviews[index].classList.add("active");
}

function nextReview(){
    currentReview++;
    if(currentReview >= reviews.length){
        currentReview = 0;
    }
    showReview(currentReview);
}

function prevReview(){
    currentReview--;
    if(currentReview < 0){
        currentReview = reviews.length - 1;
    }
    showReview(currentReview);
}

/* AUTO SLIDE */
let autoSlide = setInterval(nextReview, 3000);

/* PAUSE ON HOVER */
const reviewSection = document.querySelector(".review-container");

reviewSection.addEventListener("mouseenter", () => {
    clearInterval(autoSlide);
});

reviewSection.addEventListener("mouseleave", () => {
    autoSlide = setInterval(nextReview, 3000);
});

