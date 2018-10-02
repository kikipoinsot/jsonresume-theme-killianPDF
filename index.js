var fs = require('fs');
var _ = require('lodash');
var Mustache = require('mustache');

function render(resumeObject) {

    resumeObject.css = fs.readFileSync(__dirname + "/style.css", "utf-8");

    if (resumeObject.basics.picture) {
        resumeObject.photo = resumeObject.basics.picture ? resumeObject.basics.picture : "avatar.jpg";
    }

    if (resumeObject.work && resumeObject.work.length) {
        resumeObject.workBool = true;
        _.each(resumeObject.work, function(w){
            if (w.highlights) {
                if (w.highlights[0]) {
                    if (w.highlights[0] != "") {
                        w.boolHighlights = true;
                    }
                }
            }
        });
    }

    if (resumeObject.education && resumeObject.education.length) {
        resumeObject.educationBool = true;
        _.each(resumeObject.education, function(e){
            if (e.courses) {
                if (e.courses[0]) {
                    if (e.courses[0] != "") {
                        e.educationCourses = true;
                    }
                }
            }
        });
    }

    if (resumeObject.skills && resumeObject.skills.length) {
        if (resumeObject.skills[0].name) {
            resumeObject.skillsBool = true;
        }
    }

    if (resumeObject.interests && resumeObject.interests.length) {
        if (resumeObject.interests[0].name) {
            resumeObject.interestsBool = true;
        }
    }

    var theme = fs.readFileSync(__dirname + '/resume.template', 'utf8');
    var resumeHTML = Mustache.render(theme, resumeObject);
    return resumeHTML;
};

module.exports = {
    render: render
}