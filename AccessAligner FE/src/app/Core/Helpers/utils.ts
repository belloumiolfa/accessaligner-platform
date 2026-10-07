function loggedInUser(): any {
  let user = JSON.parse(sessionStorage.getItem("currentUser")!);

  if (user?.accessToken !== undefined) return user?.accessToken;
  else return JSON.parse(sessionStorage.getItem("currentUser")!);
}

function signInUser(token: string, keepLoggedIn: boolean) {
  if (keepLoggedIn) {
    localStorage.setItem("currentUser", JSON.stringify(token));
  } else sessionStorage.setItem("currentUser", JSON.stringify(token));
}

function logOut() {
  sessionStorage.removeItem("currentUser");
  localStorage.removeItem("currentUser");
}

// Generate strong random password

function getRandomChar(charset: string) {
  var randomIndex = Math.floor(Math.random() * charset.length);
  return charset.charAt(randomIndex);
}

function shuffleString(str: string) {
  var array = str.split("");
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array.join("");
}
function generateStrongPassword(): string {
  var lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  var uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var numericChars = "0123456789";
  var specialChars = "!@#$%^&*()-_+=~`[]{}|;:,.<>?";

  var allChars = lowercaseChars + uppercaseChars + numericChars + specialChars;

  var password = "";

  // Ensure at least one character from each set is included
  password += getRandomChar(lowercaseChars);
  password += getRandomChar(uppercaseChars);
  password += getRandomChar(numericChars);
  password += getRandomChar(specialChars);
  if (password.length < 8) {
    // Fill the rest of the password length randomly
    var remainingLength = 8 - password.length; // ensure at least 8 characters
    for (var i = 0; i < remainingLength; i++) {
      password += getRandomChar(allChars);
    }
  }
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).+$/;
  if (!regex.test(password)) {
    // If it doesn't match, generate another password
    return generateStrongPassword();
  }
  // Shuffle the password to ensure the special characters are not just at the end
  /*   password = shuffleString(password);
   */
  return password;

  // Shuffle the password to ensure the special characters are not just at the end
  password = shuffleString(password);
  return password;
}
const mandotorylFiles = [
  "smileExp",
  "overview",
  "closedRightLatOcc",
  "jawOccView",
  "vestClosedOcc",
  "closedLeftLatOCC",
  "supMaxiOcc",
];
function isTreatmentCompleted(treat: any): boolean {
  console.log(treat);

  let hasNull = false;
  for (let key in treat) {
    if (
      treat.hasOwnProperty(key) &&
      key in
        [
          "antCross",
          "classI",
          "crowding",
          "extract",
          "gap",
          "overbite",
          "treat",
          "postCross",
          "reduceOverbite",
        ]
    ) {
      if (treat[key] === null) {
        hasNull = true;
        break;
      }
    }
  }

  if (checkFiles(treat.photos) && !hasNull) {
    return true;
  } else {
    return false;
  }
}

// function to test the photos obligatoire added or not
function checkFiles(files: File[]) {
  console.log(files);

  const missingFiles: string[] = [];
  mandotorylFiles.forEach((mandotoryFile) => {
    const fileExists = files.some(
      (file) => file.name.split(".")[0] === mandotoryFile
    );
    if (!fileExists) {
      missingFiles.push(mandotoryFile);
    }
  });
  console.log("checkFiles= ", missingFiles);

  return missingFiles.length > 0 ? false : true;
}
export {
  loggedInUser,
  signInUser,
  logOut,
  generateStrongPassword,
  checkFiles,
  isTreatmentCompleted,
  mandotorylFiles,
};
