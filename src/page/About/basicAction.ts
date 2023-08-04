


export default class BasicAction{

    constructor() {
        // this.fetchData().then(() => this.makfaf);
    }

    async fetchData(jsonName: string) {

        return  await fetch(jsonName).then(res => res.json());
    
    }

}