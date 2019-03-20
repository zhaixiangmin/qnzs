
	function fp_ready(){
	// setting custom defaults
	Flatpickr.l10n.firstDayOfWeek = 1;

	//Regular flatpickr
	document.getElementById("flatpickr-tryme").flatpickr();
	document.getElementsByClassName("calendar").flatpickr();

	var calendars = document.getElementsByClassName("flatpickr").flatpickr();

	var real_selection = document.getElementById("realdate");
	document.getElementById("alt")._flatpickr.config.onChange = function(obj, str){
		real_selection.textContent = str;
	}

	document.getElementById("disableRange").flatpickr({
		disable: [
			{
				from: "2016-08-16",
				to: "2016-08-19"
			},
			"2016-08-24",
			new Date().fp_incr(30) // 30 days from now
		],
		minDate: "today"
	});

	document.getElementById("disableOddDays").flatpickr({
		disable: [
			function(date) { return date.getDate()%2; } // disable odd days
		]
	});
	document.getElementById("enableNextSeven").flatpickr({
		enable: [
			{
				from: "today",
				to: new Date().fp_incr(7)
			}
		]
	});
	document.getElementById("enableCustom").flatpickr({
		enable: [
			function(dateObj){
				return dateObj.getDay() %6 !== 0 && dateObj.getFullYear() === 2016;
			}
		]
	});

	// Event API
	var events = document.getElementById("events");
	document.getElementById("events-api-example").flatpickr({
		minDate: "today",
		enableTime: true,
		onChange: function(dateObj, dateStr, fp) {
			console.log(fp.selectedDateObj);
			events.innerHTML += "<b>onChange</b> (<code>" + dateObj + "</code>, <code>" + dateStr + "</code> )<br>";
			events.scrollTop = events.offsetTop;
		},
		onOpen: function(dateObj, dateStr, fp){
			events.innerHTML += "<b>onOpen</b> (<code>" + dateObj + "</code>, <code>" + dateStr + "</code> )<br>";
			events.scrollTop = events.offsetTop;
		},
		onClose: function(dateObj, dateStr, fp){
			events.innerHTML += "<b>onClose</b> (<code>" + dateObj + "</code>, <code>" + dateStr + "</code> )<br>";
			events.scrollTop = events.offsetTop;
		},
		onReady: function(dateObj, dateStr, fp){
			events.innerHTML += "<b>onReady</b> (<code>" + dateObj + "</code>, <code>" + dateStr + "</code> )<br>";
			events.scrollTop = events.offsetTop;
		}
	});

	// Check in/out example
	var check_in = document.getElementById("check_in_date").flatpickr({
		altInput: true,
		altFormat: "\\C\\h\\e\\c\\k \\i\\n\\: l, F j Y",
		minDate: new Date()
	});
	var check_out = document.getElementById("check_out_date").flatpickr({
		altInput: true,
		altFormat: "\\C\\h\\e\\c\\k \\o\\u\\t: l, F j Y",
		minDate: new Date()
	});

	check_in.config.onChange = function(dateObj) {
		check_out.set("minDate", dateObj.fp_incr(1));
	};
	check_out.config.onChange = function(dateObj) {
		check_in.set("maxDate", dateObj.fp_incr(-1));
	}

	var fiscal = document.getElementById("fiscal").flatpickr({
		weekNumbers: true
	});

	// Fiscal calendar
	fiscal.getWeek = function(givenDate){
		var checkDate = new Date(givenDate.getTime());
		checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
		var time = checkDate.getTime();
		checkDate.setMonth(7);
		checkDate.setDate(28);
		var week = (Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 2);
		if (week < 1) {
			week = 52 + week;
		}
		return 'FW' + ("0" + week).slice(-2);
	}

	fiscal.redraw();


	// Date format
	var fpInstance = new Flatpickr(document.createElement("input")),
		formatOutput = document.getElementById("dateFormatOutput"),
		now = new Date();

	document.getElementById("dateFormatComposer").addEventListener("keyup", function(e){
		formatOutput.textContent = fpInstance.formatDate(e.target.value, now);
	});

	}
	