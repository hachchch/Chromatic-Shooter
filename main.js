var stop=false;
var hp=3;
const border=860;
var startTime=0;
var time=-1;
var score=0;
var difficulty="";
var bgmTime=0;
var displayId=0;
var colorCharge=0;
var ccRemind=0;
var buttonInterval=0;
var scoreBonusPercent=1.0;
var intro=false;
var introId=0;
var introInterval=0;
var combo=[0,0,20];
function comboReset(){
    combo=[0,0];
}
var popTexts=[];
var titleTexts=[];
var playerPushedAnyKey=false;
const h=new hachchchctx();
const m=new mathematics();
const canvas=document.querySelector(".canvas");
const ctx=canvas.getContext("2d");
const size=860/10;
var interval=350;
var buttons=[{
    x:100,
    y:50,
    label:"ゲーム説明",
    id:"introduction",
    display:1,
    over:0,
    below:1,
    isSelect:false
},{
    x:border/2,
    y:canvas.height/2-200,
    label:"Primary 4色",
    id:"Normal",
    display:1,
    over:0,
    below:2,
    isSelect:true
},{
    x:border/2,
    y:canvas.height/2,
    label:"Munsell 5色",
    id:"Hard",
    display:1,
    over:1,
    below:3,
    isSelect:false
},{
    x:border/2,
    y:canvas.height/2+200,
    label:"Rainbow 7色",
    id:"Very Hard",
    display:1,
    over:2,
    below:3,
    isSelect:false
}];
var timer=0;
var blockWidth=Math.floor(border/size);
const tiles=[];
var enemy=[];
const particles=[];
const bullets=[];
const colors=["red","blue","green","orange"];
var nextColor=randomColor();
//var colorChange=[randomColor(),200,0];
var player={x:(blockWidth*size/2)+size/2,y:canvas.height-size/2,fireDuration:20,hue:randomColor(),shotInterval:0,damagedInterval:0,effect:[]};
canvas.style.border = "3px solid";
ctx.font = "100px DotGothic16";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
var tp=[0,0];
while(tp[0]<border){
while(tp[1]<canvas.height){
    tiles.push({
        x:tp[0],
        y:tp[1]
    });
    tp[1]+=size;
}
tp[1]=0;
tp[0]+=size;
}
function translate(){
    if(introInterval>0){
        introInterval--;
    }
    let prod=1.00;
        prod+=Math.floor((350-interval)/10)/10;
        prod=prod*scoreBonusPercent;
    if(!stop){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(time>=0){
        if(time==0){
            startTime=Date.now();
        }
    time=(Date.now()-startTime)/1000;
    timer++;
    if(combo[1]>0){
    combo[1]--;
        if(combo[1]<=0){
            combo[0]=0;
        }
    }
    bgmTime--;
    if(bgmTime<=0){
        let seed=Math.round(Math.random());
        bgmTime=148*60;
        prediversity();
    }
    if(colorCharge>0){
        colorCharge--;
        interval=Math.round(ccRemind/2);
        if(colorCharge<=0 || enemy.findIndex((e)=>e.y>=size*5.5)!=-1){
            colorCharge=0;
            interval=ccRemind;
            ccRemind=0;
        }
    }
    /*colorChange[2]++;
    if(colorChange[2]>=colorChange[1]){
        player.hue=colorChange[0];
        colorChange[0]=randomColor();
        colorChange[2]=0;
    }*/
    if(timer>=interval){
        interval-=2;
        timer=0;
        for(const e of enemy){
            if(e.damagedInterval==0){
            e.y+=size;
            }
        }
        let index=enemy.findIndex((e)=>e.y>canvas.height && e.damagedInterval==0);
        if(index!=-1){
            enemy.push("dammy");
            enemy.length=enemy.copyWithin(index,enemy.length-1).length;
            enemy.length=enemy.copyWithin(index,index+1).length-1;
            enemy.length--;
            hp--;
            player.damagedInterval=100;
            for(const e of enemy){
                if(e.damagedInterval==0){
                    e.damagedInterval=20;
                    e.eraze=true;
                }
            }
            if(hp<=0){
                stop=true;
                player.y=1000;
                extinction();
                addTitleText(border/2,canvas.height/2-50,`GAME OVER`,150,"#000000",true);
                addTitleText(border/2,canvas.height/2+50,`スコア${score}`,50,"#000000",true);
                addTitleText(border/2,canvas.height/2+260,`Tキーで結果をコピー`,30,"#000000",true);
                addTitleText(border/2,canvas.height/2+300,`Rキーでリスタート`,30,"#000000",true);
            }
        }
        for(let k=0; k<Math.ceil(Math.random()*5+5); ++k){
        popEnemy();
        }
    }
    for(const t of tiles){
        if(((t.x/size)+t.y/size)/2==Math.round(((t.x/size)+t.y/size)/2)){
            ctx.fillStyle="#bbbbbb";
            ctx.fillRect(t.x,t.y,size,size);
            ctx.fillStyle="#000000";
        }
        ctx.strokeRect(t.x,t.y,size,size);
    }
    for(const e of enemy){
    let index2=bullets.findIndex((b)=>Math.abs(e.x-b.x)<=60 && Math.abs(e.y-b.y)<=60 && (b.color==e.color || e.color=="black" || b.color=="#000000"));
        if(index2!=-1 && e.damagedInterval==0){
            e.damagedInterval=20;
        }
            if(e.damagedInterval==20){
            if(!e.eraze){
            let scoreCalc=0;
                if(e.color=="black"){
                    getEffect(e.x,e.y);
                    scoreCalc=Math.floor(300+25*combo[0]*1.25);
                }else{
                    scoreCalc=Math.floor(100+25*combo[0]*1.25);
                }
                scoreCalc=Math.floor(scoreCalc*prod);
                combo[0]++;
                combo[1]=30;
                if(e.color=="black"){
                    addPopText(e.x,e.y,`+${scoreCalc}`,15,"#000000");
                }else{
                    addPopText(e.x,e.y,`+${scoreCalc}`,15,"#000000");
                }
                if(combo[0]>1){
                    addPopText(e.x,e.y-15,`${combo[0]}コンボ`,15,"#000000");
                }
                let el=0;
                for(let k=0; k<enemy.length; ++k){
                    if(enemy[k].damagedInterval==0){
                    el++;
                    }
                }
                if(el==0){
                    addTitleText(border/2,canvas.height/2-100,"全消し！",200,"#000000");
                    addTitleText(border/2,canvas.height/2+100,"ボーナス+10%",100,"#000000");
                    player.effect=[];
                    score+1000;
                    scoreBonusPercent+=0.1;
                }
                score+=scoreCalc;
                }
                pop();
    }
        if(e.damagedInterval>0){
            ctx.strokeStyle=e.color;
    ctx.beginPath();
    ctx.arc(e.x,e.y,(20-e.damagedInterval)*3,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
            e.damagedInterval--;
            if(e.damagedInterval==1){
            let index=enemy.findIndex((en)=>en.seed==e.seed);
                if(index!=-1){
            enemy.push("dammy");
            enemy.length=enemy.copyWithin(index,enemy.length-1).length;
            enemy.length=enemy.copyWithin(index,index+1).length-1;
            enemy.length--;
                    }
            }
        }
        if(e.x==player.x && e.y==player.y){
            nextColor=e.color;
        }
    if(e.damagedInterval==0){
    ctx.strokeStyle=e.color;
    ctx.fillStyle=e.color;
    ctx.beginPath();
    ctx.arc(e.x,e.y,30,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.fillRect(e.x-7,e.y-7,14,14);
        }
    }
    /*プレイヤー関連*/
    ctx.strokeStyle="#000000";
    ctx.beginPath();
    ctx.arc(player.x,player.y,30,0,2*Math.PI);
        if(hasEffect("まぜすぎ")){
            ctx.fillStyle="#000000";
        }else{
    ctx.fillStyle=player.hue;
            }
    ctx.fill();
    ctx.fillStyle="#000000";
    ctx.closePath();
    if(player.shotInterval>0){
        if(player.shotInterval==player.fireDuration){
            shot(player.x,player.y);
            if(hasEffect("ラピッドファイア")){
                shot(player.x,player.y,Math.PI/4);
                shot(player.x,player.y,3*Math.PI/4);
            }
            player.hue=nextColor;
            if(Math.random()*300<1){
                nextColor="#000000";
            }else{
            nextColor=randomColor();
            while(nextColor==player.hue){
                nextColor=randomColor();
            }
                }
        }
        let setA=Math.floor(player.shotInterval*(255/20))+"";
        let a=eval(setA).toString(16);
        if(a.length==1){
            a="0"+a;
        }
        ctx.fillStyle="#ffffff";
        ctx.fillStyle+=a;
        ctx.beginPath();
        ctx.arc(player.x,player.y,30,0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
        player.shotInterval--;
    }
    for(const pe of player.effect){
        pe.interval--;
        if(pe.interval<=0){
            let index=player.effect.findIndex((e)=>pe.name==e.name && pe.interval==e.interval);
            player.effect.push("dammy");
            player.effect.length=player.effect.copyWithin(index,player.effect.length-1).length;
            player.effect.length=player.effect.copyWithin(index,index+1).length-1;
            player.effect.length--;
        }
    }
    for(const b of bullets){
        b.x+=12.5*Math.cos(b.rad);
        b.y-=12.5*Math.sin(b.rad);
        ctx.fillStyle=b.color;
        ctx.beginPath();
        if(b.rad==Math.PI/2){
        ctx.lineTo(b.x-3,b.y-15);
        ctx.lineTo(b.x+3,b.y-15);
        ctx.lineTo(b.x+3,b.y+30);
        ctx.lineTo(b.x-3,b.y+30);
        ctx.lineTo(b.x-3,b.y-15);
        }
        if(b.rad==Math.PI/4){
            ctx.lineTo(b.x-3,b.y+30-3*Math.sqrt(2));
            ctx.lineTo(b.x+3,b.y+30+3*Math.sqrt(2));
            ctx.lineTo(b.x+3+30*Math.sqrt(2),b.y-15+3*Math.sqrt(2));
            ctx.lineTo(b.x-3+30*Math.sqrt(2),b.y-15-3*Math.sqrt(2));
            ctx.lineTo(b.x-3,b.y+30-3*Math.sqrt(2));
        }
        if(b.rad==3*Math.PI/4){
            ctx.lineTo(b.x+3,b.y-30-3*Math.sqrt(2));
            ctx.lineTo(b.x-3,b.y-30+3*Math.sqrt(2));
            ctx.lineTo(b.x-3+30*Math.sqrt(2),b.y+15+3*Math.sqrt(2));
            ctx.lineTo(b.x+3+30*Math.sqrt(2),b.y+15-3*Math.sqrt(2));
            ctx.lineTo(b.x+3,b.y-30-3*Math.sqrt(2));
        }
        ctx.fill();
        ctx.closePath();
        let index=bullets.findIndex((e)=>e.y<0 || e.x>border || e.x<0);
        if(index!=-1){
            bullets.push("dammy");
            bullets.length=bullets.copyWithin(index,bullets.length-1).length;
            bullets.length=bullets.copyWithin(index,index+1).length-1;
            bullets.length--;
        }
    }
    ctx.font = `30px DotGothic16`;
    ctx.fillStyle="#000000";
    ctx.fillText(`難易度:${difficulty}`,border+300,250);
    if(prod!=1){
            ctx.fillText(`スコアボーナスx${prod.toFixed(1)}`,border+350,300);
        }
    }else{
        if(buttonInterval>0){
            buttonInterval--;
        }
        if(displayId==0){
            ctx.font = `50px DotGothic16`;
            ctx.fillText("どこかのキーを押して開始",border/2,canvas.height/2);
        }
        if(playerPushedAnyKey){
        if(bgmTime==0){
            colorOfTheDay();
        }
        bgmTime++;
        if(bgmTime>=32*60){
            bgmTime=0;
        }
        }
        var colorList=[];
        var predif="";
        for(const b of buttons){
        if(b.display==displayId){
            if(b.isSelect){
                switch(b.id){
                case "Normal":
                        intro=false;
                        colorList=["赤","青","緑","橙"];
                        break;
                case "Hard":
                        intro=false;
                        colorList=["赤","青","緑","橙","紫"];
                        break;
                case "Very Hard":
                        intro=false;
                        colorList=["赤","青","緑","橙","紫","黄","藍"];
                        break;
                case "introduction":
                        intro=true;
                        break;
                }
                predif=b.id;
            }
        }
        }
        ctx.font = `30px DotGothic16`;
        if(displayId==1 && !intro){
        ctx.fillText(`色素:${colorList.join()}`,border+300,470);
        if(predif=="Hard"){
            ctx.fillText(`スコアボーナスが30%増加`,border+300,520);
        }
        if(predif=="Very Hard"){
            ctx.fillText(`スコアボーナスが70%増加`,border+300,520);
            ctx.fillText(`黒玉の効果が変更`,border+300,570);
        }
            }
    }
    ctx.fillStyle="#000000";
    /*UI*/
    for(const b of buttons){
        if(b.display==displayId){
            if(!b.isSelect){
        ctx.strokeStyle="#000000";
            }else{
        ctx.strokeStyle="#0000bb";
                if(displayId==1){
                if(b.id=="Normal"){
                    prod=1;
                    hp=3;
                }
                if(b.id=="Hard"){
                    prod=1.3;
                    hp=2;
                }
                if(b.id=="Very Hard"){
                    prod=1.7;
                    hp=1;
                }
                }
            }
            if(b.id=="introduction"){
        ctx.font = `30px DotGothic16`;
            }else{
        ctx.font = `50px DotGothic16`;
            }
        ctx.fillText(b.label,b.x,b.y);
            if(b.id=="introduction"){
                ctx.strokeRect(b.x-80,b.y-37.5,160,75);
            }else{
                ctx.strokeRect(b.x-150,b.y-75,300,150);
            }
        }
    }
    ctx.beginPath();
    ctx.lineTo(border+1,0);
    ctx.lineTo(border+1,canvas.height);
    ctx.lineTo(border-1,canvas.height);
    ctx.lineTo(border-1,0);
    ctx.lineTo(border+1,0);
    ctx.fill();
    ctx.closePath();
    ctx.font = "60px DotGothic16";
    ctx.textBaseline = "left";
    ctx.fillText("Chromatic Shooter",border+300,70);
    ctx.font = "30px DotGothic16";
    ctx.beginPath();
    ctx.lineTo(border+500,110);
    ctx.lineTo(border+100,110);
    ctx.stroke();
    ctx.closePath();
    ctx.fillText("クロマトシューター",border+300,130);
    if(displayId==2){
        if(nextColor=="#000000"){
    ctx.fillText(`次の色:black`,border+120,200);
        }else{
    ctx.fillText(`次の色:${nextColor}`,border+120,200);
        }
    ctx.fillText(`得点:${score}`,border+300,200);
    //ctx.fillText(`タイム:${time}`,border+200,300);
        }
    //説明
    if(intro){
        ctx.textAlign = "left";
        switch(introId){
                case 0:
                ctx.fillText("矢印キーまたはWASDキーで移動",border+20,200);
                ctx.fillText("上から流れてくる敵が一番下のタイルを通り",border+20,240);
                ctx.fillText("過ぎると残機が減るよ。",border+20,280);
                ctx.fillText("EnterまたはZ,Spaceで弾丸を発射！",border+20,320);
                ctx.fillText("弾丸はプレイヤーの色と同じ色になり、",border+20,360);
                ctx.fillText("同じ色の敵を倒すことができるぞ！",border+20,400);
                ctx.fillText("敵を連続で倒すと連鎖する。",border+20,440);
                ctx.fillText("連鎖を狙ってスコアを稼ごう！",border+20,480);
                ctx.fillText("一定時間待つまたはHキーを押すと敵が出現",border+20,520);
                ctx.fillText("敵が現れる間隔は段々早くなるぞ。",border+20,560);
                break;
                case 1:
                ctx.fillText("稀に出現する黒玉は倒すと高得点！何色でも",border+20,200);
                ctx.fillText("倒すことができるぞ。更に、黒色を倒すと",border+20,240);
                ctx.fillText("不思議なことが起こるよ。",border+20,280);
                ctx.fillText("",border+20,320);
                ctx.fillText("黒玉の効果",border+20,360);
                ctx.fillText("ブラックアウト:プレイヤーの色が黒色になり",border+20,400);
                ctx.fillText("どんな色でも倒せるようになる。",border+20,440);
                ctx.fillText("ぬりつぶし:現在の敵の色が一色になる。",border+20,480);
                ctx.fillText("ラピッドファイア:45°,135°の向きに弾丸が発",border+20,520);
                ctx.fillText("射されるようになり、発射速度が早くなる。",border+20,560);
                break;
                case 2:
                ctx.fillText("カラーチャージ:敵の出現間隔が5秒の間2倍",border+20,200);
                ctx.fillText("速になる(効果は重ならない)",border+20,240);
                ctx.fillText("一番下に来た敵の上に重なると色は関係なく",border+20,280);
                ctx.fillText("倒すことができるぞ。",border+20,320);
                ctx.fillText("最後に、スコアボーナスはスコアが加点され",border+20,360);
                ctx.fillText("る量の倍率",border+20,400);
                ctx.fillText("全消しボーナスで10%増加したり、",border+20,440);
                ctx.fillText("敵の出現5回ごとに0.1増加したりするぞ。",border+20,480);
                ctx.fillText("黒玉のバフ効果は全消しで消えるので注意",border+20,520);
                ctx.fillText("スコアボーナスを多く稼いでハイスコアを目",border+20,560);
                ctx.fillText("指そう！",border+20,600);
                break;
        }
        ctx.textAlign = "center";
        ctx.fillText(`${introId+1}/3`,border+(canvas.width-border)/2,650);
    }
    //正多角形
    if(hp>0 && displayId!=0 && !intro){
    ctx.beginPath();
    let range=100;
    let x=border+120;
    if(displayId==1){
        x=border+(canvas.width-border)/2;
    }
    let y=canvas.height/2;
    let k=1;
    let rad=Math.PI*2/(Math.pow(1/2,hp)+2);
    ctx.lineTo(x+range,y);
    while(Math.cos(rad*k)!=1 && Math.sin(rad*k)!=0){
    ctx.lineTo(x+range*Math.cos(rad*k),y+range*Math.sin(rad*k));
    k++;
    }
    ctx.lineTo(x+range,y);
    ctx.stroke();
    ctx.closePath();
        }
    if(player.damagedInterval>0){
        if(hp>0){
    ctx.beginPath();
    let range=100-player.damagedInterval;
    let x=border+120;
    let y=canvas.height/2;
    let k=1;
    let rad=Math.PI*2/(Math.pow(1/2,hp)+2);
    ctx.lineTo(x+range,y);
    while(Math.cos(rad*k)!=1 && Math.sin(rad*k)!=0){
    ctx.lineTo(x+range*Math.cos(rad*k),y+range*Math.sin(rad*k));
    k++;
    }
    ctx.lineTo(x+range,y);
    ctx.stroke();
    ctx.closePath();
        }
        player.damagedInterval--;
    }
    ctx.textBaseline = "center";
    for(const pop of popTexts){
        ctx.font = `${pop.size}px DotGothic16`;
        pop.timer--;
        pop.y--;
        ctx.fillStyle=pop.color;
        ctx.fillText(pop.label,pop.x,pop.y);
        if(pop.timer<=0){
            h.deleteObject("popTexts",popTexts.findIndex((p)=>p.seed==pop.seed));
        }
    }
    for(const tit of titleTexts){
        ctx.font = `${tit.size}px DotGothic16`;
        tit.timer--;
        ctx.fillStyle=tit.color;
        ctx.fillText(tit.label,tit.x,tit.y);
        if(tit.timer<=0){
            h.deleteObject("titleTexts",titleTexts.findIndex((t)=>t.seed==tit.seed));
        }
    }
    requestAnimationFrame(translate);
    }
}
translate();
function addPopText(x,y,value,size,color){
    popTexts.push({
        x:x,
        y:y,
        label:value,
        size:size,
        color:color,
        seed:Math.random(),
        timer:100
    });
}
function addTitleText(x,y,value,size,color,forever){
    if(forever){
    titleTexts.push({
        x:x,
        y:y,
        label:value,
        size:size,
        color:color,
        seed:Math.random(),
        timer:10000000
    });
    }else{
        titleTexts.push({
        x:x,
        y:y,
        label:value,
        size:size,
        color:color,
        seed:Math.random(),
        timer:100
    });
    }
}
function popEnemy(){
    let y=0;
    let seed=Math.round(Math.random()*(blockWidth-1));
    let loop=0;
    while(enemy.findIndex((e)=>e.x==size*seed+size/2 && e.y==size/2)!=-1){
        loop++;
        seed=Math.round(Math.random()*(blockWidth-1));
        if(loop>1000){
            y+=size;
            break;
        }
    }
    if(Math.random()*20>1){
        let x=size*seed+size/2;
        let index=enemy.findIndex((e)=>e.x==x && e.y==y+(3*size/2));
        let belowColor="black";
        if(index!=-1){
        belowColor=enemy[index].color;
        }
        if(Math.round(Math.random()*3)!=0 || belowColor=="black"){
    enemy.push({
        x:x,
        y:y+(size/2),
        color:randomColor(),
        seed:Math.random(),
        damagedInterval:0,
        eraze:false
    });
            }else{
            enemy.push({
        x:x,
        y:y+(size/2),
        color:belowColor,
        seed:Math.random(),
        damagedInterval:0,
        eraze:false
    });
            }
        }else{
        enemy.push({
        x:size*seed+size/2,
        y:y+(size/2),
        color:"black",
        seed:Math.random(),
        damagedInterval:0,
        eraze:false
    });
        }
    score+=15;
}
function shot(x,y,rad){
    if(!rad){
        rad=Math.PI/2;
    }
    let hue=player.hue;
    if(hasEffect("まぜすぎ")){
        hue="#000000";
    }
    bullets.push({
        x:x,
        y:y,
        rad:rad,
        color:hue
    });
}
function randomColor(){
    return colors[Math.round(Math.random()*(colors.length-1))];
}
window.addEventListener("keydown",(e)=>{
    playerPushedAnyKey=true;
    if(e.code==="KeyA" || e.code==="ArrowLeft"){
        if(time>=0){
        if(player.x-size>0){
        movement();
        player.x-=size;
        }
        }
    }
    if(e.code==="KeyD" || e.code==="ArrowRight"){
        if(time>=0){
        if(player.x+size<border){
            movement();
        player.x+=size;
        }
            }
    }
    if(e.code==="KeyW" || e.code==="ArrowUp"){
        if(time>=0){
        if(player.y-size>0){
            movement();
        player.y-=size;
        }
            }else{
            movement();
            for(const b of buttons){
                if(b.isSelect && buttonInterval==0){
                    b.isSelect=false;
                    buttons[b.over].isSelect=true;
                    buttonInterval=10;
                }
            }
            }
    }
    if(e.code==="KeyS" || e.code==="ArrowDown"){
        if(time>=0){
        if(player.y+size<canvas.height){
            movement();
        player.y+=size;
        }
            }else{
            movement();
            for(const b of buttons){
                if(b.isSelect && buttonInterval==0){
                    b.isSelect=false;
                    buttons[b.below].isSelect=true;
                    buttonInterval=10;
                }
            }
            }
    }
    if(e.code==="KeyH"){
        if(time>=0){
        timer=interval;
            }
    }
    if(e.code==="KeyX"){
        if(enemy.findIndex((e)=>e.x==player.x && e.y==player.y)==-1){
        player.hue=nextColor;
            nextColor=randomColor();
            while(nextColor==player.hue){
                nextColor=randomColor();
            }
        }else{
            player.hue=enemy[enemy.findIndex((e)=>e.x==player.x && e.y==player.y)].color;
        }
    }
    if(e.code==="Enter" || e.code==="Space" || e.code==="KeyZ"){
        if(time>=0){
        if(enemy.findIndex((e)=>e.x==player.x && e.y==player.y && e.y>=645 && e.damagedInterval==0)==-1){
        if(player.shotInterval==0){
            if(hasEffect("ラピッドファイア")){
                player.fireDuration=5;
            }else{
                player.fireDuration=20;
            }
            fire();
        player.shotInterval=player.fireDuration;
            }
            }else if(player.shotInterval==0){
            enemy[enemy.findIndex((e)=>e.x==player.x && e.y==player.y && e.y>=645 && e.damagedInterval==0)].damagedInterval=20;
            player.shotInterval=80;
            }
            }else if(displayId==1){
            for(const b of buttons){
                if(b.isSelect){
                    if(b.id!="introduction"){
                    fire();
                    difficulty=b.id;
                    if(difficulty=="Hard"){
                        colors.push("purple");
                        scoreBonusPercent=1.3;
                    }
                    if(difficulty=="Very Hard"){
                        colors.push("purple");
                        colors.push("yellow");
                        colors.push("midnightblue");
                        scoreBonusPercent=1.7;
                    }
                    time=0;
                    bgmTime=0;
                    displayId=2;
                    }else{
                        if(introInterval==0){
                            fire();
                        introId++;
                        introInterval=10;
                        if(introId>2){
                            introId=0;
                        }
                            }
                    }
                }
            }
            }
    }
    if(displayId==0){
        displayId=1;
    }
    if(e.code==="KeyT" && stop){
        let resultText=`クロマトシューター：難易度${difficulty}スコア${score}タイム${time}秒`;
        navigator.clipboard.writeText(resultText).then(()=>{
        console.log("コピー成功");
    },()=>{
      console.log("コピー失敗");
        alert("セーブ失敗");
      });
    }
    //リスタート
    if(e.code==="KeyR" && stop){
        console.log("リスタート");
        time=0;
        score=0;
        player.effect=[];
        player.x=5.5*size;
        player.y=7.5*size;
        player.shotInterval=0;
        player.damagedInterval=0;
        nextColor=randomColor();
        player.hue=randomColor();
        stop=false;
        scoreBonusPercent=1;
        interval=350;
        translate();
        if(difficulty=="Normal"){
        hp=3;
        }
        if(difficulty=="Hard"){
        hp=2;
        }
        if(difficulty=="Very Hard"){
        hp=1;
        }
        enemy=[];
        titleTexts=[];
        popTexts=[];
        bullets=[];
    }
});
function getEffect(x,y){
    let seed=Math.round(Math.random()*3);
    if(seed==0){
        let c=randomColor();
        for(const e of enemy){
            e.color=c;
        }
        addTitleText(x,y,`ぬりつぶし`,15,"#000000");
    }else if(seed==1){
        if(player.effect.findIndex((e)=>e.name=="まぜすぎ")!=-1){
            let index=player.effect.findIndex((e)=>e.name=="まぜすぎ");
            player.effect[index].interval+=300;
        }else{
        player.effect.push({name:"まぜすぎ",interval:300});
        }
        addTitleText(x,y,`ブラックアウト`,15,"#000000");
    }else if(seed==2){
        if(player.effect.findIndex((e)=>e.name=="ラピッドファイア")!=-1){
            let index=player.effect.findIndex((e)=>e.name=="ラピッドファイア");
            player.effect[index].interval+=300;
        }else{
        player.effect.push({name:"ラピッドファイア",interval:300});
        }
        addTitleText(x,y,`ラピッドファイア`,15,"#000000");
    }else if(seed==3){
        if(ccRemind==0){
        ccRemind=interval;
        }
        colorCharge+=300;
        addTitleText(x,y,`カラーチャージ`,15,"#000000");
    }
}
function hasEffect(name){
    return player.effect.findIndex((e)=>name==e.name)!=-1;
}
