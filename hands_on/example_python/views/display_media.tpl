<!DOCTYPE html>
<html>
        <head>
		<meta charset="utf-8" />

		%if (media != None):
		<title>Détails du media {{media['title']}}</title>
		%else:
        	<title>Media non trouvé</title>
		%end
	</head>

        <body>
                %if (media != None):
                <h1>Détails du media : {{media['title']}}</h1>
		
		<table>
			<tbody>
				<tr>
					<td>Titre</td>
					<td>{{media['title']}}</td>
				</tr>

				%if (media['author'] != None):
				<tr>
					<td>Auteur</td>
					<td>{{media['author']}}</td>
				</tr>
				%end

				<tr>
					<td>Type</td>
					<td>{{media['type']}}</td>
				</tr>
			</tbody>
		</table>
		%else:
		<p>Le media souhaité n'a pu être trouvé.</p>
                %end
        </body>
</html>
