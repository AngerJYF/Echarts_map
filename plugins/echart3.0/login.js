$(function() {
	$("#btnSubmit").click(function() {
		Login();
	});
	$.ajax({
		type : "get",
		url : "ipa/rememberLogin.html",
		dataType : "json",
		success : function(res) {
			if (res != "error")
				$("#txtUserName").val(res.nickName);
			$("#txtPassword").val(res.password);
			$("#checkbox1").attr("checked", true);
		}
	});

})

function Login() {
	if ($("#txtUserName").val() == "") {
		$("#message").html("请输入用户名！");
		$("#txtUserName").focus();
		return false
	}
	if ($("#txtPassword").val() == "") {
		$("#message").html("请输入密码！");
		$("#txtPassword").focus();
		return false;
	}
	$.ajax({
		type : "post",
		url : "ipa/login.html",
		data : $("#loginForm").serialize(),
		success : function(res) {
			if (res == "success") {
				window.location.href = 'index.jsp'
			} else {
				$("#message").html(res);
			}
		}
	});
}