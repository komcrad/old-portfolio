var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};

$(document).ready(function(){
	loadNav();
	$("#home").click(function() {
		load("html/home.html");
	});
	$("#projects").click(function() {
		load("html/projects.html");
	});
	$('#home').click();
});

function loadNav() {
	$("#navbar").append("<a href='#home' id='home'>Home</a>");
	$("#navbar").append('<a href="#projects" id="projects">My Projects</a>');
}

function load(pageToLoad, functionToExecuteAfterLoad) {
	$('#swap').fadeOut("fast", function() {
		$("#swap").load(pageToLoad, function(){
			$("#swap").fadeIn("fast");
			createCookie("position", pageToLoad, 30);
			if (functionToExecuteAfterLoad) {
				functionToExecuteAfterLoad();
			}
		});
	});
}

function loadToSwap(stringToLoad) {
	$('#swap').load(stringToLoad);
}

function addToSwap(newHtml) {
	$('#swap').html($('#swap').html() + newHtml);
}

function createCookie(name, value, TOL) {
	var expireDate = new Date();
	expireDate.setDate(expireDate.getDate()+TOL);
	document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + expireDate + ";";
}

function getCookieValue(name) {
	var data = document.cookie.split(";");
	for (i in data) {
		if (data[i].indexOf(name) > -1) {
			return decodeURIComponent(data[i].split("=")[1].toString());
		}
	}
}

function submitForm(formID, resultContainerID) {
    $("#postAuthor").val(escapeHtml($("#postAuthor").val()));
    $("#postContent").val(escapeHtml($("#postContent").val()));
    $.post(
        $(formID).attr('action'),
        $(formID).serializeArray(),
        function(data) {
           loadPosts();
        }
    );
}

function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
 }
