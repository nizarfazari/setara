export function capitalFirstLetter(val: string | undefined) {
    if (typeof val === 'undefined') {
        return ''
    }
    return val
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export const formatNorek = (norek: string | number | undefined): string | number => {
    if (typeof norek === "undefined") {
      return 0;
    }
    const str = norek.toString();

    if (str.length % 4 === 0) {
      return str;
    }
    return str.replace(/(.{4})/g, "$1-");
  };

  const currentDate = new Date();
  export const formattedDate = currentDate.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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