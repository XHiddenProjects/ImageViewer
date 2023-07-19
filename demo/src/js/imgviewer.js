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
						d.innerHTML = (s.desc.display&&!s.desc.viewer ? img[i].outerHTML+'<span class="ImgViewer-desc">'+(img[i].getAttribute('img-desc')!==null ? this.mkLk(img[i].getAttribute('img-desc')) : '')+'</span>' : img[i].outerHTML);
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
				 let img = gal[a].querySelectorAll('img');
				 if(img.length>1||img.length<=0){
					 console.error('You have too many/too less images, REQUIRED MAX 1');
					 return false;
				 }
				for(let b=0;b<img.length;b++){
					let d = document.createElement('div');
					d.innerHTML = (s.desc.display&&!s.desc.viewer ? img[b].outerHTML+'<span class="ImgViewer-desc">'+(img[b].getAttribute('img-desc')!==null ? this.mkLk(img[b].getAttribute('img-desc')) : '')+'</span>' : img[b].outerHTML);
					d.classList.add('view');
					d.setAttribute('viewData',b+1);
					d.tabIndex = b+1;
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
					s.static ? '' : vwr.setAttribute('onclick','zoomImg(\'out\', this, event);');
					s.animate!=='' ? vwr.classList.add(s.animate) : '';
					vwr.innerHTML = '<nav><ul class="nav-link">'+
					(s.base.download ? '<li><a class="img-download" href="#" download="#"><i class="fa-solid fa-download"></i></a></li>' : '')+
					(s.base.copy ? '<li><a class="img-url-copy" href="#" img-copy-data="" onclick="copyURL(this.getAttribute(\'img-copy-data\'))"><i class="fa-solid fa-link"></i></a></li>' : '')+
					(s.base.open ? '<li><a class="img-url-open" href="#" img-copy-data="" onclick="window.open(this.getAttribute(\'img-copy-data\'),\'_blank\')"><i class="fa-solid fa-arrow-up-right-from-square"></i></a></li>' : '')+
					(s.base.clone ? '<li><a class="img-copy" href="#" img-copy-data="" onclick="copyURL(this.getAttribute(\'img-copy-data\'), false)"><i class="fa-solid fa-clone"></i></a></li>' : '')+
					'<li><span class="ImgViewer-close" onclick="zoomImg(\'out\', this, event, true)"><i class="fa-solid fa-x"></i></span></li></ul></nav><img/><p></p>';
					document.querySelector('body').appendChild(vwr);
				let vImg = gal[a].querySelectorAll('div.view');
				for(let b=0;b<vImg.length;b++){
					vImg[b].setAttribute('onclick', 'zoomImg("in",this, event);');
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
			let iD = t.querySelector('img').getBoundingClientRect();
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
			let iD = t.querySelector('img').getBoundingClientRect();
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
	dL = 0;
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
			box.parentElement.querySelector('img').style.width = iD.width+'px';
			box.parentElement.querySelector('img').style.height = iD.height+'px';
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
			box.parentElement.querySelector('img').style.clipPath = 'inset('+(dT-iD.top)+'px '+(dR-iD.right)+'px '+(dB-iD.bottom)+'px '+(dL-iD.left)+'px)';
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
function zoomImg(stat, tar, event, force=false){
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
				vw.querySelector('img').src = tar.querySelector('img').src;
				vw.querySelector('p').innerHTML = '<span>'+new ImgViewer().mkLk(tar.querySelector('img').getAttribute("img-desc"))+'</span>';
				vw.querySelector('nav a.img-download') ? vw.querySelector('nav a.img-download').href = tar.querySelector('img').src : '';
				vw.querySelector('nav a.img-url-copy') ? vw.querySelector('nav a.img-url-copy').setAttribute('img-copy-data',tar.querySelector('img').src) : '';
				vw.querySelector('nav a.img-url-open') ? vw.querySelector('nav a.img-url-open').setAttribute('img-copy-data',tar.querySelector('img').src) : '';
				vw.querySelector('nav a.img-copy') ? vw.querySelector('nav a.img-copy').setAttribute('img-copy-data',tar.querySelector('img').src) : '';
				vw.querySelector('nav a') ? vw.querySelector('nav a').download = tar.querySelector('img').alt : '';
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