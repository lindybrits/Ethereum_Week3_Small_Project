
contract SplitCoin {

	mapping (address => uint256) balances;
	

	function SplitCoin() {
		balances[tx.origin] = 3000;
	}
	
	function send(address accountA, address accountB, uint256 amount) returns (uint256) {
		
		if (balances[msg.sender] < amount) return 0;
		
		uint256 newAmount = amount / 2;

		balances[msg.sender] -= amount;
		balances[accountA] += newAmount;
		balances[accountB] += newAmount;

		return newAmount;
	}

	function getBalance(address addr) returns (uint256) {
		return balances[addr];
	}
	

}
