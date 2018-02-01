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
	Object.defineProperties( ht, {
		'_limit': {value: limit ? limit : 10 },
		'_storage': {value: [], enumerable: false},
		'_count': {value: 0, enumerable: false}
    });
    Object.defineProperty( ht, 'resize', { value: resizeFunc });
    Object.defineProperty( ht, 'insert', { value: insertFunc });
    Object.defineProperty( ht, 'remove', { value: removeFunc });
    Object.defineProperty( ht, 'retrieve', { value: retrieveFunc });
    Object.defineProperty( ht, 'retrieveAll', { value: retrieveAllFunc });

    return ht;
    
    /**
     * Insert new key/value pair  
     * 
     * @param {any} key 
     * @param {any} value 
     * @returns 
     */
    function insertFunc (key, value) {
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
            ht._count++;
            //now that we've added our new key/val pair to our storage
            //let's check to see if we need to resize our storage
            if (ht._count > ht._limit * 0.75) {
                ht.resize(ht._limit * 2);
            }
        }
        return ht;
    }   

    /**
     * Return all stored data as is
     * 
     * @returns 
     */
    function retrieveAllFunc () {
        return ht._storage;
    }

    function retrieveFunc (key) {
        return ht._storage;
    }

    function removeFunc (key) {
        return ht._storage;
    }

    function resizeFunc (num) {
        return JSON.stringify(ht._storage);
    }

}
