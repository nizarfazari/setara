export function capitalFirstLetter(val: string | undefined) {
    if (typeof val === 'undefined') {
        return ''
    }
    return val
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}




export function FormatCurrency(value: number | string | undefined) {
    if (typeof value === 'undefined') {
        return 0
    }

    if (!value) {
        return 0
    }
    const rupiah = value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    return `Rp. ${rupiah}`;

}