// ================= IMPORT FIREBASE =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// ================= FIREBASE CONFIG =================
const firebaseConfig = {
  apiKey: "AIzaSyBzcquzZL7lbwYvyg0xt1DJEzSiD_4O7V8",
  authDomain: "practice-e1b05.firebaseapp.com",
  projectId: "practice-e1b05",
  storageBucket: "practice-e1b05.firebasestorage.app",
  messagingSenderId: "1038176299513",
  appId: "1:1038176299513:web:e0ecabe461393115003528",
  measurementId: "G-D1ECTVLJFM"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ================= LOGIN =================
document.getElementById("loginForm").addEventListener("submit", function(e){
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("✅ Login Successful");
      document.getElementById("loginModal").style.display = "none";
    })
    .catch((error) => {
      alert("❌ Login Error: " + error.message);
    });
});

// ================= SIGNUP =================
document.getElementById("signupForm").addEventListener("submit", function(e){
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("🎉 Signup Successful! You can now login.");
      document.getElementById("signupModal").style.display = "none";
    })
    .catch((error) => {
      alert("❌ Signup Error: " + error.message);
    });
});

// ================= NAVBAR ELEMENTS =================
const authButtons = document.getElementById("authButtons");
const userMenu = document.getElementById("userMenu");
const userAvatar = document.getElementById("userAvatar");
const avatarBtn = document.getElementById("avatarBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const logoutBtn = document.getElementById("logoutBtn");

// Toggle dropdown
avatarBtn.addEventListener("click", () => {
  dropdownMenu.classList.toggle("show");
});

// Logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

// ================= USER STATE =================
onAuthStateChanged(auth, (user) => {
  if (user) {
    authButtons.classList.add("hidden");
    userMenu.classList.remove("hidden");
    userAvatar.src = user.photoURL || "tayyab.jpeg";
  } else {
    authButtons.classList.remove("hidden");
    userMenu.classList.add("hidden");
    dropdownMenu.classList.remove("show");
  }
});

// ================= MOBILE MENU =================
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("show");
});

// ================= LOGIN MODAL =================
const loginModal = document.getElementById("loginModal");
const openLogin = document.getElementById("openLogin");
const openLoginMobile = document.getElementById("openLoginMobile");
const closeLogin = document.getElementById("closeModal");

openLogin.addEventListener("click", (e) => { e.preventDefault(); loginModal.style.display = "block"; });
openLoginMobile.addEventListener("click", (e) => { e.preventDefault(); loginModal.style.display = "block"; });
closeLogin.addEventListener("click", () => { loginModal.style.display = "none"; });
window.addEventListener("click", (e) => { if (e.target === loginModal) loginModal.style.display = "none"; });

// ================= SIGNUP MODAL =================
const signupModal = document.getElementById("signupModal");
const openSignupBtns = document.querySelectorAll(".signup");
const closeSignup = document.getElementById("closeSignup");

openSignupBtns.forEach(btn => btn.addEventListener("click", (e) => {
  e.preventDefault();
  signupModal.style.display = "block";
}));
closeSignup.addEventListener("click", () => { signupModal.style.display = "none"; });
window.addEventListener("click", (e) => { if (e.target === signupModal) signupModal.style.display = "none"; });



console.log("Hello");
