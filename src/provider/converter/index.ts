const requireComponent = require.context('./', false, /\.convert\.ts$/);



const requireAll = requireComponent.keys().map(requireComponent);
console.log('requireAll: ', requireAll);
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