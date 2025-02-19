const view = {};
view.setActiveScreen = (screenName) => {
    switch(screenName){
        case'home':
        document.getElementById('page-container').innerHTML = components.home;
        break;
        case'model':
        document.getElementById('page-container').innerHTML = components.model;
        const slideShows = document.getElementsByClassName('slideShow');
        const dots = document.getElementsByClassName('dot')
        var slideShowIndex = 0;
        slideShowImage();
        function slideShowImage(){
        slideShowIndex++;
        if(slideShowIndex>slideShows.length){slideShowIndex=1};
        for(let i=0; i<slideShows.length; i++){
        slideShows[i].style.display ="none";
        dots[i].classList.remove('active');
    };
    slideShows[slideShowIndex-1].style.display="block";
    dots[slideShowIndex -1].classList.add('active');
    setTimeout(slideShowImage,2000);
}
        break;
        case'brand':
        document.getElementById('page-container').innerHTML = components.brand;
        break;
        case'history':
        document.getElementById('page-container').innerHTML = components.history;
        break;
        case'new':
        document.getElementById('page-container').innerHTML = components.new;
        document.querySelectorAll('new').forEach(element=>{
            element.addEventListener('click',(e)=>{console.dir(e.target)})
        })
        break;
        case'album':
        document.getElementById('page-container').innerHTML = components.album;
        fetch('./imageLamborghini.json').then((res)=>{
            return res.json();
          }).then((data)=>{
            const imageLamborghini = [...data];
            console.log(imageLamborghini);
            var gallery = document.querySelector('#gallery');
            imageLamborghini.forEach((element)=>{
                console.log(element.url);
                gallery.innerHTML += `  
                <div class="gallery-item">
                <div class="content">
                <img src="${element.url}" alt="image Lamborghini">
                </div>
                 </div>`
        
            })
          var getVal = function (elem, style) { return parseInt(window.getComputedStyle(elem).getPropertyValue(style)); };
          var getHeight = function (item) { return item.querySelector('.content').getBoundingClientRect().height; };
          var resizeAll = function () {
              var altura = getVal(gallery, 'grid-auto-rows');
              var gap = getVal(gallery, 'grid-row-gap');
              gallery.querySelectorAll('.gallery-item').forEach(function (item) {
                  var el = item;
                  el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
              });
          };
          gallery.querySelectorAll('img').forEach(function (item) {
              item.classList.add('byebye');
              if (item.complete) {
                  console.log(item.src);
              }
              else {
                  item.addEventListener('load', function () {
                      var altura = getVal(gallery, 'grid-auto-rows');
                      var gap = getVal(gallery, 'grid-row-gap');
                      var gitem = item.parentElement.parentElement;
                      gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
                      item.classList.remove('byebye');
                  });
              }
          });
          window.addEventListener('resize', resizeAll);
          gallery.querySelectorAll('.gallery-item').forEach(function (item) {
              item.addEventListener('click', function () {        
                  item.classList.toggle('full');        
              });
          });
          
          })
          
        break;
        case'contact':
        document.getElementById('page-container').innerHTML = components.contact;
        break;
    }
}