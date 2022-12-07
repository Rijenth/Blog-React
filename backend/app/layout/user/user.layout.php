<?php

// Check if user is logged in
if (!isset($_SESSION['user'])) {
    header("Location: /login");
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
    <a href="/logout" class="logout-btn">
        Logout
    </a>
    <main id="user-page">
        <h1>User profile</h1>
        <div id="user-card">

        </div>
        <a href="/">Home</a>
    </main>
    <script>
    let notFound = false;
    let username;
    let email;
    let firstName;
    let lastName;
    let gender;

    let userId = <?php echo $args['userId'] ?>;
    let url = `/api/user/${userId}`;




    // if json parse fails, it means the user was not found
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                notFound = true;
                throw new Error(data.error);
            }
            username = data.username;
            email = data.email;
            firstName = data.firstName;
            lastName = data.lastName;
            gender = data.gender;
            createProfile();
        })
        .catch((error) => {
            if (notFound) {
                console.log("User not found");
            } else {
                console.log(error);
            }
        });

    function createProfile() {
        const userPage = document.getElementById("user-card");

        const profile = document.createElement("div");
        profile.classList.add("profile");

        const profileUsername = document.createElement("p");
        profileUsername.classList.add("profile-username");
        profileUsername.innerText = 'Username: ' + username;

        const profileEmail = document.createElement("p");
        profileEmail.classList.add("profile-email");
        profileEmail.innerText = 'Email: ' + email;

        const profileFirstName = document.createElement("p");
        profileFirstName.classList.add("profile-first-name");
        profileFirstName.innerText = 'First name: ' + firstName;

        const profileLastName = document.createElement("p");
        profileLastName.classList.add("profile-last-name");
        profileLastName.innerText = 'Last name: ' + lastName;

        const profileGender = document.createElement("p");
        profileGender.classList.add("profile-gender");
        profileGender.innerText = 'Gender: ' + gender;

        profile.appendChild(profileUsername);
        profile.appendChild(profileEmail);
        profile.appendChild(profileFirstName);
        profile.appendChild(profileLastName);
        profile.appendChild(profileGender);

        userPage.appendChild(profile);

        console.log("Profile created");
    }
    </script>
</body>

</html>