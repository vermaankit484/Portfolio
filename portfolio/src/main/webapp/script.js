// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


$(document).ready(function() {
    $(".bodynav li").click(function() {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        $("#headnav li").removeClass("active");
    })
    $("#headnav li").click(function() {
        $(this).addClass("active");
        $(".bodynav li").removeClass("active");
    })
    $(window).scroll(function() {
        var scrollVal = $(window).scrollTop(); 
        if (scrollVal == 0) {
            $("nav").addClass("navclr");
        }
        else if (scrollVal > 0) {
            $("nav").removeClass("navclr");
        }
    });
    $('body').scrollspy({target: ".navbar", offset: 50}); 
});

let idx=0;
let name='Ankit Verma';
typeName = () => {
    if (idx < name.length) {
        document.getElementById('name').innerHTML = name.substring(0, idx + 1) + '<span aria-hidden="true" id="nameSpan"></span>';
        idx++;
        setTimeout(typeName, 100);
    }
}


setInterval(() => {
    idx = 0;
    document.getElementById('name').innerHTML='';
    typeName();
}, 7000);

auth = () => {
    fetch('/auth').then(response => response.json()).then((response) => {
        if (response.isLogin) {
            document.getElementById("commentBox").disabled = false;
            document.getElementById("submitButton").disabled = false;
            document.getElementById("commentBox").placeholder = "Comment";
            document.getElementById("authLog").innerHTML = "<a href=" + response.logOutUrl + ">LogOut</a>";
        } else {
            document.getElementById("commentBox").disabled = true;
            document.getElementById("submitButton").disabled = true;
            document.getElementById("commentBox").placeholder = "Login to comment";
            document.getElementById("authLog").innerHTML = "<a href=" + response.loginUrl + ">LogIn</a>";
        }
    })
}

getComments = () => {
    fetch('/user-comments').then(response => response.json()).then((response) => {
        response.forEach((data) => {
            document.getElementById('commentList').appendChild(createListElement(data));
            console.log(data);
        })
    })
}

createListElement = (data) => {
    const listElement = document.createElement('li');
    listElement.innerText = data.comment;
    listElement.className = 'list-group-item';
    listElement.appendChild(createDivElement(data.email, data.timestamp));
    return listElement;
}

createDivElement = (email, timestamp) => {
    const DivElement = document.createElement('div');
    const emailElement = document.createElement('span');
    emailElement.innerText = email;
    emailElement.className = 'commentUser';
    DivElement.appendChild(emailElement);
    const timeStamp = document.createElement('span');
    timeStamp.className = 'timeStamp commentUser';
    timeStamp.innerText = timeSince(timestamp);
    DivElement.appendChild(timeStamp);
    return DivElement;
}

timeSince = (date) => {
  if (typeof date !== 'object') {
    date = new Date(date);
  }

  var seconds = Math.floor((new Date() - date) / 1000);
  var intervalType;

  var interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = 'year';
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = 'month';
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = 'day';
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = "hour";
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = "minute";
          } else {
            interval = seconds;
            intervalType = "second";
          }
        }
      }
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += 's';
  }

  return interval + ' ' + intervalType + ' ago';
};

onloadEvents = () => {
    typeName();
    auth();
    getComments();
}

document.addEventListener("DOMContentLoaded", onloadEvents);
