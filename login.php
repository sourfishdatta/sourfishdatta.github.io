<?php include('server.php') ?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>ACS Login</title>
        <link rel="stylesheet" href="index(2).css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="icon" type="image/x-icon" href="https://upload.wikimedia.org/wikipedia/commons/e/e2/Acs_favicon.png">
        <script src="https://kit.fontawesome.com/e07ccf7e6a.js" crossorigin="anonymous"></script>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000&display=swap" rel="stylesheet">
                
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
                    <li><a href="#">ACS Live</a></li>
                    <li><a href="#">Resources</a></li>
                    <li><a href="index(2).html">Sign In</a></li>
                </ul>
            </nav>
        </header>
    
        <center><div class="center">
            <br>
          <form method="post" action="login.php">
          <?php include('errors.php'); ?>
            <h1>ACS Sign In</h1>
            
        
        <div class="txt_field input-group">
            <input type="text" required name="fullname">
            <span></span>
            <label><i class="fa-solid fa-user"></i>&nbsp; Full Name</label>
          </div>
           <div class="txt_field input-group">
        <input type="text" required font-family: 'Montserrat', sans-serif; name="email">
          <span></span>
          <label><i class="fa-solid fa-envelope"></i>&nbsp;  Email</label>
    
        </div>
    
        <div class="txt_field input group">
          <input type="password" required id="mtInput" name="password">
          <span></span>
          <label><i class="fa-solid fa-key"></i> &nbsp; Password</label>
        </div>

    
        <input type="submit" value="Sign In" class="btn" name="login_user">
        <div class="signup_link">
          Not a member?<a href="register.php"> Sign Up!</a>
        </div>
      </form>
        </div>
        </div>
        </center>
        </body>
        </html>
    