var theaccessToken = window.localStorage.getItem("accessToken");
var accessToken = '';
var userid = '';
if (!theaccessToken) {
  window.location.href = './login.html';

} else {
  accessToken = "Bearer " + theaccessToken;
  userid = window.localStorage.getItem("id");
}
