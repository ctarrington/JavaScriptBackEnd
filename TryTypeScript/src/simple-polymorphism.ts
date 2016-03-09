import * as foo from './lib/foo';

class Person {
    private name: string;
	private height: number;

    constructor(name: string, height: number) {
        this.name = name;
		this.height = height;
    }

    greet():string {
        return 'Hi, my name is ' + this.name+' and I am '+this.height+' inches tall';
    }
}

class Dog {

    constructor() {}

    greet():string {
        return 'Woof Woof';
    }
}

class Cat {

    constructor() {}

    greet():string {
        return '...studiously ignores you...';
    }
}

var fred = new Person('Fred', 68);
var max = new Dog();
var tips = new Cat();

interface Greetable {
	greet():string;
}

var occupants: Array<Greetable> = [fred, max, tips];


for (var ctr = 0; ctr < occupants.length; ctr++)
{
	var occupant:Greetable = occupants[ctr];
	console.log(occupant.greet());
}

console.log(foo.yo('Fred'));
