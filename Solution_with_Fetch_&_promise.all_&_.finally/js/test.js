
// It's also Success!
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
fetchData(astroUrl)
  .then(promise => {
    return promise.people.map(item=> {
       const craft=item.craft;
       fetch(wikiUrl+item.name).then(response=>response.json()).then(promise1=> {generateHTML(promise1,craft);});
    });
  });




// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function fetchData(url) {
  return fetch(url)
          .then(response => {if (!response.ok) { throw Error(response.status); }
                             else {return response.json();}})
          .catch(err => console.log(err.message));
}


// The input data is the array of WikiURL, so 'data.map(item => fetch(item))'
//  will produce a list of function/fetch array which can be passed into
// promise.all
function generateHTML(data, data1) {
  const section = document.createElement('section');
  peopleList.appendChild(section);
  // Check if request returns a 'standard' page from Wiki
  if (data.type === 'standard') {
    section.innerHTML = `
    <img src=${data.thumbnail.source}>
    <span>${data1}</span>
    <h2>${data.title}</h2>
    <p>${data.description}</p>
    <p>${data.extract}</p>
  `;
  } else {
    section.innerHTML = `
    <img src="img/profile.jpg" alt="ocean clouds seen from space">
    <h2>${data.title}</h2>
    <p>Results unavailable for ${data.title}</p>
    ${data.extract_html}
  `;
  }
}
