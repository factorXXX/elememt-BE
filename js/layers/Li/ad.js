function LiStage2_1Style(id){
    if(player.li.ablesData[id.substr(0,1)][id.substr(1)][0].eq(1)){
        return {"border-radius":"0px","transition-duration":"0.5s","background-color":"#88FF88"}
    }else if(player.li.token.gte(1) && player.li.tokenMod.eq(0)){
        return {"border-radius":"0px","transition-duration":"0.5s","background-color":"rgb(255, 244, 91)"}
    }else{
        return {"border-radius":"0px","transition-duration":"0.5s","background-color":"#AAA"}
    }
}

function LiStage2_1Title(id){
    return `困难备选项`+id+``
}

function LiStage2_1DisplayCost(id){
    return `<br><br>消耗: 1代币`
}

function LiStage2_1DisplayEff(id,id2){
    let first = '<br><br>'
    if(id2=='root'){ return first+`当前效果: <sup>`+format(layers.li.clickables[id].eff())+'</sup>√'}
    if(id2=='div'){ return first+`当前效果: ÷`+format(layers.li.clickables[id].eff())}
    if(id2=='pow'){ return first+`当前效果: ^`+format(layers.li.clickables[id].eff())}
    return first+`当前效果: x`+format(layers.li.clickables[id].eff())
}

function LiStage2_1OnClick(id){
    player.li.token = player.li.token.sub(1)
    player.li.ablesData[id.substr(0,1)][id.substr(1)][0] = n(1)
}

function LiStage2_1CanClick(id){
    return player.li.token.gte(1) && !player.li.ablesData[id.substr(0,1)][id.substr(1)][0].eq(1) && player.li.tokenMod.eq(0)
}

function LiTotalToken(){
    let tok = n(0)
    if(hasMilestone('li',1)){tok = tok.add(1)}
    if(hasMilestone('li',2)){tok = tok.add(1)}
    if(hasMilestone('li',3)){tok = tok.add(1)}
    return tok
}