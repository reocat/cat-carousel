<!DOCTYPE html>
<html>
<head>
	<title>Random Cat Image Carousel</title>
	<style>
	.carousel {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		height: 500px;
	}

	.carousel img {
		max-width: 100%;
		max-height: 100%;
		margin: auto;
	}

	#new-image-btn {
		display: block;
		margin: 20px auto;
		padding: 10px 20px;
		background-color: #4CAF50;
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 20px;
		cursor: pointer;
	}
	</style>
</head>
<body>
	<div class="carousel">
		<?php
			// Make a request to the API and get a random cat image
			$cat_image_json = file_get_contents("https://api.thecatapi.com/v1/images/search");
			$cat_image_data = json_decode($cat_image_json, true);
			$cat_image_url = $cat_image_data[0]["url"];

			// Display the image in an img tag
			echo "<img src='$cat_image_url' alt='Random cat image'>";
		?>
	</div>
	<a href="<?php echo $_SERVER['PHP_SELF']; ?>"><button id="new-image-btn">New Image</button></a>
</body>
</html>
