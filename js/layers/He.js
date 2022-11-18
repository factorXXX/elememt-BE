//氦 by 寒寒

addLayer("he", {
    name: "",
    symbol: "He",
    position: 3,
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
    layerShown(){return hasAchievement('a',12)},
})