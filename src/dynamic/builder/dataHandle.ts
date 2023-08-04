

export class DataHandle {

    constructor() {

    }

    // @ts-ignore
    buildForm(constructor: any) {

    }

    async catchData(config: any) {

        const data = await fetch(config).then(res => res.json());
        return data;
    }
}
