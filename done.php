<?php 
session_start();

// Initialize $db connection (assuming you have a separate server.php for database connection)
include('server.php'); // Adjust path if necessary

// Check if user is logged in
if (isset($_SESSION['email'])) {
    // Query to fetch user's full name based on email
    $email = $_SESSION['email'];
    $query = "SELECT fullname FROM users WHERE email='$email'";
    $result = mysqli_query($db, $query); // Use $db which should be initialized in server.php

    if ($result) {
        $user = mysqli_fetch_assoc($result);
        if ($user) {
            $fullname = $user['fullname'];
        } else {
            $fullname = "Guest"; // Default name if user not found
        }
    } else {
        // Handle query error
        echo "Query error: " . mysqli_error($db);
        // You might want to redirect or display an error message here
    }
} else {
    $fullname = "Guest"; // Default name if not logged in
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>American Crossword Society</title>
    <link rel="stylesheet" href="index.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="icon" type="image/x-icon" href="https://upload.wikimedia.org/wikipedia/commons/e/e2/Acs_favicon.png">
    <script src="https://kit.fontawesome.com/e07ccf7e6a.js" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet">
</head>
<body>
    <header>
        <div class="header-content">
            <div class="logo-image">
                <a href="index.html">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Asc_large.png" alt="ACS Logo" style="width:50px;height:50px;">
                </a>
            </div>
            <div class="logo-text">
                <a href="index.html">American Crossword Society</a>
            </div>
        </div>
        <nav>
            <ul>
                
                <li><a href="#">Daily</a></li>
                <li><a href="#">Forums</a></li>
                <li><a href="index(1).html">Tournaments</a></li>
                <li><a href="index(4).html">ACS Live</a></li>
                <li><a href="#">Resources</a></li>
                <!-- Check if logged in, show full name or guest -->
                <li><a href="login.php"><?php echo isset($_SESSION['email']) ? $fullname : 'Sign In'; ?></a></li>
            </ul>
        </nav>
    </header>

    <main>
    <main>
    <section class="intro">
        <?php if (isset($_SESSION['email'])) : ?>
            <h1>Welcome, <?php echo $fullname; ?></h1>
            <p>Your ultimate destination for crossword enthusiasts.</p>
            <button><a href="#">Play the Daily</a></button>
            <button><a href="index(1).html">Upcoming Tournaments</a></button>
        <?php else : ?>
            <h1>Welcome to the American Crossword Society</h1>
            <p>Your ultimate destination for crossword enthusiasts.</p>
            <button><a href="#">Play the Daily</a></button>
            <button><a href="index(1).html">Upcoming Tournaments</a></button>
        <?php endif; ?>
        <h2>About</h2>
        <div class="uno">
            <p class="child">The American Crossword Society was started in 2024 by 13-year-old crossword enthusiast Sourish Datta. Motivated by a desire to foster a community for crossword enthusiasts like himself, Sourish took the initiative to establish an organization that would unite puzzle solvers of America.</p>
            <img src="https://images.pexels.com/photos/13533591/pexels-photo-13533591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
            <p class="child">Doing crosswords keeps your mind sharp, enhancing vocabulary, memory, and problem-solving skills. It provides mental stimulation, a sense of accomplishment, and relaxation, helping to maintain cognitive health and agility. Plus, it's a fun way to challenge yourself and learn daily.</p>
        </div>
    </section>
</main>


    </main>

    <footer>
        <div class="socials">
            <a href="https://www.instagram.com/cubingsimplified/" target="_blank">
                <i class="fa-brands fa-instagram" alt="Instagram"></i>
            </a>
            <a href="https://discord.gg/SeEMV3dsN4" target="_blank">
                <i class="fa-brands fa-discord" alt="Discord"></i>
            </a>
            <a href="https://github.com/CubingSimplified" target="_blank">
                <i class="fa-brands fa-github" alt="GitHub"></i>
            </a>
        </div>
    </footer>
</body>
</html>
