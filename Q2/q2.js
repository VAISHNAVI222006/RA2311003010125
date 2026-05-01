function removeDuplicates(arr) {
    let unique = [];

    for (let i = 0; i < arr.length; i++) {
        if (!unique.includes(arr[i])) {
            unique.push(arr[i]);
        }
    }

    return unique;
}

// Test
let arr = [1, 2, 2, 3, 4, 4, 5];
console.log(removeDuplicates(arr));