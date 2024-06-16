function sendMail() {
    var link = "mailto:NUHowSupport@email.com"
             + "?cc=myCCaddress@example.com"
             + "&subject=" + encodeURIComponent(document.getElementById('name').value + "'s Question")
             + "&body=" + encodeURIComponent(document.getElementById('message').value);

    // Create a temporary anchor element
    var a = document.createElement('a');
    a.href = link;
    a.target = '_blank'; // Open in a new tab

    // Append the anchor to the body
    document.body.appendChild(a);

    // Programmatically click the anchor
    a.click();

    // Remove the anchor from the document
    document.body.removeChild(a);
}
