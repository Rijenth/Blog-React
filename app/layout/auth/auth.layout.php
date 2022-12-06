<?php
// check if the user is logged in
if (isset($_SESSION['user'])) {
    header("Location: /");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        <? echo $args['pageTitle'] ?>
    </title>
    <link rel="stylesheet" href="../../styles/globals.css" />
</head>

<body>

    <main id="auth_page">
        <div class="img-wrapper">
            <!-- The img use the unsplash api -->
            <img src="https://source.unsplash.com/random/1920x1080" alt="background image">
        </div>
        <div class="form-wrapper">
            <!-- Un des deux formulaire dispo dans components/form -->
            <?
            require_once $args['authForm'];
            ?>
        </div>
    </main>
    <script>
    <?php
        // import js from ./auth.layout.js
        require_once './auth.layout.js';
        ?>
    </script>

</body>

</html>