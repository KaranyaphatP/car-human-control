radio.onReceivedValue(function (name, value) {
    if (name == "mgX") {
        right = value
    } else if (name == "mgY") {
        backwards = value
    } else if (name == "engine") {
        running = value
    }
    Right_Wheel = -1 * (backwards + right)
    Left_Wheel = -1 * (backwards - right)
})
let Left_Wheel = 0
let Right_Wheel = 0
let running = 0
let right = 0
let backwards = 0
radio.setGroup(147)
basic.showIcon(IconNames.Target)
backwards = 0
right = 0
running = 0
loops.everyInterval(500, function () {
    if (running == 1) {
        basic.showIcon(IconNames.Yes)
        led.stopAnimation()
    }
})
loops.everyInterval(500, function () {
    if (running == 0) {
        basic.showIcon(IconNames.No)
        led.stopAnimation()
    }
})
basic.forever(function () {
    let Direction2 = 0
    serial.writeValue("Front", pins.analogReadPin(AnalogPin.P2))
    serial.writeValue("Direction", Direction2)
    serial.writeValue("Running", running)
    serial.writeValue("Rotation (x)", input.acceleration(Dimension.X))
    serial.writeValue("Rotation (Y)", input.acceleration(Dimension.Y))
})
basic.forever(function () {
    if (running == 1) {
        if (input.buttonIsPressed(Button.A)) {
            running = 0
        }
    }
})
basic.forever(function () {
    if (running == 0) {
        if (input.buttonIsPressed(Button.A)) {
            running = 1
        }
    }
})
basic.forever(function () {
    if (running == 0) {
        pins.analogWritePin(AnalogPin.P12, 0)
        pins.analogWritePin(AnalogPin.P13, 0)
        pins.analogWritePin(AnalogPin.P14, 0)
        pins.analogWritePin(AnalogPin.P15, 0)
    }
    if (running == 1) {
        if (Left_Wheel > 0) {
            pins.analogWritePin(AnalogPin.P14, 0)
            pins.analogWritePin(AnalogPin.P15, Math.abs(Left_Wheel))
        } else {
            pins.analogWritePin(AnalogPin.P14, Math.abs(Left_Wheel))
            pins.analogWritePin(AnalogPin.P15, 0)
        }
    }
})
basic.forever(function () {
    if (running == 0) {
        pins.analogWritePin(AnalogPin.P12, 0)
        pins.analogWritePin(AnalogPin.P13, 0)
        pins.analogWritePin(AnalogPin.P14, 0)
        pins.analogWritePin(AnalogPin.P15, 0)
    }
    if (running == 1) {
        if (0 < Right_Wheel) {
            pins.analogWritePin(AnalogPin.P12, 0)
            pins.analogWritePin(AnalogPin.P13, Math.abs(Right_Wheel))
        } else {
            pins.analogWritePin(AnalogPin.P12, Math.abs(Right_Wheel))
            pins.analogWritePin(AnalogPin.P13, 0)
        }
    }
})
