var hyperdom = require('hyperdom')
var h = hyperdom.html

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

var today = new Date();

var calendarForToday = {
  today:today,
  selected: {
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

function HyperdomCalendar(calendarModel) {
  if(!calendarModel.selected){
    calendarModel = calendarForToday
  }
  return renderCalendar(calendarModel)
}

function renderCalendar(calendarModel) {
  return h("div.animated.fadeIn",
    h("div.month",
      h("ul",
        h("li.prev",{ onclick:function () {
          calendarModel.selected.prevMonth()
        }}, "❮"),
        h("li.next",{ onclick:function () {
          calendarModel.selected.nextMonth()
        }}, "❯"),
        h("li",calendarModel.selected.monthString(),
          h("br"),
          h("span", {"style":{"font-size":"18px"}},  calendarModel.selected.year())))),
      listDaysOfWeek(calendarModel),
      listOfDaysForMonth(calendarModel)
    )
}

function listDaysOfWeek(calendarModel) {
  return h("ul.weekdays",
    daysOfWeek.map(function (weekday) {
      return h("li", weekday)
    })
  )
}

function listOfDaysForMonth(calendarModel) {
  var self = this
  var arrayOfDays = arrayFromOneToN(daysInMonth(calendarModel.selected.month(),calendarModel.selected.year()))
  return h("ul.days",
    arrayFromOneToN(calendarModel.selected.firstOfMonthDay()).map(function (weekday) {
      return h("li", '')
    }),
    arrayOfDays.map(function (day) {
      return h("li",{class:calendarModel.selected.day() == day ? 'active' : '',onclick:function () {
        calendarModel.selected.setDay(day)
      }}, day)
    })
  )
}

function arrayFromOneToN(end) {
  var start = 1;
  var temp = [];
  for (var i = start; i <= end; i++) {
      temp.push(i);
  }
  return temp;
}

Date.prototype.monthDays= function(){
  var d= new Date(this.getFullYear(), this.getMonth()+1, 0);
  return d.getDate();
}

function daysInMonth(month,year) {
  return new Date(year, month, 0).getDate();
}

module.exports = HyperdomCalendar
