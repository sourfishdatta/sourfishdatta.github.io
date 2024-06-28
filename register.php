<?php include('server.php') ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ACS Sign Up</title>
    <link rel="stylesheet" href="index(2).css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="icon" type="image/x-icon" href="https://upload.wikimedia.org/wikipedia/commons/e/e2/Acs_favicon.png">
    <script src="https://kit.fontawesome.com/e07ccf7e6a.js" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000&display=swap" rel="stylesheet">
    <style>
        /* Add your custom styles here */
        input[type="submit"]{
    width: 100%;
    height: 50px;
    border: 1px solid;
    backdrop-filter: blur(40px);
    background: url("https://images.pexels.com/photos/14826482/pexels-photo-14826482.jpeg?cs=srgb&dl=pexels-kaandurmus-14826482.jpg&fm=jpg");
    border-radius: 25px;
    font-size: 18px;
    color: #e9f4fb;
    font-weight: 700;
    cursor: pointer;
    outline: none;
    }
    input[type="submit"]:hover{
    border-color: #3a3a3a;
    transition:.5s;
    font-family: 'DM Sans', sans-serif;
    }
    input[type="submit"]{
        
        font-family: 'DM Sans', sans-serif;
        }
        body {
            font-family: 'DM Sans', sans-serif;
        }
        .header-content {
            display: flex;
            align-items: center;
        }
        .logo-image img {
            width: 50px;
            height: 50px;
        }
        .logo-text a {
            text-decoration: none;
            color: black;
            font-weight: bold;
            font-size: 1.5rem;
        }
        nav ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
        }
        nav ul li {
            margin: 0 10px;
        }
        nav ul li a {
            text-decoration: none;
            color: black;
            font-weight: bold;
            font-size: 1.2rem;
        }
       </style>
</head>
<body>
    <header>
        <div class="header-content">
            <div class="logo-image">
                <a href="index.html">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Asc_large.png" alt="ACS Logo">
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
                <li><a href="#">ACS Live</a></li>
                <li><a href="#">Resources</a></li>
                <li><a href="index(2).html">Sign In</a></li>
            </ul>
        </nav>
    </header>
    <center>
        <div class="center">
            <h1>ACS Sign Up</h1>
            <form method="post" action="register.php">
                <?php include('errors.php'); ?>
                
                <div class="txt_field">
                    <input type="text" name="fullname" id="fullname" value="<?php echo htmlspecialchars($fullname); ?>" required>
                    <label for="fullname"><i class="fas fa-user"></i>&nbsp; Full Name</label>
                </div>
                <div class="txt_field">
                    <input type="email" name="email" value="<?php echo htmlspecialchars($email); ?>" required>
                    <label for="email"><i class="fas fa-envelope"></i>&nbsp; Email</label>
                </div>
                <div class="txt_field">
                    <input type="password" name="password" required >
                    <label for="password"><i class="fas fa-key"></i>&nbsp; Password</label>
                </div>
                <button type="submit" class="btn" name="reg_user">Register</button>
                <div class="signup_link">
                    Already a member? <a href="login.php">Login!</a>
                </div>
            </form>
        </div>
    </center>
    <script>
        var form = document.getElementById('sheetdb-form');
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            fetch(form.action, {
                method: "POST",
                body: new FormData(form),
            }).then(
                function(response) {
                    return response.json();
                }
            ).then(function(html) {
                window.location.href = 'index(7).html';
            });
        });
    </script>
</body>
</html>
