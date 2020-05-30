'use strict';
console.log(people);
window.addEventListener('load', () => {
  doMap();
  doFilter();
  doforEach();
  doReduce();
  doFind();
  doSome();
  onEvery();
  onSort();
});

function doMap() {
  const nameEmailArray = people.results.map((person) => {
    return {
      name: person.name,
      email: person.email,
    };
  });
  console.log(nameEmailArray);

  return nameEmailArray;
}

function doFilter() {
  const olderThan50 = people.results.filter((person) => {
    return person.dob.age > 50;
  });
  console.log(olderThan50);
}

function doforEach() {
  const mappedPeople = doMap();

  mappedPeople.forEach((person) => {
    person.nameSize =
      person.name.title.length +
      person.name.first.length +
      person.name.last.length;
  });

  console.log(mappedPeople);
}

function doReduce() {
  const totalAges = people.results.reduce((accumulator, current) => {
    return accumulator + current.dob.age;
  }, 0);

  console.log(`Idades somada ${totalAges}`);

  //tirando a prova com for
  let sumAges = 0;
  for (let index = 0; index < people.results.length; index++) {
    var current = people.results[index];
    sumAges += current.dob.age;
  }
  console.log(`Idades somada ${sumAges}`);
}

function doFind() {
  const found = people.results.find((person) => {
    return person.location.state === 'Minas Gerais';
  });

  console.log(found);
}

function doSome() {
  const found = people.results.some((person) => {
    return person.location.state === 'Amazonas';
  });
  console.log(found);
}

function onEvery() {
  const every = people.results.every((person) => {
    return person.nat === 'BR';
  });
  console.log(every);
}

function onSort() {
  const mappedNames = people.results
    .map((person) => {
      return { name: person.name.first };
    })
    .filter((person) => {
      return person.name.startsWith('A');
    })
    .sort((a, b) => {
      //return a.name.localeCompare(b.name);
      return b.name.length - a.name.length;
    });

  console.log(mappedNames);
}
