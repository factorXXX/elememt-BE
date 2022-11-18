let modInfo = {
	name: "元素论",
	id: "Element_Theory_Li",
	author: "模组树元素论team",
	pointsName: "质子",
	discordName: "",
	discordLink: "",
	initialStartPoints: new ExpantaNum (0), // Used for hard resets and new players
	
	offlineLimit: 10,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0 - 基于元素论v0.16(click)",
	name: "",
}

let changelog = `<h1>详情:</h1><br>
	<h2>元素论v0.16</h2><br>
		<li>基于Ω版本(By QwQe308)的The Modding Tree(By [i页面])
		<li>修改:
		<li>format文字修改
		<li>点数显示机制修改
		<li>为clickables加入了toolitip和branches
		<li>为buyable加入了toolitip
		<li>为gird加入了toolitip
		<li>为layers加入了点数持续显示且修改了CSS,根据真实页面宽度改变按钮大小
		<li>修改默认设置,更改设置UI,CSS,增加/删除了一些设置
		<li>增加themes
		<br><br><br><br>
		<hr>
		<h3>锂:</h3><br>
		<li>荣耀里程(3)
	`

let winText = `只是开始`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new ExpantaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) return new ExpantaNum(0)
	let gain = new ExpantaNum(1)
	gain = gain.mul('1ee10')
	gain = gain.mul(tmp.li.effect[0])
	gain = gain.pow(tmp.li.effect[1])
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return false
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}