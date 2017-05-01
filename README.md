# Hyperdom Calendar
A simple calender for [Hyperdom](https://github.com/featurist/hyperdom)
## Install

### npm
    npm i hyperdom-calendar -S
### Usage
Make sure you add `calendar.min.css` to your styles.
```JavaScript
var hyperdom = require('hyperdom')
var h = hyperdom.html
var calendar = require('hyperdom-calendar')

function render(model) {
  return calendar(model)
}
```
### API
a [Hyperdom](https://github.com/featurist/hyperdom) model is required for this component to work. The component will bind these properties to `model.calendar`
```JavaScript
// returns todays date as date object
model.calendar.today
// returns selected date as date object , initially set to todays date
model.calendar.selected.date
// returns selected month as a digit
model.calendar.selected.month()
// returns next month from selected month as a digit
model.calendar.selected.nextMonth()
// returns prev month from selected month as a digit
model.calendar.selected.prevMonth()
// set day for current month current month, returns date object for that day
model.calendar.selected.setDay(day)
// returns month as a string
model.calendar.selected.monthString()
// returns day for selected date
model.calendar.selected.day()
// returns year for selected date
model.calendar.selected.year()
