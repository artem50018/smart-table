import { rules, createComparison } from "../lib/compare.js";

export function initSearching(searchField) {
    // #5.1 — создаём компаратор
    const comparator = createComparison({
        search: rules.stringIncludes,
    });

    return (data, state, action) => {
        // #5.2 — применяем компаратор, если есть текст поиска
        const query = searchField.value.trim();
        if (!query) return data; 

        return data.filter(item => {
            return Object.values(item).some(value =>
                comparator(query, value)
            );
        });
    };
}
