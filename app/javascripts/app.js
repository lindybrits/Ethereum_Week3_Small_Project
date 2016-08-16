var accounts = [];
var balances = [];

var accountA = "0x232b26aa33503aca29136ab99c58ab20f60e5a19";
var accountB = "0x4dc5485a1bc090eefa5b662857dd456d8f375e7c";
var sender = "0x2c7cb0daea07f882301db2f024b936ad55f3f17c";

var balanceA = 0;
var balanceB = 0;

function setStatus(message) {
	$("#status").html(message);
}

function checkIfBalancesLoaded(){
	if (balances.length == 2) {
		clearInterval(interval);
		for (i = 0; i < balances.length; i++) {
			alert(balances[i]);
		}
	}
}

function refreshGUI() {
	balances = [];
	balancesLoaded = 0;
	
	$("#senderAccount").html(sender);
  
  	/* Sender account */
  	SplitCoin.deployed().getBalance.call(sender, {from: sender})
  	.then(function(value){
  		var balance = value.valueOf();
  		$("#senderBalance").html(balance);
  	})
	.catch(function(e){
		console.log(e);
		setStatus("Error getting balance; see log.");
	});
	
	/* Account A */
	SplitCoin.deployed().getBalance.call(accountA, {from: accountA})
  	.then(function(value){
  		var balance = value.valueOf();
  		$("#accABalance").html(balance);
  	})
	.catch(function(e){
		console.log(e);
		setStatus("Error getting balance; see log.");
	});
	
	/* Account B */
	SplitCoin.deployed().getBalance.call(accountB, {from: accountB})
  	.then(function(value){
  		var balance = value.valueOf();
  		$("#accBBalance").html(balance);
  	})
	.catch(function(e){
		console.log(e);
		setStatus("Error getting balance; see log.");
	});
  	
  	//interval = setInterval(checkIfBalancesLoaded, 100);

  
};



function sendCoin() {
	var contract = SplitCoin.deployed();
	var sendAmount = $("#amount").val();
	var senderAccount = $("#sender").val();
	
	setStatus("Transaction in progress...");
	
	contract.send(accountA, accountB, sendAmount, {from:"0x2c7cb0daea07f882301db2f024b936ad55f3f17c"})
	.then(function(result) {
		setStatus("Transaction complete!");
		refreshGUI();
	})
	.catch(function(e) {
		console.log(e);
		setStatus("Error in transaction - see log.");
	});
	
}

window.onload = function() {
	web3.eth.getAccounts(function(err, accs) {
		if (err != null) {
		  alert("There was an error fetching your accounts.");
		  return;
		}

		if (accs.length == 0) {
		  alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
		  return;
		}
		
		/* */
		
	
		/* UPDATE GUI */
		
		refreshGUI();
		
    	/* STATIC OR INITIAL CONTENT */

    	$("#accAAddress").html(accountA);
    	$("#accBAddress").html(accountB);
    	$("#sender").val("0x2c7cb0daea07f882301db2f024b936ad55f3f17c");
		
		/* EVENTS */
		
		$("#btnSend").click(function() {
			sendCoin();
		});
		
		$("#sender").change(function() {
			sender = $("#sender").val();
			if (sender == "") {
				sender = "0x2c7cb0daea07f882301db2f024b936ad55f3f17c";
				$("#sender").val("0x2c7cb0daea07f882301db2f024b936ad55f3f17c");
			}
			refreshGUI();
		});
	});

    
}
