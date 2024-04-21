import React, { useRef, useEffect, useCallback } from 'react';
import Matter from 'matter-js';
import './Sandbox.css';

const Sandbox = () => {
    const canvasRef = useRef(null);
    const engine = Matter.Engine.create({ enableSleeping: false });
    const { world } = engine;
    const setupCanvas = useCallback(() => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight - 120;

        Matter.World.clear(world, false);
        Matter.Engine.clear(engine);

        const render = Matter.Render.create({
            canvas: canvasRef.current,
            engine: engine,
            options: {
                width: windowWidth,
                height: windowHeight,
                wireframes: false,
                background: 'f0f8ff00'
            }
        });

        Matter.Render.run(render);


        const circleRadius = Math.min(windowWidth, windowHeight) * 0.2
        const circleCenterX = windowWidth / 2;
        const circleCenterY = windowHeight / 2;
        const numElements = 1000; 
        const elementRadius = 4; 

        for (let i = 0; i < numElements; i++) {
            const randomAngle = Math.random() * 2 * Math.PI;
            const randomRadius = Math.random() * circleRadius;
            const x = circleCenterX + randomRadius * Math.cos(randomAngle);
            const y = circleCenterY + randomRadius * Math.sin(randomAngle);
            const circle = Matter.Bodies.circle(x, y, elementRadius, { restitution: 1, density: 2  });
            circle.label = 'circle'
            Matter.World.add(world, circle);
        }

        const randomAngle = Math.random() * 2 * Math.PI;
        const randomRadius = Math.random() * circleRadius;
        const x = circleCenterX + randomRadius * Math.cos(randomAngle);
        const y = circleCenterY + randomRadius * Math.sin(randomAngle);
        const cue = Matter.Bodies.circle(x - 500, y, 20, { restitution: 0.5, density: 2 });
        cue.label = 'cue'
        Matter.World.add(world, cue);

        const mouse = Matter.Mouse.create(render.canvas),
            mouseConstraint = Matter.MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 1,
                    render: {
                        visible: false
                    }
                }
            });

        Matter.Composite.add(world, mouseConstraint);

        render.mouse = mouse;
        const wallThickness = 10;
        const bounds = Matter.Bodies.rectangle(windowWidth / 2, windowHeight / 2, windowWidth + 2 * wallThickness, windowHeight + 2 * wallThickness, {
            isStatic: true
        });
        const wallLeft = Matter.Bodies.rectangle(0, windowHeight / 2, wallThickness, windowHeight, { isStatic: true, fillStyle: 'f0f8ff00' });
        const wallRight = Matter.Bodies.rectangle(windowWidth, windowHeight / 2, wallThickness, windowHeight, { isStatic: true, fillStyle: 'f0f8ff00'  });
        const wallTop = Matter.Bodies.rectangle(windowWidth / 2, 0, windowWidth, wallThickness, { isStatic: true, fillStyle: 'f0f8ff00' });
        const wallBottom = Matter.Bodies.rectangle(0, windowHeight, windowWidth * 2, wallThickness, { isStatic: true, fillStyle: 'f0f8ff00'  });
        Matter.World.add(world, [wallLeft, wallRight, wallTop, wallBottom]);

        engine.world.gravity.y = 0;
        const colorArray = ['#05dff7', '#093285', '#565be3', '#56e3c4'];

        const circles = world.bodies.filter((body) =>  body.label === "circle")
        circles.forEach(body =>  {
            body.render.fillStyle = Matter.Common.choose(colorArray);
            body.render.lineWidth = '2'
        });

        Matter.Events.on(engine, 'collisionStart', function(event) {
            event.pairs.forEach(pair =>  {
                //console.log(pair.bodyB.label.includes('Circle'))
                if (pair.bodyB.label === 'circle') {
                    pair.bodyA.render.fillStyle = '#FF0000'
                    pair.bodyB.render.fillStyle = '#FF0000'
                    setTimeout(() =>  {
                        pair.bodyA.render.fillStyle = Matter.Common.choose(colorArray)
                        pair.bodyB.render.fillStyle = Matter.Common.choose(colorArray)
                    }, 10);
                }
            });
        });

        Matter.Events.on(engine, 'collisionEnd', function(event) {
            event.pairs.forEach(pair =>  {
                    pair.bodyA.render.fillStyle = Matter.Common.choose(colorArray)
                    pair.bodyB.render.fillStyle = Matter.Common.choose(colorArray)
            });
        });

        Matter.Runner.run(engine);

        return () => {
            Matter.Render.stop(render);
            Matter.World.clear(world);
            Matter.Engine.clear(engine);
        };
    }, []);

    useEffect(() => {
        return setupCanvas();
    }, [setupCanvas]);

    const resetCanvas = () => {
        setupCanvas();
    };

    return (
        <div>
            <button id='resetButton' onClick={resetCanvas}>Reset</button>
            <canvas ref={canvasRef} />
        </div>
    );
};

export default Sandbox