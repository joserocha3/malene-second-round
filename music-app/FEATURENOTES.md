### Favorite Feature

Favorite feature built through the following steps:

- Add a favorite key to all albums with the default value of false, after fetching albums from the api.
- Checkbox styled as a heart on each album card that sets the favorite value to true when checked.
- Watch function on the AlbumCard that saves the album favorite value to localStorage if the user has favorited the album.
- onMounted function on the AlbumCard that changes the albums favorite value to true, if the the Album id is stored in localStorage.
- Button to toggle sorting the albums to only show albums that have been favorited.


### Share Feature

Share feature using the Web Share API (https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API)

- Share function in AlbumCard component that calls the navigator.share() method invoking native sharing in the browser. 
- Button that calls the share function when clicked, passing on the album title and url.
