<!DOCTYPE html>
<html>
<head>
    <title>Welcome</title>
</head>
<body>
    <h2>Login Successful!</h2>
    <p><strong>Name:</strong> <%= request.getAttribute("userName") %></p>
    <p><strong>Email:</strong> <%= request.getAttribute("userEmail") %></p>
    <p><strong>Phone:</strong> <%= request.getAttribute("userPhone") %></p>
</body>
</html>