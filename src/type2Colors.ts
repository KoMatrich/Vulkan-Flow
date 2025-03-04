export const type2Color: Record<string, string> = {
    string: "#3498db", // Blue
    number: "#e74c3c", // Red
    boolean: "#2ecc71", // Green
    default: "#95a5a6", // Gray
};

export function Type2Color(type?: unknown): string {
    return type2Color[type as string] || type2Color.default;
}