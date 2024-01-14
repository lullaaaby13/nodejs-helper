import {
    substringAfter,
    substringAfterLast,
    substringBefore,
    substringBeforeLast, substringBetween
} from "@/utils/extentions/common/string-utils";

describe('StringUtils', () => {

    describe('substringBefore', () => {
        it('should return empty string when separator is empty', () => {
            expect(substringBefore('test', '')).toEqual('');
        });

        it('should return value when separator is not found', () => {
            expect(substringBefore('test', 'x')).toEqual('test');
        });

        it('should return substring before separator', () => {
            expect(substringBefore('test', 'e')).toEqual('t');
        });

        it('should return substring before first separator', () => {
            expect(substringBefore('test', 't')).toEqual('');
        });

        it('should return substring before first separator', () => {
            expect(substringBefore('test', 'st')).toEqual('te');
        });

        it('should return substring before first separator', () => {
            expect(substringBefore('test', 'test')).toEqual('');
        });

    });

    describe('substringAfter', () => {
        it('should return value when separator is empty', () => {
            expect(substringAfter('test', '')).toEqual('test');
        });

        it('should return empty string when separator is not found', () => {
            expect(substringAfter('test', 'x')).toEqual('');
        });

        it('should return substring after separator', () => {
            expect(substringAfter('test', 'e')).toEqual('st');
        });

        it('should return substring after first separator', () => {
            expect(substringAfter('test', 't')).toEqual('est');
        });

        it('should return substring after first separator', () => {
            expect(substringAfter('test', 'st')).toEqual('');
        });

        it('should return substring after first separator', () => {
            expect(substringAfter('test', 'test')).toEqual('');
        });
    });

    describe('substringBeforeLast', () => {
        it('should return value when separator is empty', () => {
            expect(substringBeforeLast('hello world', '')).toEqual('hello world');
        });

        it('should return value when separator is undefined', () => {
            expect(substringBeforeLast('hello world', undefined!)).toEqual('hello world');
        });

        it('should return value when separator is null', () => {
            expect(substringBeforeLast('hello world', null!)).toEqual('hello world');
        });

        it('should return value when separator is not found', () => {
            expect(substringBeforeLast('hello world', 'x')).toEqual('hello world');
        });

        it('should return substring before last separator 1', () => {
            expect(substringBeforeLast('hello world', 'l')).toEqual('hello wor');
        });

        it('should return substring before last separator 2', () => {
            expect(substringBeforeLast('hello world', 'e')).toEqual('h');
        });

        it('should return substring before last separator 3', () => {
            expect(substringBeforeLast('hello world', 'o')).toEqual('hello w');
        });
    });

    describe('substringAfterLast', () => {
        it('should return empty string when separator is empty', () => {
            expect(substringAfterLast('hello world', '')).toEqual('');
        });

        it('should return empty string when separator is undefined', () => {
            expect(substringAfterLast('hello world', undefined!)).toEqual('');
        });

        it('should return empty string when separator is null', () => {
            expect(substringAfterLast('hello world', null!)).toEqual('');
        });

        it('should return empty string when separator is not found', () => {
            expect(substringAfterLast('hello world', 'x')).toEqual('');
        });

        it('should return substring after last separator 1', () => {
            expect(substringAfterLast('hello world', 'l')).toEqual('d');
        });

        it('should return substring after last separator 2', () => {
            expect(substringAfterLast('hello world', 'e')).toEqual('llo world');
        });

        it('should return substring after last separator 3', () => {
            expect(substringAfterLast('hello world', 'o')).toEqual('rld');
        });
    });

    describe('substringBetween', () => {

        it('should return empty string when open is empty', () => {
            expect(substringBetween('hello world', '', '')).toEqual('');
        });

        it('should return empty string when open is undefined', () => {
            expect(substringBetween('hello world', undefined!, '')).toEqual('');
        });

        it('should return empty string when open is null', () => {
            expect(substringBetween('hello world', null!, '')).toEqual('');
        });

        it('should return empty string when close is empty', () => {
            expect(substringBetween('hello world', '', '')).toEqual('');
        });

        it('should return substring between open and close', () => {
            expect(substringBetween('hello world', 'h', 'd')).toEqual('ello worl');
        });

    });

});
