// let arrowFunction (para1, para2, ...) => {
//     //code
// }

let str = 'hello world';
console.log(str.startsWith('hello'));  // check if string starts with 'hello'
console.log(str.endsWith('hello'));   // check if string ends with 'hello'

let listEmail = 'abc@gmail.com, def@gmail.com, ghi@gmail.com';
console.log(listEmail.split(', '));

// viết code để sau khi xử lí, arr2 có các phần tử bằng ptử của arr1 x2
let arr1 = [1, 2, 3, 4, 5, 6, 7];
let arr2 = [];
let arr3 = [];
for (let x of arr1) {
    arr2.push(x * 2);
}
console.log(arr2);

// cách 2
arr2 = arr1.map((x) => {
    return x * 2;
});

// cú pháp map
// b = a.map(function);
// vs arrowFunction: nếu chuyền vào 1 biến và k còn code gì khác ngoài return thì có thể viết gọn lại là
// b = a.map(x => x * 2);

// arr3 bao gồm các phần tử của arr1 > 4
for (let item of arr1) {
    if (item > 4) {
        arr3.push(item);
    }
}
console.log(arr3);
// cách 2
arr3 = arr1.filter(x => {return x > 4});    // nếu condition = true thì thêm x vào arr3
// hoặc arr3 = arr1.filter(x => x > 4);
console.log(arr3);

// object
let singer = {
    name: 'Taylor',
    age: 30,
    sing: () => {
        console.log('Can sing very well');
    }
};
singer.address = 'New York';
console.log(singer.name);
singer.sing();

let myButton = document.querySelector('.my-button');   // querySelector giống getElementBy...
myButton.addEventListener('click', () => {
    let myUl = document.querySelector('ul');
    myUl.style = 'display: none';
    myButton.style = 'background-color: red';
})

// getElementsByClassName trả về 1 mảng, thế nên để lấy ra cái đầu tiên thì viết thêm [0]