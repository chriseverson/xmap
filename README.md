# xmap

xmap is a moving map application for X-Plane. Currently it is used in conjunction with the ExtPlane plugin to access X-Plane data. 

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

```
   
            
---
       

#### Navaid Information

| TYPE              | BIT  | DESCRIPTION |
|:----------------- |:----:|:----------- |
| **Unknown**       | 0    | Navaid type not known |
| **Airport**       | 1    | Airport |
| **NDB**           | 2    | Non-directional beacon | 
| **VOR**           | 4    | VHF omnidirectional radio range |
| **ILS**           | 8    | Instrument landing system station |
| **Localizer**     | 16   | ILS localizer array |
| **Glide slope**   | 32   | ILS G/S station |
| **Outer marker**  | 64   | Final approach fix beacon, 4-7nm from threshold |
| **Middle marker** | 128  | Middle marker beacon, 0.5-0.8nm from threshold |
| **Inner marker**  | 256  | Threshold fix beacon |
| **Fix**           | 512  | Navigation fix. Could be anything, really |
| **DME**           | 1024 | Distance measuring equipment, transponder based |
| **Lat/Lon**       | 2048 | Generic latitude/longitude position |
<small>More details: http://www.xsquawkbox.net/xpsdk/mediawiki/Category:XPLMNavigation</small>
