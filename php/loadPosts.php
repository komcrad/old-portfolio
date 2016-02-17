<?php
	include_once('db.php');
	if (!empty($_POST['pageNumber'])) {
		$pageNumber = $_POST['pageNumber'];
	} else {
		$pageNumber = 10;
	}

	$sql = "select count(*) from post;";
	$result = mysqli_query($conn, $sql);
	
	while ($row = mysqli_fetch_assoc($result)) {
		echo "<span style='display:none;' id='numberOfPosts'>".$row['count(*)']."</span>";
	}

	$sql = "select user, content from post order by id desc limit ".($pageNumber - 10).",".$pageNumber.";";
	//$sql = "select user, content from post order by id desc limit 10,20;";
	$result = mysqli_query($conn, $sql);
	while ($row = mysqli_fetch_assoc($result)) {
		

	$html = "<div class='row'>
				<div class='col-sm-4 col-sm-offset-4 text-center margin-bot-2 post'>
					<p>
						".$row['content']."
						<br><span class='author'>
							-".$row['user']."
						</span>
					</p>
				</div>
			</div>";
		echo $html;
	}

?>