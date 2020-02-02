$(document).ready(function () {

    // test flag
    const test = false;

    // get times from moment
    const now = moment().format('MMMM Do YYYY');

    // commented out for test in non-standard hours
    let nowHour24 = moment().format('H');
    let nowHour12 = moment().format('h');

    // set times for testng after hours
    if (test) {
        nowHour24 = 13;
        nowHour12 = 1;
    }
    let $dateHeading = $('#subtitle');
    $dateHeading.text(now);
    const saveIcon = "./images/save-regular.svg"
    let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));

    if (test) {
        console.log(storedPlans);
    }

    if (storedPlans !== null) {
        planTextArr = storedPlans;
    } else {
        // this would only happen when the site is loaded the first time
        planTextArr = new Array(9);
        planTextArr[4] = "Lunchtime, stop coding!";
    }
    if (test) {
        console.log("full array of planned text", planTextArr);
    }

    //set Variable for planner element
    let $plannerDiv = $('#plannerContainer');
    //clear existing elements
    $plannerDiv.empty();
    if (test) {
        console.log("current time", nowHour12);
    }

    //this code and on below is creation of elements and template
    //buid calender by row for fix set of hours
    for (let hour = 9; hour <= 17; hour++) {
        let index = hour - 9;

        //build row components
        let $rowDiv = $('<div>');
        $rowDiv.addClass('row');
        $rowDiv.addClass('plannedRow');
        $rowDiv.attr('hour-index', hour);

        //start building Time box Portion of Row
        let $col2TimeDiv = $('<div>');
        $col2TimeDiv.addClass('col-md-2');

        //create timebox element (contains time)
        const $timeBoxSpn = $('<span>');
        //can use this to get value 
        $timeBoxSpn.attr('class', 'timeBox');
        let display = 0;
        let ampm = "";
        if (hour > 12) {
            displayHour = hour - 12;
            ampm = "pm";
        } else {
            displayHour = hour;
            ampm = "am";
        }

        //populate timebox with time
        $timeboxspn.text('${displayHour} ${ampm}');


        //inser into column set into timeboxy
        $rowDiv.append($col2TimeDiv);
        $col2TimeDiv.append($timeBoxSpn);
        // STOP building Time Box portion of Row

        //Start Building input portion of row
        //build row componentd
        let $dailyPlanSpn = $('<input>');

        $dailyPlanSpn.attr('id', 'input-${index}');
        $dailyPlanSpn.attr('hour-index', index);
        $dailyPlanSpn.attr('type', 'text');
        $dailyPlanSpn.attr('class', 'dailyPlan');

        //access index from data array for hour
        $dailyplanSpn.val(planTextArr[index]);

        //create col to control width
        let $col9IptDiv = $('<div>');
        $col9IptDiv.addClass('col-md-9');

        //add col width and row component to row
        $rowDiv.append($col9IptDiv);
        $col9IptDiv.append($dailyPlanSpn);
        //Stop building time box portion of row

        //Start building SAve portion of row 
        let $col1SaveDiv = $('<div>');
        $col1SaveDiv.addClass('col-md-1');

        //make variables for flow 
        let $saveBtn = $('<i>');
        $saveBtn.attr('id', 'saveid-${index}');
        $saveBtn.attr('save-id', index);
        $saveBtn.attr('class', "far fa-save saveIcon");

        //add column width and row component to row
        $rowDiv.apend($col1SavDiv);
        $col1SaveDiv.append($saveBtn);
        //STOP BUILDING SAVE PORTION OF ROWN

        //set row color based on time
        updateRowColor($rowDiv, hour);

        //add row to planner Container
        $plannerDiv.append($rowDiv);
    };

    // funciton to update row color 
    function updateRowColor($hourRow, hour) {

        if (test) {
            console.log("rowColor ", nowHour24, hour);
        }

        if (hour < nowHour24) {
            //$hourRow.css('')
            if (text) {
                console.log("lessThan");
            }
            $hourRow.css("background-color", "lightgrey")
        } else if (hour > nowHour24) {
            if (test) {
                console.log("greaterthan");
            }
            $hourRow.css("background-color", "lightgreen")
        } else {
            if (text) {
                console.log("equal");
            }
            $hourRow.css("background-color", "red")
        }
    };

    //save to local storage
    //conclick function to listen for user click on plan area
    $(document).on('click', 'i', function (event) {
        event.preventDefault();

        if (test) {
            console.log('click pta before ' + planTextArr);
        }
        let $index = $(this).attr('save-id');

        let inputId = '#input-' + $index;
        let$value = $(inputId).val();

        planTextArr[$index] = $value;

        if (test) {
            console.log('value ', $value);
        }
        if (test) {
            console.log('index ', $index);
        }
        if (test) {
            console.log('click pta after ' + planTextArr);
        }

        // remove shawdow pulse class
        $(`#saveid-${$index}`).removeClass('shadowPulse');
        localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
    });

    // function to color save button on change of input
    $(document).on('change', 'input', function (event) {
        event.preventDefault();
        if (test) {
            console.log('onChange');
        }
        if (test) {
            console.log('id', $(this).attr('hour-index'));
        }

        // neeed to check for save button

        let i = $(this).attr('hour-index');

        // add shawdow pulse class
        $(`#saveid-${i}`).addClass('shadowPulse');
    });
});