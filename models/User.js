const db = require("../config/dbConfig");
const bcrypt = require("bcrypt");

const validateEmail = (email) => {
  const re =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return re.test(String(email).toLowerCase());
};

const createUser = async (username, email, password, callback) => {
  let errors = { username: "", email: "", password: "" };

  if (!username) errors.username = "Please enter an username";
  if (!email) errors.email = "Please enter an email";
  if (!validateEmail(email)) errors.email = "Invalid email format.";
  if (!password) errors.password = "Please enter your password";
  if (password.length < 6)
    errors.password = "Password must be at least 6 characters long.";

  // Jika ada error validasi, kirim error tanpa melanjutkan eksekusi
  if (errors.username || errors.email || errors.password) {
    return callback({ message: "Validation failed", errors });
  }

  const lowerCaseEmail = email.toLowerCase();

  try {
    const userSnapshot = await db
      .collection("users")
      .where("email", "==", lowerCaseEmail)
      .get();

    if (!userSnapshot.empty) {
      return callback({
        message: "Email already registered",
        errors: { email: "Email already registered" },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserRef = db.collection("users").doc();
    await newUserRef.set({
      username,
      email: lowerCaseEmail,
      password: hashedPassword,
    });

    callback(null, {
      message: "User created successfully!",
      id: newUserRef.id, // Mengembalikan id dari Firestore
      username,
      email: lowerCaseEmail,
    });
  } catch (error) {
    callback(error);
  }
};

const loginUser = async (email, password, callback) => {
  let errors = { email: "", password: "" };

  if (!email) errors.email = "Please enter an email";
  if (!validateEmail(email)) errors.email = "Invalid email format.";
  if (!password) errors.password = "Please enter your password";

  // Jika ada error validasi, kirim error tanpa melanjutkan eksekusi
  if (errors.email || errors.password) {
    return callback({ message: "Validation failed", errors });
  }

  const lowerCaseEmail = email.toLowerCase();

  try {
    const userSnapshot = await db
      .collection("users")
      .where("email", "==", lowerCaseEmail)
      .get();

    if (userSnapshot.empty) {
      return callback({
        message: "Invalid login credentials",
        errors: { email: "Email not found" },
      });
    }

    const userData = userSnapshot.docs[0].data();
    const hashedPassword = userData.password;

    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      return callback({
        message: "Invalid login credentials",
        errors: { password: "Incorrect password" },
      });
    }

    callback(null, { id: userSnapshot.docs[0].id, email: userData.email });
  } catch (error) {
    callback(error);
  }
};

module.exports = { createUser, loginUser };
