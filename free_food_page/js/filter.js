var containerEl = document.getElementById('maps-filter')
var buttonEl = document.getElementById('maps-filter-button')

var popover = new bootstrap.Popover(buttonEl, {
  container: containerEl,
  html: true,
  sanitize: false,
  content: `
      <span class="d-block mb-2">Items I need</span>
      <div id="maps-buttons" class="d-flex justify-content-between flex-wrap mb-2">
        <button class="button">veg</button>
        <button class="button">bread</button>
        <button class="button">fruit</button>
        <button class="button">water</button>
        <button class="button">pasta</button>
        <button class="button">rice</button>
        <button class="button">meat</button>
        <button class="button">bags</button>
        <button class="button">drinks</button>
      </div>
      <div class="d-flex">
        <button class="button-secondary mx-1">
          Clear filter
        </button>
        <button class="button-primary mx-1">
          Apply filter
        </button>
      </div>
  `,
  template: `
    <div role="tooltip">
      <div id="maps-menu" class="popover-body"></div>
    </div>
    `,
})

const handleClick = event => {
  if (event.target.tagName === 'BUTTON') {
    const activeButtonEl = event.target
    if (!activeButtonEl.hasAttribute('style')) {
      activeButtonEl.style = 'background-color: #7f6d9b; color: white;'
    } else {
      activeButtonEl.removeAttribute('style')
    }
  }
}

buttonEl.addEventListener('inserted.bs.popover', () => {
  var mapsButtonsEl = document.getElementById('maps-buttons')
  mapsButtonsEl.addEventListener('click', handleClick)
})

buttonEl.addEventListener('hide.bs.popover', () => {
  var mapsButtonsEl = document.getElementById('maps-buttons')
  mapsButtonsEl.removeEventListener('click', handleClick)
})
