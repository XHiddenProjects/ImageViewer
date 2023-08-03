/*structure*/
class ImgViewer{
	constructor(){}
	init(){
		const con = document.querySelectorAll('.imgViewer-container');
		for(let i=0;i<con.length;i++){
			con[i].classList.add('loaded');
		}
			  
	}
	mkLk(lks){
		if(lks.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig)){
			let url = lks.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig);
			return lks.replace(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig,'<a href="'+url+'" target="_blank">'+url+'</a>');
		}else{
			return lks;
		}
	}
	mkNL(nL){
		if(nL.match(/\n|\r|\r\n/)){
			let line = nL.match(/\n|\r|\r\n/);
			return nL.replace(/\n|\r|\r\n/,'<br/>');
		}else{
			return nL;
		}
	}
	gallery(s){
		if(typeof s!=='object'){
			console.error('gallery[1] must be a JSON object');
			return false;
		}
		if(typeof s.width!=='number'){
			console.error('gallery[1].width must be a number');
			return false;
		}
		s.width = Math.round(s.width);
		if(typeof s.desc.display!=='boolean'){
			console.error('gallery[1].desc.display must be a boolean');
			return false;
		}
		if(typeof s.desc.viewer!=='boolean'){
			console.error('gallery[1].desc.viewer must be a boolean');
			return false;
		}
		let gal = document.querySelectorAll('.imgViewer-container.loaded');

		for(let a=0;a<gal.length;a++){
			if(gal[a].getAttribute('view').toLowerCase()==='gallery'){
				!s.desc.display||s.desc.viewer ? gal[a].classList.add('noCaption') : gal[a].classList.add('caption');
				 s.desc.viewer ? '' : gal[a].classList.add('noView');
				if(typeof(s.desc.pos)!=='undefined'){
					if(!/tl|tr|ct|bl|br/.test(s.desc.pos)){
						console.error('You must have tl(top-left)|tr(top-right)|ct(center)|bl(bottom-left)|br(bottom-right)');
						return false;
					}else{
						s.desc.pos ? gal[a].classList.add('caption-'+s.desc.pos) : '';
					}
				}
				s.hover ? gal[a].classList.add('hoverable') : '';
				let img = gal[a].querySelectorAll('img');
				for(let i=0;i<img.length;i++){
					let d = document.createElement('div');
						d.innerHTML = (s.desc.display&&!s.desc.viewer ? img[i].outerHTML+'<span class="ImgViewer-desc">'+(img[i].getAttribute('img-desc')!==null ? this.mkNL(this.mkLk(img[i].getAttribute('img-desc'))) : '')+'</span>' : img[i].outerHTML);
						d.classList.add('view');
						d.setAttribute('viewData',i+1);
						gal[a].replaceChild(d,img[i]);
				}
					if(!/auto|1|2|3|4|5|6|7|8/.test(s.width.toString())){
						console.error('You must have auto|1|2|3|4|5|6|7|8');
					}else{
						if(s.width==="auto"){
							gal[a].setAttribute('ws',gal[g].querySelectorAll('img').length+'x');
						}else{
							gal[a].setAttribute('ws',s.width.toString()+'x');
						}
				}
			}
		}
	}
	stack(s){
		if(typeof s!=='object'){
			console.log('stack[1] must be a JSON object');
			return false;
		}
		if(typeof s.desc.display!=='boolean'){
			console.error('stack[1].desc.display must be a boolean');
			return false;
		}
		if(typeof s.desc.viewer!=='boolean'){
			console.error('stack[1].desc.viewer must be a boolean');
			return false;
		}
		let gal = document.querySelectorAll('.imgViewer-container.loaded');
		for(let a=0;a<gal.length;a++){
			if(gal[a].getAttribute('view').toLowerCase()==='stack'){
				!s.desc.display||s.desc.viewer ? gal[a].classList.add('noCaption') : gal[a].classList.add('caption');
				 s.desc.viewer ? '' : gal[a].classList.add('noView');
				let img = gal[a].querySelectorAll('img');
				for(let b=0;b<img.length;b++){
					let d = document.createElement('div');
						d.innerHTML = (s.desc.display&&!s.desc.viewer ? img[b].outerHTML+'<span class="ImgViewer-desc">'+(img[b].getAttribute('img-desc')!==null ? this.mkLk(img[b].getAttribute('img-desc')) : '')+'</span>' : img[b].outerHTML);
						d.classList.add('view');
						d.setAttribute('viewData',b+1);
						d.tabIndex = b+1;
						if(b+1===1){
							d.setAttribute('autofocus',true);
						}
						gal[a].replaceChild(d,img[b]);
				}
			}
		}
		
	}
	frame(s){
		if(typeof s!=='object'){
			console.error('frame[1] must be a JSON object');
			return false;
		}
		if(typeof s.desc.display!=='boolean'){
			console.error('frame[1].desc.display must be a boolean');
			return false;
		}
		if(typeof s.desc.viewer!=='boolean'){
			console.error('frame[1].desc.viewer must be a boolean');
			return false;
		}
		if(typeof s.type!=='string'){
			console.error('frame[1].type must be a string');
			return false;
		}
		if(s.type!=='portrait'&&s.type!=='landscape'){
			console.error('frame[1].type must be a portrait or landscape');
			return false;
		}
		if(typeof s.radius==='undefined'){
			s.radius = '0';
		}else{
			s.radius = s.radius;
		}
		let gal = document.querySelectorAll('.imgViewer-container.loaded');
		for(let a=0;a<gal.length;a++){
			if(gal[a].getAttribute('view').toLowerCase()==='frame'){
				!s.desc.display||s.desc.viewer ? gal[a].classList.add('noCaption') : gal[a].classList.add('caption');
				 s.desc.viewer ? '' : gal[a].classList.add('noView');
				 gal[a].classList.add(s.type);
				 gal[a].style.borderRadius = s.radius;
				 let img = gal[a].querySelectorAll('img, video');
				 if(img.length>1||img.length<=0){
					 console.error('You have too many/too less images, REQUIRED MAX 1');
					 return false;
				 }
				for(let b=0;b<img.length;b++){
					let d = document.createElement('div');
					d.innerHTML = (s.desc.display&&!s.desc.viewer ? img[b].outerHTML+'<span class="ImgViewer-desc">'+(img[b].getAttribute('img-desc')!==null ? this.mkNL(this.mkLk(img[b].getAttribute('img-desc'))) : '')+'</span>' : img[b].outerHTML);
					d.classList.add('view');
					d.setAttribute('viewData',b+1);
					d.tabIndex = b+1;
					gal[a].replaceChild(d,img[b]);
				}
			}
		}	
	}
	card(s){
		if(typeof s!=='object'){
			console.error('card[1] must be a JSON object');
			return false;
		}
		if(typeof s.desc.display!=='boolean'){
			console.error('card[1].desc.display must be a boolean');
			return false;
		}
		if(typeof s.desc.viewer!=='boolean'){
			console.error('card[1].desc.viewer must be a boolean');
			return false;
		}
		let gal = document.querySelectorAll('.imgViewer-container.loaded');
		for(let a=0;a<gal.length;a++){
			if(gal[a].getAttribute('view').toLowerCase()==='card'){
				!s.desc.display||s.desc.viewer ? gal[a].classList.add('noCaption') : gal[a].classList.add('caption');
				 s.desc.viewer ? '' : gal[a].classList.add('noView');
				 let img = gal[a].querySelectorAll('img');
				 if(img.length>1||img.length<=0){
					 console.error('You have too many/too less images, REQUIRED MAX 1');
					 return false;
				 }
				for(let b=0;b<img.length;b++){
					let d = document.createElement('div');
					d.innerHTML = (s.desc.display&&!s.desc.viewer ? img[b].outerHTML : img[b].outerHTML);
					d.classList.add('view');
					d.setAttribute('viewData',b+1);
					d.tabIndex = b+1;
					gal[a].replaceChild(d,img[b]);
				}
				for(let c=0;c<img.length;c++){
					let append = document.createElement('span');
						append.innerHTML = this.mkNL(this.mkLk(img[c].getAttribute('img-desc')));
						append.classList.add('ImgViewer-desc')
					gal[a].insertBefore(append, gal[a].children[0]);
					
				}
			}
		}	
	}
	video(s){
		if(typeof s!=='object'){
			console.error('video[1] must be a JSON object');
			return false;
		}
		
		let gal = document.querySelectorAll('.imgViewer-container.loaded');
		for(let a=0;a<gal.length;a++){
			s.desc.viewer = false;
			if(gal[a].getAttribute('view').toLowerCase()==='video'){
				!s.desc.display||s.desc.viewer ? gal[a].classList.add('noCaption') : gal[a].classList.add('caption');
				 s.desc.viewer ? '' : gal[a].classList.add('noView');
				let img = gal[a].querySelectorAll('video');
				for(let b=0;b<img.length;b++){
					s.poster[b]!==''&&s.poster.length>0 ? img[b].poster = s.poster[b] : '';
					let ccItems = [];
					img[b].setAttribute('ondblclick','setFull(this.parentElement.querySelector(".fullscreen"),70)')
					img[b].tabIndex = '1';
					img[b].setAttribute('onkeydown','setFull(this.parentElement.querySelector(".fullscreen"), event);setMute(this.parentElement.querySelector(".mute"),event);actVid(this.parentElement.querySelector(".play-pause-btn"), event);addSec(this, '+(typeof s.skipRate!=='undefined' ? (s.skipRate.length==0||s.skipRate[b]==0 ? 5 : s.skipRate[b]) : 5)+', event);hideContent(this);');
					img[b].setAttribute('onclick','actVid(this.parentElement.querySelector(".play-pause-btn"), 32);hideContent(this);');
					img[b].setAttribute('oncontextmenu','showContent(this, event);return false;');
					img[b].setAttribute('onerror','displayPlayBackErr(this);');
					if(s.subtitles){
							let obj = Object.keys(s.subtitles.lang);
							let objV = Object.values(s.subtitles.lang);
							if(obj.length>0){
								for(let i=0;i<obj.length;i++){
									img[b].innerHTML+='<track'+(s.subtitles.default.toLowerCase()===obj[i].toLowerCase() ? ' default ' : ' ')+'src="'+objV[i][0]+'" kind="subtitles" srclang="'+obj[i].toLowerCase()+'" label="'+objV[i][1]+'"/>';
									if(ccItems.indexOf('<option value="off">Off</option>')){ccItems.push('<option value="off">Off</option>')};
									ccItems.push('<option'+(s.subtitles.default.toLowerCase()===obj[i].toLowerCase() ? ' selected="selected"' : '')+' value="'+obj[i]+'">'+objV[i][1]+'</option>');
								}
							}
						}
					let d = document.createElement('div');
						d.innerHTML = (s.desc.display&&!s.desc.viewer ? img[b].outerHTML : img[b].outerHTML);
						d.innerHTML += (!s.desc.viewer ? '<div class="loading-container"><div class="loading-circle"></div></div><div class="video-player" onclick="hideContent(this);" tabindex="0">'+
						'<div class="video-player-controls">'+
						'<div class="video-progress">'+
						'<div class="video-progress-filled"'+(s.progressFill.length>0 ? 'style="background-color:'+s.progressFill[b]+'"' : '')+'></div>'+
						'</div>'+
						'<span class="play-pause-btn" vid-state="paused" onclick="actVid(this, 32);"><i class="fa-solid fa-play"></i></span>'+
						'<input class="volume" type="range" oninput="changeVidVol(this)" min="0" max="1" step="0.01" value="1"/></div>'+
						'<div class="mute" toggle-stat="normal" onclick="setMute(this, 77)"><i class="fas fa-volume"></i></div>'+
						'<div class="fullscreen" toggle-stat="normal" onclick="setFull(this, 70)"><i class="fa-solid fa-maximize"></i></div>'+
						'<div class="cc" class="ccToggle" toggle-stat="hidden" onclick="toggleCC(this,\'en\');"><i class="fa-solid fa-closed-captioning"></i></div>'+
						'<div class="settings" class="settings"><button onclick="toggleSettings(this);"><i class="fa-solid fa-gear"></i></button><ul class="setList hidden">'+
						'<li><i class="fa-solid fa-closed-captioning"></i> <select class="ccOption" onchange="changeCC(this.parentElement.parentElement.parentElement, this.value)">'+ccItems.toString()+'</select></li>'+
						'<li><i class="fa-solid fa-sliders-up"></i> <select class="PlaybackSpeed" onchange="changePlaySpeed(this.parentElement.parentElement.parentElement, this.value)"><option value="0.25">0.25</option><option value="0.50">0.50</option><option value="0.75">0.75</option><option value="1" selected="selected">Normal</option><option value="1.25">1.25</option><option value="1.50">1.50</option><option value="1.75">1.75</option><option value="2">2</option></select></li>'+
						'</ul></div>'+
						'<div class="theaterMode" onclick="theaterMode(this)"><i class="fa-regular fa-rectangle-wide"></i></div>'+
						'<div class="time">'+
						'<span class="current">00:00</span>&nbsp;/&nbsp;<span class="duration">00:00</span>'+
						'</div></div>'+
						'<div class="videoContext">'+
						'<ul>'+
						'<li onclick="loop(this)"><span class="isActive"></span> <i class="fa-solid fa-arrows-rotate"></i> Loop</li>'+
						'<li onclick="pip(this)"><span class="isActive"></span> <i class="fa-solid fa-bring-forward fa-rotate-180"></i> Pictue-in-Picture</li>'+
						'</ul>'+
						'</div>'+
						'<div class="errorMsg"><div class="container"><h1><i class="fa-solid fa-triangle-exclamation fa-beat" style="color: #ff0000;"></i> Video Playback error</h1><p>There seems to be a problem with the video, try again later!</p></div></div>': '');
						d.classList.add('view');
						d.setAttribute('viewData',b+1);
						
						gal[a].replaceChild(d,img[b]);
						
				}
			}
		}
	}
	viewer(s){
		if(typeof s!=='object'){
			console.error('viewer[1] must be a JSON object');
			return false;
		}
		if(typeof s.static!=='boolean'){
			console.error('viewer[1].static must be a boolean!');
			return false;
		}
		if(typeof s.base!=='object'){
			s.base = {download:true, copy:true, clone:true};
		}else{
			if(typeof s.base.download!=='boolean'){
				s.base.download = true;
			}
			if(typeof s.base.download!=='boolean'){
				s.base.download = true;
			}else{
				s.base.download = s.base.download;
			}
			if(typeof s.base.copy!=='boolean'){
				s.base.copy = true;
			}else{
				s.base.copy = s.base.copy;
			}
			if(typeof s.base.open!=='boolean'){
				s.base.open = true;
			}else{
				s.base.open = s.base.open;
			}
			if(typeof s.base.clone!=='boolean'){
				s.base.clone = true;
			}else{
				s.base.clone = s.base.clone;
			}
		}
		if(s.viewAs!=='image'&&s.viewAs!=='video'){
			console.error('viewer[1].viewAs must be "image" or "video"');
			return false;
		}
		if(typeof s.animate!=='string'){
			s.animate = '';
		}else{
			s.animate = s.animate;
		}
		if(s.animate!==''&&s.animate!=='curtain'&&s.animate!=='slideshow'){
			console.error('viewer[1].animate must be NULL, curtain, or slideshow!');
			return false;
		}
		let gal = document.querySelectorAll('.imgViewer-container.loaded');
		typeof(s.static)==='undefined' ? false : s.static;
		for(let a=0;a<gal.length;a++){
			if(!gal[a].className.match('noView')){
				gal[a].classList.add('ImgViewer-viewable')
				let vwr = document.createElement('div');
					vwr.classList.add('ImgViewer-viewImg');
					s.static ? vwr.classList.add('static') : '';
					s.static ? '' : vwr.setAttribute('onclick','zoomImg(\'out\', this, event, false, \''+(s.viewAs==='image' ? 'img': 'video')+'\');');
					s.animate!=='' ? vwr.classList.add(s.animate) : '';
					vwr.innerHTML = '<nav><ul class="nav-link">'+
					(s.base.download ? '<li><a class="img-download" href="#" download="#"><i class="fa-solid fa-download"></i></a></li>' : '')+
					(s.base.copy ? '<li><a class="img-url-copy" href="#" img-copy-data="" onclick="copyURL(this.getAttribute(\'img-copy-data\'))"><i class="fa-solid fa-link"></i></a></li>' : '')+
					(s.base.open ? '<li><a class="img-url-open" href="#" img-copy-data="" onclick="window.open(this.getAttribute(\'img-copy-data\'),\'_blank\')"><i class="fa-solid fa-arrow-up-right-from-square"></i></a></li>' : '')+
					(s.base.clone ? '<li><a class="img-copy" href="#" img-copy-data="" onclick="copyURL(this.getAttribute(\'img-copy-data\'), false)"><i class="fa-solid fa-clone"></i></a></li>' : '')+
					'<li><span class="ImgViewer-close" onclick="zoomImg(\'out\', this, event, true, \''+(s.viewAs==='image' ? 'img': 'video')+'\')"><i class="fa-solid fa-x"></i></span></li></ul></nav>'+(s.viewAs==='image' ?'<img/>':'<video></video>')+'<p></p>';
					document.querySelector('body').appendChild(vwr);
				let vImg = gal[a].querySelectorAll('div.view');
				for(let b=0;b<vImg.length;b++){
					vImg[b].setAttribute('onclick', 'zoomImg("in",this, event, false, \''+(s.viewAs==='image' ? 'img': 'video')+'\');');
				}
			}
		}
	}
	//editor
	resize(data){
		if(typeof data!=='number'){
			console.error('resize[1] must be a number');
			return false;
		}
		let t = document.querySelector('.imgViewer-container.loaded[view="frame"] [viewdata="'+parseInt(data)+'"]');
		if(t){
			let iD = t.querySelector('img, video').getBoundingClientRect();
			let rec = document.createElement('div');
				rec.className = 'rtangle';
				rec.style.width = iD.width+'px';
				rec.style.height = iD.height+'px';
				rec.setAttribute('onmousemove','resizeGrayBox(this, event)');
			t.appendChild(rec);
		}
	}
	crop(data){
		if(typeof data!=='number'){
			console.error('crop[1] must be a number');
			return false;
		}
		let t = document.querySelector('.imgViewer-container.loaded[view="frame"] [viewdata="'+parseInt(data)+'"]');
		if(t){
			let iD = t.querySelector('img, video').getBoundingClientRect();
			let rec = document.createElement('div');
				rec.className = 'ctangle';
				rec.style.width = iD.width + 'px';
				rec.style.height = iD.height + 'px';
				rec.setAttribute('onmousemove','cropGrayBox(this, event);');
			t.appendChild(rec);
		}
	}
	grayscale(val){
		if(!val.match(/^[\d]+%$/)){
			console.error('grayscale[1] must be a percentage!');
			return false;
		}
		return 'grayscale('+val+')';	
	}
	blur(val){
		if(!val.match(/^[\d]+px$/)){
			console.error('blur[1] must be a pixel!');
			return false;
		}
		return 'blur('+val+')';	
	}
	brightness(val){
		if(!val.match(/^[\d]+%$/)){
			console.error('bright[1] must be a percentage!');
			return false;
		}
		return 'brightness('+val+')';
	}
	contrast(val){
		if(!val.match(/^[\d]+%$/)){
			console.error('contrast[1] must be a percentage!');
			return false;
		}
		return 'contrast('+val+')';
	}
	dropShadow(h, v, b, s, c){
		if(!h.match(/^[\d]+px$/)){
			console.error('dropShadow[1] must be a pixal!');
			return false;
		}
		if(!v.match(/^[\d]+px$/)){
			console.error('dropShadow[2] must be a pixal!');
			return false;
		}
		if(!b.match(/^[\d]+px$/)){
			console.error('dropShadow[3] must be a pixal!');
			return false;
		}
		if(!s.match(/^[\d]+px$/)){
			console.error('dropShadow[4] must be a pixal!');
			return false;
		}
		if(!c.match(/^((rgba\([\d]{1,3},[\d]{1,3},[\d]{1,3},([0-1]*\.[0-9]+)\))|(rgb\([\d]{1,3},[\d]{1,3},[\d]{1,3}\))|(\#[\da-f]{6}|[a-z]+))$/)){
			console.error('dropShadow[5] must rgb(), rgba(), hex, or color name!');
			return false;
		}
		return 'drop-shadow('+h+' '+v+' '+b+' '+(s.match('0px') ? '' : s+' ')+c+')';
	}
	hueRotate(val){
		if(!val.match(/^[\d]+deg$/)){
			console.error('hueRotate[1] must be a degree!');
			return false;
		}
		return 'hue-rotate('+val+')';
	}
	invert(val){
		if(!val.match(/^[\d]+%$/)){
			console.error('invert[1] must be a percentage!');
			return false;
		}
		return 'invert('+val+')';
	}
	opacity(val){
		if(!val.match(/^[\d]+%$/)){
			console.error('opacity[1] must be a percentage!');
			return false;
		}
		return 'opacity('+val+')';
	}
	saturate(val){
		if(!val.match(/^[\d]+%$/)){
			console.error('saturate[1] must be a percentage!');
			return false;
		}
		return 'saturate('+val+')';
	}
	sepia(val){
		if(!val.match(/^[\d]+%$/)){
			console.error('sepia[1] must be a percentage!');
			return false;
		}
		return 'sepia('+val+')';
	}
	filters(data, obj){
		let ftr = 'filter:';
		let arr = [];
		if(typeof data!=='number'){
			console.error('filters[1] must be a number');
			return false;
		}
		if(typeof obj!=='object'){
			console.error('filters[2] must be an JSON object');
			return false;
		}
		if(typeof obj.blur==='string'){
			arr.push(this.blur(obj.blur));
		}
		if(typeof obj.brightness==='string'){
			arr.push(this.brightness(obj.brightness));
		}
		if(typeof obj.grayscale==='string'){
			arr.push(this.grayscale(obj.grayscale));
		}
		if(typeof obj.contrast==='string'){
			arr.push(this.contrast(obj.contrast));
		}
		if(Array.isArray(obj.dropShadow)){
			arr.push(this.dropShadow(obj.dropShadow[0],obj.dropShadow[1],obj.dropShadow[2],obj.dropShadow[3],obj.dropShadow[4],obj.dropShadow[5]));
		}
		if(typeof obj.hueRotate==='string'){
			arr.push(this.hueRotate(obj.hueRotate));
		}
		if(typeof obj.invert==='string'){
			arr.push(this.invert(obj.invert));
		}
		if(typeof obj.opacity==='string'){
			arr.push(this.opacity(obj.opacity));
		}
		if(typeof obj.saturate==='string'){
			arr.push(this.saturate(obj.saturate));
		}
		if(typeof obj.sepia==='string'){
			arr.push(this.sepia(obj.sepia));
		}
		let t = document.querySelector('.imgViewer-container.loaded [viewdata="'+parseInt(data)+'"] img');
			arr.length>0 ? t.setAttribute('style','filter:'+arr.join(' ')) : '';
	}
}
/*functions*/
var resizing = false,
	cropping = false,
	dT = 0,
	dR = 0,
	dB = 0,
	dL = 0,
	vidLoaded = 0;
function killViews(elem){
	document.querySelector(elem).remove();
}
function resizeGrayBox(box, mouse){
	box.addEventListener('mousedown', function(){
		resizing=true;
	});
	box.addEventListener('mouseup', function(){
		setTimeout(function(){
			resizing=false;
			let iD = box.getBoundingClientRect();
			box.parentElement.querySelector('img, video').style.width = iD.width+'px';
			box.parentElement.querySelector('img, video').style.height = iD.height+'px';
			killViews('.rtangle');			
		},100);	
	});
	if(resizing){
		let dRect = box.parentElement.getBoundingClientRect();
		 if(mouse.clientX>dRect.width+1){
		 }else{
			let w = mouse.clientX;
				box.style.width = w.toString()  + "px";
				
		 }
		 if(mouse.clientY>dRect.height+1){
			 
		 }else{
			 let h = mouse.clientY;
				 box.style.height = h.toString()  + "px"; 
		 }
	}
	
}

function cropGrayBox(box, mouse){
	
	box.addEventListener('mousedown', function(){
		dT = box.getBoundingClientRect().top;
		dR = box.getBoundingClientRect().right;
		dB = box.getBoundingClientRect().bottom;
		dL = box.getBoundingClientRect().left;
		cropping=true;
	});
	box.addEventListener('mouseup', function(){
		setTimeout(function(){
			cropping=false;
			let iD = box.getBoundingClientRect();
			box.parentElement.querySelector('img, video').style.clipPath = 'inset('+(dT-iD.top)+'px '+(dR-iD.right)+'px '+(dB-iD.bottom)+'px '+(dL-iD.left)+'px)';
			box.parentElement.style.clipPath = 'inset('+(dT-iD.top)+'px '+(dR-iD.right)+'px '+(dB-iD.bottom)+'px '+(dL-iD.left)+'px)';
			box.parentElement.classList.add('noBorder');
			killViews('.ctangle');
		},100);	
	});
	if(cropping){
		let dRect = box.parentElement.getBoundingClientRect();
		
		 if(mouse.clientX>dRect.width+1){
		 }else{
			let w = mouse.clientX;
				box.style.width = w.toString()  + "px";
				
		 }
		 if(mouse.clientY>dRect.height+1){
			 
		 }else{
			 let h = mouse.clientY;
				 box.style.height = h.toString()  + "px"; 
		 }
	}
}
async function copyURL(data, raw=true){
	if(raw){
		if(navigator.clipboard.writeText(data)){
			alert("Successfully copied to clipboard!");
		}else{
			alert("Failed to copy to clipboard!");
		}
	}else{
		const setToClipboard = async blob => {
		const d = [new ClipboardItem({[blob.type]: blob})];
			try{
				await navigator.clipboard.write(d)
			}catch(e){
				alert("Failed to copy to clipboard!");
			}finally{
				alert("Successfully copied to clipboard!");
			}
		}
		const response = await fetch(data);
		const blob = await response.blob();
		await setToClipboard(blob);
	}
}
function zoomImg(stat, tar, event, force=false, sel='img'){
	if(resizing||cropping){
		return false;
	}
	if(typeof stat!=='string'){
		console.error('zoomImg[1] must be a string');
		return false;
	}else if(typeof tar!=='object'){
		console.error('zoomImg[2] must be a object');
		return false;
	}else if(typeof event!=='object'){
		console.error('zoomImg[3] must be a object');
		return false;
	}else if(typeof force!=='boolean'){
		console.error('zoomImg[4] must be a boolean');
		return false;
	}
		let vw = document.querySelector('.ImgViewer-viewImg');
		var w1, h1, w2, h2;
			if(vw.className.match('curtain')){
				w1 ='100%';
				h1 = '0px';
				w2 ='100%';
				h2 = '100%';
			}else if(vw.className.match('slideshow')){
				w1 = '0px';
				h1='100%';
				w2 = '100%';
				h2='100%';
			}else{
				w1 = '0px';
				h1 = '0px';
				w2 = '100%';
				h2 = '100%';
			}
		switch(stat){
			case 'in':
				vw.style.width=w2;
				vw.style.height=h2;
				vw.style.opacity = 1;
				vw.style.zIndex = 1;
				vw.classList.toggle('opened');
				if(sel==='img'){
					vw.querySelector('img').src = tar.querySelector('img').src;
				}
				if(sel==='video'){
					vw.querySelector('video').src = tar.querySelector('video').src;
					vw.querySelector('video').controls = true;
				}
				if(sel==='img'){
					vw.querySelector('p').innerHTML = '<span>'+new ImgViewer().mkNL(new ImgViewer().mkLk(tar.querySelector('img').getAttribute("img-desc")))+'</span>';
				}
				if(sel==='video'){
					vw.querySelector('p').innerHTML = '<span>'+new ImgViewer().mkNL(new ImgViewer().mkLk(tar.querySelector('video').getAttribute("img-desc")))+'</span>';
				}
				vw.querySelector('nav a.img-download') ? vw.querySelector('nav a.img-download').href = (sel==='img' ? tar.querySelector('img').src : tar.querySelector('video').src): '';
				vw.querySelector('nav a.img-url-copy') ? vw.querySelector('nav a.img-url-copy').setAttribute('img-copy-data',(sel==='img' ? tar.querySelector('img').src : tar.querySelector('video').src)) : '';
				vw.querySelector('nav a.img-url-open') ? vw.querySelector('nav a.img-url-open').setAttribute('img-copy-data',(sel==='img' ? tar.querySelector('img').src : tar.querySelector('video').src)) : '';
				vw.querySelector('nav a.img-copy') ? vw.querySelector('nav a.img-copy').setAttribute('img-copy-data',(sel==='img' ? tar.querySelector('img').src : tar.querySelector('video').src)) : '';
				vw.querySelector('nav a') ? vw.querySelector('nav a').download = (sel==='img' ? tar.querySelector('img').alt : tar.querySelector('video').alt) : '';
			break;
			case 'out':
			if(force&&typeof force==='boolean'){
				vw.style.width=w1;
				vw.style.height=h1;
				vw.style.opacity = 0;
				vw.style.zIndex = -1;
				vw.classList.toggle('opened');
			}else{
			try{
				if(event.target.className.match('ImgViewer-viewImg')&&typeof(event.target)!=='undefined'){
					vw.style.width=w1;
					vw.style.height=h1;
					vw.style.opacity = 0;
					vw.style.zIndex = -1;
					vw.classList.toggle('opened');
				}else{
					return false;
				}
			}catch(e){
				return false;
			}
		}		
			break;
		}
	
}
function calcTime(time){
	time = Math.round(time);
	if(time<60){
		return '00:'+(time<10 ? '0'+time : time);
	}else if(Math.floor(time/60) < 60){
		min = Math.floor(time/60);
		sec = time - min * 60;
		return (min<10 ? '0'+min : min)+':' + (sec<10 ? '0'+sec : sec);
	}else{
		hrs = Math.floor(time/3600);
		min = time - hrs * 60;
		sec = time - min * 60;
		return (hrs<10 ? '0'+hrs : hrs) + ':' + (min<10 ? '0'+min : min) +':' + (sec<10 ? '0'+sec : sec);
	}
}
function addSec(n, s, e){
	let progress = n.parentElement.querySelector('.video-progress');
	let key = e.keyCode||e.which;
	if(key===39){
		n.currentTime = n.currentTime + parseInt(s);
	}
	if(key===37){
		n.currentTime = n.currentTime - parseInt(s);
	}
}
var resetSubtitle = 0
function actVid(n, e){
	if(e.keyCode==32||e.which==32||e==32&&n.parentElement.parentElement.parentElement.querySelector('.videoContext').style.display==='none'){
		let vid = n.parentElement.parentElement.parentElement.querySelector('video');
		let stat = n.getAttribute('vid-state');
		let durTime = n.parentElement.parentElement.parentElement.querySelector('.duration');
		let currTime = n.parentElement.parentElement.parentElement.querySelector('.current');
		let progress = n.parentElement.parentElement.parentElement.querySelector('.video-progress');
		let progressFill = n.parentElement.parentElement.parentElement.querySelector('.video-progress-filled');
		//reset to off
		if(resetSubtitle<1){
			let tracks = n.parentElement.parentElement.parentElement.querySelectorAll('track');
			for(let a=0;a<tracks.length;a++){
				tracks[a].parentElement.textTracks[a].mode = 'hidden';
			}
			resetSubtitle = 1;
		}
		progress.addEventListener('click', (e)=>{
			const progressTime = (e.offsetX / progress.offsetWidth) * vid.duration;
			vid.currentTime = progressTime;
		});
		vid.addEventListener('timeupdate', function(){
				currTime.innerHTML = calcTime(vid.currentTime);
				progressFill.style.width = (vid.currentTime / vid.duration) * 100 + '%';
				if(((vid.currentTime / vid.duration) * 100) >= 100){
					vid.pause();
					n.innerHTML = '<i class="fa-solid fa-play"></i>';
					n.setAttribute('vid-state','paused');
				}
		});
		switch(stat){
			case 'paused':
				n.innerHTML = '<i class="fa-solid fa-pause"></i>';
				n.setAttribute('vid-state','playing');
				durTime.innerHTML = calcTime(vid.duration);
				vid.play();
				if(vid.readyState===4&&vidLoaded==0){
					vid.parentElement.querySelector('.loading-container').remove();
					vidLoaded = 1;
				}
			break;
			case 'playing':
				n.innerHTML = '<i class="fa-solid fa-play"></i>';
				n.setAttribute('vid-state','paused');
				vid.pause();
			break;
		}
	}
}
function changeVidVol(n){
	let vid = n.parentElement.parentElement.parentElement.querySelector('video');
	let volIcon = n.parentElement.parentElement.parentElement.querySelector('.mute');
	if(n.value==='0'){
		volIcon.setAttribute('toggle-stat', 'mute');
		volIcon.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
	}else{
		volIcon.innerHTML = '<i class="fa-solid fa-volume"></i>';
		volIcon.setAttribute('toggle-stat', 'normal');
	}
	vid.volume = n.value;
}
function setFull(n, e){
	let base = n.parentElement.parentElement.parentElement;
	let stat = n.getAttribute('toggle-stat');
	if(e.keyCode==70||e.which==70||e==70){
		switch(stat){
			case 'normal':
				base.classList.toggle('fullscreen');
				n.innerHTML = '<i class="fa-solid fa-minimize"></i>';
				n.setAttribute('toggle-stat','full');
			break;
			case 'full':
				base.classList.toggle('fullscreen');
				n.innerHTML = '<i class="fa-solid fa-maximize"></i>';
				n.setAttribute('toggle-stat','normal');
			break;
		}
	}
}
function setMute(n, e){
	let vid = n.parentElement.parentElement.parentElement.querySelector('video');
	let vol = n.parentElement.parentElement.parentElement.querySelector('.volume');
	if(e.keyCode===77||e.which===77||e===77){
		switch(n.getAttribute('toggle-stat')){
			case 'normal':
				vid.muted = true;
				vol.value = '0';
				n.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
				n.setAttribute('toggle-stat', 'mute');
			break;
			case 'mute':
				vid.muted = false;
				vol.value = '1';
				n.innerHTML = '<i class="fa-solid fa-volume"></i>';
				n.setAttribute('toggle-stat', 'normal');
			break;
		}
	}
}

function showContent(n, e){
	let vC = n.parentElement.querySelector('.videoContext');
	vC.style.display = 'block';
	vC.style.top = (e.offsetY)+'px';
	vC.style.left = (e.offsetX)+'px';
}
function hideContent(n){
	let vC = n.parentElement.querySelector('.videoContext');
	vC.style.display = 'none';
	
}

function loop(n){
	let vid = n.parentElement.parentElement.parentElement.querySelector('video');
	if(vid.loop){
		n.querySelector('.isActive').innerHTML = '';
		vid.loop = false;
	}else{
		n.querySelector('.isActive').innerHTML = '<i class="fa-solid fa-check"></i>';
		vid.loop = true;
	}
}
function pip(n){
	let con = n.parentElement.parentElement.parentElement.parentElement;
	if(con.className.match('pip')){
		n.querySelector('.isActive').innerHTML = '';
		con.classList.toggle('pip');
	}else{
		n.querySelector('.isActive').innerHTML = '<i class="fa-solid fa-check"></i>';
		con.classList.toggle('pip');
	}
}
function displayPlayBackErr(n){
	if(n.parentElement!==null){
		n.parentElement.querySelector('.errorMsg').style.display='block';
		return false;
	}
}
function changeCC(n, c){
	let tracks = n.parentElement.parentElement.querySelectorAll('track');
	let ccI = n.parentElement.parentElement.querySelector('.cc');
	for(let a=0;a<tracks.length;a++){
		if(c.toLowerCase()==='off'){
			tracks[a].parentElement.textTracks[a].mode = 'hidden';
			ccI.classList.remove('active');
			ccI.setAttribute('toggle-stat', 'hidden');
		}else{
			if(tracks[a].srclang.toLowerCase()===c.toLowerCase()){
				tracks[a].parentElement.textTracks[a].mode = 'showing';
				ccI.classList.contains('active') ? ccI.classList.replace('active', 'active') : ccI.classList.add('active');
				ccI.setAttribute('toggle-stat', 'showing');
			}else{
				tracks[a].parentElement.textTracks[a].mode = 'hidden';
				ccI.classList.contains('active') ? ccI.classList.replace('active', 'active') : ccI.classList.add('active');
				ccI.setAttribute('toggle-stat', 'showing');
			}
		}
	}
}
function changePlaySpeed(n, c){
	let vid = n.parentElement.parentElement.parentElement.querySelector('video');
	vid.playbackRate = parseFloat(c);
}
function toggleCC(n, c){
	let tracks = n.parentElement.parentElement.parentElement.querySelectorAll('track');
	switch(n.getAttribute('toggle-stat')){
		case 'hidden':
			for(let i=0;i<tracks.length;i++){
				if(tracks[i].srclang.toLowerCase()===c){
					tracks[i].parentElement.textTracks[i].mode = 'showing';
					
				}else{
					tracks[i].parentElement.textTracks[i].mode = 'hidden';
				}
			}
			n.classList.toggle('active');
			n.setAttribute('toggle-stat', 'showing');
		break;
		case 'showing':
			for(let i=0;i<tracks.length;i++){
				tracks[i].parentElement.textTracks[i].mode  = 'hidden';
			}
		n.classList.toggle('active');
		n.setAttribute('toggle-stat', 'hidden');
		break;
	}
}
function toggleSettings(n){
	n.parentElement.classList.toggle('focus');
	n.parentElement.querySelector('.setList').classList.toggle('hidden');
}
function theaterMode(n){
n.parentElement.parentElement.parentElement.classList.toggle('theater');
}