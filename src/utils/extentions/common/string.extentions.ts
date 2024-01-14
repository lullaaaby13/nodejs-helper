declare module global {
    interface String {
        isBlank(): boolean;
        isNotBlank(): boolean;
        isNumber(): boolean;
        substringAfter(delimiter: string): string;
        substringBefore(delimiter: string): string;
        onlyNumbers(): string;
        toNumber(): number | undefined;
    }
}

interface String {
    isBlank(): boolean;
    isNotBlank(): boolean;
    isNumber(): boolean;
    substringAfter(delimiter: string): string;
    substringBefore(delimiter: string): string;
    onlyNumbers(): string;
    toNumber(): number | undefined;
}

String.prototype.isBlank = function () {
    if (this.length === 0) {
        return true;
    }
    if (this.trim().length === 0) {
        return true;
    }
    return false;
};
String.prototype.isNotBlank = function () {
    return !this.isBlank();
};
String.prototype.isNumber = function () {
    return !isNaN(this);
};
String.prototype.substringAfter = function (delimiter: string) {
    if (delimiter.length === 0) {
        return this.toString();
    }
    const index = this.indexOf(delimiter);
    if (index === -1) {
        return this.toString();
    }
    return this.substring(index + delimiter.length);
};
String.prototype.substringBefore = function (delimiter: string) {
    if (delimiter.length === 0) {
        return '';
    }
    const index = this.indexOf(delimiter);
    if (index === -1) {
        return this.toString();
    }
    return this.substring(0, index);
};

String.prototype.onlyNumbers = function () {
    return this.replace(/[^0-9]/g, '');
};
String.prototype.toNumber = function () {
    const text: string = this.includes(',') ? this.replace(/,/g, '') : this;
    if (text.isNotBlank()) {
        return Number(text);
    }
};
