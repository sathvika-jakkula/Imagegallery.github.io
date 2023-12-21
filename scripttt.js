/* ----------------DOM ELEMENTS ---------------*/
const upload = document.getElementById("upload");
const display = document.getElementById("display");
const input = document.getElementById("input");
const nopics = document.getElementById("nopics");
let deleteimage = document.getElementsByClassName("deleteimage");
const allimages = document.querySelectorAll(".image");

/* ------------------ NO IMAGES TEXT ------------------*/
const noimagestext = `<span style="font-size:50px">oops!<span> <br><br><h1 style="font-size:30px">No Images In The Gallery <h1>`

/*----------------COUNT OF IMAGES --------------------*/
let count = 0;

if (allimages.length === 0) {
    nopics.innerHTML = noimagestext
}

/* ---------------UPLOAD ONCLICK EVENT FUNCTION------------------*/
function showimages() {
      const images = input.files;
      if (images.length === 0) {
        alert("select images to upload");
      }
      for (let i = 0; i < images.length; i++) {
          const image = new FileReader();
           image.readAsDataURL(images[i]);
          image.addEventListener("load", function (event) {
      /* --------------- IMAGE CREATION  AND APPENDING TO DISPLAY-------------------*/
            const pic = event.target;
            const div = document.createElement("div");
            const date = document.createElement("h1");
            var currentdate = new Date();
            var datetime = + currentdate.getDate() + "/"
              + (currentdate.getMonth() + 1) + "/"
              + currentdate.getFullYear() + " @ "
              + currentdate.getHours() + ":"
              + currentdate.getMinutes();
            div.className = "image";
            div.setAttribute("id", count);
            div.innerHTML = ` <img  src = "${pic.result}" title="${pic.name}"/>  <h1> Uploaded on: ${datetime} </h1> `;
            // div.appendChild(date);
            display.appendChild(div);
            count++;
            nopics.innerHTML = "";
          })
         
      }
      input.value = "";
}

/*----------------- DISPLAYING SINGLE IMAGE IN POPUP --------------------------*/
display.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        document.querySelector('.popupimage').style.display = 'block';
        document.querySelector('.popupimage img').src = e.target.src;
        document.querySelector(".popupimage h1").innerHTML = e.target.parentElement.querySelector("h1").innerHTML;
        document.querySelector('.popupimage h1').style.display = 'block';
    }
    /*-----------------DELETE THE IMAGE ONCLICK EVENT ----------------------*/
    document.querySelector(".popupimage").onclick = (e) => {
      if (e.target.id === "deletepopupimage") {
        deletespan();
        let allimages = document.querySelectorAll(".image");
        allimages.forEach(ele => {
          if (ele.querySelector("img").src === e.target.parentElement.parentElement.querySelector("img").src) {
            ele.remove();
            const allimagess = document.querySelectorAll(".image");
            if (allimagess.length === 0) {
              nopics.innerHTML = noimagestext
            }
          }
        })
      }
    }
}, false)

/*-------------------BACK FROM POPUP FUNCTION ---------------*/
function deletespan() {
  document.querySelector('.popupimage').style.display = "none";
}

/*---------------EVENT LISTENER FOR BACK FROM POPUP ---------*/
const popupspan = document.querySelector(".popupimage span");
popupspan.addEventListener("click", deletespan)

/*----------------DELETE ALL THE IMAGES EVENT ----------------*/
const deleteall = document.getElementById("delete");
deleteall.addEventListener("click", function () {
    const havornot = document.querySelectorAll(".image");
    if (havornot.length === 0) {
      alert("No Images to Delete!")
    } else {
      alert("Deleting all images");
      display.innerHTML = '';
    }
    nopics.innerHTML = noimagestext
    input.value = "";
});

/*--------------EDIT ONCLICK EVENT----------------*/
const edit = document.getElementById("edit");
edit.addEventListener("click", function (e) {
  const imagelink = e.target.parentElement.parentElement.querySelector("img").src;
  document.querySelector('.popupimage2').style.display = 'block';
  document.querySelector('.popupimage2 img').src = imagelink;
})

/*----------------BACK FROM THE EDIT POPUP-----------*/
function back2(e) {
  document.querySelector('.popupimage2').style.display = "none";
};

/*-------------------EVENT LISTENER OF BACK IN EDIT POPUP------------*/
const popupspan2 = document.querySelector(".popupimage2 span");
popupspan2.addEventListener("click", back2);

/*-----------------EDITING THE IMAGE IN EDIT POPUP-------------*/
const edit1 = document.querySelector(".popupimage2").querySelector("img");
const save = document.getElementById("save");
const change = document.querySelectorAll(".popupimage2 div button");
change.forEach(element => {
  element.addEventListener("click", function (e) {
    edit1.className = e.target.innerHTML;
    save.addEventListener("click", function (ele) {
      const images = document.querySelectorAll("#display .image");
      images.forEach(element => {
        if (element.querySelector("img").src === edit1.src) {  
          element.querySelector("img").className = e.target.innerHTML;
          back2();
          deletespan();
        }
      });
    })
  })
})

