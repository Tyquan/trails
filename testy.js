function splitPrice(input){
	let string = String(input);
	let arrays = string.split("")
	// if (input.contains(".")) {
	// 	let arrays = input.split(".");

	// 	let last = [];
	// 	return arrays;
	// } else {
	// 	return input;
	// }
	console.log(arrays.join(" , "));
	arrays.push(" cents");
	arrays.splice(4, 0, " dollars and ");
	let result = arrays.join();
	return result;
}

console.log(splitPrice(6523.95));