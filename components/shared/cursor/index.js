"use client";
import { useState, useRef, useEffect, useInsertionEffect, useCallback } from "react";
import { useEventEmitter, } from "@/hooks";
import * as THREE from 'three';
import { get } from "http";


export default function CustomCursor({ options }) {
    const { add, remove, emit } = useEventEmitter();
    const $ = useRef(null);
    const $c = useRef(null);
    const $i = useRef(null);

    const _x = useRef(0);
    const _y = useRef(0);
    const x = useRef(0);
    const y = useRef(0);
    const lx = useRef(0);
    const ly = useRef(0);
    const dx = useRef(0);
    const dy = useRef(0);
    const vx = useRef(0);
    const vy = useRef(0);
    const ease = useRef(0.3);
    const rotation = useRef(0);
    const radius = useRef(options.radius || options.size || 80);
    const width = useRef(radius.current / 2);
    const height = useRef(radius.current / 2);
    const borderWidth = useRef(3);
    const color = useRef('#49D292');
    const opacity = useRef(0.85);

    const lockemits = useRef('[data-lock], li, a, button');
    const lockColor = useRef('#E8F79A');
    const lockOpacity = useRef(0.99);
    const lockClass = useRef(null);
    const lockTravel = useRef(0.15);
    const lockExpand = useRef(20);
    const lockEase = useRef(0.3);
    const lockWidth = useRef(0);
    const lockHeight = useRef(0);
    const lockx = useRef(0);
    const locky = useRef(0);
    const lockTarget = useRef(null);


    const isHidden = useRef(true);
    const isLocked = useRef(false);
    const isDown = useRef(false);
    const isHover = useRef(false);
    const isMove = useRef(false);
    const cssVarSupport = false;
    let onUpdate = useRef(null);
    const timestamp = useRef(0);

    const states = useRef({
        initial: 'mm-initial',
        active: 'mm-active',
        hidden: 'mm-hidden',
        locked: 'mm-locked',
        down: 'mm-down',
        moving: 'mm-moving',
        exited: 'mm-exited',
    });
    const types = useRef({
        DOM: {
            circle: 'mm-circle',
            hollow: 'mm-hollow',
        },
        canvas: {
            sphere: 'mm-sphere',
            blob: 'mm-blob',
            pointLight: 'mm-point-light',
        },
    });
    const effects = useRef({
        trail: 'mm-trail',
        particleTrail: 'mm-particle-trail',
        particleExplosion: 'mm-particle-explosion',
        particleSphere: 'mm-particle-sphere',
    });

    const createInnerElement = useRef(options.createInnerElement || null);

    const useCSSVars = useRef(true);
    const state = useRef('active');



    const elasticEaseFN = (current, target, ease) => {
        dx.current = (target - current) * ease;
        return current + (target - current) * ease;
    };

    const easeFN = useCallback((current, target, ease) => current + (target - current) * ease, []);

    const throttle = (fn, limit) => {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                fn.apply(context, args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        };
    };

    useInsertionEffect(() => {
        // apply styles here
    }, []);

    useEffect(() => {
        const x = $.current
        const xx = $c.current
        const xxx = $i.current
        const init = () => {
            x.current = lx.current = options.x || window.innerWidth / 2;
            y.current = ly.current = options.y || window.innerHeight / 2;

            setColor(color.current, opacity.current);

           xx.style.width = `${radius.current}px`;
           xx.style.height = `${radius.current}px`;
           xx.style.borderRadius = `${radius.current}px`;
           xx.style.borderWidth = `${borderWidth.current}px`;

            if (createInnerElement.current) {
                xxx.innerHTML = createInnerElement.current();
            }

                activateCSSVars();

            timestamp.current = Date.now();

            /* Bind all methods to instance */
            for (const key in this) {
                if (this[key] && this[key].bind) {
                    this[key] = this[key].bind(this);
                }
            }
            onUpdate.current = updateStyle;
            // handleEmitListeners();
            handleEventListeners();
            update();
            emit('show');
        };

        init();

        return () => {
            handleEventListeners(true);
           x.parentNode.removeChild(x);
        };
    }, [setColor, activateCSSVars, emit, options.x, options.y,createInnerElement, handleEventListeners, update, updateStyle]);

    const handleEventListeners = useCallback((remove) => {
        const action = remove ? 'removeEventListener' : 'addEventListener';

        window[action]('mousemove', onMove);
        window[action]('touchstart', onMove);
        window[action]('touchmove', onMove);
        window[action]('touchend', onMove);
        window[action]('mousedown', onDown);
        window[action]('touchstart', onDown);
        window[action]('mouseup', onUp);
        window[action]('touchend', onUp);
    }, [onDown, onMove, onUp]);

    const getPixelColor = (x, y) => {
        const pxData = ctx.current.getImageData(x, y, 1, 1);
        return {
            r: pxData.data[0],
            g: pxData.data[1],
            b: pxData.data[2],
            a: pxData.data[3],
        };
    };

    const getElementType = (elem) => {
        if (elem instanceof HTMLElement) {
            return 'DOM';
        } else if (elem instanceof HTMLCanvasElement) {
            return 'canvas';
        } else {
            return null;
        }
    };

    const hexToRgb = (hex) => {
        const bigint = parseInt(hex.replace('#', ''), 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255,
        };
    };

    const isContrastColor = useCallback((color) => {
        const rgb = hexToRgb(color);
        const yiq = ((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000;
        return (yiq >= 128) ? 'black' : 'white';
    }, []);

    const isDOMElement = (elem) => elem instanceof HTMLElement;

    const isCanvasElement = (elem) => elem instanceof HTMLCanvasElement;

    const isThreeObject = (elem) => elem instanceof THREE.Object3D;

    const getBackgroundColor = useCallback((e) => {
        const target = e.target;
        const elementType = getElementType(target);

        if (elementType === 'DOM') {
            const computedStyle = window.getComputedStyle(target);
            const backgroundColor = computedStyle.getPropertyValue('background-color');
            return backgroundColor;
        } else if (elementType === 'canvas') {
            const pixelColor = getPixelColor(target, e);
            return pixelColor;
        } else if (elementType === 'three') {
            const pixelColor = getPixelColor(target, e);
            return pixelColor;
        } else {
            return null;
        }
    }, []);

    const handleMagicMouseColor = useCallback((e) => {
        const bg = getBackgroundColor(e);
        const color = isContrastColor(bg);
        setColor(color, opacity.current);
    }, [  getBackgroundColor, isContrastColor, setColor]);

    // const handleEmitListeners = (on = true) => {
    //     const onOrOff = on ? 'add' : 'remove';

    //     [onOrOff]('down', () => {
    //         isDown.current = true;
    //         $.current.classList.add(states.current.down);
    //     });

    //     [onOrOff]('up', () => {
    //         isDown.current = false;
    //         $.current.classList.remove(states.current.down);
    //     });

    //     [onOrOff]('move', () => {
    //         isMove.current = true;
    //         $.current.classList.add(states.current.moving);
    //     });

    //     [onOrOff]('hover', () => {
    //         isHover.current = true;
    //         $.current.classList.add(states.current.hover);
    //     });

    //     [onOrOff]('lock', () => {
    //         isLocked.current = true;
    //         $.current.classList.add(states.current.locked);
    //     });

    //     [onOrOff]('unlock', () => {
    //         isLocked.current = false;
    //         $.current.classList.remove(states.current.locked);
    //     });

    //     [onOrOff]('hide', () => {
    //         isHidden.current = true;
    //         isVisible.current = false;
    //         $.current.classList.add(states.current.hidden);
    //         $.current.classList.remove(states.current.active);
    //     });

    //     [onOrOff]('show', () => {
    //         isHidden.current = false;
    //         isVisible.current = true;
    //         $.current.classList.remove(states.current.hidden);
    //         $.current.classList.add(states.current.enter);
    //         $.current.classList.add(states.current.active);
    //     });

    //     [onOrOff]('activate', () => {
    //         active.current = true;
    //         $.current.classList.add(activeClass);
    //     });

    //     [onOrOff]('deactivate', () => {
    //         active.current = false;
    //         $.current.classList.remove(activeClass);
    //     });

    //     [onOrOff]('enter', () => {
    //         $.current.classList.add(states.current.initial);
    //     });

    //     [onOrOff]('leaving', () => {
    //         leaving.current = true;
    //         $.current.classList.add(leavingClass);
    //     });

    //     [onOrOff]('exited', () => {
    //         exited.current = true;
    //         $.current.classList.add(exitedClass);
    //     });
    // };

    const destroy = () => {
        handleEventListeners(true);
        $.current.parentNode.removeChild($.current);
    };

    const setColor = useCallback((color, opacity) => {
        $c.current.style.backgroundColor = color;
        $.current.style.opacity = opacity;
    }, []);

    const changeState = (newState) => {
        state.current = newState;
    };

    const onUp = useCallback(() => { }, []);
    const onDown = useCallback(() => { emit('down'); }, [emit]);

    const onMove = useCallback((e) => throttle(() => {
        e = e.touches ? e.touches[0] : e;
        x.current = e.clientX;
        y.current = e.clientY;
        console.log("d",x.current,y.current)
        onHover(e);
        handleMagicMouseColor(e);
    }, 100), [onHover, handleMagicMouseColor]);

    const onHover = throttle((e) => {
        if (lockemits.current) {
            let t = e.target;
            if (t !== lockTarget.current) {
                while (t !== document.documentElement && t.parentNode) {
                    if (t.matches(lockemits.current)) {
                        lock(t);
                        return;
                    }
                    t = t.parentNode;
                }
                if (lockTarget.current) {
                    unlock();
                }
                lockTarget.current = null;
            }
        }
    }, 100);

    const update = useCallback(() => {
        requestAnimationFrame(update);
        
        let tx = x.current;
        let ty = y.current;
        let w, h, now, dt

        if (isLocked.current && lockx.current && locky.current) {
            tx = (lockx.current) - (lockx.current - tx) * lockTravel.current;
            ty = (locky.current) - (locky.current - ty) * lockTravel.current;
        }

        x.current = easeFN(x.current, tx, ease.current);
        y.current = easeFN(y.current, ty, ease.current);

        if (isLocked.current) {
            rotation.current = 0;
            dx.current = 0;
            dy.current = 0;
        } else {
            dx.current = (x.current - lx.current);
            dy.current = (y.current - ly.current);
        }

        dx.current = Math.floor(easeFN(dx.current, dx.current, ease.current) * 100) / 100;
        dy.current = Math.floor(easeFN(dy.current, dy.current, ease.current) * 100) / 100;

        // Calculate Velocity
        now = Date.now();
        dt = now - timestamp.current;
        timestamp.current = now;
        vx.current = Math.min(Math.abs(dx.current) / dt, 2);
        vy.current = Math.min(Math.abs(dy.current) / dt, 2);

        rotation.current = isLocked.current ? 0 : Math.atan2(dy.current, dx.current);

        w = lockWidth.current ? lockWidth.current : radius.current;
        h = lockHeight.current ? lockHeight.current : radius.current;
        if (isDown.current) { w -= 10; h -= 10; }

        width.current = Math.round(easeFN(width.current, w, lockEase.current) * 10) / 10;
        height.current = Math.round(easeFN(height.current, h, lockEase.current) * 10) / 10;

        lx.current = x.current;
        ly.current = y.current;

       

        onUpdate.current();
    }, [easeFN, onUpdate]);

    const activateCSSVars = useCallback(() => {
        $.current.style.transform =
            'translate( calc( var(--dx) * -1px ), calc( var(--dy) * -1px ) )' +
            ' translate3d( calc( var(--x) * 1px ), calc( var(--y) * 1px ), 0px )';

        $c.current.style.transform =
            'translate3d( -50%, -50%, 0px )' +
            ' translate( calc( var(--vx) * -4% ), calc( var(--vy) * -4% ) )' +
            ' rotate( calc( var(--rotation) * 1rad) )' +
            ' scaleX( calc( var(--vx)/2 + var(--vy)/2 + 1 ) )';

        $c.current.style.width = 'calc( var(--width) * 1px )';
        $c.current.style.height = 'calc( var(--height) * 1px )';

        onUpdate.current = updateCSSVars;
    }, [updateCSSVars]);

    const updateCSSVars =useCallback(() => {
        $.current.style.setProperty('--width', width.current);
        $.current.style.setProperty('--height', height.current);
        $.current.style.setProperty('--x', x.current);
        $.current.style.setProperty('--y', y.current);
        $.current.style.setProperty('--vx', vx.current);
        $.current.style.setProperty('--vy', vy.current);
        $.current.style.setProperty('--dx', dx.current);
        $.current.style.setProperty('--dy', dy.current);
        $.current.style.setProperty('--rotation', rotation.current);
    }, []);

    const updateStyle = useCallback(() => {
        $.current.style.transform = `translate3d(${x.current + (dx.current * -1)}px, ${y.current + (dy.current * -1)}px, 0px)`;

        $c.current.style.transform =
            `translate3d(${-50 - (vx.current * 4)}%, ${-50 - (vy.current * 4)}%, 0px)` +
            ` rotate(${rotation.current}rad)` +
            ` scaleX(${(vx.current / 2) + (vy.current / 2) + 1})`;

        $i.current.style.transform = `translate(-50%, -50%) rotate(${-rotation.current}rad)`;

        $c.current.style.width = `${width.current}px`;
        $c.current.style.height = `${height.current}px`;
    }, []);

    const lock = (x, y, w, h) => {
        if (x !== undefined) {
            emit('lock');
            setColor(lockColor.current, lockOpacity.current);

            if (y === undefined && x.getBoundingClientRect()) {
                lockTarget.current = x;

                const rect = x.getBoundingClientRect();
                w = Math.round(rect.right - rect.left);
                h = Math.round(rect.bottom - rect.top);

                x = rect.left + (w / 2);
                y = rect.top + (h / 2);

                isDown.current = false;
            }

            lockx.current = x;
            locky.current = y;

            if (lockExpand.current !== false) {
                lockWidth.current = w + lockExpand.current;
                lockHeight.current = h + lockExpand.current;
            }

            return;
        }
        unlock();
    };

    const unlock = () => {
        if (isLocked.current) {
            if (lockClass.current) {
                $.current.classList.remove(lockClass.current);
            }
            lx.current = x.current;
            ly.current = y.current;
            setColor(color.current, opacity.current);
        }
        lockWidth.current = 0;
        lockHeight.current = 0;
        lockx.current = 0;
        locky.current = 0;
        rotation.current = 0;
        isLocked.current = false;
    };

    const hide = () => {
        emit('hide');
    };

    const show = () => {
        emit('show');
    };

    const enter = () => {
        emit('enter');
    };

    const leave = () => {
        emit('leave');
    };

    const activate = () => {
        emit('activate');
    };

    const setCursorState = (state) => {
        switch (state) {
            case 'active':
                $.current.classList.add(states.current.active);
                $.current.classList.remove(states.current.hidden);
                break;
            case 'hidden':
                $.current.classList.add(states.current.hidden);
                $.current.classList.remove(states.current.active);
                break;
            default:
                $.current.classList.add(states.current.active);
                $.current.classList.remove(states.current.hidden);
                break;
        }
    };

    return (

        <div ref={$}>
            <div ref={$c}>
                <div ref={$i} />
            </div>
        </div>

    )
};





























