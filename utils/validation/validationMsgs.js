module.exports = {
    REQUIRED: 'Campo requerido',
    ARRAY_REQUIRED: 'Campo debe ser del tipo array',
    STRING_REQUIRED: 'Campo debe ser del tipo string',
    NUMBER_REQUIRED: 'Campo debe ser del tipo número',
    MIN_ITEMS: (items) => {
        return `Campo debe tener al menos ${items} items`
    },
    MAX_ITEMS: (items) => {
        return `Campo no debe tener más de ${items} items`
    }
}