window.onload = function(){
    window.addEventListener('mousemove', function(e) {
        var xPos = e.pageX;
        var yPos = e.pageY;

        if(xPos>1200)xPos = 1200;
        let leftPupil = document.getElementById('leftPupil');
        let rightPupil = document.getElementById('rightPupil');
        let top  = (yPos/10) - 46+'px';
        let left = (xPos/10) - 56+'px';

        leftPupil.style.top = top
        leftPupil.style.left= left
        rightPupil.style.top = top
        rightPupil.style.left= left

      });

      function type(element,txt,speed){
        var i = 0;
        function typeWriter() {
          if (i < txt.length) {
            document.getElementById(element).innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
          }
        }
        typeWriter();
      }

      
      setTimeout(()=>{
        type('title','Hola Lilia',70);
      },300)
      

      setTimeout(()=>{
        type('p1','Hoy es mi cumpleaños :)',70);
      },1500)

      setTimeout(()=>{
        type('p2','Solo quería decirte',70);
      },3800)

      setTimeout(()=>{
        type('p3','...',200);
      },5500)

      setTimeout(()=>{
        type('p4','Que ya no se como llamar tu atención',70);
        setTimeout(()=>{
          document.getElementById('leftEyebrow').style.display = 'inline';
          document.getElementById('rightEyebrow').style.display = 'inline';
          //document.getElementById('fire').style.visibility = 'visible';
          document.getElementById('leftEyeIris').style.backgroundImage='radial-gradient(rgb(255,80,0) 20%, rgba(255,80,0,0) 100%)';
          document.getElementById('rightEyeIris').style.backgroundImage='radial-gradient(rgb(255,80,0) 20%, rgba(255,80,0,0) 100%)';
        },2800)
      },7500)

    }