
class Objective {
    constructor(x, y, parent) {
        this.x = x
        this.y = y
        this.parent = parent
        this.sprite
        this.speed = 2
        this.direction = -1
        this.cells
        this.randomCell
        this.randomCellLeft
        this.randomCellTop
        this.randomCellWidth
        this.randomCellHeight
    }

    createObjective() {
        this.cells = document.getElementsByTagName("td")
        this.randomCell = Math.floor((Math.random() * 16))

        let objective = document.createElement("div")
        objective.setAttribute('class', 'objective')
        objective.style.top = this.y + "%"
        objective.style.left = this.x + "%"

        objective.addEventListener("click", () => {
            this.objectiveHitted()
        })
        this.sprite = objective
        this.cells[this.randomCell].appendChild(this.sprite)
        this.moveObjective()
    }

    moveObjective() {
        this.movementId = setInterval(() => {
            this.x = parseInt(getComputedStyle(this.sprite).left.replace("px", ""))
            this.x += this.speed * this.direction
            this.sprite.style.left = parseInt(this.x) + "px"
            if (this.checkCollision()) {
                console.log("AAAAA")
                this.sprite.classList.toggle("mirror")
                this.direction = this.direction === -1 ? 1 : -1
            }

        }, 50)

    }

    checkCollision() {
        this.randomCellWidth = parseInt(getComputedStyle(this.cells[this.randomCell]).width.replace("px", ""))
        this.randomCellLeft = parseInt(getComputedStyle(this.cells[this.randomCell]).left.replace("px", ""))
        this.spriteWidth = parseInt(getComputedStyle(this.sprite).width.replace("px", ""))

        if (this.x - this.spriteWidth / 2 <= this.randomCellLeft || this.x + this.spriteWidth >= this.randomCellWidth) {
            return true;
        }else{
            return false
        }
    }

    removeObjective() {
        if (this.cells[this.randomCell].contains(this.sprite)) {
            clearInterval(this.movementId)
            this.sprite.classList.add("hidden")
            setTimeout(() => this.cells[this.randomCell].removeChild(this.sprite), 1000)
        }
    }

    objectiveHitted() {
        this.cells[this.randomCell].removeChild(this.sprite)
        let totalScoreNode = document.getElementById("totalScore")
        let currentScore = parseInt(totalScoreNode.innerText);
        currentScore += 500
        totalScoreNode.innerText = currentScore
    }
}