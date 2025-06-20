var btnSignUp = document.querySelector(".signedSucsses");
var btnSignIn = document.querySelector(".haveAcount");
var logInPage = document.getElementById("logIn");
var SignUpPage = document.getElementById("signUp");
var btnLogout = document.querySelector(".mybtn");
var btnLogin = document.querySelector(".btnLogin");

if (btnLogin) {
  btnLogin.addEventListener("click", function (e) {
    e.preventDefault();

    var loginEmail = document.getElementById("exampleInputEmail1").value.trim();
    var loginPassword = document
      .getElementById("exampleInputPassword1")
      .value.trim();
    var loginEmailfocus = document.getElementById("exampleInputEmail1");
    var loginPasswordfocus = document.getElementById("exampleInputPassword1");

    loginEmailfocus.addEventListener("focus", function () {
      var btnLoginInvalid = document.querySelector(".btnLoginInvalid");
      btnLoginInvalid.classList.replace("d-block", "d-none");
    });
    loginPasswordfocus.addEventListener("focus", function () {
      var btnLoginInvalid = document.querySelector(".btnLoginInvalid");
      btnLoginInvalid.classList.replace("d-block", "d-none");
    });

    var users = JSON.parse(localStorage.getItem("users")) || [];

    var isValidUser = users.some(function (user) {
      return user.email === loginEmail && user.password === loginPassword;
    });

    if (isValidUser) {
      // لو البيانات صح، روح للصفحة

      localStorage.setItem("loggedInEmail", loginEmail);
      localStorage.setItem("loggedInPassword", loginPassword);
      window.location.href = "welcom.html";
    } else {
      var btnLoginInvalid = document.querySelector(".btnLoginInvalid");
      btnLoginInvalid.classList.replace("d-none", "d-block");
    }
  });
}

if (btnLogout) {
  btnLogout.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("loggedInEmail");
    localStorage.removeItem("loggedInPassword");

    goToPage();
  });
}

btnSignUp.addEventListener("click", function (e) {
  e.preventDefault();

  logInPage.classList.add("d-none");
  SignUpPage.classList.replace("d-none", "d-block");
});

btnSignIn.addEventListener("click", function (e) {
  e.preventDefault();
  SignUpPage.classList.add("d-none");
  logInPage.classList.replace("d-none", "d-block");
});

function goToPage() {
  window.location.href = "index.html";
}
function goToWelcomePage() {
  window.location.href = "welcom.html";
}

// الريجيكس
var nameRegex = /^[A-Za-z\u0600-\u06FF\s]{3,}$/;
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// عناصر الإدخال والرسائل
var userName = document.getElementById("userName");
var userEmail = document.getElementById("InputEmail1");
var passWord = document.getElementById("InputPassword1");

var validName = document.querySelector(".validName");
var validEmail = document.querySelector(".validEmail");
var validPassword = document.querySelector(".validPassword");

// * دى علشان امسح كلمة succces  بمجرد مايبدا يدخل بيانات جديدة
userEmail.addEventListener("focus", function () {
  displayrequred();
});
passWord.addEventListener("focus", function () {
  displayrequred();
});
userName.addEventListener("focus", function () {
  displayrequred();
});

function displayrequred() {
  var succes = document.getElementById("succes");
  succes.classList.replace("d-block", "d-none");
  var required = document.getElementById("required");
  required.classList.replace("d-block", "d-none");
}

// ^ دوال الفحص اللحظي

userName.addEventListener("input", function () {
  if (nameRegex.test(userName.value.trim())) {
    validName.classList.replace("d-block", "d-none");
  } else {
    validName.classList.replace("d-none", "d-block");
  }
});

userEmail.addEventListener("input", function () {
  if (emailRegex.test(userEmail.value.trim())) {
    validEmail.classList.replace("d-block", "d-none");
  } else {
    validEmail.classList.replace("d-none", "d-block");
  }
});

passWord.addEventListener("input", function () {
  if (passwordRegex.test(passWord.value.trim())) {
    validPassword.classList.replace("d-block", "d-none");
  } else {
    validPassword.classList.replace("d-none", "d-block");
  }
});

validateBtn.addEventListener("click", function (e) {
  e.preventDefault();

  var nameVal = userName.value.trim();
  var emailVal = userEmail.value.trim();
  var passVal = passWord.value.trim();

  if (!nameVal || !emailVal || !passVal) {
    var required = document.getElementById("required");
    required.classList.replace("d-none", "d-block");
    return;
  }

  if (
    !nameRegex.test(nameVal) ||
    !emailRegex.test(emailVal) ||
    !passwordRegex.test(passVal)
  ) {
    var required = document.getElementById("required");
    required.classList.replace("d-none", "d-block");
    return;
  }

  // 2. الحصول على المستخدمين من localStorage
  var users = JSON.parse(localStorage.getItem("users")) || [];

  // 3. التحقق من التكرار في الاسم أو الإيميل
  var isDuplicate = users.some(function (user) {
    return user.name === nameVal || user.email === emailVal;
  });

  if (isDuplicate) {
    var used = document.getElementById("used");
    used.classList.replace("d-none", "d-block");
    return;
  }

  // 4. إضافة المستخدم الجديد
  users.push({
    name: nameVal,
    email: emailVal,
    password: passVal,
  });

  // 5. حفظهم في localStorage
  localStorage.setItem("users", JSON.stringify(users));

  // 6. تفريغ الحقول
  userName.value = "";
  userEmail.value = "";
  passWord.value = "";
  var succes = document.getElementById("succes");
  succes.classList.replace("d-none", "d-block");
});

var users = JSON.parse(localStorage.getItem("users")) || [];

var email = localStorage.getItem("loggedInEmail");
var password = localStorage.getItem("loggedInPassword");

var matchedUser = users.find(function (user) {
  return user.email === email && user.password === password;
});
