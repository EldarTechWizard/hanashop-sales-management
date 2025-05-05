export default function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');      // Día con 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes con 2 dígitos (0-indexado)
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

export function formatDateToYYYYMMDD(date: Date): string {
    return date.toISOString().split('T')[0]; // "2025-05-04"
}