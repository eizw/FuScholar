const list = document.getElementById("index-list");

var a = list.querySelectorAll("li.fu-list");
var b = [];
var c = document.getElementsByClassName("fu-name");
for (j = 0;j < c.length; j++) {
    b.push(c[j].innerText);
}

function sortListByName() {
    var switching = true;
    var dir = "asc";
    var switchcount = 0;
    var shouldSwitch = true;

    while (switching) {
        switching = false;
        for (i = 0; i < (b.length); i++) {
            shouldSwitch = false;
            if (dir == "asc") {
                if (b[i].toLowerCase() > b[i + 1].toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (b[i].toLowerCase() < b[i + 1].toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            a[i].parentNode.insertBefore(a[i + 1], a[i]);
            switching = true;
            switchcount++;
        } if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
        }
    }
}

console.log(b);
console.log(a);


// var leftwingImage = document.getElementsByClassName('card-img-left');
// var card = document.getElementsByClassName('card');

// const cardBalance = () => {
//     if (leftwingImage.style.height > card.style.height) {
//         card.style.height = leftwingImage.style.height;
//     } else {
//         leftwingImage.style.height = card.style.height;
//     }
// }

// cardBalance();