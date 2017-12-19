jQuery(document).ready(function($) {
	var limit=100, // Max number of stars
	screenWidth = $(window).width();

	body=document.getElementById('sparks');


	loop={
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
	/*initialize sparks animation for desktop only*/
	 if( screenWidth > 768 ){
	   loop.start();
	 }
});