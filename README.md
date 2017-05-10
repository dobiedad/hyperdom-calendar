# Hyperdom Calendar
A simple calender for [Hyperdom](https://github.com/featurist/hyperdom)

![alt text](https://cloud.githubusercontent.com/assets/6469970/25592200/cd4676f4-2eaf-11e7-913d-76cd0b3cb679.png)
## Install

### npm
    npm i hyperdom-calendar -S
### Usage
Make sure you add `calendar.min.css` to your styles.
```JavaScript
var h = require('hyperdom').html
var calendar = require('hyperdom-calendar')

function render(model) {
  model.contactCalendar = {}
  return calendar(contactCalendar)
}
```
### API
a [Hyperdom](https://github.com/featurist/hyperdom) model object is required for this component to work. The component will bind these properties to `model.chosenObject`
```JavaScript
// returns todays date as date object
model.chosenObject.today
// returns selected date as date object , initially set to todays date
model.chosenObject.selected.date
// returns selected month as a digit
model.chosenObject.selected.month()
// returns next month from selected month as a digit
model.chosenObject.selected.nextMonth()
// returns prev month from selected month as a digit
model.chosenObject.selected.prevMonth()
// set day for current month current month, returns date object for that day
model.chosenObject.selected.setDay(day)
// returns month as a string
model.chosenObject.selected.monthString()
// returns day for selected date
model.chosenObject.selected.day()
// returns year for selected date
model.chosenObject.selected.year()
