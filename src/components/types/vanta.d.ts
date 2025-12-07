// types/vanta.d.ts

// 1. Declare the main Vanta module
declare module 'vanta/dist/vanta.birds.min' {
    import * as THREE from 'three';

    // Define the interface for the Vanta effect object
    interface VantaEffect {
        el: HTMLElement | null;
        THREE: typeof THREE;
        destroy: () => void;
        // Add other properties if you need them, but this is the minimum required
        // to satisfy TypeScript for the setup and cleanup.
        [key: string]: any; 
    }

    // Define the type for the function that creates the Vanta effect
    type VantaConstructor = (options: {
        el: HTMLElement | null;
        THREE: typeof THREE;
        [key: string]: any;
    }) => VantaEffect;

    // Export the constructor function as the default export
    const VantaBirds: VantaConstructor;
    export default VantaBirds;
}

// 2. Add declarations for any other Vanta effects you use (optional)
declare module 'vanta/dist/vanta.net.min' {
    const VantaNet: any;
    export default VantaNet;
}

// 3. Add declarations for the general Vanta object if needed
declare module 'vanta' {
    const Vanta: any;
    export default Vanta;
}