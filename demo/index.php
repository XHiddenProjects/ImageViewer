<!DOCTYPE html>
<html>
	<head>
		<title>Image Viewer</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="src/fontawesome/6.3.0/css/all.min.css"/>
		<link href="src/css/imgviewer.css?v=<?php echo time();?>" rel="stylesheet" type="text/css"/>
	</head>
	<body>
		<div class="imgViewer-container" view="video">
			<video src="src/vid/demo.mp4" alt="demo" img-desc=""></video>
		</div>
	</body>
	<script src="src/fontawesome/6.3.0/js/all.min.js"></script>
	<script src="src/js/imgviewer.js?v=<?php echo time();?>"></script>
	<script>
		let iv = new ImgViewer();
			iv.init();
			iv.video({desc:{display:true, viewer:false},poster:[],progressFill:['cyan'],skipRate:[5]});
			//iv.gallery({width:3, desc:{display:true,viewer:true},hover:true});
			//iv.stack({desc:{display:true,viewer:true}});
			//iv.frame({type:'landscape',radius:'5px',desc:{display:false,viewer:true}});
			iv.viewer({viewAs:'video',static:false,base:{download:true, open:true, copy:true, clone:true},animate:''});
			//iv.resize(1);
			//iv.crop(1);
			//iv.filters(1,{grayscale:'100%',sepia:'100%',hueRotate:'180deg'});
			//iv.card({desc:{display:true,viewer:false}});
			
	</script>
</html>