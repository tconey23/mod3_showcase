import React, { useRef, useEffect } from 'react';
import Matter from 'matter-js';
import './Sandbox.css'

const Sandbox = () => {
    const canvasRef = useRef(null);
    const engine = Matter.Engine.create();
    const { world } = engine;

    useEffect(() => {
        // Get the dimensions of the window
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight - 120;

        const render = Matter.Render.create({
            canvas: canvasRef.current,
            engine: engine,
            options: {
                width: windowWidth,
                height: windowHeight,
                wireframes: false,
                background: 'radial-gradient(ellipse at top, #4c21e6, black), radial-gradient(ellipse at bottom, #9f0c43fa, #420000);'
            }
        });

        // Add renderer to the DOM
        Matter.Render.run(render);

        // Calculate circle properties based on window dimensions
        const circleRadius = Math.min(windowWidth, windowHeight) * 0.2; // Adjust this value as needed
        const circleCenterX = windowWidth / 2;
        const circleCenterY = windowHeight / 2;
        const numElements = 3000; // Increase this value for denser filling
        const elementRadius = 2.5; // Adjust this value as needed

        // Loop through each element
        for (let i = 0; i < numElements; i++) {
            // Calculate random position within the circle
            const randomAngle = Math.random() * 2 * Math.PI;
            const randomRadius = Math.random() * circleRadius;
            const x = circleCenterX + randomRadius * Math.cos(randomAngle);
            const y = circleCenterY + randomRadius * Math.sin(randomAngle);
            const circle = Matter.Bodies.circle(x, y, elementRadius, { restitution: 1 });
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
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            });

        Matter.Composite.add(world, mouseConstraint);

        render.mouse = mouse;

        // Set up boundaries as walls based on window dimensions
        const wallThickness = 10;
        const bounds = Matter.Bodies.rectangle(windowWidth / 2, windowHeight / 2, windowWidth + 2 * wallThickness, windowHeight + 2 * wallThickness, {
            isStatic: true
        });
        const wallLeft = Matter.Bodies.rectangle(0, windowHeight / 2, wallThickness, windowHeight, { isStatic: true });
        const wallRight = Matter.Bodies.rectangle(windowWidth, windowHeight / 2, wallThickness, windowHeight, { isStatic: true });
        const wallTop = Matter.Bodies.rectangle(windowWidth / 2, 0, windowWidth, wallThickness, { isStatic: true });
        const wallBottom = Matter.Bodies.rectangle(0, windowHeight, windowWidth * 2, wallThickness, { isStatic: true }); // Adjusted position
        Matter.World.add(world, [wallLeft, wallRight, wallTop, wallBottom]);

        engine.world.gravity.y = 0;

        // Set colors for grains
        const colorArray = ['#05dff7', '#093285', '#565be3', '#56e3c4'];

        const circles = world.bodies.filter((body) => body.label === "Circle Body")
        circles.forEach(body => {
            body.render.fillStyle = Matter.Common.choose(colorArray);
        });
        console.log(circles)

        // Run the engine
        Matter.Runner.run(engine);

        // Clean up
        return () => {
            Matter.Render.stop(render);
            Matter.World.clear(world);
            Matter.Engine.clear(engine);
        };
    }, []);

    return <canvas ref={canvasRef} />;
};

export default Sandbox;
