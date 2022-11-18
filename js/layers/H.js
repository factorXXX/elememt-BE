//氢 by 匿_名

addLayer("h", {
    name: "",
    symbol: "H",
    position: 0,
    startData() { return {
        unlocked: true,
		points: n(0),
    }},
    color: "#FFFFFF",
    resource: "",
    type: "none",
	effect(){
    },
    row: 2, 
	update(diff) {
	},
    layerShown(){return hasAchievement('a',11)},
})