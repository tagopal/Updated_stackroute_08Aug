// Write a program to display one result card of 100 students
// with their name and percentage
// Out of 100 students, 50 has subjects - Grammer and Accounts
// and other 50 has subjects -  Grammer and Physics

// Hint : You need to calculate percentage of 100 students having different set of subjects.
//        You can assume their scores on their respective subjects.


// Write your code here

class Student {
    constructor (name, subjects) {
        this.name = name;
        this.subjects = subjects;
    }

    getTotalScore() {
        return this.subjects.reduce((accumulator, item)=> {
            accumulator = accumulator + item.score;
            return accumulator;
        }, 0);
    }

    getTotalMaxScore() {
        return this.subjects.reduce((acc, item)=> {            
            acc = acc + item.maxScore;
            return acc;
        }, 0);
    }

    getPercentage() {
        return ((this.getTotalScore() / this.getTotalMaxScore()) * 100);
    }
}

const accountStudents = [];

for (let i=1; i<=51; i=i+1){
    accountStudents.push (
        new Student('Student ${i}', [
            { name:'grammar', score: Math.floor(Math.random() * 100), maxScore: 100 },
            { name:'accounts', score: Math.floor(Math.random() * 100), maxScore: 150 }
        ])
    )
}

const scienceStudent = [];

for (let i=51; i<=100; i=i+1){
    scienceStudent.push (
        new Student('Student ${i}', [
            { name:'grammar', score: Math.floor(Math.random() * 100), maxScore: 100 },
            { name:'physics', score: Math.floor(Math.random() * 100), maxScore: 150 }
        ])
    )
}

const accountRecord = accountStudents.map(
                s=> Object.assign({}, {name: s.name}, 
                {percentage: s.getPercentage()})
            )
            .concat(scienceStudent.map(
                s=> Object.assign({}, {name: s.name}, 
                {percentage: s.getPercentage()}))
            )

document.write(accountRecord);
               
