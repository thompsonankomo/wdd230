let imagesToLoad = document.querySelectorAll('img[data-src]');
const imageToLoad = document.querySelectorAll("img[data-src]");


const imageOption = {
  threshold: 1,
  rootmargin: "0px 0px 50px 0px",
};

const loadImages = (image) => {
  image.setAttribute("src", image.getAttribute("data-src"));
  image.onload = () => {
    image.removeAttribute("data-src");
  };
};

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
        if(item.isIntersecting){
            loadImages(item.target);
            observer.unobserve(item.target);
        }
    });
  }, imageOption);

  
  imageToLoad.forEach((img) => {
    loadImages(img);
  });
} else {
  imageToLoad.forEach((img) => {
    loadImages(img);
  });
}