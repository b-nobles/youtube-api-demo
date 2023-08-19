fetch(
  //get search results from youtube api
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=9&order=date&q=React.js&type=video&key=AIzaSyDnEhZqd3ytUeBqx3iDhxryiAFRbaNjqfw"
)
  .then((result) => {
    //return youtube results via process in JSON
    return result.json();
  })
  .then((data) => {
    //properly access data that has been returned via promise
    const videoList = data.items;
    const videoBox = document.querySelector(".video-box");
    //loop through the list of videos and use needed information
    for (video of videoList) {
      //save the video's unique video id to be used as part of the URL
      const videoUrl = video.id.videoId;
      videoBox.innerHTML += `<div class="container">
      <a href="https://www.youtube.com/watch?v=${videoUrl}"><img src="${video.snippet.thumbnails.high.url}" class="img-box"></a> <p class="center">${video.snippet.title}</p>
      </div>`;
    }
  });
