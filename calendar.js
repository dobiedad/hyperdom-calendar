var today = new Date();
var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

var daysOfWeek = [
  'Mo',
  'Tu',
  'We',
  'Th',
  'Fr',
  'Sa',
  'Su'
]

function Calendar() {
  this.today =today,
  this.selected = {
    date: today,
    month: function () {
      return this.date.getMonth()
    },
    firstOfMonthDay:function () {
      return new Date(this.year(), this.month(), 1).getDay() - 1
    },
    nextMonth: function () {
      this.date = new Date(this.year(), this.month()+1, 1)
      return this.month()
    },
    prevMonth: function () {
      this.date = new Date(this.year(), this.month()-1, 1)
      return this.month()
    },
    setDay: function (day) {
      this.date = new Date(this.year(), this.month(), day)
      return this.day()
    },
    monthString: function () {
      return months[this.date.getMonth()]
    },
    day: function () {
      return this.date.getDate()
    },
    year: function () {
      return this.date.getFullYear()
    }
  }
}

module.exports = Calendar
