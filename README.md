Throbbage
=========

A cross browser throbber library using CSS animation but falling back to JS if the browser sucks.

Usage
========

    // First argument is a reference to a container element in which you
    // wish to add a throbber to.
    // Second argument is the duration in which you want the throbber to
    // complete one full circle.
    var throbber = throbbage(document.getElementById("container"), 1000);
