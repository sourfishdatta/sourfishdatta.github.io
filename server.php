<?php

// initializing variables
$fullname = "";
$email = "";
$password = "";
$errors = array(); 

// connect to the database
$db = mysqli_connect('localhost', 'root', '', 'project');

// Check connection
if (!$db) {
    die("Connection failed: " . mysqli_connect_error());
}

// REGISTER USER
if (isset($_POST['reg_user'])) {
    // receive all input values from the form
    $fullname = mysqli_real_escape_string($db, $_POST['fullname']);
    $email = mysqli_real_escape_string($db, $_POST['email']);
    $password = mysqli_real_escape_string($db, $_POST['password']);

    // form validation: ensure that the form is correctly filled ...
    // by adding (array_push()) corresponding error unto $errors array
    if (empty($fullname)) { array_push($errors, "Full Name is required"); }
    if (empty($email)) { array_push($errors, "Email is required"); }
    if (empty($password)) { array_push($errors, "Password is required"); }

    // first check the database to make sure 
    // a user does not already exist with the same email
    $user_check_query = "SELECT * FROM users WHERE email='$email' LIMIT 1";
    $result = mysqli_query($db, $user_check_query);
    if ($result) {
        $user = mysqli_fetch_assoc($result);
        if ($user) { // if user exists
            if ($user['email'] === $email) {
                array_push($errors, "Email already exists");
            }
        }
    } else {
        die('Query failed: ' . mysqli_error($db));
    }

    // Finally, register user if there are no errors in the form
    if (count($errors) == 0) {

        $query = "INSERT INTO users (fullname, email, password) 
                  VALUES('$fullname', '$email', '$password')";
        if (mysqli_query($db, $query)) {
            $_SESSION['email'] = $email;
            $_SESSION['success'] = "You are now logged in";
            header('location: done.php');
            exit(); // Ensure no further output after header redirect
        } else {
            die('Query failed: ' . mysqli_error($db));
        }
    }
}

// LOGIN USER
if (isset($_POST['login_user'])) {
    $fullname = mysqli_real_escape_string($db, $_POST['fullname']);
    $email = mysqli_real_escape_string($db, $_POST['email']);
    $password = mysqli_real_escape_string($db, $_POST['password']);

    if (empty($email)) {
        array_push($errors, "Email is required");
    }
    if (empty($password)) {
        array_push($errors, "Password is required");
    }
    if (empty($fullname)) {
        array_push($errors, "Fullname is required");
    }

    if (count($errors) == 0) {
        $query = "SELECT * FROM users WHERE fullname='$fullname' AND email='$email' AND password='$password'";
        $results = mysqli_query($db, $query);

        if (mysqli_num_rows($results) == 1) {
            $_SESSION['email'] = $email;
            $_SESSION['success'] = "You are now logged in";
            header('location: done.php'); // Redirect to your desired location upon successful login
            exit(); // Ensure no further output after header redirect
        } else {
            array_push($errors, "Wrong email/password combination");
        }
    }
}

?>
