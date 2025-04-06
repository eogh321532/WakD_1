
var token_status = 0;	// 0:충전, 1:환전
var timer_token;
$( document ).ready(function() {
	timer_token = window.setInterval("toTimerToken()", 1000);
});
 
$(window).on("beforeunload", function() {
	clearInterval(timer_token);
});

function toTimerToken() {
	$.ajax({
		type: "post",
		url: $path['url']+"ajax",
		data: { 
			'action': 'minigame',
			'value': 'read_token_cash',
		},
		dataType: "json",
		success : function(response) {
			$("#p_top_money_token").text(response.data);
		},
		error: function(xhr, status) {
		}
	});
}

function on_token_status() {
	if(token_status == 0)
		token_status = 1;
	else
		token_status = 0;
}

function on_token() {
	if(token_status == 0)
		on_charge();
	else
		on_exchange();
}

function on_charge() {
	var amount = $("#p_amount_charge").text();

	if(amount == "") {
		alert("충전금액을 입력해 주세요.");
		return;
	}

	$.ajax({
		type: "post",
		url: $path['url']+"ajax",
		data: { 
			'action': 'member_token',
			'value': '충전',
			'amount': amount
		},
		dataType : "json",
		success: function(response) {
			if(response.result == 0) {
				alert( response.err );
				return;
			}
			
			alert("처리되었습니다.");
			location.reload();
		},
		error: function(xhr, status) {
			alert('[' + status + ']\n\n' + xhr.responseText);
		}
	});
}

function on_exchange() {
	$.ajax({
		type: "post",
		url: $path['url']+"ajax",
		data: { 
			'action': 'member_token',
			'value': '환전'
		},
		dataType : "json",
		success: function(response) {
			if(response.result == 0) {
				alert( response.err );
				return;
			}
			
			alert("처리되었습니다.");
			location.reload();
		},
		error: function(xhr, status) {
			alert('[' + status + ']\n\n' + xhr.responseText);
		}
	});
}
