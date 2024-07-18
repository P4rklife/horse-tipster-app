document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    fetchTips();
});

document.getElementById('tip-form').addEventListener('submit', function(e) {
    e.preventDefault();

    let horseName = document.getElementById('horse-name').value.trim();
    let raceName = document.getElementById('race-name').value.trim();
    let odds = document.getElementById('odds').value.trim();

    if (horseName && raceName && odds) {
        addTip(horseName, raceName, odds, "User Added");
        document.getElementById('tip-form').reset();
    }
});

function addTip(horseName, raceName, odds, location) {
    let tipList = document.getElementById('tip-list');

    let li = document.createElement('li');

    let infoDiv = document.createElement('div');
    infoDiv.className = 'info';
    
    let horseSpan = document.createElement('span');
    horseSpan.textContent = `Horse: ${horseName}`;
    
    let raceSpan = document.createElement('span');
    raceSpan.textContent = `Race: ${raceName}`;

    let oddsSpan = document.createElement('span');
    oddsSpan.textContent = `Odds: ${odds}`;

    let locationSpan = document.createElement('span');
    locationSpan.textContent = `Location: ${location}`;

    infoDiv.appendChild(horseSpan);
    infoDiv.appendChild(raceSpan);
    infoDiv.appendChild(oddsSpan);
    infoDiv.appendChild(locationSpan);

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', function() {
        tipList.removeChild(li);
    });

    li.appendChild(infoDiv);
    li.appendChild(deleteButton);
    tipList.appendChild(li);
}

function fetchTips() {
    const apiKey = '3';
    const apiUrl = `https://www.thesportsdb.com/api/v1/json/${apiKey}/livescore.php`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log('Fetched data:', data);
        // Assuming the API returns an array of events with relevant horse racing data
        data.events.forEach(event => {
            if (event.strSport === 'Horse Racing') {
                addTip(event.strEvent, event.strLeague, event.intHomeScore, event.strCountry);
            }
        });
    })
    .catch(error => console.error('Error fetching tips:', error));
}
