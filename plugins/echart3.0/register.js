$("#btnSubmit").click(function() {
	reginster();
});
function reginster() {
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
	var retPhone=/^1[3|4|5|7|8][0-9]{9}$/;
	var enterPhone= $("#txtPhone").val();
	if (enterPhone!=""&& !retPhone.test(enterPhone)) {
		$("#message").html("手机号格式不正确！");
		$("#txtPhone").focus();
		return false
	}
	
	var retEmail = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
	var enterEmail = $("#txtEmail").val();
	if (enterEmail!=""&& !retEmail.test(enterEmail)) {
		$("#message").html("邮箱格式不正确！");
		$("#txtEmail").focus();
		return false
	}

	var password = $("#txtPassword").val()
	//var password1 = $("#txtPassword1").val()
	if (password!="") {
		$.post('ipa/register.html', {
			nickName : $("#txtUserName").val(),
			password : $("#txtPassword").val(),
			realName : $("#txtRealName").val(),
			phone    : $("#txtPhone").val(),
			address  : $("#txtAddress").val(),
			email	 : $("#txtEmail").val()
		}, function(res) {
			$("#message").html(res);
			/*if (res == "success") {
				showModel();
			} else {
				$("#message").html(res);
			}*/
		});
	} /*else {
		$("#message").html("两次输入密码不相同！");
		$("#txtPassword1").focus();
	}*/
}
/*var clearFlag = 0;
var count = 3
function showModel() {
	$("#my-modal-alert").toggle();
	clearFlag = self.setInterval("autoClose()", 1000);// 每过一秒调用一次autoClose方法
}
function autoClose() {
	if (count > 0) {
		$("#num").html(count + "秒后自动跳转");
		count--;
	} else if (count <= 0) {
		window.clearInterval(clearFlag);
		$("#num").html("");
		$("#my-modal-alert").fadeOut("slow");
		count = 3;
		$("#my-modal-alert").toggle();
		window.location.href = 'login.jsp'
	}
}*/