// test:
let h = HashTable(3);
h.insert('Anton', {age: 39});
h.retrieveAll();
// Hash Table 
function HashTable (limit) {
	let ht = Object.create(null);
	let hashFunction = function(str, max) {
   		var hash = 0;
      	for (var i = 0; i < str.length; i++) {
        	var letter = str[i];
        	hash = (hash << 5) + letter.charCodeAt(0);
        	hash = (hash & hash) % max;
      	}
      	return hash;
    };
	Object.defineProperties(ht, {
		'_limit': {value: limit ? limit : 10, enumerable: false },
		'_storage': {value: [], enumerable: false},
		'_count': {value: 0, enumerable: false}
    });
	ht.insert = (key, value) => {
		let index = hashFunction(key, ht._limit);
		let bucket = ht._storage[index];
		let override = false;
		if(!bucket) { bucket = []; ht._storage[index] = bucket }
		for (var i = 0; i < bucket.length; i++) {
            let tuple = bucket[i];
            if (tuple[0] === key) {
              	//overide value stored at this key
              	tuple[1] = value;
            	override = true;
            }
      	}
		if(!override){
		//create a new tuple in our bucket
        //note that this could either be the new empty bucket we created above
        //or a bucket with other tupules with keys that are different than
        //the key of the tuple we are inserting. These tupules are in the same
        //bucket because their keys all equate to the same numeric index when
        //passing through our hash function.
        bucket.push([key, value]);
        ht._count++
          //now that we've added our new key/val pair to our storage
          //let's check to see if we need to resize our storage
          if (ht._count > ht._limit * 0.75) {
            ht.resize(ht._limit * 2);
          }
      }
      return ht;
    }
	ht.remove = (key) => true;
	ht.retrieve = (key) => true;
	ht.resize = (newLimit) => true;
	ht.retrieveAll = (newLimit) => console.log(ht._storage);;
	return ht;
}
