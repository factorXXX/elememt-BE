addLayer("be", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: n(1),   
        depth:n(1),
        resource:"stone",
        health:n(10),
        highestdepth:n(1),
        resAmt:{
          stone:n(0),
          emerald:n(0),
          aquamarine:n(0),
          chrysoberyl:n(0),
          magicpower:n(0),
          mysterious:n(0),
        },
       money:n(0),
       adv:[1,1],
      advhealth:[n(5),n(50),n(200)],
      advnow:false,
      advCharaHealth:n(0),
      advbeaten:[],
      spellTime:[0,0,0,0],
      spellPower:[n(0),n(0),n(0),n(0)],
      powerpoint:n(0),
    }},

    color: "#ffffff",                       // The color for this layer, which affects many elements.
    resource: "鈹",            // The name of this layer's main prestige resource.
    row:3,                                 // The row this layer is on (0 is the first row).
    position:1,
    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: n("eee3"),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return n(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns your exponent to your gain of the prestige resource.
        return n(1)
    },

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.

   upgrades: {
        11:{
          description:"解鎖採礦",
          cost:n(0),    
        },
        12:{
          description:"解鎖市場",
          cost:n(5),   
          currencyLayer:"be",
          currencyInternalName:"money",
          currencyDisplayName:"塊",
        },
       13:{
          description:"解鎖冒險",
          cost:n(1000),   
          currencyLayer:"be",
          currencyInternalName:"money",
          currencyDisplayName:"塊",
        },
     14:{
          description:"解鎖魔法",
          cost:n(1000),   
          currencyLayer:"be",
          currencyInternalName:"magicpower",
          currencyDisplayName:"魔力",
          currencyLocation(){return player.be.resAmt},
      },
     15:{
          description:"解鎖駕駛",
          cost:n(1e5),   
          currencyLayer:"be",
          currencyInternalName:"mysterious",
          currencyDisplayName:"神秘",
          currencyLocation(){return player.be.resAmt},
      },
   },
   clickables:{
      1001:{
        display(){return player.be.resource},
        style(){
          let id=player.be.health.div(BE_orehealth()).times(255).floor().toNumber().toString(16)
          if(player.be.resource=="stone"){
            return{
              "background-color":`#888888${id}`
            }
          }
          if(player.be.resource=="emerald"){
            return{
              "background-color":`#88ff88`+id
            }
          }
          if(player.be.resource=="aquamarine"){
            return{
              "background-color":`#8888ff`+id
            }
          }
          if(player.be.resource=="chrysoberyl"){
            return{
              "background-color":`#ffd100`+id
            }
          }
          if(player.be.resource=="magicpower"){
            return{
              "background-color":`#ff6de4`+id
            }
          }
          if(player.be.resource=="mysterious"){
            return{
              "background-color":`#aaaaaa`+id
            }
          }
        }
      },
     2001:{
      display(){return "賣出並賺取"+format(player.be.resAmt.stone.times(0.1).times(BE_moneymult()))+"元."}, 
       canClick(){return true},
       onClick(){
         player.be.money=player.be.money.add(player.be.resAmt.stone.times(0.1).times(BE_moneymult()))
         player.be.resAmt.stone=n(0)
         
       },
       style(){
          return{
            "min-height":"50px",
            "width":"200px",
          }
       },
     },
     2002:{
      display(){return "賣出並賺取"+format(player.be.resAmt.aquamarine.times(1).times(BE_moneymult()))+"元."}, 
       canClick(){return true},
       onClick(){
         player.be.money=player.be.money.add(player.be.resAmt.aquamarine.times(1).times(BE_moneymult()))
         player.be.resAmt.aquamarine=n(0)
         
       },
       style(){
          return{
            "min-height":"50px",
            "width":"200px",
          }
       },
     },
     2003:{
      display(){return "賣出並賺取"+format(player.be.resAmt.emerald.times(1).times(BE_moneymult()))+"元."}, 
       canClick(){return true},
       onClick(){
         player.be.money=player.be.money.add(player.be.resAmt.emerald.times(1).times(BE_moneymult()))
         player.be.resAmt.emerald=n(0)
         
       },
       style(){
          return{
            "min-height":"50px",
            "width":"200px",
          }
       },
     },
     2004:{
      display(){return "賣出並賺取"+format(player.be.resAmt.chrysoberyl.times(50).times(BE_moneymult()))+"元."}, 
       canClick(){return true},
       onClick(){
         player.be.money=player.be.money.add(player.be.resAmt.chrysoberyl.times(50).times(BE_moneymult()))
         player.be.resAmt.chrysoberyl=n(0)
         
       },
       style(){
          return{
            "min-height":"50px",
            "width":"200px",
          }
       },
     },
      3000:{
       display(){return "<h2>開始!</h2>"},
       canClick(){return !player.be.advnow},
       onClick(){
        player.be.advnow=true
        player.be.advCharaHealth=BE_power().times(10)
        player.be.advhealth[0]=BE_advhealth()[player.be.adv[0]][player.be.adv[1]][0]
         player.be.advhealth[1]=BE_advhealth()[player.be.adv[0]][player.be.adv[1]][1]
         player.be.advhealth[2]=BE_advhealth()[player.be.adv[0]][player.be.adv[1]][2]
       }
     },
     3001:{
       display(){return "<h2>戰鬥!</h2>"},
       canClick(){return player.be.advnow&&!player.be.advCharaHealth.lte(0)},
       onClick(){
        let monsterid=0
        if(player.be.advhealth[0].lte(0))monsterid++
        if(player.be.advhealth[1].lte(0))monsterid++
         //player action
        player.be.advhealth[monsterid]=player.be.advhealth[monsterid].sub(BE_power())
         if(player.be.advhealth[monsterid].gt(0)){
           player.be.advCharaHealth=player.be.advCharaHealth.sub(BE_advhealth()[player.be.adv[0]][player.be.adv[1]][monsterid].div(5))
           player.be.advhealth[monsterid]=player.be.advhealth[monsterid].add(BE_advhealth()[player.be.adv[0]][player.be.adv[1]][monsterid].div(100))
         }
       }
     },
     3002:{
       display(){return "<h2>停止!</h2>"},
       canClick(){return player.be.advnow},
       onClick(){
        let beaten=false
        if(player.be.advhealth[2].lte(0))beaten=true
         player.be.advnow=false
        player.be.advCharaHealth=BE_power().times(10)
        player.be.advhealth[0]=BE_advhealth()[player.be.adv[0]][player.be.adv[1]][0]
         player.be.advhealth[1]=BE_advhealth()[player.be.adv[0]][player.be.adv[1]][1]
         player.be.advhealth[2]=BE_advhealth()[player.be.adv[0]][player.be.adv[1]][2]
         let level=parseInt(player.be.adv[0].toString()+player.be.adv[1])
         if(BE_hasLevel(level))return;
        if(beaten)player.be.advbeaten.push(level)
       }
     },
     4001:{
       title(){return `力量<br><small><small>消耗50%魔力，在30秒內提升你的力量。<br>當前效果：${player.be.spellTime[0]==0?"1.00":format(player.be.spellPower[0].add(10).logBase(10))}x<br>時間: ${format(player.be.spellTime[0])}s</small></small>`},
       canClick(){return true},
       onClick(){
           player.be.spellTime[0]=30
           player.be.spellPower[0]=player.be.resAmt.magicpower.div(2)
           player.be.resAmt.magicpower=player.be.resAmt.magicpower.div(2)
       },
       style(){
          return{
            "min-height":"120px",
            "width":"240px",
          }
       },
     },
     4002:{
       title(){return `幸運<br><small><small>消耗 75% 魔力，在 60 秒內提升你的資源獲取。<br>當前效果： ${player.be.spellTime[1]==0?"1.00":format(player.be.spellPower[1].add(10).log(10))}x<br>時間: ${format(player.be.spellTime[1])}s</small></small>`},
       canClick(){return true},
       onClick(){
           player.be.spellTime[1]=60
           player.be.spellPower[1]=player.be.resAmt.magicpower.times(0.75)
           player.be.resAmt.magicpower=player.be.resAmt.magicpower.div(4)
       },
       style(){
          return{
            "min-height":"120px",
            "width":"240px",
          }
       },
       unlocked(){return BE_hasLevel(21)}
     },
     4011:{
       title(){return `貪婪<br><small><small>
       消耗20%魔力，10秒內提升金錢收益。<br>當前效果：${player.be.spellTime[2]==0?"1.00":format(player.be.spellPower[2].add(10).logBase(5))}x<br>時間: ${format(player.be.spellTime[2])}s</small></small>`},
       canClick(){return true},
       onClick(){
           player.be.spellTime[2]=10
           player.be.spellPower[2]=player.be.resAmt.magicpower.times(0.2)
           player.be.resAmt.magicpower=player.be.resAmt.magicpower.times(0.8)
       },
       style(){
          return{
            "min-height":"120px",
            "width":"240px",
          }
       },
       unlocked(){return BE_hasLevel(22)}
     },
     4012:{
       title(){return `轉換<br><small><small>消耗100%魔力，瞬間給予能量點<br>當前生成：${format(player.be.resAmt.magicpower.pow(0.3))}</small></small>`},
       canClick(){return true},
       onClick(){
           player.be.powerpoint=player.be.powerpoint.add(player.be.resAmt.magicpower.pow(0.3))
           player.be.resAmt.magicpower=n(0)
       },
       style(){
          return{
            "min-height":"120px",
            "width":"240px",
          }
       },
       unlocked(){return BE_hasLevel(23)}
     },
     5001:{
       display(){return `進入`},
       canClick(){return true},
       onClick(){

       },
       style(){
          return{
            "min-height":"50px",
            "width":"180px",
          }
       },
     },
     5002:{
       display(){return `進入`},
       canClick(){return true},
       onClick(){

       },
       style(){
          return{
            "min-height":"50px",
            "width":"180px",
          }
       },
     },
     10001:{
        display(){return "<"},
        canClick(){return player.be.depth.gte(2)},
       onClick(){
         player.be.depth=player.be.depth.sub(1)
       BE_getresource()
       },
       style(){
          return{
            "width":"50px",
            "min-height":"50px",
            "height":"50px",
          }
       },
      },
     10002:{
        display(){return ">"},
        canClick(){return player.be.highestdepth.gte(player.be.depth)&&!player.be.depth.eq(120)},
       onClick(){
         player.be.depth=player.be.depth.add(1)
         BE_getresource(true)  
        },
       style(){
          return{
            "width":"50px",
            "min-height":"50px",
            "height":"50px",
          }
       },
      },
     10003:{
        display(){return "<"},
        canClick(){return !(player.be.adv[0]==1&&player.be.adv[1]==1)},
       onClick(){
         player.be.adv[1]=player.be.adv[1]-1
         if(player.be.adv[1]==0){
           player.be.adv[1]=4
           player.be.adv[0]=player.be.adv[0]-1
         }
        },
       style(){
          return{
            "width":"50px",
            "min-height":"50px",
            "height":"50px",
          }
       },
      },
     10004:{
        display(){return ">"},
        canClick(){return !(player.be.adv[0]==2&&player.be.adv[1]==4)},
       onClick(){
         player.be.adv[1]=player.be.adv[1]+1
         if(player.be.adv[1]==5){
           player.be.adv[1]=1
           player.be.adv[0]=player.be.adv[0]+1
         }
        },
       style(){
          return{
            "width":"50px",
            "min-height":"50px",
            "height":"50px",
          }
       },
      },
    },
  buyables:{
    1001: {
            title: "更好的鎬",
            display() {
               return "+" + format(tmp.be.buyables[1001].effect) + " power<br>Cost : " + format(tmp.be.buyables[1001].cost) + " Money"
            },
            unlocked() { return true},
            canAfford() { 
              return player.be.money.gte(tmp.be.buyables[1001].cost) 
            },
            cost(){
            return  n("5").times(n(1.5).pow(getBuyableAmount((this.layer),1001).pow(1.2)))
            },
            buy() { 
                {
                   player.be.money = player.be.money.minus(tmp.be.buyables[1001].cost)
                }
                setBuyableAmount("be", 1001, getBuyableAmount("be", 1001).add(1))
            },
            effect() { 
              return n(1).times(getBuyableAmount("be", 1001))          
            },
      style(){
          return{
            "height":"100px"
          }
       },
      },
    1002: {
            title: "更好的質感",
            display() {
               return "x" + format(tmp.be.buyables[1002].effect) + " power<br>Cost : " + format(tmp.be.buyables[1002].cost) + " Money"
            },
            unlocked() { return true},
            canAfford() { 
              return player.be.money.gte(tmp.be.buyables[1002].cost) 
            },
            cost(){
            return  n("25").times(n(1.6).pow(getBuyableAmount((this.layer),1002).pow(1.25)))
            },
            buy() { 
                {
                   player.be.money = player.be.money.minus(tmp.be.buyables[1002].cost)
                }
                setBuyableAmount("be", 1002, getBuyableAmount("be", 1002).add(1))
            },
            effect() { 
              return n(1).add(n(0.5).times(getBuyableAmount("be", 1002)))        
            },
      style(){
          return{
            "height":"100px"
          }
       },
      },
   1011: {
            title: "附魔：財富",
            display() {
               return "x"+format(tmp.be.buyables[1011].effect) + " to depth effect on resource gain<br>Cost : " + format(tmp.be.buyables[1011].cost) + " Money"
            },
            unlocked() { return BE_hasLevel(11)},
            canAfford() { 
              return player.be.money.gte(tmp.be.buyables[1011].cost) 
            },
            cost(){
            return n(10).pow(n(3).times(n(1.1).pow(getBuyableAmount((this.layer),1011).pow(1.1))))
            },
            buy() { 
                {
                   player.be.money = player.be.money.minus(tmp.be.buyables[1011].cost)
                }
                setBuyableAmount("be", 1011, getBuyableAmount("be", 1011).add(1))
            },
            effect() { 
              return n(1).add(n(0.5).times(getBuyableAmount("be", 1011)))
            },
      style(){
          return{
            "height":"100px"
          }
       },
      },
    1012: {
            title: "附魔：效率",
            display() {
               return "^"+format(tmp.be.buyables[1012].effect) + " to power<br>Cost : " + format(tmp.be.buyables[1012].cost) + " Money"
            },
            unlocked() { return BE_hasLevel(12)},
            canAfford() { 
              return player.be.money.gte(tmp.be.buyables[1012].cost) 
            },
            cost(){
            return n(10).pow(n(3.3).times(n(1.15).pow(getBuyableAmount((this.layer),1012).pow(1.125))))
            },
            buy() { 
                {
                   player.be.money = player.be.money.minus(tmp.be.buyables[1012].cost)
                }
                setBuyableAmount("be", 1012, getBuyableAmount("be", 1012).add(1))
            },
            effect() { 
              return n(1).add(n(0.125).times(getBuyableAmount("be", 1012)))
            },
      style(){
          return{
            "height":"100px"
          }
       },
      },
    1021: {
            title: "技能：弱點",
            display() {
               return "-"+format(tmp.be.buyables[1021].effect) + " to ores health base.<br>Cost : " + format(tmp.be.buyables[1021].cost) + " Money"
            },
            unlocked() { return BE_hasLevel(13)},
            canAfford() { 
              return player.be.money.gte(tmp.be.buyables[1021].cost) 
            },
            cost(){
            return n(10).pow(n(4.5).times(n(1.1).pow(getBuyableAmount((this.layer),1021).pow(1.2))))
            },
            buy() { 
                {
                   player.be.money = player.be.money.minus(tmp.be.buyables[1021].cost)
                }
                setBuyableAmount("be", 1021, getBuyableAmount("be", 1021).add(1))
            },
            effect() { 
              return n(1).add(n(1).div(getBuyableAmount("be", 1021).add(1))).pow(getBuyableAmount("be", 1021).add(1)).sub(2).div(5)
            },
      style(){
          return{
            "height":"100px"
          }
       },
    },
    1022: {
            title: "技能：鄉村英雄",
            display() {
               return "x"+format(tmp.be.buyables[1022].effect) + " to money gain.<br>Cost : " + format(tmp.be.buyables[1022].cost) + " Money"
            },
            unlocked() { return BE_hasLevel(14)},
            canAfford() { 
              return player.be.money.gte(tmp.be.buyables[1022].cost) 
            },
            cost(){
            return n(10).pow(n(5.5).times(n(1.05).pow(getBuyableAmount((this.layer),1022).pow(1.15))))
            },
            buy() { 
                {
                   player.be.money = player.be.money.minus(tmp.be.buyables[1022].cost)
                }
                setBuyableAmount("be", 1022, getBuyableAmount("be", 1022).add(1))
            },
            effect() { 
              return n(1.8).pow(getBuyableAmount("be", 1022))
            },
      style(){
          return{
            "height":"100px"
          }
       },
    },
  },
   tabFormat:{
      "升級":{
        content:[
           "main-display",
        "upgrades"    
      ]
      },
    "采礦":{
      unlocked(){return hasUpgrade('be',11)},
        content:[
        ["clickable",1001],
        "blank",
          ["raw-html",function(){return "深度:" +format(player.be.depth)+"m"}],
        ["raw-html",function(){return "生命:" +format(player.be.health)+"/"+format(BE_orehealth())}],
          ["raw-html",function(){return "力量:" +format(BE_power())}],
          "blank",
          "blank",
         ["row",[["clickable",10001],["clickable",10002]]], 
      ]
    },
    "資源":{
      unlocked(){return hasUpgrade('be',11)},
        content:[
          ["row",[["raw-html",function(){return "石頭: " +format(player.be.resAmt.stone)}],"blank",["clickable",2001]]],
          ["row",[["raw-html",function(){return "藍寶石: " +format(player.be.resAmt.aquamarine)}],"blank",["clickable",2002]]],
          ["row",[["raw-html",function(){return "綠寶石: " +format(player.be.resAmt.emerald)}],"blank",["clickable",2003]]],
          ["row",[["raw-html",function(){return "金綠寶石: " +format(player.be.resAmt.chrysoberyl)}],"blank",["clickable",2004]]],
          ["row",[["raw-html",function(){return "魔力: " +format(player.be.resAmt.magicpower)}]]],
          ["row",[["raw-html",function(){return "力量點: " +format(player.be.powerpoint)+" 效果: 力量+"+format(BE_powerbonus())}]]],
          ["row",[["raw-html",function(){return "神秘: " +format(player.be.resAmt.mysterious)}]]],
          ["row",[["raw-html",function(){return "錢:" +format(player.be.money)}]]],
      ]
    },
     "市場":{
      unlocked(){return hasUpgrade('be',12)},
        content:[
        ["row",[["buyable",1001],["buyable",1002]]],
        ["row",[["buyable",1011],["buyable",1012]]],
          ["row",[["buyable",1021],["buyable",1022]]],
      ]
    },
    "冒險":{
      unlocked(){return hasUpgrade('be',13)},
        content:[
          ["raw-html",function(){return player.be.adv[0]+"-"+player.be.adv[1]+(BE_hasLevel(parseInt(player.be.adv[0].toString()+player.be.adv[1]))?" (Complete)":" (Not Complete)")}],  
                ["raw-html",function(){       
            return "怪物 1 生命: "+format(player.be.advhealth[0])+"/"+format(BE_advhealth()[player.be.adv[0]][player.be.adv[1]][0])
                    +" 攻擊: "+format(BE_advhealth()[player.be.adv[0]][player.be.adv[1]][0].div(5))+" 生命回複: "
            +format(BE_advhealth()[player.be.adv[0]][player.be.adv[1]][0].div(100))}],
                  ["raw-html",function(){       
            return "怪物 2 生命: "+format(player.be.advhealth[1])+"/"+format(BE_advhealth()[player.be.adv[0]][player.be.adv[1]][1])
                    +" 攻擊: "+format(BE_advhealth()[player.be.adv[0]][player.be.adv[1]][1].div(5))+" 生命回複: "
            +format(BE_advhealth()[player.be.adv[0]][player.be.adv[1]][1].div(100))}],
                  ["raw-html",function(){       
            return "怪物 3 生命: "+format(player.be.advhealth[2])+"/"+format(BE_advhealth()[player.be.adv[0]][player.be.adv[1]][2])
                    +" 攻擊: "+format(BE_advhealth()[player.be.adv[0]][player.be.adv[1]][2].div(5))+" 生命回複: "
            +format(BE_advhealth()[player.be.adv[0]][player.be.adv[1]][2].div(100))}],
          "blank",
          ["raw-html",function(){       
            return "Your 生命: "+format(player.be.advCharaHealth)+"/"+format(BE_power().times(10))
                    +" 攻擊: "+format(BE_power())}],
          "blank",
          ["row",[["clickable",3000],["clickable",3001],["clickable",3002]]],
          "blank",
          "blank",
          ["row",[["clickable",10003],["clickable",10004]]], 
          
      ]
    },
     "魔法":{
      unlocked(){return hasUpgrade('be',14)},
        content:[
        ["row",[["clickable",4001],["clickable",4002]]],
        ["row",[["clickable",4011],["clickable",4012]]], 
      ]
    },
     "駕駛":{
      unlocked(){return hasUpgrade('be',15)},
        content:[
        ["row",[
          ['display-image', 'https://i.postimg.cc/wMdkPwb2/Map1.png'],
          ['column',[['raw-html',()=>{return "名稱：C市<br>直線量：3200m<br>曲線量：1200m<br>圈數：2"}],
          "blank",
          ["clickable",5001]]],
          "blank","blank",
          ['display-image', 'https://i.postimg.cc/NF2WFZGt/Map2.jpg'],
          ['column',[['raw-html',()=>{return "名稱：城市R<br>直線量：3500m<br>曲線量：1100m<br>圈數：2"}],
          "blank",
          ["clickable",5002]]],
          
        ]],
      ]
    },
   "Things to know":{
        content:[
          ["microtabs","adv"]
          
      ]
    },
    },
  microtabs:{
    "adv":{
    "礦石生成":{
      unlocked(){return hasUpgrade("be",11)},
      content:[
        ["raw-html",function(){return "1 米至 4 米：100% 寶石<br>5 米至 9 米：90% 寶石，5% 海藍寶石，5% 祖母綠。<br>10 米至 19 米：80% 寶石，10% 海藍寶石，10% 祖母綠。<br>20 米至39 米：65% 寶石、15% 海藍寶石、15% 祖母綠、5% 金綠寶石。<br>40 米至 74 米：50% 寶石、20% 海藍寶石、20% 祖母綠、10% 金綠寶石。<br>75 米至 99 米：45%石頭，15% 海藍寶石，15% 祖母綠，10% 金綠寶石，5% 魔力。<br>100 至 119 米：20% 石頭，25% 海藍寶石，25% 祖母綠，20% 金綠寶石，10% 魔力。<br>120 米： 100% 神秘"}]
      ]
    },
    "冒險信息":{
      unlocked(){return hasUpgrade("be",13)},
      content:[
        ["raw-html",function(){return "採礦power x10=HP<br>採礦power=你的攻擊。<br><br>你總是先攻擊，如果怪物沒有死，它會攻擊你並恢復。<br>殺死所有 3 個怪物完成一個階段。每個階段都有獎勵。"}]
      ]
    },
    "冒險獎勵":{
      unlocked(){return hasUpgrade("be",13)},
      content:[
        ["raw-html",function(){return "世界 1：在這個世界中每完成一個級別解鎖一個新的市場升級。"}],
        ["raw-html",function(){return "世界 2：在這個世界每完成前 3 級解鎖一個新魔法。完成2-4即可在120m獲得神秘。"}],
      ]
    },
  }},
  update(diff){
  player.be.health=player.be.health.sub(BE_power().times(diff))
    if(player.be.health.lte(0))BE_getresource()
    
    player.be.spellTime[0]=Math.max(player.be.spellTime[0]-diff,0)
   player.be.spellTime[1]=Math.max(player.be.spellTime[1]-diff,0)
    player.be.spellTime[2]=Math.max(player.be.spellTime[2]-diff,0)
    player.be.spellTime[3]=Math.max(player.be.spellTime[3]-diff,0)
}
})
function BE_getresource(force=false){
  let random=Math.random()*100
  let list=[]
  list=[['mysterious',100]]
  if(!(player.be.depth.eq(120)&&BE_hasLevel(24)))list=[['stone',20],['aquamarine',25],['emerald',25],['chrysoberyl',20],['magicpower',10]]
  if(player.be.depth.lte(99))list=[['stone',45],['aquamarine',20],['emerald',20],['chrysoberyl',10],['magicpower',5]]
  if(player.be.depth.lte(74))list=[['stone',50],['aquamarine',20],['emerald',20],['chrysoberyl',10]]
  if(player.be.depth.lte(39))list=[['stone',65],['aquamarine',15],['emerald',15],['chrysoberyl',5]]
  if(player.be.depth.lte(19))list=[['stone',80],['aquamarine',10],['emerald',10]]
  if(player.be.depth.lte(9))list=[['stone',90],['aquamarine',5],['emerald',5]]
  if(player.be.depth.lte(4))list=[['stone',100]]
  
  let num=0
  for(let i=0; i<=list.length-1; i++){
    num+=list[i][1]
    if(random<=num){
     if(!force) {
       player.be.highestdepth=player.be.depth.max(player.be.highestdepth)
       player.be.resAmt[player.be.resource]=player.be.resAmt[player.be.resource].add(player.be.depth.times(tmp.be.buyables[1011].effect).pow(1.5).times(player.be.spellTime[1]!=0?player.be.spellPower[1].add(10).log(10):1))
       if(player.be.resource=="aquamarine"||player.be.resource=="emerald")player.be.points=player.be.points.add(player.be.depth.times(tmp.be.buyables[1011].effect).pow(1.5).times(player.be.spellTime[1]!=0?player.be.spellPower[1].add(10).log(10):1).floor())
              if(player.be.resource=="chrysoberyl")player.be.points=player.be.points.add(player.be.depth.times(tmp.be.buyables[1011].effect).pow(2.5).times(player.be.spellTime[1]!=0?player.be.spellPower[1].add(10).log(10):1).floor())
     }
      player.be.resource=list[i][0]
      player.be.health=BE_orehealth()
    return;
  }
  }
}
function BE_orehealth(){
  let mult=n(1)
  if(player.be.resource=="aquamarine")mult=n(2)
  if(player.be.resource=="emerald")mult=n(2)
  if(player.be.resource=="chrysoberyl")mult=n(5)
  if(player.be.resource=="mysterious")mult=n(100)
  return n(10).times(n(1.25).sub(tmp.be.buyables[1021].effect).pow(player.be.depth.sub(1).pow(1.02))).times(mult)
}
function BE_advhealth(){
  return[null,[null,[n(5),n(50),n(200)],[n(30),n(111),n(400)],[n(216),n(1024),n(3600)],[n(3000),n(6000),n(9000)]],[null,[n(2e4),n(2e5),n(1.25e6)],[n(8.9e4),n(8e5),n(6.4e6)],[n(5555),n(555555),n(55555555)],[n(2e9),n(2e9),n(2e9)]]]
}
function BE_power(){
  if(!hasUpgrade('be',11))return n(0)
  let power=n(1)
  power=power.add(tmp.be.buyables[1001].effect)
  power=power.add(BE_powerbonus())
  power=power.times(tmp.be.buyables[1002].effect)
  if(player.be.spellTime[0]!=0)power=power.times(player.be.spellPower[0].add(10).logBase(10))
  
  
  power=power.pow(tmp.be.buyables[1012].effect)
  return power
}
function BE_hasLevel(id){
  return player.be.advbeaten.includes(id)
}
function BE_moneymult(){
  let mult=n(1)
  mult=mult.times(tmp.be.buyables[1022].effect)
  if(player.be.spellTime[2]!=0)mult=mult.times(player.be.spellPower[2].add(10).logBase(5))
  return mult
}
function BE_powerbonus(){
  let eff=player.be.powerpoint.pow(0.5)

  return eff
}
function BE_speed(){
  return n(50)
}
function BE_CityC(){
  return[
    ['straight',400,5],
    ['Curve',300,5,90],
    ['straight',800,5],
    ['Curve',300,5,90],
    ['straight',800,5],
    ['Curve',300,5,90],
    ['straight',800,5],
    ['Curve',300,5,90],
    ['straight',400,5],
  ]
}
function BE_runMap(x){
  if(x=="CityC"){
    
  }
}
//wip