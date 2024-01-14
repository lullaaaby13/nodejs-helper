import './index';
describe('StringExtentions', () => {
    it('onlyNumbers', () => {
        const str = '1a2a3a4a5a';
        const result = str.replace(/[^0-9]/g, '');
        expect(result).toEqual('12345');
    });

    it('onlyNumber performance', () => {
        const targets: string[] = [];
        const str = '1a2a3a4a5a';
        for (let count = 0; count < 1000000; count++) {
            targets.push('1a2a3a4a5a');
        }

        const a = Date.now();
        targets.map((it) => onlyNumber1(it));
        const b = Date.now();
        console.log(`onlyNumber1 spend: ${b - a}ms`);

        const c = Date.now();
        targets.map((it) => onlyNumber2(it));
        const d = Date.now();
        console.log(`onlyNumber1 spend: ${d - c}ms`);
    });

    it('toNumber', () => {
        const string = '2,182.38';
        expect(string.toNumber()).toEqual(2182.38);
    });
});

function onlyNumber1(str: string) {
    const result: string[] = [];
    for (let index = 0; index < str.length; index++) {
        const character = str[index];
        if (
            character === '0' ||
            character === '1' ||
            character === '2' ||
            character === '3' ||
            character === '4' ||
            character === '5' ||
            character === '6' ||
            character === '7' ||
            character === '8' ||
            character === '9'
        ) {
            result.push(character);
        }
    }
    return result.join();
}
function onlyNumber2(str: string) {
    return str.replace(/[^0-9]/g, '');
}
