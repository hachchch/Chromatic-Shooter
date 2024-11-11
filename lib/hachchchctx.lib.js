class hachchchctx{
    toAngle(x,y,x2,y2){
        return Math.atan2(x2-x,y2-y);
    }
    toMoveX(x,y,x2,y2){
        return Math.cos(Math.atan2(x2-x,y2-y));
    }
    toMoveY(x,y,x2,y2){
        return Math.sin(Math.atan2(x2-x,y2-y));
    }
    collisionRect(x,y,width,height,otherX,otherY,otherWidth,otherHeight){
        if(!otherWidth || !otherHeight){
            otherWidth=0;
            otherHeight=0;
            }
    if(Math.abs((x+width/2)-otherX)<=(width+otherWidth)/2 && Math.abs((y+height/2)-otherY)<=(height+otherHeight)/2){
    return true;
    }else{
    return false;
    }
    }
    collisionArc(x,y,radius,otherX,otherY,otherRadius){
        let radA=Math.atan2(otherY-y,otherX-x);
        let radB=Math.atan2(y-otherY,x-otherX);
        let Ax=Math.cos(radA)*radius;
        let Ay=(-1)*Math.sin(radA)*radius;
        let Bx=(Math.cos(radB)*otherRadius)+otherX;
        let By=((-1)*Math.sin(radB)*otherRadius)+otherY;
        if(Math.abs(Bx-x)<=Math.abs(Ax) && Math.abs(By-y)>=Math.abs(Ay)){
            return true;
        }else{
            return false;
        }
    }
    rect(x,y,width,height,outlineSize,outlineColor,innerColor){
    if(!outlineSize){
        outlineSize=1;
        }
    ctx.beginPath();
    if(outlineColor){
    ctx.fillStyle=outlineColor;
        }
    ctx.fillRect(x-(width/2),y-(height/2),width,height);
    ctx.clearRect(x-(width/2)+outlineSize,y-(height/2)+outlineSize,width-outlineSize*2,height-outlineSize*2);
        if(innerColor){
    ctx.fillStyle=innerColor;
    ctx.fillRect(x-(width/2)+outlineSize,y-(height/2)+outlineSize,width-outlineSize*2,height-outlineSize*2);
            }
    ctx.closePath();
    }
    /*collisionTriangle(x,y,angle,direction,hypotenuse,ox,oy){
        if( && ){
            return true;
        }else{
            return false;
        }
    }*/
    collisionLine(x,y,rad,ox,oy,mx,my,mode){
        if(!mode){
            mode=0;
            }
        if((ox-x)*Math.tan(rad)+y<=oy && oy<my+y && ox<mx+x && y<=oy && x<=ox && Math.tan(rad)>0){
            if(mode==0){
            return true;
                }else if(mode==1){
                return false;
                }
        }else if((ox-x)*Math.tan(rad)+y+my<=oy && oy<my+y && ox<mx+x && y<=oy && x<=ox && Math.tan(rad)<0 && mode==0){
            return true;
            }else if((ox-x)*Math.tan(rad)+y+my>oy && oy<my+y && ox<mx+x && y<=oy && x<=ox && Math.tan(rad)<0 && mode==1){
            return true;
            }else if(Math.tan(rad)>0){
            if(mode==0){
            return false;
                }else if(mode==1){
                if(oy<my+y && ox<mx+x && y<=oy && x<=ox){
                return true;
                    }else{
                    return false;
                    }
                }
        }
    }
    collisionHex(x,y,l,ox,oy){
        if(this.collisionRect(x+l/2,y,l,l*Math.sqrt(3),ox,oy) || (this.collisionLine(x,y,2*Math.PI/3,ox,oy,l/2,(l/2)*Math.sqrt(3))) || (this.collisionLine(x+3*l/2,y+(l/2)*Math.sqrt(3),2*Math.PI/3,ox,oy,l/2,(l/2)*Math.sqrt(3),1)) || (this.collisionLine(x+3*l/2,y,Math.PI/3,ox,oy,l/2,(l/2)*Math.sqrt(3))) || (this.collisionLine(x,y+(l/2)*Math.sqrt(3),4*Math.PI/3,ox,oy,l/2,(l/2)*Math.sqrt(3),1))){
            return true;
        }else{
            return false;
        }
    }
    deleteObject(objects,index){
    let syntax=objects+`.push("dammy");
`+objects+`.length=`+objects+`.copyWithin(index,`+objects+`.length-1).length-1;
`+objects+`.length=`+objects+`.copyWithin(index,index+1).length-1;`;
    eval(syntax);
    }
}