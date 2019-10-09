interface Animal {
    name: string;

    howItMoves(): string;
}

class Bird implements Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    howItMoves() {
        return 'flies';
    }
}

abstract class Quadruped implements Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    howItMoves() {
        return 'walks';
    }
}

class Cow extends Quadruped {
    constructor(name: string) {
        super(name);
    }

    giveMilk() {
        //...
    }
}

class Horse extends Quadruped {
    constructor(name: string) {
        super(name);
    }

    jump() {
        //...
    }
}

let birdy = new Bird('Tweety');
console.log(birdy.name + ' ' + birdy.howItMoves());

let horse = new Horse('Mr. Ed');
let cow = new Cow('Bertha 23');
console.log(horse.name + ' ' + horse.howItMoves());
console.log(cow.name + ' ' + cow.howItMoves());
