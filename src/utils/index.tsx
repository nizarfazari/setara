export function capitalFirstLetter(val: string | undefined) {
    if(typeof val === 'undefined'){
        return ''
    }
    return val
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}


