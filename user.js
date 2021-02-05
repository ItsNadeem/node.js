// behind the scene
// Module Wrapper Function
// (function(exports, require, module, __filename, __dirname) {  });


// thus below are available
console.log(exports);
console.log(require);
console.log(module);
console.log(__filename);
console.log(__dirname);

// object literal example
const user = {
  'name': 'the show writer',
  'age': 30
};




// class object example
class User {

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greetings() {
     console.log('my name is ' + this.name );
     return 'my name is ' + this.name;
    }
}


// exporting class object
module.exports = User;