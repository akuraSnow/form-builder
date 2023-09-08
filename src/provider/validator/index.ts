const requireComponent = require.context('./', false, /\.validator\.ts$/);



const requireAll = requireComponent.keys().map(requireComponent);
let components: any = {};

for (const item of requireAll) {
    try {
        const defaults: any = (item as any).default;
        components[defaults.name] = defaults;
    } catch (error) {
        console.log('error: ', error);
    }

}

export default components;
