import './extentions/common/string.extentions';

describe('CommonExtensions', () => {
    describe('String', () => {
        it('substringAfter', () => {
            const str = 'abcd efgh ij';
            const search = 'fg';

            console.log(str.substringAfter('fg'));
            console.log(str.substringAfter('z'));
            console.log(str.substringAfter(''));
            console.log(str.substringAfter(' '));
            console.log(''.substringAfter('fh'));
            console.log('---------------');
            console.log(str.substringBefore('fg'));
            console.log(str.substringBefore('z'));
            console.log(str.substringBefore(''));
            console.log(str.substringBefore(' '));
            console.log(''.substringBefore('fh'));
        });
    });
});
