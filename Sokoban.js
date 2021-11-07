document.onkeydown=arrowKeys;
let gameFinish=false;
let totalGoals=0;
let spaceForPlayer=Tiles.Space;


function drawMap(tile){
    let grid=document.getElementById('Container');
    for(let x=0;x<tile.height;x++)
    {
        for(let y=0;y<tile.width;y++)
        {
            let element=document.createElement('div');//creation of html element to draw game map using given array..
            element.id= 'x' + y + 'y'+ x;

            switch(tile.mapGrid[x][y][0]){
                case " ":
                    element.className=Tiles.Space;
                    break;
                case "W":
                    element.className=Tiles.Wall;
                    break; 
                case "G":
                    element.className=Tiles.Goal;
                    totalGoals++;
                    break;
                case "B":
                    element.className=Entities.Block;
                    break;
                case "P":
                    element.className=Entities.Character;
            }
            grid.appendChild(element);
        }
    }

}

function arrowKeys(event){
    if(event.repeat || gameFinish){return}
    //Left arrow key
    if(event.keyCode == 37){
        event.preventDefault();
        MovePlayer(-1,0);    
    }
     //up arrow key
    else if(event.keyCode== 38){
        event.preventDefault();
        MovePlayer(0,-1);
        
    }
     //Right arrow key
    else if(event.keyCode== 39){
        event.preventDefault();
        MovePlayer(1,0);
    }
     //Down arrow key
    else if(event.keyCode== 40){
        event.preventDefault();
        MovePlayer(0,1);
    }
    
}


function MovePlayer(x,y){
    let Currenttile = document.getElementsByClassName(Entities.Character)[0];
    let playerPositon=getTileId(Currenttile.id);//
    let playerNextMove=getElementCoordinates(playerPositon[0] + x,playerPositon[1] + y);

    if(playerNextMove.className===Tiles.Wall)
    {
        return;
    }
   
    let move=true

    if(playerNextMove.className === Entities.Block || playerNextMove.className===Entities.BlockDone){
        move=blockToMove(playerPositon[0]+x,playerPositon[1]+y,x,y);

    }
    if(move){
        Currenttile.className=spaceForPlayer;
        spaceForPlayer=playerNextMove.className;
        playerNextMove.className=Entities.Character;
    }

    let blockDone=document.getElementsByClassName(Entities.BlockDone);
    blockDone=blockDone.length;

    if(blockDone===totalGoals)
    {
        gameFinish=true;
        
    }
    
}
function getTileId(Id){
    Id=Id.slice(1, Id.length);
    let getId=Id.split('y');
    getId[0]=parseInt(getId[0]);
    getId[1]=parseInt(getId[1]);
    return getId;
}
function getElementCoordinates(x,y){
    let elementId='x'+ x +'y'+ y;
    return document.getElementById(elementId);
}
function blockToMove(blX,blY,dX,dY){
    let dirTile=getElementCoordinates(blX+dX,blY+dY);
    let moveTile=getElementCoordinates(blX,blY);
    

    if(dirTile.className===Tiles.Wall||dirTile.className===Entities.Block||
        dirTile.className===Entities.BlockDone){
            return false;
    }
  
    if(moveTile.className===Entities.BlockDone){

        moveTile.className=Tiles.Goal;
    }
    else{
        moveTile.className=Tiles.Space;
    }

    if(dirTile.className===Tiles.Goal){
        
        dirTile.className=Entities.BlockDone;
    }else{
        dirTile.className=Entities.Block;
    }
    return true;
    
}



