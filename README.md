# ImageViewer
I advanced image viewer that can organize and view with simple tools and sharable images.

***

### Loading up

To load up the software you must have a setup in `HTML` in this following code.
```html
<div class="imgViewer-container" view="{viewtype}">
  <img src="{path-to-image}" alt="{img-title}" img-desc="{img-description}"/>
  <!--more images here-->
</div>
```

You would also require _fontawesome pro v6+_, I will NOT being putting up fontawesome's icons on here due to cause of **DMCA takedown.**


the current _viewtype_ are:
* gallery - loades multiple images in flexable format.
* stack - loads multiple images in a book-stacked format.
* frame - loads only one image in landscape/portrait format.
* card - loads and images as a card format.
* video - loads a custom made look for video viewing.

--more in feature updates--
***

## Scripting

### loading containers

to load **.imgViewer-container** div's type this.
```js
let iv = new ImgViewer();
    iv.init(); //loads image viewers for all containers
```

**Note: `desc:{display:true,viewer:true}` will always be required!**

### loading gallery

You must have the `viewType` set to  _gallery_ then load it:
```js
iv.gallery({width:3, desc:{display:false,viewer:true}, hover:true});//loads gallery(3 images wide, with a NO visable discription, but will show in viewer)
```

### loading stack

You must have the `viewType` set to  _stack_ then load it:
```js
iv.stack({desc:{display:true,viewer:false}});//loads stack(with visable description, but no viewer)
```

### loading frame

You must have the `viewType` set to  _frame_ then load it:
```js
iv.frame({type:'landscape',radius:'5px',desc:{display:false,viewer:false}});//loads frame(with border-radius of 5px with no description and viewer, at display of landscape/portrait)
```

### loading card
You must have the `viewType` set to  _card_ then load it:
```js
iv.card({desc:{display:true,viewer:false}});//loads a card(being displayed and not viewable)
```

### loading video
You must have the `viewType` set to  _video_ then load it:
```js
iv.video({desc:{display:true, viewer:false},poster:[],progressFill:['cyan'],skipRate:[5]});//loads a video(display of true and no viewing, no poster on the first video, with a cyan fill on the progress on the first video, and the has a skipRate of 5 seconds on the first video).
```

***

## Tools

These are tools that changes on how you can have image be preformed

### viewer

Loads up the viewer with different base:
* Download - Downloads the image
* Copy - Copies the URL for the image
* Clone - Copies the image to clipboard
* Open - Opens the image in a new tab

To load use this code:
```js
iv.viewer({viewAs:'video',static:false,base:{download:true, open:true, copy:true, clone:true},animate:''});
/*
* viewAs(string) - depends if your are viewing as a video/image only
* static(boolean) - depends if user can only press the "X" button only or on-screen close
* base.download(boolean) - displays DOWNLOAD button
* base.open(boolean) - displays OPEN button
* base.copy(boolean) - displays COPY button
* base.clone(boolean) - displays CLONE button
* animate(boolean) - Allows "", "curtain", or "slideshow"
*/
```

### filters
To load CSS filters you musts run this code:
```js
iv.filters({viewID},{FilterList});
```
`viewID` is each image the is loaded starting a _1_

**Supported Filter List:**
* grayscale
* blur
* brightness
* contrast
* dropShadow
* hueRotate
* invert
* opacity
* saturate
* sepia

### resize

To allow user-resize type:
```js
iv.resize({viewID});//loads a box that is going to be used on, users can resize it, for only on their end.
```

### crop

To allow user-crop type:
```js
iv.crop({viewID});//loads a box that is going to be used on, users can crop it, for only on their end.
```
