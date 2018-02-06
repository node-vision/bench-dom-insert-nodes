//test data
const count = 50 //items to be inserted
let items = []
for (let i = 0; i < count; i++) {
  items[i] = `Paragraph ${i} of ${count}:
   dummy text dummy text dummy text dummy text dummy text dummy text
   dummy text dummy text dummy text dummy text dummy text dummy text
   dummy text dummy text dummy text dummy text dummy text dummy text`
}

//html hooks
let container = document.getElementById('test-container')
let results = document.getElementById('results')
let status = document.getElementById('status')

function cleanup() {
  container.innerHTML = ""
}
function resultLog(text) {
  results.innerHTML += '<p>' + text + '</p>'
}

let Benchmark = require('benchmark')
global.Benchmark = Benchmark //somehow required otherwise lodash blows
let suite = new Benchmark.Suite;
// add tests
suite
  .add('innerHTML', function () {
    items.forEach((item, index) => {
      container.innerHTML += `<p id="p-${index}">${item}</p>`
    });
    cleanup()
  })
  .add('insertAdjacentHTML', function () {
    let allHTML = ""
    items.forEach((item, index) => {
      allHTML += `<p id="p-${index}">${item}</p>`
    });
    container.insertAdjacentHTML('beforeend', allHTML)
    cleanup()
  })
  .add('appendChild', function () {
    items.forEach((item, index) => {
      let el = document.createElement("p")
      el.textContent = item
      el.id = "p-" + index
      container.appendChild(el)
    });
    cleanup()
  })
  .add('DocumentFragments', function () {
    let fragment = document.createDocumentFragment()
    items.forEach((item, index) => {
      let el = document.createElement("p")
      el.textContent = item
      el.id = "p-" + index
      fragment.appendChild(el)
    });
    container.appendChild(fragment)
    cleanup()
  })
  //add listeners
  .on('start', function (event) {
    resultLog(`Starting tests, inserting ${count} dummy <strong>p</strong> elements per cycle.`)
    status.innerHTML = "Please wait..."
  })
  .on('cycle', function (event) {
    resultLog(String(event.target))
    // console.log(String(event.target))
  })
  .on('complete', function () {
    resultLog('<strong>Fastest is ' + this.filter('fastest').map('name') + '</strong>')
    status.innerHTML = "Completed."
  })
  // run async
  .run({ 'async': true });
