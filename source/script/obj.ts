class Position {
    x:number;
    y:number;
    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }

    getX = () => this.x
    getY = () => this.y
    setX = (x:number) => this.x = x
    setY = (y:number) => this.y = y
    set = (x:number, y:number) => {
        this.x = x;
        this.y = y;
    }
    get = () => {
        return {
            x: this.x,
            y: this.y
        }
    }
    getPolar = () => {
        return {
            r: Math.sqrt(this.x * this.x + this.y * this.y),
            theta: Math.atan2(this.y, this.x)
        }
    }


    compareToCartesian = (position:Position) => {
        return new Position(this.x - position.x, this.y - position.y);
    }

    compareToPolar = (position:Position) => {
        let dx = this.x - position.x;
        let dy = this.y - position.y;
        return new Position(Math.atan2(dy, dx), Math.sqrt(dx * dx + dy * dy));
    }
}

class Obj{
    position:Position;
    parrentGroup:ObjGroup;
    constructor(position:Position){
        this.position = position;
        this.parrentGroup = new ObjGroup(position, [], true);
    }

    setParentGroup(group:ObjGroup){
        this.parrentGroup = group;
    }
    getParentGroup = () => this.parrentGroup
}

class ObjGroup extends Obj{
    constructor(position:Position, objArray:Obj[]=[], isNull=false){
        super(position)
        this.objArray = objArray;
        this.isNull = isNull;
        
        if(this.isNull != true){
            this.setObjToGroup();
        }
    }
    objArray:Obj[];
    isNull:boolean;
    
    setObjToGroup() {
        for(let i=0; i<this.objArray.length; i++){
            this.objArray[i].setParentGroup(this);
        }
    }
}