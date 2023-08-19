let searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", (e) => {
  //stop page from refreshing
  e.preventDefault();
  //get the searched value
  const search = document.getElementById("search");
  //fetch 9 videos using the searched term
  fetch(
    //get search results from youtube api
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=9&order=date&q=${search.value}&type=video&key=AIzaSyDnEhZqd3ytUeBqx3iDhxryiAFRbaNjqfw`
  )
    .then((result) => {
      //return youtube results via process in JSON
      return result.json();
    })
    .then((data) => {
      //properly access data that has been returned via promise
      const videoList = data.items;
      const videoBox = document.querySelector(".video-box");
      //if videos are already populated, clear them first
      videoBox.innerHTML = " ";
      //loop through the list of videos and use needed information
      for (video of videoList) {
        //save the video's unique video id to be used as part of the URL
        const videoUrl = video.id.videoId;
        videoBox.innerHTML += `<div class="container">
        <a href="https://www.youtube.com/watch?v=${videoUrl}"><img src="${video.snippet.thumbnails.high.url}" class="img-box"></a> <p class="center">${video.snippet.title}</p>
        </div>`;
      }
      //blur images when mouse hovers over them
      videoBox.addEventListener("mouseover", (event) => {
        if (event.target.className === "img-box") {
          event.target.style.filter = "blur(7px)";
        }
      });
      //remove blur from images when mouse leaves them
      videoBox.addEventListener("mouseout", (event) => {
        if (event.target.className === "img-box") {
          event.target.style.filter = "blur(0)";
        }
      });
    });
});
