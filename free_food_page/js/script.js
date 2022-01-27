let map
let places
let autocomplete

const createCard = (id, data) => {
  const cardEl = document.createElement('li')
  cardEl.id = id
  cardEl.className = 'card mb-4'
  cardEl.innerHTML = `
    <div class="row gx-0 background-color-secondary">
      <div class="col-lg-4">
        <img src=${data.img} class="fridge-img" />
      </div>
      <div class="col-lg-8">
        <div class="content">
          <div class="row">
            <div class="col-6">
              <h4 class="title">${data.title}</h4>
              <div class="hours figure-caption">
                <div class="mr-3">Accessible:</div>
                <div>
                  ${data.hours}
                </div>
              </div>
              <div class="address">
                ${data.address}
              </div>
              <div class="items">
                <div class="mr-3">
                  <span>Has:</span>
                  <ul>
                    <li>fruit</li>
                    <li>bread</li>
                    <li>veggies</li>
                    <li>water</li>
                  </ul>
                </div>
                <div>
                  <span>Needs:</span>
                  <ul>
                    <li>fruit</li>
                    <li>bread</li>
                    <li>veggies</li>
                    <li>water</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="d-flex flex-column justify-content-between" style="height: 100%;">
                <div>
                  <div class="social d-flex align-items-center mb-1">
                    <img src="./assets/icons/Instagram.png" class="me-2"/>
                    <span class="figure-caption color-primary">${data.handle}</span>
                  </div>
                  <div class="check-in d-flex align-items-center mb-1">
                    <img src="./assets/icons/Clock-Icon.png" class="me-2"/>
                    <span>24 Hours Ago</span>
                  </div>
                  <div class="check-in d-flex align-items-center mb-1">
                    <img src="./assets/icons/Check-Icon.png" class="me-2"/>
                    <span>Has Pantry</span>
                  </div>
                </div>
                <div>
                  <button class="button-primary mb-1">
                  Check-In
                </button>
                <button class="button-secondary">
                  Get Directions
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
  return cardEl
}

// When the user selects a city, get the place details for the city and
// zoom the map in on the city.
const onPlaceChanged = () => {
  const place = autocomplete.getPlace()

  if (place.geometry && place.geometry.location) {
    map.panTo({ lat: 34.0522, lng: -118.2437 })
    map.setZoom(12)
  } else {
    document.getElementById('autocomplete').placeholder = 'Enter a city'
  }
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    mapId: '38ca4c609f81275f',
    zoom: 10,
    center: { lat: 34.0522, lng: -118.2437 },
    mapTypeControl: false,
    panControl: false,
    zoomControl: false,
    streetViewControl: false,
  })

  const icon = './assets/icons/broccoli.svg'
  const cardsEl = document.getElementById('cards')

  // Markers
  ;[
    {
      position: { lat: 34.0522, lng: -118.2437 },
      img: './assets/images/Fridge1.png',
      title: 'El Serano',
      hours: `
        <div>Tues-Fri 7:30AM-7:30PM;</div>
        <div>Sat-Mon 8AM-7:30PM;</div>
      `,
      address: '6469 Huntington Dr N, <br /> Los Angeles, CA 90032',
      handle: '@ElSerenoFridge',
    },
    {
      position: { lat: 34.0663, lng: -118.29758 },
      img: './assets/images/Fridge5.png',
      title: 'Koreatown Solar',
      hours: `
        <div>Tues-Fri 7:30AM-7:30PM;</div>
        <div>Sat-Mon 8AM-7:30PM;</div>
      `,
      address: '1515 Griffith Park Blvd, <br /> Los Angeles, CA 90026',
      handle: '@KoreaTownFridge',
    },
    {
      position: { lat: 34.02631, lng: -118.24387 },
      img: './assets/images/Fridge6.png',
      title: 'South Arts District',
      hours: `
        <div>24/7</div>
      `,
      address: '1411 Newton St, <br /> Los Angeles, CA 90021',
      handle: '@southartsdistrictfridge',
    },
    {
      position: { lat: 34.09043, lng: -118.27699 },
      img: './assets/images/Fridge4.png',
      title: 'East Hollywood',
      hours: `
        <div>24/7</div>
      `,
      address: '4621 Santa Monica Blvd, <br /> Los Angeles, CA 90029',
      handle: '@EastHollywoodFridge',
    },
    {
      position: { lat: 34.11484, lng: -118.23596 },
      img: './assets/images/Fridge2.png',
      title: 'Glassell Park',
      hours: `
        <div>Tues-Fri 7:30AM-7:30PM;</div>
        <div>Sat-Mon 8AM-7:30PM;</div>
      `,
      address: '3516 Eagle Rock Blvd, <br /> Los Angeles, CA 90065',
      handle: '@GlassellParkFridge',
    },
    {
      position: { lat: 34.08175, lng: -118.26088 },
      img: './assets/images/silverlake_fridge.png',
      title: 'Silver Lake',
      hours: `
        <div>Tues-Fri 7:30AM-7:30PM;</div>
        <div>Sat-Mon 8AM-7:30PM;</div>
      `,
      address: '1515 Griffith Park Blvd, <br /> Los Angeles, CA 90026',
      handle: '@silverlakefridge',
    },
  ].forEach(({ position, ...cardData }, index) => {
    const url = `#${index}`
    const marker = new google.maps.Marker({
      map,
      position,
      icon,
      url,
    })

    google.maps.event.addListener(marker, 'click', () => {
      const card = document.getElementById(url)
      if (card) card.scrollIntoView()
    })

    cardsEl.append(createCard(url, cardData))
  })

  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'),
    {
      types: ['(cities)'],
      componentRestrictions: { country: 'us' },
    }
  )

  autocomplete.addListener('place_changed', onPlaceChanged)
}
