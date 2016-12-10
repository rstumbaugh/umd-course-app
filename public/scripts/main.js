/**
 * main.js
 * 6 Dec 2016
**/

'use strict';

function APITest() {
    this.courseField = document.getElementById('txtCourse');
    this.difficultyField = document.getElementById('rtgDifficulty');
    this.interestField = document.getElementById('rtgInterest');
    this.submitCourseButton = document.getElementById('btnSubmitCourse');
    this.courseIdWrap = document.getElementById('courseInputWrap');
    this.validationMessage = document.getElementById('courseErrorMsg');

    $('#txtCourse').keypress(function(e) {
        if (e.keyCode == 13) {
            $('#btnSubmitCourse').click();
        }
    });

    $('form').submit(function(e) {
        e.preventDefault();
    });

    //this.queryField = document.getElementById('txtQuery');
    //this.submitQuery = document.getElementById('btnQuery');

    this.database = firebase.database(); 
    this.submitCourseButton.addEventListener('click', this.submitCourse.bind(this));
    //this.submitEmail.addEventListener("click", this.saveEmail.bind(this)); 
    //this.submitQuery.addEventListener("click", this.doQuery.bind(this));
    //this.submitQuery.addEventListener("click", this.search.bind(this));
}

APITest.prototype.submitCourse = function() {
    this.courseIdWrap.classList.remove('has-error');

    $("#courseErrorMsg").hide();
    $("#courseSuccessMsg").hide();

    var courseId = this.courseField.value.toUpperCase();
    var diffRating = parseInt(this.difficultyField.value);
    var interestRating = parseInt(this.interestField.value);

    // TODO: validate course name

    if (this.courseIsValid(courseId)) {
        this.database.ref("/courses_prod/"+courseId+"/difficulty").push({
            rating: diffRating
        });

        this.database.ref("/courses_prod/"+courseId+"/interest").push({
            rating: interestRating
        });
        $('#courseSuccessMsg').css('visibility', 'visible').slideDown();
        $('#txtCourse').val('');
        $('.rating').rating('rate', '1');
    } else {
        this.courseIdWrap.classList.add('has-error');
        $('#courseErrorMsg').css('visibility', 'visible').slideDown();
    }
    
};

APITest.prototype.saveEmail = function() {
    this.database.ref("/email/").push({
        email: this.emailField.value
    }); 
};

APITest.prototype.courseIsValid = function(name) {
    var pattern = /^[a-zA-Z]{4}[0-9]{3}[a-zA-Z]?$/
    var matches = name.match(pattern);

    return matches != null;
}


APITest.prototype.search = function() {
    $("#queryResult").text("");
    var url = "http://api.umd.io/v0/courses/list";
    var term = this.queryField.value;

    var myclass = this;
    $.ajax({
        method: "GET",
        dataType: "json",
        url: url,
        data: "",
        success: function(data) {
            var filtered = myclass.findTerm(data, term);

            filtered.forEach(function(element) {
                var text = $("#queryResult").text();
                text += element["course_id"] + ": " + element["name"];
                text += "\n";
                $("#queryResult").text(text);
            });
        }
    });
};

APITest.prototype.findTerm = function(list, term) {
    var filterFunc = function(item) {
        return item["name"].toLowerCase().includes(term.toLowerCase());
    }

    return list.filter(filterFunc);
};

APITest.prototype.doQuery = function() {
    var url = "http://api.umd.io/v0/courses?";
    var query = this.queryField.value;

    url = url + query;

    $.ajax({
        method: "GET",
        dataType: "json",
        url: url,
        data: "",
        success: function(data) {
            var json_as_str = JSON.stringify(data);
            $("#queryResult").text(json_as_str);
            $("#numCourses").text("Number of results: "+data.length);
        }
    });
};

window.onload = function() {
    window.apiTest = new APITest();
}
