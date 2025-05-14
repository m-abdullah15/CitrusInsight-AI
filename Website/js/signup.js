let container = document.getElementById("container");

toggle = () => {
  container.classList.toggle("sign-in");
  container.classList.toggle("sign-up");
};

setTimeout(() => {
  container.classList.add("sign-up");
}, 200);
document.getElementById("signupForm").addEventListener("submit", function(e) {
    const name = document.querySelector("input[name='name']").value.trim();
    const username = document.querySelector("input[name='username']").value.trim();
    const email = document.querySelector("input[name='email']").value.trim();
    const password = document.querySelector("input[name='password']").value;
    const confirmPassword = document.querySelector("input[name='conpassword']").value;

    // Regex patterns
    const nameRegex = /^[A-Za-z\s]+$/;
    const usernameRegex = /^\S+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    // Clear previous error messages
    document.getElementById("nameError").innerText = "";
    document.getElementById("usernameError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("passwordError").innerText = "";
    document.getElementById("confirmPasswordError").innerText = "";

    let isValid = true;

    // Name validation
    if (!nameRegex.test(name)) {
        document.getElementById("nameError").innerText = "Only letters and spaces allowed.";
        isValid = false;
    }

    // Username validation
    if (!usernameRegex.test(username)) {
        document.getElementById("usernameError").innerText = "Username must not contain spaces.";
        isValid = false;
    }

    // Email validation
    if (!emailRegex.test(email)) {
        document.getElementById("emailError").innerText = "Only Gmail addresses are allowed (e.g., example@gmail.com).";
        isValid = false;
    }

    // Password length
    if (password.length < 6) {
        document.getElementById("passwordError").innerText = "Password must be at least 6 characters.";
        isValid = false;
    }

    // Confirm password match
    if (password !== confirmPassword) {
        document.getElementById("confirmPasswordError").innerText = "Passwords do not match.";
        isValid = false;
    }

    // Prevent submission if invalid
    if (!isValid) {
        e.preventDefault();
    }
});
