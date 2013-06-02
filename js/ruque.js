ruque = {};

ruque.queue = [];

ruque.add = function(arrNode){
	this.queue[this.queue.length] = arrNode;
}

ruque.top = function(){
	return this.queue[0];
}

ruque.pop = function(){
	var node = this.queue[0];
	for (i = 0; i < this.queue.length; i++) {
		this.queue[i] = this.queue[i+1];
	}
	this.queue.length--;

	return node;
}

ruque.printQueue = function(){
	var result = "";
	for (i=0; i < this.queue.length;i++) {
		result += this.queue[i]+",";
	}
	console.log(result);
}

ruque.init = function(){
	ruque.add(1);
	ruque.add(2);
	ruque.add(3);
	ruque.printQueue();	
}