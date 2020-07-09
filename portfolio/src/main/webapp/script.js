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
    $("#one").click(function() {
        $("#two").removeClass("active");
        $("#three").removeClass("active");
        $("#four").removeClass("active");
        $("#one").addClass("active");
    });
    $("#two").click(function() {
        $("#one").removeClass("active");
        $("#three").removeClass("active");
        $("#four").removeClass("active");
        $("#two").addClass("active");
    });
    $("#three").click(function() {
        $("#two").removeClass("active");
        $("#one").removeClass("active");
        $("#four").removeClass("active");
        $("#three").addClass("active");
    });
    $("#four").click(function() {
        $("#two").removeClass("active");
        $("#three").removeClass("active");
        $("#one").removeClass("active");
        $("#four").addClass("active");
    });
    $(window).scroll(function() {
        if ($(window).scrollTop() == 0) {
            $("nav").addClass("navclr");
            console.log("First");
        }
        else if ($(window).scrollTop() > 0) {
            $("nav").removeClass("navclr");
            console.log("Done");
        }
    })
});

let idx=0;
let name='Ankit Verma';
typeName = () => {
    if (idx < name.length) {
        document.getElementById('name').innerHTML += name.charAt(idx);
        idx++;
        setTimeout(typeName, 100);
    }
}


setInterval(() => {
    idx = 0;
    document.getElementById('name').innerHTML='';
    typeName();
}, 7000);