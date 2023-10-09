namespace SpriteKind {
    export const PowerUp = SpriteKind.create()
}

let food: Sprite = null
let bogey: Sprite = null
let powerUp: Sprite = null
let dart2: Sprite = null
let dart: Sprite = null
let delay: number = null
let spacePlane: Sprite = null
spacePlane = sprites.create(assets.image`Ship`, SpriteKind.Player)
spacePlane.setStayInScreen(true)
//scene.cameraFollowSprite(spacePlane)
info.startCountup(true)
info.setLife(3)
scene.setBackgroundImage(assets.image`Background`)
delay = 300
controller.moveSprite(spacePlane, 200, 200)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    dart = sprites.createProjectileFromSprite(assets.image`bullet`, spacePlane, 200, 0)
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    dart2 = sprites.createProjectileFromSprite(assets.image`bullet`, spacePlane, 200, 0)
    pause(delay)
})
game.onUpdateInterval(500, function () {
    if (info.score() >= 100) {
        game.over(true)
        info.startCountup(false)
    }
    bogey = sprites.create(assets.image`asteroid`, SpriteKind.Enemy)
    bogey.setVelocity(-100, 0)
    bogey.left = scene.screenWidth()
    bogey.y = randint(0, scene.screenHeight())
    bogey.setFlag(SpriteFlag.AutoDestroy, true)
    sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function(sprite, otherSprite){
         otherSprite.destroy(effects.disintegrate, 50)
         info.changeLifeBy(-1)
         let i = 0;
         let sVis = true;
         sprite.setFlag(SpriteFlag.Ghost, true)
         while(i < 5){
             sVis = !(sVis)
             sprite.setFlag(SpriteFlag.Invisible, sVis)
             i++;
             pause(200);
        }
         sprite.setFlag(SpriteFlag.Ghost, false)

         
         
     })
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function(sprite, otherSprite){
         otherSprite.destroy()
         sprite.destroy(effects.fire, 100)
         info.changeScoreBy(1)
     })
})
game.onUpdateInterval(10000, function () {
    food = sprites.create(assets.image`heart`, SpriteKind.Food)
    food.setVelocity(-50, 0)
    food.left = scene.screenWidth()
    food.y = randint(0, scene.screenHeight())
    food.setFlag(SpriteFlag.AutoDestroy, true)
    sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function(sprite, otherSprite){
         otherSprite.destroy(effects.hearts, 100)
         if(info.life() < 5){
         info.changeLifeBy(1)
         }
     })
})
game.onUpdateInterval(30000, function () {
    powerUp = sprites.create(assets.image`Star`, SpriteKind.PowerUp)
    powerUp.setVelocity(-50, 0)
    powerUp.left = scene.screenWidth()
    powerUp.y = randint(0, scene.screenHeight())
    powerUp.setFlag(SpriteFlag.AutoDestroy, true)
    sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUp, function (sprite, otherSprite) {
        otherSprite.destroy()
        sprite.startEffect(effects.starField, 5000)
        spacePlane.setFlag(SpriteFlag.Ghost, true)
        delay = 0;
        spacePlane.setImage(assets.image`Ship0`)
        pause(5000)
        spacePlane.setFlag(SpriteFlag.Ghost, false)
        delay = 300;
        spacePlane.setImage(assets.image`Ship`)

    })
})