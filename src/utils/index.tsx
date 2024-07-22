export function capitalFirstLetter(val: string) {
    return val
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}


