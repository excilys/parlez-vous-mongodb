<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>What a wonderful home page</title>
	</head>

	<body>
		%if (user != None):
		<h1>Bonjour {{user['firstname']}}</h1>
		%end
		
		<p>Recherchez un media par son titre</p>
		<form method="post" action="/display-media/">
			<label for="title_input">Titre : </label>
			<input type="text" name="title" id="title_input" />

			<input type="submit" value="soumettre" />
		</form>
	</body>
</html>

