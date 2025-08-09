import {createComparison, defaultRules} from "../lib/compare.js";

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — наполняем select актуальными значениями
    Object.keys(indexes).forEach((elementName) => {
        elements[elementName].append(
            ...Object.values(indexes[elementName]).map(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                return option;
            })
        );
    });

    return (data, state, action) => {
        // @todo: #4.2 — очистка поля фильтра
        if (action && action.name === 'clear') {
            const fieldName = action.dataset.field;
            const input = action.closest('label').querySelector(`[name="${fieldName}"]`);
            if (input) {
                input.value = '';
                state[fieldName] = '';
            }
        }

        // @todo: #4.3 — создаём функцию сравнения
        const compare = createComparison(defaultRules);

        // @todo: #4.5 — фильтруем данные
        return data.filter(row => compare(row, state));
    };
}
