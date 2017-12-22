const limit=100, // Max number of stars
body=document.getElementById('sparks');

const loop={
	//initilizeing
	 start:function(){
	 for (var i=0; i <= limit; i++) {
	        var spark=this.newSpark();
	        spark.style.top=this.rand()*100+"%";
	        spark.style.left=this.rand()*100+"%";
	        spark.style.webkitAnimationDelay=this.rand()+"s";
	        spark.style.mozAnimationDelay=this.rand()+"s";
	        body.appendChild(spark);
	     };
	   },
	    //to get random number
	   rand:function(){
	       return Math.random();
	   },
	    //createing html dom
	    newSpark:function(){
	       var d = document.createElement('div');
	         d.innerHTML = '<div class="spark"></div>';
	         return d.firstChild;
	       },
	};


//::::::::::::::Funciones para el video desde YouTube:::::::::::::

//1. cargamos el script de forma async

const tag = document.createElement('script');
tag.src='https://www.youtube.com/iframe_api';

const firstScript = document.getElementsByTagName('script')[0];
firstScript.parentNode.insertBefore(tag, firstScript);

//2. creamos iframe despues de la carga del API

let player = {};
let playReady;


//Creamos los eventos del video
let done = false;
let videoId = 'nhfl5K4l114'; //ID del video de YouTube

const onYouTubeIframeAPIReady = ()=>{
	
	player = new YT.Player(
	'video', //ID del objeto donde se carga
	    {//Parametros de la reproduccion
          playerVars: {
                controls: 0,
                disablekb: 1,
                autoplay: 0,
                showinfo: 0,
                rel: 0
            },//Parametros del iframe
          height: '410',
          width: '750',
          videoId,  
          events: {
          'onReady': playReady,
          'onStateChange': playStateChange
        }
	});
};


//revisamos estado del video para hacer loop

const playStateChange = (e) =>{

	if (e.data == YT.PlayerState.ENDED && !done){
		//El video terminó y lo reiniciamos
		done = true;
	};

	if (player.getPlayerState() == 1){
		//bajamos bandera cuando se inicia el video
		done = false;
	};

	if (player.getPlayerState() == 2){
		//bajamos bandera cuando se inicia el video
		done = false;
		// console.log('pausado')
		player.pauseVideo();


	};


};


jQuery(document).ready(function() {


	const screenWidth = jQuery(window).width();
	/*initialize sparks animation for desktop only*/
	 // if( screenWidth > 768 ){
	 //   setTimeout( ()=>{
	 //   	loop.start();
	 //   } , 1000)
	 // };

		


	jQuery('a.play').click(function(e) {

		e.preventDefault();
		jQuery(this).fadeOut();
		
		player.playVideo();
		playReady = (a) =>{
			a.target.playVideo();
		};


	});

	 
});