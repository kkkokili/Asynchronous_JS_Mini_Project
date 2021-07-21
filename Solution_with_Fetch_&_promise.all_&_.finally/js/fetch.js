// jshint esversion:6
const astroUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');


// ------------------------------------------
//  Event LISTENER
// ------------------------------------------
// btn.addEventListener('click', functionX);

// ------------------------------------------
//  Fetch FUNCTIONS
// ------------------------------------------
fetch(astroUrl)
  .then(response => {if (!response.ok) { throw Error(response.status); }
                    else {return response.json();}}
       )
  .then(promise => {return assemble(promise.people);})
  .catch(err => console.log(err.message));
// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function assemble(peopleList) {
  const wikiUrlList = peopleList.map(item => wikiUrl+item.name);
  return wikiUrlList;
}
