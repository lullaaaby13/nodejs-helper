declare module global {
    interface Array<T> {
        isEmpty(): boolean;
        isNotEmpty(): boolean;
        dropLast(count: number): Array<T>;
        last(): T;
        groupBy<Property extends keyof T, Value = T[Property]>(
            keySelector: (element: T) => Property,
        ): Value extends string ? { Value: T[] } : Value extends number ? { Value: T[] } : unknown;
    }
}

interface Array<T> {
    isEmpty(): boolean;
    isNotEmpty(): boolean;
    dropLast(count: number): Array<T>;
    last(): T;
    groupBy<Property extends keyof T, Value = T[Property]>(
        keySelector: (element: T) => Value,
    ): Value extends string ? { Value: T[] } : Value extends number ? { Value: T[] } : unknown;
}

Array.prototype.isEmpty = function (): boolean {
    return this.length === 0;
};

Array.prototype.isNotEmpty = function (): boolean {
    return this.length > 0;
};
Array.prototype.dropLast = function <T>(count: number): Array<T> {
    if (count >= this.length) return [];
    const copied = this.slice();
    copied.splice(this.length - count, count);
    return copied;
};
Array.prototype.last = function <T>(): T {
    if (this.length === 0) {
        throw new Error('NoSuchElementException');
    }
    return this[this.length - 1];
};

Array.prototype.groupBy = function <T, Property extends keyof T, Value = T[Property]>(
    keySelector: (element: T) => Value,
): Value extends string ? { Value: T[] } : Value extends number ? { Value: T[] } : unknown {
    return this.reduce((acc, curr) => {
        const key = keySelector(curr);
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(curr);
        return acc;
    }, {} as { Value: T[] });
};
