/* eslint-disable prefer-rest-params */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-use-before-define */
const anime = require('animejs')

export default function Particles(window, options) {
  const that = this
  window.addEventLidtener('load', () => {
    that.el = document.querySelector('.particle-btn')
    that.options = extend({ color: getCSSValue(that.el, 'background-color') }, that.defaults, options)
    that.init()
  })
}

Particles.prototype = {
  defaults: {
    type: 'circle',
    style: 'fill',
    canvasPadding: 150,
    duration: 1000,
    easing: 'easeInOutCubic',
    direction: 'left',
    size() { return Math.floor((Math.random() * 3) + 1) },
    speed() { return rand(4) },
    particlesAmountCoefficient: 3,
    oscillationCoefficient: 20,
  },
  init() {
    this.particles = []
    this.frame = null
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.canvas.className = 'particles-canvas'
    this.canvas.style = 'display:none;'
    this.wrapper = document.createElement('div')
    this.wrapper.className = 'particles-wrapper'
    this.el.parentNode.insertBefore(this.wrapper, this.el)
    this.wrapper.appendChild(this.el)
    this.parentWrapper = document.createElement('div')
    this.parentWrapper.className = 'particles'
    this.wrapper.parentNode.insertBefore(this.parentWrapper, this.wrapper)
    this.parentWrapper.appendChild(this.wrapper)
    this.parentWrapper.appendChild(this.canvas)
  },
  loop() {
    this.updateParticles()
    this.renderParticles()
    if (this.isAnimating())
      this.frame = requestAnimationFrame(this.loop.bind(this))
  },
  updateParticles() {
    let p
    for (let i = 0; i < this.particles.length; i++) {
      p = this.particles[i]
      if (p.life > p.death) {
        this.particles.splice(i, 1)
      }
      else {
        p.x += p.speed
        p.y = this.o.oscillationCoefficient * Math.sin(p.counter * p.increase)
        p.life++
        p.counter += this.disintegrating ? 1 : -1
      }
    }
    if (!this.particles.length) {
      this.pause()
      this.canvas.style.display = '   none'
      if (is.fnc(this.o.complete))
        this.o.complete()
    }
  },
  renderParticles() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    let p
    for (let i = 0; i < this.particles.length; i++) {
      p = this.particles[i]
      if (p.life < p.death) {
        this.ctx.translate(p.startX, p.startY)
        this.ctx.rotate(p.angle * Math.PI / 180)
        this.ctx.globalAlpha = this.disintegrating ? 1 - p.life / p.death : p.life / p.death
        this.ctx.fillStyle = this.ctx.strokeStyle = p.color
        this.ctx.beginPath()

        if (this.o.type === 'circle') {
          this.ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI)
        }
        else if (this.o.type === 'triangle') {
          this.ctx.moveTo(p.x, p.y)
          this.ctx.lineTo(p.x + p.size, p.y + p.size)
          this.ctx.lineTo(p.x + p.size, p.y - p.size)
        }
        else if (this.o.type === 'rectangle') {
          this.ctx.rect(p.x, p.y, p.size, p.size)
        }

        if (this.o.style === 'fill') {
          this.ctx.fill()
        }
        else if (this.o.style === 'stroke') {
          this.ctx.closePath()
          this.ctx.stroke()
        }

        this.ctx.globalAlpha = 1
        this.ctx.rotate(-p.angle * Math.PI / 180)
        this.ctx.translate(-p.startX, -p.startY)
      }
    }
  },
  play() {
    this.frame = requestAnimationFrame(this.loop.bind(this))
  },
  pause() {
    cancelAnimationFrame(this.frame)
    this.frame = null
  },
  addParticle(options) {
    const frames = this.o.duration * 60 / 1000
    const speed = is.fnc(this.o.speed) ? this.o.speed() : this.o.speed
    const color = is.fnc(this.o.color) ? this.o.color() : this.o.color
    this.particles.push({
      startX: options.x,
      startY: options.y,
      x: this.disintegrating ? 0 : speed * -frames,
      y: 0,
      color,
      angle: rand(360),
      counter: this.disintegrating ? 0 : frames,
      increase: Math.PI * 2 / 100,
      life: 0,
      death: this.disintegrating ? (frames - 20) + Math.random() * 40 : frames,
      speed,
      size: is.fnc(this.o.size) ? this.o.size() : this.o.size,
    })
  },
  addParticles(rect, progress) {
    const progressDiff = this.disintegrating ? progress - this.lastProgress : this.lastProgress - progress
    this.lastProgress = progress
    let x = this.options.canvasPadding
    let y = this.options.canvasPadding
    const progressValue = (this.isHorizontal() ? rect.width : rect.height) * progress + progressDiff * (this.disintegrating ? 100 : 220)
    if (this.isHorizontal())
      x += this.o.direction === 'left' ? progressValue : rect.width - progressValue
    else
      y += this.o.direction === 'top' ? progressValue : rect.height - progressValue

    let i = Math.floor(this.o.particlesAmountCoefficient * (progressDiff * 100 + 1))
    if (i > 0) {
      while (i--) {
        this.addParticle({
          x: x + (this.isHorizontal() ? 0 : rect.width * Math.random()),
          y: y + (this.isHorizontal() ? rect.height * Math.random() : 0),
        })
      }
    }
    if (!this.isAnimating()) {
      this.canvas.style.display = 'block'
      this.play()
    }
  },
  addTransforms(value) {
    const translateProperty = this.isHorizontal() ? 'translateX' : 'translateY'
    const translateValue = this.o.direction === 'left' || this.o.direction === 'top' ? value : -value
    this.wrapper.style[transformString] = `${translateProperty}(${translateValue}%)`
    this.el.style[transformString] = `${translateProperty}(${-translateValue}%)`
  },
  disintegrate(options) {
    if (!this.isAnimating()) {
      this.disintegrating = true
      this.lastProgress = 0
      this.setup(options)
      const _ = this
      this.animate((anim) => {
        const value = anim.animatables[0].target.value
        _.addTransforms(value)
        if (_.o.duration)
          _.addParticles(_.rect, value / 100, true)
      })
    }
  },
  integrate(options) {
    if (!this.isAnimating()) {
      this.disintegrating = false
      this.lastProgress = 1
      this.setup(options)
      const _ = this
      this.animate((anim) => {
        const value = anim.animatables[0].target.value
        setTimeout(() => {
          _.addTransforms(value)
        }, _.o.duration)
        if (_.o.duration)
          _.addParticles(_.rect, value / 100, true)
      })
    }
  },
  setup(options) {
    this.o = extend({}, this.options, options)
    this.wrapper.style.visibility = 'visible'
    if (this.o.duration) {
      this.rect = this.el.getBoundingClientRect()
      this.width = this.canvas.width = this.o.width || this.rect.width + this.o.canvasPadding * 2
      this.height = this.canvas.height = this.o.height || this.rect.height + this.o.canvasPadding * 2
    }
  },
  animate(update) {
    const _ = this
    anime({
      targets: { value: _.disintegrating ? 0 : 101 },
      value: _.disintegrating ? 101 : 0,
      duration: _.o.duration,
      easing: _.o.easing,
      begin: _.o.begin,
      update,
      complete() {
        if (_.disintegrating)
          _.wrapper.style.visibility = 'hidden'
      },
    })
  },
  isAnimating() {
    return !!this.frame
  },
  isHorizontal() {
    return this.o.direction === 'left' || this.o.direction === 'right'
  },
}

// Utils

var is = {
  arr(a) { return Array.isArray(a) },
  str(a) { return typeof a === 'string' },
  fnc(a) { return typeof a === 'function' },
}

function stringToHyphens(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

function getCSSValue(el, prop) {
  if (prop in el.style)
    return getComputedStyle(el).getPropertyValue(stringToHyphens(prop)) || '0'
}

const t = 'transform'
var transformString = (getCSSValue(document.body, t) ? t : `-webkit-${t}`)

function extendSingle(target, source) {
  for (const key in source)
    target[key] = is.arr(source[key]) ? source[key].slice(0) : source[key]
  return target
}

function extend(target) {
  if (!target)
    target = {}
  for (let i = 1; i < arguments.length; i++)
    extendSingle(target, arguments[i])
  return target
}

function rand(value) {
  return Math.random() * value - value / 2
}

 